import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { ProjectDetail } from "@/components/projects/project-detail";
import { SectionAtmosphere } from "@/components/sections/shared/section-atmosphere";
import { SITE_CONFIG } from "@/constants/site";
import {
  getAdjacentProjects,
  getAllProjectSlugs,
  getProjectBySlug,
} from "@/data/projects";
import { projectJsonLd } from "@/lib/seo";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: project.title,
    description: project.shortDescription,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} | ${SITE_CONFIG.name}`,
      description: project.shortDescription,
      url: `${SITE_CONFIG.url}/projects/${project.slug}`,
      images: [
        {
          url: "/images/profile/hashim-qureshi.png",
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | ${SITE_CONFIG.name}`,
      description: project.shortDescription,
      images: ["/images/profile/hashim-qureshi.png"],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { previous, next } = getAdjacentProjects(slug);
  const jsonLd = projectJsonLd(project);

  return (
    <main id="main-content" className="relative overflow-hidden pt-28 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SectionAtmosphere />
      <Container>
        <ProjectDetail project={project} previous={previous} next={next} />
      </Container>
    </main>
  );
}
