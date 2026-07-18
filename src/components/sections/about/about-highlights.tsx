"use client";

import { motion } from "framer-motion";

import { HighlightCard } from "@/components/sections/shared/highlight-card";
import {
  StoryIcon,
  type StoryIconName,
} from "@/components/sections/shared/story-icon";
import { ABOUT_HIGHLIGHTS } from "@/data/about";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { defaultTransition, motionVariants } from "@/lib/motion";

export function AboutHighlights() {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.ul
      className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      variants={motionVariants.staggerContainer}
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      aria-label="About highlights"
    >
      {ABOUT_HIGHLIGHTS.map((item) => (
        <motion.li
          key={item.id}
          variants={reduced ? undefined : motionVariants.fadeUp}
          transition={defaultTransition}
        >
          <HighlightCard
            title={item.title}
            description={item.description}
            icon={<StoryIcon name={item.icon as StoryIconName} />}
          />
        </motion.li>
      ))}
    </motion.ul>
  );
}
