"use client";

import { motion } from "framer-motion";

import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { HighlightCard } from "@/components/sections/shared/highlight-card";
import { SectionAtmosphere } from "@/components/sections/shared/section-atmosphere";
import {
  StoryIcon,
  type StoryIconName,
} from "@/components/sections/shared/story-icon";
import { SECTION_IDS } from "@/constants/site";
import { JOURNEY_MILESTONES } from "@/data/journey";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { defaultTransition, motionVariants } from "@/lib/motion";

export function JourneySection() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id={SECTION_IDS.journey}
      aria-labelledby="journey-heading"
      className="relative scroll-mt-28 overflow-hidden py-20 md:scroll-mt-32 md:py-28"
    >
      <SectionAtmosphere />
      <Container>
        <div>
          <SectionHeading
            headingId="journey-heading"
            eyebrow="My Journey"
            title="Milestones that shaped the path"
            description="From first principles to professional delivery — four moments that define the story so far."
          />
        </div>

        <motion.ol
          className="grid gap-4 sm:grid-cols-2"
          variants={motionVariants.staggerContainer}
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {JOURNEY_MILESTONES.map((milestone, index) => (
            <motion.li
              key={milestone.id}
              variants={reduced ? undefined : motionVariants.fadeUp}
              transition={{ ...defaultTransition, delay: index * 0.06 }}
            >
              <span className="mb-3 inline-flex rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                {milestone.year}
              </span>
              <HighlightCard
                title={milestone.title}
                description={milestone.description}
                icon={<StoryIcon name={milestone.icon as StoryIconName} />}
              />
            </motion.li>
          ))}
        </motion.ol>
      </Container>
    </section>
  );
}
