import "server-only";

import { cache } from "react";
import { connection } from "next/server";

import { isNextProductionBuild } from "@/lib/next-phase";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getProfileByAuthUserId } from "@/server/auth/profile";
import type { AdminProfile, SessionUser } from "@/lib/auth/types";

export type AdminGateResult =
  | { status: "ok"; user: SessionUser; profile: AdminProfile }
  | { status: "unauthenticated" }
  | { status: "forbidden" };

/**
 * Resolve admin access for protected layouts/actions.
 * Cached per request so layout + loaders share one auth check.
 */
export const resolveAdminGate = cache(async (): Promise<AdminGateResult> => {
  // Never touch cookies during `next build` static analysis.
  if (isNextProductionBuild()) {
    return { status: "unauthenticated" };
  }

  try {
    await connection();

    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return { status: "unauthenticated" };
    }

    const sessionUser: SessionUser = {
      id: user.id,
      email: user.email,
    };

    const profile = await getProfileByAuthUserId(user.id);
    if (!profile || profile.role !== "ADMIN") {
      return { status: "forbidden" };
    }

    return { status: "ok", user: sessionUser, profile };
  } catch (error) {
    // Real request failures only — build/dynamic bailouts are handled above.
    console.error("[resolveAdminGate]", error);
    return { status: "unauthenticated" };
  }
});

/** Clear Supabase auth cookies for the current request. */
export async function clearAuthSession(): Promise<void> {
  if (isNextProductionBuild()) return;

  try {
    await connection();
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut({ scope: "local" });
  } catch (error) {
    console.error("[clearAuthSession]", error);
  }
}
