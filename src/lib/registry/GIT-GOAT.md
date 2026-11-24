# GIT G.O.A.T. assessment API

The Registry accepts explicit G.O.A.T. assessment submissions at
`POST /api/v1/assessments` and tenant-scoped independent reads at
`GET /api/v1/assessments/:assessmentId`.

## Required server configuration

- `SOLVEX_REGISTRY_INGEST_AUDIENCES`: comma-separated exact audience values
  accepted for gate-issued identity JWTs. Configure the audience used by the
  authenticated G.O.A.T. application. The API fails closed when this is empty.
- `DATABASE_URL`: the existing Neon/Postgres connection used by this Registry.
  The schema is added by migration `0002_registry_assessments.sql`. Preview may
  use the existing PGLite backend; it is not durable across process restarts.

The caller must forward the signed `x-grok-identity` token and the original
`x-forwarded-host` so the Registry verifies the issuer against the same trusted
gate origin. No client-supplied tenant identifier is accepted.

## Record contract

The source must be `git-goat`; the assessment ID must match `report.id`.
Reports are pinned to a public GitHub URL, branch, 40–64 character commit SHA,
and scan timestamp. Payloads are capped at 1.5 MB. The Registry computes a
canonical SHA-256 digest, stores immutable evidence per tenant, and treats
same-ID/same-digest retries as idempotent. Reusing an ID with different evidence
returns HTTP 409.

A successful write returns a readback path and digest. The caller must perform
a separate authenticated GET and compare the assessment ID, digest, and pinned
commit before reporting success. A tenant cannot read another tenant's record.

This API stores assessment evidence only. It does not execute repository code,
grant GitHub write access, create repair branches or pull requests, or authorize
production deployment.
