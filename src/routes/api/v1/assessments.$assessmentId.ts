import { createFileRoute } from "@tanstack/react-router";
import { resolveAssessmentActor } from "@/lib/registry/assessment-auth.server";
import { readAssessment, verifyStoredAssessment } from "@/lib/registry/assessment-store.server";

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}

export const Route = createFileRoute("/api/v1/assessments/$assessmentId")({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        const actor = await resolveAssessmentActor(request.headers);
        if (!actor) return json({ error: "Unauthorized or untrusted tenant identity." }, 401);
        const assessmentId = params.assessmentId;
        if (!/^[A-Za-z0-9_-]{8,128}$/.test(assessmentId)) return json({ error: "Assessment id is invalid." }, 400);
        try {
          const record = await readAssessment(actor.tenantId, assessmentId);
          if (!record) return json({ error: "Assessment not found for this tenant." }, 404);
          const verified = verifyStoredAssessment(record);
          if (!verified) return json({ error: "Stored assessment digest does not match its evidence." }, 409);
          return json({
            status: "READ_BACK",
            verified: true,
            assessmentId: record.assessmentId,
            id: record.id,
            tenantId: record.tenantId,
            repository: record.repository,
            branch: record.branch,
            commit: record.commit,
            scannedAt: record.scannedAt,
            digest: record.digest,
            createdAt: record.createdAt,
            report: record.report,
          });
        } catch (error) {
          console.error("[registry-assessment] readback failed", error);
          return json({ error: "Assessment readback is unavailable." }, 503);
        }
      },
    },
  },
});
