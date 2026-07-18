"use client";

import { motion } from "framer-motion";

import { GlassCard } from "@/components/ui/glass-card";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { defaultTransition, motionVariants } from "@/lib/motion";
import { cn } from "@/lib/utils";

type TimelineItemProps = {
  title: string;
  subtitle: string;
  period: string;
  children?: React.ReactNode;
  index?: number;
  className?: string;
  isLast?: boolean;
};

/**
 * Reusable vertical timeline row for Experience and Education.
 */
export function TimelineItem({
  title,
  subtitle,
  period,
  children,
  index = 0,
  className,
  isLast = false,
}: TimelineItemProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.li
      className={cn("relative pl-10 md:pl-12", className)}
      variants={reduced ? undefined : motionVariants.fadeUp}
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      transition={{ ...defaultTransition, delay: index * 0.08 }}
    >
      <span
        aria-hidden
        className="absolute top-7 left-[0.4rem] z-10 size-3 rounded-full bg-primary shadow-[0_0_0_6px_color-mix(in_oklab,var(--primary)_18%,transparent)] md:left-[0.55rem] md:size-3.5"
      />
      {!isLast ? (
        <span
          aria-hidden
          className="absolute top-10 bottom-[-1.5rem] left-[0.7rem] w-px bg-gradient-to-b from-primary/50 via-border to-transparent md:left-[0.9rem]"
        />
      ) : null}

      <GlassCard variant="story">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="font-heading text-xl font-semibold tracking-tight">
              {title}
            </h3>
            <p className="mt-1 text-muted-foreground">{subtitle}</p>
          </div>
          <p className="rounded-full border border-border/60 bg-background/50 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm">
            <time>{period}</time>
          </p>
        </div>
        {children ? <div className="mt-5">{children}</div> : null}
      </GlassCard>
    </motion.li>
  );
}
