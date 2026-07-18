import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

import { SocialIcon } from "@/components/icons/social-icon";
import { TechIcon } from "@/components/projects/tech-icon";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

type ProjectDetailProps = {
  project: Project;
  previous?: Project;
  next?: Project;
};

export function ProjectDetail({ project, previous, next }: ProjectDetailProps) {
  const { github, liveDemo } = project;

  return (
    <article className="space-y-10">
      <header className="relative overflow-hidden rounded-[2rem] border border-border/50 bg-gradient-to-br from-primary/20 via-card/50 to-sky-400/10 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.12)] backdrop-blur-xl sm:p-10">
        <div className="flex flex-wrap items-center gap-2">
          {project.featured ? <Badge>Featured</Badge> : null}
          <Badge variant="secondary" className="capitalize">
            {project.category}
          </Badge>
          {project.status ? (
            <Badge variant="outline" className="capitalize">
              {project.status}
            </Badge>
          ) : null}
        </div>

        <h1 className="font-heading mt-5 text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl">
          {project.title}
        </h1>
        <p className="mt-4 max-w-3xl text-base text-muted-foreground sm:text-lg">
          {project.shortDescription}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {github ? (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "gap-2"
              )}
            >
              <SocialIcon platform="github" />
              GitHub
            </a>
          ) : null}
          {liveDemo ? (
            <a
              href={liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: "lg" }), "gap-2")}
            >
              Live Demo
              <ExternalLink className="size-4" />
            </a>
          ) : null}
          <Link
            href="/projects"
            className={cn(
              buttonVariants({ variant: "ghost", size: "lg" }),
              "gap-2"
            )}
          >
            <ArrowLeft className="size-4" />
            Back to Projects
          </Link>
        </div>
      </header>

      <section aria-labelledby="overview-heading">
        <GlassCard>
          <h2
            id="overview-heading"
            className="font-heading text-2xl font-semibold"
          >
            Project Overview
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {project.fullDescription}
          </p>
        </GlassCard>
      </section>

      <section aria-labelledby="features-heading">
        <GlassCard>
          <h2
            id="features-heading"
            className="font-heading text-2xl font-semibold"
          >
            Features
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {project.features.map((feature) => (
              <li
                key={feature}
                className="flex gap-2.5 rounded-xl border border-border/50 bg-background/35 px-3 py-3 text-sm text-muted-foreground"
              >
                <span
                  aria-hidden
                  className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary"
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </GlassCard>
      </section>

      <section aria-labelledby="stack-heading">
        <GlassCard>
          <h2 id="stack-heading" className="font-heading text-2xl font-semibold">
            Tech Stack
          </h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <li key={tech}>
                <Badge variant="outline" className="gap-1.5 px-3 py-1.5">
                  <TechIcon name={tech} />
                  {tech}
                </Badge>
              </li>
            ))}
          </ul>
        </GlassCard>
      </section>

      <div className="grid gap-5 lg:grid-cols-2">
        <section aria-labelledby="challenges-heading">
          <GlassCard className="h-full">
            <h2
              id="challenges-heading"
              className="font-heading text-2xl font-semibold"
            >
              Challenges
            </h2>
            <ul className="mt-5 space-y-3">
              {project.challenges.map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
                >
                  <span
                    aria-hidden
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-sky-400"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </section>

        <section aria-labelledby="learned-heading">
          <GlassCard className="h-full">
            <h2
              id="learned-heading"
              className="font-heading text-2xl font-semibold"
            >
              What I Learned
            </h2>
            <ul className="mt-5 space-y-3">
              {project.learned.map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
                >
                  <span
                    aria-hidden
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </section>
      </div>

      <nav
        aria-label="Project pagination"
        className="grid gap-3 border-t border-border/50 pt-8 sm:grid-cols-2"
      >
        {previous ? (
          <Link
            href={`/projects/${previous.slug}`}
            className="group rounded-2xl border border-border/60 bg-card/40 p-5 backdrop-blur-sm transition-colors hover:border-primary/35"
          >
            <p className="inline-flex items-center gap-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
              <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
              Previous
            </p>
            <p className="font-heading mt-2 text-lg font-semibold">
              {previous.title}
            </p>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link
            href={`/projects/${next.slug}`}
            className="group rounded-2xl border border-border/60 bg-card/40 p-5 text-right backdrop-blur-sm transition-colors hover:border-primary/35 sm:justify-self-end sm:text-right"
          >
            <p className="inline-flex items-center gap-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Next
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </p>
            <p className="font-heading mt-2 text-lg font-semibold">
              {next.title}
            </p>
          </Link>
        ) : null}
      </nav>
    </article>
  );
}
