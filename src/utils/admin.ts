import type { ContactStatus } from "@/generated/prisma/client";
import { cn } from "@/lib/utils";

export const CONTACT_STATUSES = [
  "Pending",
  "Completed",
  "Resolved",
  "Done",
] as const satisfies readonly ContactStatus[];

const STATUS_CLASS: Record<ContactStatus, string> = {
  Pending:
    "border-amber-500/35 bg-amber-500/10 text-amber-800 dark:text-amber-200",
  Completed:
    "border-emerald-500/35 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200",
  Resolved:
    "border-sky-500/35 bg-sky-500/10 text-sky-800 dark:text-sky-200",
  Done: "border-violet-500/35 bg-violet-500/10 text-violet-800 dark:text-violet-200",
};

export function formatContactStatus(status: ContactStatus): string {
  return status;
}

export function contactStatusClassName(status: ContactStatus): string {
  return cn(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[0.7rem] font-medium tracking-wide",
    STATUS_CLASS[status]
  );
}

export function formatAdminDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatAdminDateTime(date: Date | string): string {
  const value = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(value);
}
