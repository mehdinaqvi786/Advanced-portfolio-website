"use client";

import { cn } from "@/lib/utils";

type HamburgerButtonProps = {
  open: boolean;
  onClick?: () => void;
  className?: string;
  "aria-controls"?: string;
};

/**
 * Animated hamburger ↔ close morph for mobile drawer trigger.
 */
export function HamburgerButton({
  open,
  onClick,
  className,
  "aria-controls": ariaControls,
}: HamburgerButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      aria-controls={ariaControls}
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-xl border border-transparent text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden",
        className
      )}
    >
      <span className="relative block size-4" aria-hidden>
        <span
          className={cn(
            "absolute left-0 block h-0.5 w-4 rounded-full bg-current transition-all duration-300",
            open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0.5"
          )}
        />
        <span
          className={cn(
            "absolute top-1/2 left-0 block h-0.5 w-4 -translate-y-1/2 rounded-full bg-current transition-all duration-300",
            open ? "opacity-0" : "opacity-100"
          )}
        />
        <span
          className={cn(
            "absolute left-0 block h-0.5 w-4 rounded-full bg-current transition-all duration-300",
            open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0.5"
          )}
        />
      </span>
    </button>
  );
}
