import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { assessmentDigest, validateAssessment, verifyAssessmentDigest } from "./assessment.ts";

const report = {
  id: "scan_12345678",
  repository: "https://github.com/example/project",
  branch: "main",
  commit: "a".repeat(40),
  scannedAt: "2026-11-23T12:00:00.000Z",
  findings: [{ id: "R01", status: "BLOCKED" }],
};

describe("validateAssessment", () => {
  it("accepts a pinned public GitHub scan and computes a stable digest", () => {
    const value = { source: "git-goat", assessmentId: report.id, report };
    const first = validateAssessment(value);
    const second = validateAssessment({ report: { ...report, findings: [{ status: "BLOCKED", id: "R01" }] }, assessmentId: report.id, source: "git-goat" });
    assert.equal(first.digest, second.digest);
    assert.match(first.digest, /^[a-f0-9]{64}$/);
  });

  it("rejects a report id mismatch", () => {
    assert.throws(() => validateAssessment({ source: "git-goat", assessmentId: "different_123", report }), /does not match/);
  });

  it("rejects non-GitHub repositories", () => {
    assert.throws(() => validateAssessment({
      source: "git-goat", assessmentId: report.id,
      report: { ...report, repository: "https://example.com/project" },
    }), /public GitHub/);
  });

  it("rejects a missing commit pin", () => {
    assert.throws(() => validateAssessment({
      source: "git-goat", assessmentId: report.id,
      report: { ...report, commit: "main" },
    }), /commit SHA/);
  });

  it("uses canonical key ordering for the digest", () => {
    assert.equal(assessmentDigest({ a: 1, b: { c: 2, d: 3 } }), assessmentDigest({ b: { d: 3, c: 2 }, a: 1 }));
  });
});

describe("assessment evidence digest", () => {
  it("detects changed stored evidence instead of recomputing over the stored digest", () => {
    const value = { source: "git-goat", assessmentId: report.id, report };
    const digest = assessmentDigest(value);
    assert.equal(verifyAssessmentDigest(value, digest), true);
    assert.equal(verifyAssessmentDigest({ ...value, report: { ...report, commit: "b".repeat(40) } }, digest), false);
    assert.equal(verifyAssessmentDigest(value, "not-a-sha256"), false);
  });
});
