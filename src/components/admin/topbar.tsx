"use client";

import { Menu } from "lucide-react";

import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { AdminProfile } from "@/lib/auth/types";
import { formatAdminDate } from "@/utils/admin";

type AdminTopbarProps = {
  title: string;
  admin: AdminProfile;
  onOpenMobileNav: () => void;
};

export function AdminTopbar({
  title,
  admin,
  onOpenMobileNav,
}: AdminTopbarProps) {
  const today = formatAdminDate(new Date());

  return (
    <header className="sticky top-0 z-30 border-b border-border/50 bg-background/75 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-9 rounded-xl md:hidden"
            onClick={onOpenMobileNav}
            aria-label="Open navigation menu"
          >
            <Menu className="size-4" aria-hidden />
          </Button>
          <div className="min-w-0">
            <h1 className="font-heading truncate text-lg font-semibold tracking-tight sm:text-xl">
              {title}
            </h1>
            <p className="hidden text-xs text-muted-foreground sm:block">
              {today}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium text-foreground">{admin.name}</p>
            <p className="text-xs text-muted-foreground">{admin.email}</p>
          </div>
          <Badge
            variant="secondary"
            className="rounded-full border border-primary/25 bg-primary/10 text-primary"
          >
            {admin.role}
          </Badge>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
