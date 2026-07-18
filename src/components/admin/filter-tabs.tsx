"use client";

import type { ContactStatus } from "@/generated/prisma/client";
import { cn } from "@/lib/utils";

export type ContactFilter = "All" | ContactStatus;

type FilterTabsProps = {
  value: ContactFilter;
  counts: Record<ContactFilter, number>;
  onChange: (filter: ContactFilter) => void;
};

const FILTERS: ContactFilter[] = [
  "All",
  "Pending",
  "Completed",
  "Resolved",
  "Done",
];

export function FilterTabs({ value, counts, onChange }: FilterTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Filter contacts by status"
      className="flex flex-wrap gap-2"
    >
      {FILTERS.map((filter) => {
        const selected = value === filter;
        return (
          <button
            key={filter}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(filter)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm transition-[color,background-color,border-color,transform] duration-200",
              "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
              selected
                ? "border-primary/40 bg-primary/12 text-foreground shadow-[0_0_0_1px_color-mix(in_oklab,var(--primary)_20%,transparent)]"
                : "border-border/60 bg-card/40 text-muted-foreground hover:border-border hover:bg-muted/40 hover:text-foreground"
            )}
          >
            <span>{filter}</span>
            <span
              className={cn(
                "rounded-full px-1.5 py-0.5 text-[0.7rem] tabular-nums",
                selected
                  ? "bg-primary/15 text-primary"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {counts[filter]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
