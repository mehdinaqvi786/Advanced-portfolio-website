"use client";

import {
  CheckCircle2,
  CircleDot,
  Inbox,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

const ICONS = {
  inbox: Inbox,
  pending: CircleDot,
  completed: CheckCircle2,
  resolved: Sparkles,
} as const satisfies Record<string, LucideIcon>;

export type StatsCardIcon = keyof typeof ICONS;

type StatsCardProps = {
  label: string;
  value: number;
  description: string;
  icon: StatsCardIcon;
  accentClassName?: string;
  delay?: number;
};

export function StatsCard({
  label,
  value,
  description,
  icon,
  accentClassName,
  delay = 0,
}: StatsCardProps) {
  const reduced = usePrefersReducedMotion();
  const Icon = ICONS[icon];

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
      whileHover={reduced ? undefined : { y: -4 }}
      className="group rounded-2xl border border-border/50 bg-card/50 p-5 shadow-[0_12px_40px_color-mix(in_oklab,black_8%,transparent)] backdrop-blur-xl transition-[border-color,box-shadow] duration-300 hover:border-primary/35 hover:shadow-[0_18px_44px_color-mix(in_oklab,var(--primary)_12%,transparent)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium tracking-[0.12em] text-muted-foreground uppercase">
            {label}
          </p>
          <p className="font-heading mt-3 text-3xl font-semibold tracking-tight tabular-nums">
            {value}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        </div>
        <span
          className={cn(
            "inline-flex size-11 items-center justify-center rounded-2xl border border-border/50 bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110",
            accentClassName
          )}
        >
          <Icon className="size-5" aria-hidden />
        </span>
      </div>
    </motion.article>
  );
}
