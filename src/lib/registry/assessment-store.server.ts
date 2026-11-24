import { randomUUID } from "node:crypto";
import { getSql } from "../db.ts";
import { assessmentDigest, verifyAssessmentDigest, type ValidatedAssessment } from "./assessment.ts";

export type StoredAssessment = {
  id: string;
  tenantId: string;
  source: "git-goat";
  assessmentId: string;
  repository: string;
  branch: string;
  commit: string;
  scannedAt: string;
  report: Record<string, unknown>;
  digest: string;
  createdAt: string;
};

type DbRow = {
  id: string;
  tenant_id: string;
  source: "git-goat";
  external_assessment_id: string;
  repository: string;
  branch: string;
  commit_sha: string;
  scanned_at: string;
  report: Record<string, unknown>;
  report_sha256: string;
  created_at: string;
};

function fromRow(row: DbRow, tenantId: string): StoredAssessment {
  const report = typeof row.report === "string" ? JSON.parse(row.report) : row.report;
  return {
    id: row.id,
    tenantId,
    source: row.source,
    assessmentId: row.external_assessment_id,
    repository: row.repository,
    branch: row.branch,
    commit: row.commit_sha,
    scannedAt: row.scanned_at,
    report,
    digest: row.report_sha256.trim(),
    createdAt: row.created_at,
  };
}

export async function recordAssessment(
  tenantId: string,
  actorId: string,
  assessment: ValidatedAssessment,
): Promise<{ record: StoredAssessment; created: boolean }> {
  const sql = await getSql();
  const id = randomUUID();
  const rows = await sql.query<DbRow>(
    `insert into registry_assessments
      (id, tenant_id, actor_id, source, external_assessment_id, repository, branch, commit_sha, scanned_at, report, report_sha256)
     values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10::jsonb,$11)
     on conflict (tenant_id, source, external_assessment_id) do nothing
     returning id, tenant_id, source, external_assessment_id, repository, branch, commit_sha,
       scanned_at, report, report_sha256, created_at`,
    [id, tenantId, actorId, assessment.source, assessment.assessmentId,
      assessment.repository, assessment.branch, assessment.commit, assessment.scannedAt,
      JSON.stringify(assessment.report), assessment.digest],
  );
  if (rows[0]) return { record: fromRow(rows[0], tenantId), created: true };

  const existing = await sql.query<DbRow>(
    `select id, tenant_id, source, external_assessment_id, repository, branch, commit_sha,
       scanned_at, report, report_sha256, created_at
     from registry_assessments
     where tenant_id = $1 and source = $2 and external_assessment_id = $3
     limit 1`,
    [tenantId, assessment.source, assessment.assessmentId],
  );
  if (!existing[0]) throw new Error("Assessment insert conflict could not be resolved.");
  const record = fromRow(existing[0], tenantId);
  if (record.digest !== assessment.digest) {
    throw Object.assign(new Error("Assessment id already exists with different evidence; immutable record was not changed."), { status: 409 });
  }
  return { record, created: false };
}

export async function readAssessment(tenantId: string, assessmentId: string): Promise<StoredAssessment | null> {
  const sql = await getSql();
  const rows = await sql.query<DbRow>(
    `select id, tenant_id, source, external_assessment_id, repository, branch, commit_sha,
       scanned_at, report, report_sha256, created_at
     from registry_assessments
     where tenant_id = $1 and source = 'git-goat' and external_assessment_id = $2
     limit 1`,
    [tenantId, assessmentId],
  );
  if (!rows[0]) return null;
  const record = fromRow(rows[0], tenantId);
  return record;
}

export function verifyStoredAssessment(record: StoredAssessment): boolean {
  return verifyAssessmentDigest({
    source: record.source,
    assessmentId: record.assessmentId,
    report: record.report,
  }, record.digest);
}
