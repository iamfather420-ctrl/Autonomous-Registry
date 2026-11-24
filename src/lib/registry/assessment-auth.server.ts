import {
  GATE_IDENTITY_HEADER,
  gateKeyResolver,
  resolveGateEndpoints,
  verifyGateIdentityToken,
} from "../auth/gate-identity.server.ts";
import { env } from "../env.server.ts";

export type AssessmentActor = { tenantId: string; actorId: string };

export async function resolveAssessmentActor(headers: Headers): Promise<AssessmentActor | null> {
  const token = headers.get(GATE_IDENTITY_HEADER)?.trim();
  const endpoints = resolveGateEndpoints(headers);
  const audiences = (env("SOLVEX_REGISTRY_INGEST_AUDIENCES") ?? "")
    .split(",").map((value) => value.trim()).filter(Boolean);
  if (!token || !endpoints || audiences.length === 0) return null;

  const getKey = gateKeyResolver(endpoints.jwksUrl);
  for (const audience of audiences) {
    const identity = await verifyGateIdentityToken(token, {
      issuer: endpoints.issuer,
      audience,
      getKey,
    });
    if (identity?.sub && identity.teamId) {
      return { tenantId: identity.teamId, actorId: identity.sub };
    }
  }
  return null;
}
