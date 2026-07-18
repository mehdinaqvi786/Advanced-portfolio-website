import "server-only";

import { connection } from "next/server";

import { isNextProductionBuild } from "@/lib/next-phase";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getProfileByAuthUserId } from "@/server/auth/profile";
import type { AdminProfile, SessionUser } from "@/lib/auth/types";

/**
 * Session helpers for protected admin routes.
 */

export async function getSessionUser(): Promise<SessionUser | null> {
  if (isNextProductionBuild()) return null;

  await connection();

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
  };
}

export async function getSessionProfile(): Promise<AdminProfile | null> {
  const user = await getSessionUser();
  if (!user) return null;
  return getProfileByAuthUserId(user.id);
}

/**
 * Returns the admin profile when a valid ADMIN session exists.
 */
export async function getAdminSession(): Promise<{
  user: SessionUser;
  profile: AdminProfile;
} | null> {
  const user = await getSessionUser();
  if (!user) return null;

  const profile = await getProfileByAuthUserId(user.id);
  if (!profile || profile.role !== "ADMIN") {
    return null;
  }

  return { user, profile };
}
