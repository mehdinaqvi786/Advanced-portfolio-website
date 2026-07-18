"use client";

import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { sectionHref } from "@/lib/navigation";
import { SECTION_IDS } from "@/constants/site";

/**
 * Floating back-to-top control — appears after meaningful scroll depth.
 */
export function ScrollToTop() {
  const { passed } = useScrollPosition(480);
  const reduced = usePrefersReducedMotion();

  const scrollTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <AnimatePresence>
      {passed ? (
        <motion.div
          className="fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6"
          initial={reduced ? false : { opacity: 0, y: 12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduced ? undefined : { opacity: 0, y: 12, scale: 0.96 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <Button
            type="button"
            size="icon"
            variant="outline"
            aria-label="Scroll to top"
            className="size-11 rounded-full border-border/60 bg-background/80 shadow-lg backdrop-blur-xl transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_12px_28px_color-mix(in_oklab,var(--primary)_18%,transparent)]"
            onClick={scrollTop}
          >
            <ArrowUp className="size-4" />
          </Button>
          {/* Deep-link fallback for no-JS contexts */}
          <a href={sectionHref(SECTION_IDS.hero)} className="sr-only">
            Back to top
          </a>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
