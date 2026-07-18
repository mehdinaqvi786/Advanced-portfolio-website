"use client";

import { motion } from "framer-motion";

import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { SectionAtmosphere } from "@/components/sections/shared/section-atmosphere";
import { SkillCategoryCard } from "@/components/sections/skills/skill-category-card";
import { SECTION_IDS } from "@/constants/site";
import { getSkillsByCategory, skillCategories } from "@/data/skills";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { defaultTransition, motionVariants } from "@/lib/motion";

export function SkillsSection() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id={SECTION_IDS.skills}
      aria-labelledby="skills-heading"
      className="relative scroll-mt-28 overflow-hidden py-20 md:scroll-mt-32 md:py-28"
    >
      <SectionAtmosphere />
      <Container>
        <div>
          <SectionHeading
            headingId="skills-heading"
            eyebrow="Skills"
            title="Capabilities by discipline"
            description="Categorized strengths across frontend, backend, data, mobile, and tooling — mapped to real shipping work."
          />
        </div>

        <motion.ul
          className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
          variants={motionVariants.staggerContainer}
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
        >
          {skillCategories.map((category, index) => (
            <motion.li
              key={category.id}
              variants={reduced ? undefined : motionVariants.fadeUp}
              transition={{ ...defaultTransition, delay: index * 0.05 }}
            >
              <SkillCategoryCard
                title={category.label}
                description={category.description}
                skills={getSkillsByCategory(category.id)}
              />
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
