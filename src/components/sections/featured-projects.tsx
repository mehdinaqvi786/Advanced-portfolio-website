"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { ProjectCard } from "@/components/projects/project-card";
import { SectionAtmosphere } from "@/components/sections/shared/section-atmosphere";
import { buttonVariants } from "@/components/ui/button";
import { SECTION_IDS } from "@/constants/site";
import { getFeaturedProjects } from "@/data/projects";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { defaultTransition, motionVariants } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function FeaturedProjectsSection() {
  const projects = getFeaturedProjects();
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id={SECTION_IDS.projects}
      aria-labelledby="projects-heading"
      className="relative scroll-mt-28 overflow-hidden py-20 md:scroll-mt-32 md:py-28"
    >
      <SectionAtmosphere />
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            headingId="projects-heading"
            className="mb-0 md:mb-0"
            eyebrow="Featured Projects"
            title="Selected work that shows how I build"
        
          />
          <Link
            href="/projects"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "w-fit shrink-0"
            )}
          >
            View all projects
          </Link>
        </div>

        <motion.ul
          className="mt-10 grid gap-5 md:grid-cols-2"
          variants={motionVariants.staggerContainer}
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {projects.map((project, index) => (
            <motion.li
              key={project.id}
              variants={reduced ? undefined : motionVariants.fadeUp}
              transition={{ ...defaultTransition, delay: index * 0.05 }}
              className={cn(index === 0 && "md:col-span-2")}
            >
              <ProjectCard project={project} />
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
