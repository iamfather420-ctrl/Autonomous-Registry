import { createFileRoute } from "@tanstack/react-router";
import { resolveAssessmentActor } from "@/lib/registry/assessment-auth.server";
import { recordAssessment } from "@/lib/registry/assessment-store.server";
import { validateAssessment } from "@/lib/registry/assessment";

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}

export const Route = createFileRoute("/api/v1/assessments")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const actor = await resolveAssessmentActor(request.headers);
        if (!actor) return json({ error: "Unauthorized or untrusted tenant identity." }, 401);
        const length = Number(request.headers.get("content-length") ?? 0);
        if (length > 1_600_000) return json({ error: "Assessment request is too large." }, 413);
        let body: unknown;
        try {
          const text = await request.text();
          if (new TextEncoder().encode(text).byteLength > 1_600_000) return json({ error: "Assessment request is too large." }, 413);
          body = JSON.parse(text);
        } catch {
          return json({ error: "Request body must be valid JSON." }, 400);
        }
        let assessment;
        try { assessment = validateAssessment(body); }
        catch (error) {
          return json({ error: error instanceof Error ? error.message : "Assessment validation failed." }, 400);
        }
        try {
          const saved = await recordAssessment(actor.tenantId, actor.actorId, assessment);
          return json({
            status: saved.created ? "RECORDED" : "ALREADY_RECORDED",
            assessmentId: saved.record.assessmentId,
            id: saved.record.id,
            digest: saved.record.digest,
            createdAt: saved.record.createdAt,
            readbackPath: "/api/v1/assessments/" + encodeURIComponent(saved.record.assessmentId),
          }, saved.created ? 201 : 200);
        } catch (error) {
          const status = typeof (error as { status?: unknown })?.status === "number"
            ? (error as { status: number }).status : 503;
          return json({ error: error instanceof Error ? error.message : "Assessment could not be stored." }, status);
        }
      },
    },
  },
});
