"use client";

import { ChevronDown } from "lucide-react";

import type { ContactStatus } from "@/generated/prisma/client";
import { CONTACT_STATUSES } from "@/utils/admin";
import { cn } from "@/lib/utils";

type StatusSelectorProps = {
  value: ContactStatus;
  onChange: (status: ContactStatus) => void;
  disabled?: boolean;
  id?: string;
  "aria-label"?: string;
};

export function StatusSelector({
  value,
  onChange,
  disabled,
  id,
  "aria-label": ariaLabel = "Update contact status",
}: StatusSelectorProps) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        disabled={disabled}
        aria-label={ariaLabel}
        onChange={(event) => onChange(event.target.value as ContactStatus)}
        className={cn(
          "h-10 w-full appearance-none rounded-lg border border-border bg-card px-3 pr-10 text-sm font-medium text-foreground shadow-sm outline-none transition-colors",
          "hover:border-border/80 hover:bg-muted/40",
          "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
          "disabled:cursor-not-allowed disabled:opacity-60",
          "dark:border-border/80 dark:bg-muted/50 dark:text-foreground"
        )}
      >
        {CONTACT_STATUSES.map((status) => (
          <option
            key={status}
            value={status}
            className="bg-popover text-popover-foreground"
          >
            {status}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-foreground/70"
        aria-hidden
      />
    </div>
  );
}
