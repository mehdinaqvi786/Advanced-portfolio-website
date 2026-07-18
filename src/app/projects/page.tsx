import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { SectionAtmosphere } from "@/components/sections/shared/section-atmosphere";
import { ProjectsExplorer } from "@/components/projects/projects-explorer";
import { SITE_CONFIG } from "@/constants/site";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Featured and other projects by Hashim Qureshi — filterable, searchable case studies across web, mobile, and AI.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: `Projects | ${SITE_CONFIG.name}`,
    description:
      "Browse featured and experimental projects with tech filters and case study pages.",
    url: `${SITE_CONFIG.url}/projects`,
  },
};

export default function ProjectsPage() {
  return (
    <main id="main-content" className="relative overflow-hidden pt-28 pb-20">
      <SectionAtmosphere />
      <Container>
        <header className="mb-10 max-w-2xl">
          <p className="mb-3 text-sm font-medium tracking-wide text-primary uppercase">
            Projects
          </p>
          <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            All work, filterable and searchable
          </h1>
          <p className="mt-4 text-muted-foreground sm:text-lg">
            Explore featured products and supporting experiments. Every card
            opens a dedicated case study page.
          </p>
        </header>
        <ProjectsExplorer />
      </Container>
    </main>
  );
}
