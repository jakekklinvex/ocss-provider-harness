export interface AssertionMeta {
  id: string;
  title: string;
  status: "passable" | "pending";
  pendingReason?: string;
}

export const ASSERTIONS: AssertionMeta[] = [
  { id: "a1", title: "Closed-enum fail-closed", status: "passable" },
  { id: "a2", title: "Content-free signal lane", status: "passable" },
  { id: "a3", title: "Sealed-to-consent-recipient only", status: "pending", pendingReason: "needs consent infra" },
  { id: "a4", title: "Parent-sole-control + visible monitoring_active", status: "pending", pendingReason: "needs capability endpoint" },
  { id: "a5", title: "Minimization attestation wired", status: "passable" },
  { id: "a6", title: "Abuse-at-home -> independent-advocate routing", status: "pending", pendingReason: "advocate lane not built" },
  { id: "a7", title: "Attestation-fail -> suspend", status: "passable" },
];
