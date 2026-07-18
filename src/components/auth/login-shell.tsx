"use client";

import { motion } from "framer-motion";

import { ThemeToggle } from "@/components/layout/theme-toggle";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { SITE_CONFIG } from "@/constants/site";

type LoginShellProps = {
  children: React.ReactNode;
};

/**
 * Premium auth atmosphere aligned with portfolio tokens (teal / slate).
 */
export function LoginShell({ children }: LoginShellProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden px-4 py-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,color-mix(in_oklab,var(--primary)_16%,transparent),transparent_50%),radial-gradient(ellipse_at_bottom_right,color-mix(in_oklab,var(--accent)_22%,transparent),transparent_45%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:linear-gradient(to_right,color-mix(in_oklab,var(--foreground)_8%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--foreground)_8%,transparent)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-[10%] size-[22rem] rounded-full bg-primary/20 blur-3xl motion-safe:animate-aurora"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-4rem] bottom-[10%] size-[18rem] rounded-full bg-sky-400/15 blur-3xl motion-safe:animate-aurora-delayed"
      />

      <div className="absolute top-4 right-4 z-20 sm:top-6 sm:right-6">
        <ThemeToggle />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-md"
        initial={reduced ? false : { opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="rounded-[1.75rem] border border-border/50 bg-card/55 p-6 shadow-[0_24px_80px_color-mix(in_oklab,black_14%,transparent)] backdrop-blur-xl sm:p-8">
          <div className="mb-8 text-center">
            <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
              {SITE_CONFIG.name}
            </p>
            <h1 className="font-heading mt-3 text-3xl font-semibold tracking-tight text-balance">
              Admin Sign In
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Secure access for the portfolio control panel.
            </p>
          </div>
          {children}
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Authorized administrators only. No public registration.
        </p>
      </motion.div>
    </div>
  );
}
