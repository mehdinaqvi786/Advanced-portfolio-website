import "server-only";

import { requireAdmin } from "@/lib/auth/require-admin";
import { isNextProductionBuild } from "@/lib/next-phase";
import { prisma } from "@/lib/prisma";
import type { ContactStatus } from "@/generated/prisma/client";

export type AdminContact = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: ContactStatus;
  createdAt: string;
  updatedAt: string;
};

/**
 * All contact submissions, newest first.
 */
export async function getAdminContacts(): Promise<AdminContact[]> {
  if (isNextProductionBuild()) {
    return [];
  }

  await requireAdmin();

  const rows = await prisma.contact.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      subject: true,
      message: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return rows.map((row) => ({
    ...row,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  }));
}
