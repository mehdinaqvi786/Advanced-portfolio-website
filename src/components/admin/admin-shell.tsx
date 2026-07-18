"use client";

import { Suspense, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminTopbar } from "@/components/admin/topbar";
import { AuthToastHandler } from "@/components/auth/auth-toast-handler";
import { SessionWatcher } from "@/components/admin/session-watcher";
import type { AdminProfile } from "@/lib/auth/types";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type AdminShellProps = {
  admin: AdminProfile;
  children: React.ReactNode;
};

function titleFromPath(pathname: string): string {
  if (pathname.startsWith("/admin/contacts")) return "Contact Queries";
  if (pathname.startsWith("/admin/dashboard")) return "Dashboard";
  return "Admin";
}

/**
 * Reusable admin chrome: sidebar + topbar + content.
 */
export function AdminShell({ admin, children }: AdminShellProps) {
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const title = useMemo(() => titleFromPath(pathname), [pathname]);

  return (
    <div className="flex min-h-svh bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--primary)_7%,transparent),transparent_50%)]">
      <AdminSidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onToggleCollapsed={() => setCollapsed((prev) => !prev)}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar
          title={title}
          admin={admin}
          onOpenMobileNav={() => setMobileOpen(true)}
        />
        <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {/*
            Keep server page children outside keyed motion remounts.
            Remounting RSC slots via key={pathname} can trip Turbopack
            boundary-module HMR errors during admin navigation.
          */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        </div>
      </div>

      <SessionWatcher />
      <Suspense fallback={null}>
        <AuthToastHandler />
      </Suspense>
    </div>
  );
}
