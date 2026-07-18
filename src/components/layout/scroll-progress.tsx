"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * Top-edge reading progress — motion values only (cheap).
 */
export function ScrollProgress() {
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 32,
    mass: 0.18,
  });
  const scaleX = useTransform(reduced ? scrollYProgress : smooth, [0, 1], [0, 1]);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 overflow-hidden bg-transparent"
      aria-hidden
    >
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-primary via-sky-400 to-cyan-300"
        style={{ scaleX }}
      />
    </div>
  );
}
