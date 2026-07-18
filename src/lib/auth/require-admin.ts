import "server-only";

import { resolveAdminGate, type AdminGateResult } from "@/lib/auth/gate";
import { isNextProductionBuild } from "@/lib/next-phase";

export class AdminUnauthorizedError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "AdminUnauthorizedError";
  }
}

/**
 * Defense-in-depth for admin data loaders / mutations.
 */
export async function requireAdmin(): Promise<
  Extract<AdminGateResult, { status: "ok" }>
> {
  if (isNextProductionBuild()) {
    throw new AdminUnauthorizedError("build");
  }

  const gate = await resolveAdminGate();
  if (gate.status !== "ok") {
    throw new AdminUnauthorizedError();
  }
  return gate;
}
