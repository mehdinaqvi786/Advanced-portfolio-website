"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
import { motion } from "framer-motion";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * Subtle footer entry to /login — low visual weight for regular visitors.
 */
export function FooterAdminAccess({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion();

  return (
    <TooltipProvider delay={180}>
      <Tooltip>
        <TooltipTrigger
          render={
            <Link
              href="/login"
              aria-label="Admin Login"
              className={cn(
                "inline-flex size-8 items-center justify-center rounded-lg",
                "text-muted-foreground/35 opacity-70",
                "transition-[color,opacity,box-shadow,background-color] duration-300",
                "hover:bg-muted/35 hover:text-muted-foreground/85 hover:opacity-100",
                "hover:shadow-[0_0_14px_color-mix(in_oklab,var(--primary)_16%,transparent)]",
                "focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none",
                "cursor-pointer",
                className
              )}
            />
          }
        >
          <motion.span
            className="inline-flex"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            whileHover={reduced ? undefined : { scale: 1.08 }}
            whileTap={reduced ? undefined : { scale: 0.96 }}
          >
            <Lock className="size-4" strokeWidth={1.75} aria-hidden />
          </motion.span>
        </TooltipTrigger>
        <TooltipContent side="top" sideOffset={8}>
          Admin Login
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
