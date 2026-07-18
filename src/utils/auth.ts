import type { AuthRole } from "@/lib/auth/types";

export function isAdminRole(role: AuthRole | string | null | undefined): boolean {
  return role === "ADMIN";
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}
