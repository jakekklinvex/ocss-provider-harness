import type { Envelope } from "../crypto-adapter.js";
export type { Envelope };

export interface MinimizationAttestation {
  alg: "hmac-sha256+merkle";
  merkle_root: string;     // hex
  leaves: string[];        // each = hex HMAC-SHA256(salt, canonical(field))
  salt_commitment: string; // hex SHA-256(salt); the salt itself is never emitted
}

export type UpstreamAttestation = { valid: true } | { valid: false };

export interface ClassifyInput {
  content: string;
  declared_harm_class?: string; // A1 injects an out-of-enum value here
  recipient_did?: string;       // A2 context
}

export type ClassifyOutput =
  | { kind: "signal"; envelope: Envelope; minimization: MinimizationAttestation }
  | { kind: "rejected"; code: string; reason: string }
  | { kind: "suspended"; reason: string };

export interface EnclaveUnderTest {
  buildInfo(): { build_hash: string; suite_version: string };
  classify(input: ClassifyInput): Promise<ClassifyOutput>;
  setUpstreamAttestation(state: UpstreamAttestation | "invalid" | "expired"): void;
}
