"use client";

import { useTransition } from "react";
import { Loader2, LogOut } from "lucide-react";

import { logoutAction } from "@/actions/auth";
import { ADMIN_LOGOUT_FLAG } from "@/constants/admin-auth";
import { cn } from "@/lib/utils";

type LogoutButtonProps = {
  compact?: boolean;
  className?: string;
};

export function LogoutButton({ compact = false, className }: LogoutButtonProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        try {
          sessionStorage.setItem(ADMIN_LOGOUT_FLAG, "1");
        } catch {
          // Ignore storage failures — logout still proceeds.
        }
        startTransition(() => {
          void logoutAction();
        });
      }}
      title="Sign out"
      aria-label={isPending ? "Signing out" : "Logout"}
      className={cn(
        "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-200",
        "text-muted-foreground hover:bg-destructive/10 hover:text-destructive",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-70",
        compact && "justify-center px-2",
        className
      )}
    >
      {isPending ? (
        <Loader2 className="size-4 shrink-0 animate-spin" aria-hidden />
      ) : (
        <LogOut className="size-4 shrink-0" aria-hidden />
      )}
      {!compact ? (
        <span>{isPending ? "Signing out…" : "Logout"}</span>
      ) : (
        <span className="sr-only">
          {isPending ? "Signing out" : "Logout"}
        </span>
      )}
    </button>
  );
}
