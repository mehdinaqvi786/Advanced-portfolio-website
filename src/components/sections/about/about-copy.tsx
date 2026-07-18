"use client";

import { motion } from "framer-motion";

import { ABOUT_CONTENT } from "@/data/about";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { defaultTransition, motionVariants } from "@/lib/motion";

export function AboutCopy() {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      variants={motionVariants.staggerContainer}
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      <motion.p
        variants={motionVariants.fadeUp}
        transition={defaultTransition}
        className="mb-3 text-sm font-medium tracking-[0.16em] text-primary uppercase"
      >
        {ABOUT_CONTENT.eyebrow}
      </motion.p>

      <motion.h2
        id="about-heading"
        variants={motionVariants.fadeUp}
        transition={defaultTransition}
        className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
      >
        {ABOUT_CONTENT.heading}
      </motion.h2>

      <div className="mt-6 space-y-4">
        {ABOUT_CONTENT.introduction.map((paragraph) => (
          <motion.p
            key={paragraph}
            variants={motionVariants.fadeUp}
            transition={defaultTransition}
            className="text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {paragraph}
          </motion.p>
        ))}
      </div>
    </motion.div>
  );
}
