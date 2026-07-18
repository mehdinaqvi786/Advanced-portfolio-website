import "server-only";

import { prisma } from "@/lib/prisma";
import type { AdminProfile } from "@/lib/auth/types";

/**
 * Profile lookups for future protected admin routes.
 */
export async function getProfileByAuthUserId(
  authUserId: string
): Promise<AdminProfile | null> {
  const profile = await prisma.profile.findUnique({
    where: { authUserId },
    select: {
      id: true,
      authUserId: true,
      name: true,
      email: true,
      role: true,
    },
  });

  return profile;
}

export async function getProfileByEmail(
  email: string
): Promise<AdminProfile | null> {
  const profile = await prisma.profile.findUnique({
    where: { email: email.toLowerCase() },
    select: {
      id: true,
      authUserId: true,
      name: true,
      email: true,
      role: true,
    },
  });

  return profile;
}

export async function getAdminProfile(): Promise<AdminProfile | null> {
  const profile = await prisma.profile.findFirst({
    where: { role: "ADMIN" },
    select: {
      id: true,
      authUserId: true,
      name: true,
      email: true,
      role: true,
    },
  });

  return profile;
}
