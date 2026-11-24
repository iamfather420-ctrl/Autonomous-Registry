-- Immutable, tenant-scoped GIT G.O.A.T. assessment records.
-- A retry with the same tenant/source/assessment id is idempotent; a different
-- digest for that key is rejected by the API rather than overwriting evidence.
create table if not exists registry_assessments (
  id text primary key,
  tenant_id text not null,
  actor_id text not null,
  source text not null check (source = 'git-goat'),
  external_assessment_id text not null,
  repository text not null,
  branch text not null,
  commit_sha text not null,
  scanned_at timestamptz not null,
  report jsonb not null,
  report_sha256 char(64) not null,
  created_at timestamptz not null default now(),
  unique (tenant_id, source, external_assessment_id)
);

create index if not exists registry_assessments_tenant_created_idx
  on registry_assessments (tenant_id, created_at desc);
