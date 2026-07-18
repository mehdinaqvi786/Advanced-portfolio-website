"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Inbox,
  LayoutDashboard,
  PanelLeftClose,
  PanelLeftOpen,
  X,
} from "lucide-react";
import { motion } from "framer-motion";

import { LogoutButton } from "@/components/admin/logout-button";
import { SITE_CONFIG } from "@/constants/site";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/contacts",
    label: "Contact Queries",
    icon: Inbox,
  },
] as const;

type AdminSidebarProps = {
  collapsed: boolean;
  mobileOpen: boolean;
  onToggleCollapsed: () => void;
  onCloseMobile: () => void;
};

function SidebarNav({
  compact,
  onNavigate,
  showCollapseControl,
  onToggleCollapsed,
}: {
  compact: boolean;
  onNavigate?: () => void;
  showCollapseControl?: boolean;
  onToggleCollapsed?: () => void;
}) {
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();

  return (
    <div className="flex h-full flex-col">
      <div
        className={cn(
          "flex items-center gap-3 border-b border-border/50 px-4 py-5",
          compact && "justify-center px-2"
        )}
      >
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-sm font-bold text-primary">
          HQ
        </div>
        {!compact ? (
          <div className="min-w-0">
            <p className="truncate font-heading text-sm font-semibold">
              {SITE_CONFIG.name}
            </p>
            <p className="truncate text-[0.7rem] text-muted-foreground">
              Admin Panel
            </p>
          </div>
        ) : null}
      </div>

      <nav
        className="flex flex-1 flex-col gap-1 p-3"
        aria-label="Admin navigation"
      >
        {NAV_ITEMS.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              title={compact ? item.label : undefined}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-300",
                "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                active
                  ? "bg-primary/12 text-foreground"
                  : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                compact && "justify-center px-2"
              )}
            >
              {active ? (
                <motion.span
                  layoutId={reduced ? undefined : "admin-nav-active"}
                  className="absolute inset-0 rounded-xl border border-primary/25 bg-primary/10"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              ) : null}
              <Icon className="relative z-10 size-4 shrink-0" aria-hidden />
              {!compact ? (
                <span className="relative z-10">{item.label}</span>
              ) : (
                <span className="sr-only">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-2 border-t border-border/50 p-3">
        <LogoutButton compact={compact} />

        {showCollapseControl ? (
          <button
            type="button"
            onClick={onToggleCollapsed}
            className={cn(
              "hidden w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground md:flex",
              "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
              compact && "justify-center px-2"
            )}
            aria-label={compact ? "Expand sidebar" : "Collapse sidebar"}
          >
            {compact ? (
              <PanelLeftOpen className="size-4" aria-hidden />
            ) : (
              <>
                <PanelLeftClose className="size-4" aria-hidden />
                <span>Collapse</span>
              </>
            )}
          </button>
        ) : null}
      </div>
    </div>
  );
}

export function AdminSidebar({
  collapsed,
  mobileOpen,
  onToggleCollapsed,
  onCloseMobile,
}: AdminSidebarProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <>
      <aside
        className={cn(
          "sticky top-0 hidden h-svh shrink-0 border-r border-border/50 bg-card/40 backdrop-blur-xl transition-[width] duration-300 md:flex md:flex-col",
          collapsed ? "w-[4.5rem]" : "w-64"
        )}
      >
        <SidebarNav
          compact={collapsed}
          showCollapseControl
          onToggleCollapsed={onToggleCollapsed}
        />
      </aside>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-background/60 backdrop-blur-sm"
            aria-label="Close menu"
            onClick={onCloseMobile}
          />
          <motion.aside
            initial={reduced ? false : { x: -24, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex h-full w-[min(18rem,86vw)] flex-col border-r border-border/50 bg-card/95 shadow-2xl backdrop-blur-xl"
          >
            <button
              type="button"
              onClick={onCloseMobile}
              className="absolute top-3 right-3 z-10 inline-flex size-9 items-center justify-center rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              aria-label="Close sidebar"
            >
              <X className="size-4" aria-hidden />
            </button>
            <SidebarNav compact={false} onNavigate={onCloseMobile} />
          </motion.aside>
        </div>
      ) : null}
    </>
  );
}
