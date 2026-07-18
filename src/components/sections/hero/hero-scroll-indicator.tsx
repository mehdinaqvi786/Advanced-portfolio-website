"use client";

import { motion } from "framer-motion";

import { SECTION_IDS } from "@/constants/site";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { sectionHref } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type HeroScrollIndicatorProps = {
  className?: string;
};

export function HeroScrollIndicator({ className }: HeroScrollIndicatorProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <a
      href={sectionHref(SECTION_IDS.projects)}
      className={cn(
        "group absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-xs font-medium tracking-wide text-muted-foreground uppercase transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
      aria-label="Scroll to projects"
    >
      <span>Scroll</span>
      <span className="relative flex h-10 w-6 items-start justify-center rounded-full border border-border/70 bg-background/40 p-1 backdrop-blur-sm">
        <motion.span
          aria-hidden
          className="size-1.5 rounded-full bg-primary"
          animate={reduced ? undefined : { y: [0, 16, 0], opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </span>
    </a>
  );
}
