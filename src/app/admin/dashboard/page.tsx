import type { Metadata } from "next";

import { RecentContactsTable } from "@/components/admin/recent-contacts-table";
import { StatsCard } from "@/components/admin/stats-card";
import { getDashboardData } from "@/server/admin/dashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminDashboardPage() {
  const { stats, recent } = await getDashboardData();

  return (
    <main id="main-content" tabIndex={-1} className="mx-auto max-w-7xl space-y-8">
      <section className="space-y-2">
        <p className="text-sm font-medium tracking-[0.14em] text-primary uppercase">
          Overview
        </p>
        <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
          Portfolio control center
        </h2>
        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
          Live contact metrics from your Supabase database — pending inquiries,
          completed replies, and the latest messages.
        </p>
      </section>

      <section
        aria-label="Contact statistics"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <StatsCard
          label="Total Contacts"
          value={stats.total}
          description="All submissions received"
          icon="inbox"
          delay={0}
        />
        <StatsCard
          label="Pending Queries"
          value={stats.pending}
          description="Awaiting your response"
          icon="pending"
          accentClassName="bg-amber-500/10 text-amber-700 dark:text-amber-300"
          delay={0.05}
        />
        <StatsCard
          label="Completed Queries"
          value={stats.completed}
          description="Marked as completed"
          icon="completed"
          accentClassName="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
          delay={0.1}
        />
        <StatsCard
          label="Resolved Queries"
          value={stats.resolved}
          description="Fully resolved / archived"
          icon="resolved"
          delay={0.15}
        />
      </section>

      <section className="space-y-4" aria-labelledby="recent-contacts-heading">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2
              id="recent-contacts-heading"
              className="font-heading text-xl font-semibold tracking-tight"
            >
              Recent contacts
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Latest five submissions — read-only for now.
            </p>
          </div>
        </div>
        <RecentContactsTable contacts={recent} />
      </section>
    </main>
  );
}
