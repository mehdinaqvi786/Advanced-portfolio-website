import "server-only";

import { requireAdmin } from "@/lib/auth/require-admin";
import { isNextProductionBuild } from "@/lib/next-phase";
import { prisma } from "@/lib/prisma";
import type { ContactStatus } from "@/generated/prisma/client";

export type DashboardStats = {
  total: number;
  pending: number;
  completed: number;
  resolved: number;
};

export type RecentContactRow = {
  id: string;
  name: string;
  email: string;
  subject: string;
  status: ContactStatus;
  /** ISO string — safe to pass into Client Components */
  createdAt: string;
};

export type DashboardData = {
  stats: DashboardStats;
  recent: RecentContactRow[];
};

/**
 * Aggregated dashboard metrics + latest contacts.
 * Uses Prisma against Supabase PostgreSQL (indexed status / createdAt).
 *
 * Status mapping:
 * - Pending   → Pending
 * - Completed → Completed
 * - Resolved  → Resolved (+ Done for overview totals)
 */
export async function getDashboardData(): Promise<DashboardData> {
  if (isNextProductionBuild()) {
    return {
      stats: { total: 0, pending: 0, completed: 0, resolved: 0 },
      recent: [],
    };
  }

  await requireAdmin();

  const [total, grouped, recent] = await Promise.all([
    prisma.contact.count(),
    prisma.contact.groupBy({
      by: ["status"],
      _count: { _all: true },
    }),
    prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        name: true,
        email: true,
        subject: true,
        status: true,
        createdAt: true,
      },
    }),
  ]);

  const countByStatus = Object.fromEntries(
    grouped.map((row) => [row.status, row._count._all])
  ) as Partial<Record<ContactStatus, number>>;

  return {
    stats: {
      total,
      pending: countByStatus.Pending ?? 0,
      completed: countByStatus.Completed ?? 0,
      resolved: (countByStatus.Resolved ?? 0) + (countByStatus.Done ?? 0),
    },
    recent: recent.map((row) => ({
      ...row,
      createdAt: row.createdAt.toISOString(),
    })),
  };
}
