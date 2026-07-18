"use client";

import { motion } from "framer-motion";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

type NavLinkProps = {
  href: string;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
  orientation?: "horizontal" | "vertical";
};

/**
 * Shared nav item with smooth layout-animated active indicator.
 */
export function NavLink({
  href,
  label,
  isActive = false,
  onClick,
  className,
  orientation = "horizontal",
}: NavLinkProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <a
      href={href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "group relative font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        orientation === "horizontal"
          ? "rounded-lg px-3 py-2 text-sm"
          : "rounded-xl px-3 py-3 text-base",
        isActive
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground",
        className
      )}
    >
      <span className="relative z-10">{label}</span>

      {orientation === "horizontal" ? (
        <>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-lg bg-primary/0 transition-colors duration-300 group-hover:bg-primary/8"
          />
          {isActive ? (
            reduced ? (
              <span
                aria-hidden
                className="absolute right-3 bottom-1 left-3 h-0.5 rounded-full bg-gradient-to-r from-primary via-sky-400 to-cyan-300"
              />
            ) : (
              <motion.span
                layoutId="nav-active-underline"
                aria-hidden
                className="absolute right-3 bottom-1 left-3 h-0.5 rounded-full bg-gradient-to-r from-primary via-sky-400 to-cyan-300"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )
          ) : (
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-1 left-3 h-0.5 w-0 rounded-full bg-primary/70 transition-all duration-300 group-hover:w-[calc(100%-1.5rem)]"
            />
          )}
        </>
      ) : (
        <>
          {isActive ? (
            reduced ? (
              <span
                aria-hidden
                className="absolute top-1/2 left-0 h-1/2 w-0.5 -translate-y-1/2 rounded-full bg-primary"
              />
            ) : (
              <motion.span
                layoutId="nav-active-rail"
                aria-hidden
                className="absolute top-1/2 left-0 h-1/2 w-0.5 -translate-y-1/2 rounded-full bg-primary"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )
          ) : (
            <span
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-0 h-0 w-0.5 -translate-y-1/2 rounded-full bg-primary transition-all duration-300 group-hover:h-1/2"
            />
          )}
        </>
      )}
    </a>
  );
}
