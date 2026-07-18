"use client";

import { motion } from "framer-motion";

import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { ProjectCard } from "@/components/projects/project-card";
import { SectionAtmosphere } from "@/components/sections/shared/section-atmosphere";
import { SECTION_IDS } from "@/constants/site";
import { getOtherProjects } from "@/data/projects";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { defaultTransition, motionVariants } from "@/lib/motion";

export function OtherProjectsSection() {
  const projects = getOtherProjects();
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id={SECTION_IDS.otherProjects}
      aria-labelledby="other-projects-heading"
      className="relative scroll-mt-28 overflow-hidden py-16 md:scroll-mt-32 md:py-24"
    >
      {/* <SectionAtmosphere /> */}
      <Container>
        {/* <div>
          <SectionHeading
            headingId="other-projects-heading"
            eyebrow="Other Projects"
            title="More builds and experiments"
            description="Additional product explorations — each card opens a dedicated project page."
          />
        </div> */}

        <motion.ul
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={motionVariants.staggerContainer}
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {projects.map((project, index) => (
            <motion.li
              key={project.id}
              variants={reduced ? undefined : motionVariants.fadeUp}
              transition={{ ...defaultTransition, delay: index * 0.04 }}
            >
              <ProjectCard project={project} compact />
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
