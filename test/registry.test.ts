import { describe, it, expect } from "vitest";
import { ASSERTIONS } from "../src/assertions/registry.js";

describe("assertion registry", () => {
  it("has 7 assertions a1..a7", () => {
    expect(ASSERTIONS.map((a) => a.id)).toEqual(["a1","a2","a3","a4","a5","a6","a7"]);
  });
  it("marks a1 a2 a5 a7 passable and a3 a4 a6 pending with reasons", () => {
    const passable = ASSERTIONS.filter((a) => a.status === "passable").map((a) => a.id);
    const pending = ASSERTIONS.filter((a) => a.status === "pending");
    expect(passable.sort()).toEqual(["a1","a2","a5","a7"]);
    expect(pending.map((a) => a.id).sort()).toEqual(["a3","a4","a6"]);
    for (const p of pending) expect(p.pendingReason && p.pendingReason.length).toBeGreaterThan(0);
  });
});
