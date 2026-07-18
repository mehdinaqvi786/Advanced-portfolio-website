export { getAuthEnv, type AuthEnv } from "@/lib/auth/env";
export {
  clearAuthSession,
  resolveAdminGate,
  type AdminGateResult,
} from "@/lib/auth/gate";
export {
  AdminUnauthorizedError,
  requireAdmin,
} from "@/lib/auth/require-admin";
export {
  getAdminSession,
  getSessionProfile,
  getSessionUser,
} from "@/lib/auth/session";
export type {
  AdminProfile,
  AuthRole,
  SessionUser,
} from "@/lib/auth/types";
