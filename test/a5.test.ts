import { describe, it, expect } from "vitest";
import { a5Minimization } from "../src/assertions/a5-minimization.js";
import { runAssertion } from "../src/probe.js";
import { makeReferenceEnclave } from "../reference-enclave/index.js";
import { mutantA5RawHashLeaves, mutantA5RawLeavesValidRoot } from "./helpers/mutants.js";

describe("A5 minimization attestation", () => {
  it("passes against the reference enclave", async () => {
    const r = await runAssertion("a5", a5Minimization, makeReferenceEnclave());
    expect(r.verdict).toBe("pass");
  });
  it("fails against a mutant emitting raw-hash leaves / bad root", async () => {
    const r = await runAssertion("a5", a5Minimization, mutantA5RawHashLeaves());
    expect(r.verdict).toBe("fail");
  });
  it("fails via raw-hash gate (not recompute gate) against valid-root raw-leaf mutant", async () => {
    const r = await runAssertion("a5", a5Minimization, mutantA5RawLeavesValidRoot());
    expect(r.verdict).toBe("fail");
    expect(r.detail).toMatch(/raw hash|brute/i);
  });
});
