import { describe, it, expect } from "vitest";
import { makeReferenceEnclave } from "../reference-enclave/index.js";
import { vocab } from "../src/crypto-adapter.js";

describe("reference enclave", () => {
  it("reports build info", () => {
    expect(makeReferenceEnclave().buildInfo().build_hash).toMatch(/.+/);
  });
  it("emits a content-free signal with minimization on valid content", async () => {
    const out = await makeReferenceEnclave().classify({ content: "worrying message", recipient_did: "did:ocss:parent" });
    expect(out.kind).toBe("signal");
    if (out.kind !== "signal") return;
    expect(Object.values(vocab.HarmClass)).toContain((out.envelope.inner as any).harm_class);
    expect((out.envelope.inner as any).payload).toBeUndefined(); // no census-openable content
    expect(out.minimization.alg).toBe("hmac-sha256+merkle");
  });
  it("rejects an out-of-enum harm class (fail-closed)", async () => {
    const out = await makeReferenceEnclave().classify({ content: "x", declared_harm_class: "made_up_class" });
    expect(out.kind).toBe("rejected");
  });
  it("suspends before content when upstream attestation is invalid", async () => {
    const e = makeReferenceEnclave();
    e.setUpstreamAttestation("invalid");
    const out = await e.classify({ content: "x" });
    expect(out.kind).toBe("suspended");
  });
});
