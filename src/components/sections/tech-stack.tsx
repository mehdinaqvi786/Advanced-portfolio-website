"use client";

import { motion } from "framer-motion";

import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { TechIcon } from "@/components/projects/tech-icon";
import { SectionAtmosphere } from "@/components/sections/shared/section-atmosphere";
import { GlassCard } from "@/components/ui/glass-card";
import { SECTION_IDS } from "@/constants/site";
import { TECH_STACK } from "@/data/tech-stack";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { defaultTransition, motionVariants } from "@/lib/motion";

export function TechStackSection() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id={SECTION_IDS.techStack}
      aria-labelledby="tech-stack-heading"
      className="relative scroll-mt-28 overflow-hidden py-20 md:scroll-mt-32 md:py-28"
    >
      <SectionAtmosphere />
      <Container>
        <div>
          <SectionHeading
            headingId="tech-stack-heading"
            eyebrow="Tech Stack"
            title="Tools I use to ship"
            description="An interactive grid of technologies behind the products in this portfolio."
          />
        </div>

        <motion.ul
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          variants={motionVariants.staggerContainer}
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {TECH_STACK.map((tech) => (
            <motion.li
              key={tech.name}
              variants={reduced ? undefined : motionVariants.fadeUp}
              transition={defaultTransition}
              className="hover-lift"
            >
              <GlassCard variant="interactive" className="group h-full">
                <div className="flex items-start gap-3">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl border border-border/60 bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <TechIcon name={tech.name} className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-heading text-base font-semibold tracking-tight">
                      {tech.name}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {tech.description}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
