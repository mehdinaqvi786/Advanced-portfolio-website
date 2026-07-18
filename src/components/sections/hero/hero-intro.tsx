"use client";

import { motion } from "framer-motion";

import { HeroCtas } from "@/components/sections/hero/hero-ctas";
import { HeroSocials } from "@/components/sections/hero/hero-socials";
import { HeroTechBadges } from "@/components/sections/hero/hero-tech-badges";
import { TypingTitle } from "@/components/sections/hero/typing-title";
import { GradientText } from "@/components/ui/gradient-text";
import { HERO_CONTENT } from "@/data/hero";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { defaultTransition, motionVariants } from "@/lib/motion";
import { cn } from "@/lib/utils";

type HeroIntroProps = {
  className?: string;
};

export function HeroIntro({ className }: HeroIntroProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      className={cn("relative z-10", className)}
      variants={motionVariants.staggerContainer}
      initial={reduced ? false : "hidden"}
      animate="visible"
    >
      <motion.p
        variants={motionVariants.fadeUp}
        transition={defaultTransition}
        className="mb-3 text-sm font-medium tracking-[0.18em] text-muted-foreground uppercase"
      >
        {HERO_CONTENT.greeting}
      </motion.p>

      <motion.h1
        id="hero-heading"
        variants={motionVariants.fadeUp}
        transition={{ ...defaultTransition, delay: 0.05 }}
        className="font-heading text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl xl:text-7xl"
      >
        <GradientText as="span">{HERO_CONTENT.name}</GradientText>
      </motion.h1>

      <motion.div
        variants={motionVariants.fadeUp}
        transition={{ ...defaultTransition, delay: 0.1 }}
        className="mt-4"
      >
        <TypingTitle titles={HERO_CONTENT.titles} />
      </motion.div>

      <motion.p
        variants={motionVariants.fadeUp}
        transition={{ ...defaultTransition, delay: 0.14 }}
        className="mt-5 max-w-xl text-base font-medium text-foreground/90 sm:text-lg"
      >
        {HERO_CONTENT.tagline}
      </motion.p>

      <motion.p
        variants={motionVariants.fadeUp}
        transition={{ ...defaultTransition, delay: 0.18 }}
        className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base"
      >
        {HERO_CONTENT.description}
      </motion.p>

      <motion.div
        variants={motionVariants.fadeUp}
        transition={{ ...defaultTransition, delay: 0.22 }}
        className="mt-8"
      >
        <HeroCtas />
      </motion.div>

      <motion.div
        variants={motionVariants.fadeUp}
        transition={{ ...defaultTransition, delay: 0.26 }}
        className="mt-7"
      >
        <HeroSocials />
      </motion.div>

      <motion.div
        variants={motionVariants.fadeUp}
        transition={{ ...defaultTransition, delay: 0.3 }}
        className="mt-8"
      >
        <HeroTechBadges />
      </motion.div>
    </motion.div>
  );
}
