import { createHash } from "node:crypto";

export type AssessmentInput = {
  source: "git-goat";
  assessmentId: string;
  report: Record<string, unknown>;
};

export type ValidatedAssessment = AssessmentInput & {
  repository: string;
  branch: string;
  commit: string;
  scannedAt: string;
  digest: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function canonical(value: unknown): string {
  if (Array.isArray(value)) return "[" + value.map(canonical).join(",") + "]";
  if (isRecord(value)) {
    return "{" + Object.keys(value).sort().map((key) =>
      JSON.stringify(key) + ":" + canonical(value[key])
    ).join(",") + "}";
  }
  return JSON.stringify(value) ?? "null";
}

export function assessmentDigest(value: unknown): string {
  return createHash("sha256").update(canonical(value)).digest("hex");
}

export function validateAssessment(value: unknown): ValidatedAssessment {
  if (!isRecord(value) || value.source !== "git-goat") {
    throw new Error("Unsupported assessment source.");
  }
  if (typeof value.assessmentId !== "string" || !/^[A-Za-z0-9_-]{8,128}$/.test(value.assessmentId)) {
    throw new Error("Assessment id is invalid.");
  }
  if (!isRecord(value.report)) throw new Error("Assessment report must be an object.");
  const report = value.report;
  if (report.id !== value.assessmentId) throw new Error("Assessment id does not match the report id.");
  if (typeof report.repository !== "string" || report.repository.length > 500) {
    throw new Error("Repository URL is missing or invalid.");
  }
  let repositoryUrl: URL;
  try { repositoryUrl = new URL(report.repository); }
  catch { throw new Error("Repository URL is invalid."); }
  if (repositoryUrl.protocol !== "https:" || repositoryUrl.hostname.toLowerCase() !== "github.com" || repositoryUrl.username || repositoryUrl.password) {
    throw new Error("Only public GitHub repository URLs are accepted.");
  }
  if (typeof report.branch !== "string" || !report.branch.trim() || report.branch.length > 255) {
    throw new Error("Pinned branch is missing or invalid.");
  }
  if (typeof report.commit !== "string" || !/^[a-f0-9]{40,64}$/i.test(report.commit)) {
    throw new Error("Pinned commit SHA is missing or invalid.");
  }
  if (typeof report.scannedAt !== "string" || !Number.isFinite(Date.parse(report.scannedAt))) {
    throw new Error("Scan timestamp is missing or invalid.");
  }
  const normalized: AssessmentInput = {
    source: "git-goat",
    assessmentId: value.assessmentId,
    report,
  };
  const bytes = Buffer.byteLength(canonical(normalized), "utf8");
  if (bytes > 1_500_000) throw new Error("Assessment exceeds the 1.5 MB storage limit.");
  return {
    ...normalized,
    repository: report.repository,
    branch: report.branch,
    commit: report.commit,
    scannedAt: report.scannedAt,
    digest: assessmentDigest(normalized),
  };
}
