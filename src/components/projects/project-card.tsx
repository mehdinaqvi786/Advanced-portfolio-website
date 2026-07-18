"use client";

import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { useRef } from "react";

import { SocialIcon } from "@/components/icons/social-icon";
import { TechIcon } from "@/components/projects/tech-icon";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import type { Project } from "@/types";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  className?: string;
  compact?: boolean;
};

/**
 * Image-free project card — CSS hover lift + optional pointer glow (no Framer).
 */
export function ProjectCard({
  project,
  className,
  compact = false,
}: ProjectCardProps) {
  const reduced = usePrefersReducedMotion();
  const { technologies, github, liveDemo } = project;
  const cardRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);

  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const node = cardRef.current;
    const rect = rectRef.current;
    if (!node || !rect) return;
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    node.style.setProperty("--x", `${x}%`);
    node.style.setProperty("--y", `${y}%`);
  };

  return (
    <article className={cn("hover-lift h-full", className)}>
      <GlassCard
        ref={cardRef}
        onMouseEnter={() => {
          rectRef.current = cardRef.current?.getBoundingClientRect() ?? null;
        }}
        onMouseLeave={() => {
          rectRef.current = null;
        }}
        onMouseMove={onMove}
        className={cn(
          "group relative h-full overflow-hidden border-border/50 bg-card/40 p-0 transition-[border-color,box-shadow] duration-500 hover:border-primary/45 hover:shadow-[0_20px_50px_color-mix(in_oklab,var(--primary)_16%,transparent)]",
          "before:pointer-events-none before:absolute before:inset-0 before:z-[1] before:rounded-[inherit] before:opacity-0 before:transition-opacity before:duration-500",
          "before:bg-[radial-gradient(520px_circle_at_var(--x,50%)_var(--y,20%),color-mix(in_oklab,var(--primary)_22%,transparent),transparent_55%)]",
          "hover:before:opacity-100"
        )}
      >
        <Link
          href={`/projects/${project.slug}`}
          className="absolute inset-0 z-0 rounded-[inherit] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={`View details for ${project.title}`}
        />

        <div
          className={cn(
            "relative z-10 pointer-events-none",
            compact ? "p-5" : "p-6"
          )}
        >
          <div
            className={cn(
              "relative mb-5 overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-primary/25 via-sky-400/10 to-transparent",
              compact ? "h-24" : "h-32 sm:h-36"
            )}
            aria-hidden
          >
            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-40 motion-safe:group-hover:animate-shimmer" />
            <div className="relative flex h-full items-end justify-between p-4">
              <span className="rounded-full border border-white/15 bg-background/55 px-2.5 py-1 text-[0.65rem] font-medium tracking-wide text-muted-foreground uppercase backdrop-blur-md">
                {project.category}
              </span>
              {project.featured ? (
                <Badge className="pointer-events-none shadow-sm">Featured</Badge>
              ) : null}
            </div>
          </div>

          <div className="flex flex-wrap items-start justify-between gap-3">
            <h3 className="font-heading text-xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-primary">
              {project.title}
            </h3>
            {project.status ? (
              <Badge variant="secondary" className="capitalize">
                {project.status}
              </Badge>
            ) : null}
          </div>

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {project.shortDescription}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {technologies.slice(0, compact ? 3 : 5).map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="gap-1.5 border-border/60 bg-background/30 transition-colors duration-300 group-hover:border-primary/30"
              >
                <TechIcon name={tech} className="size-3" />
                {tech}
              </Badge>
            ))}
          </div>

          <div className="pointer-events-auto mt-6 flex flex-wrap gap-2">
            {github ? (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "gap-1.5 transition-transform duration-300 hover:-translate-y-0.5"
                )}
                onClick={(event) => event.stopPropagation()}
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
                className={cn(
                  buttonVariants({ size: "sm" }),
                  "gap-1.5 transition-transform duration-300 hover:-translate-y-0.5"
                )}
                onClick={(event) => event.stopPropagation()}
              >
                Live Demo
                <ExternalLink className="size-3.5" />
              </a>
            ) : null}

            <Link
              href={`/projects/${project.slug}`}
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "gap-1.5 transition-transform duration-300 hover:-translate-y-0.5"
              )}
            >
              View Details
              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </GlassCard>
    </article>
  );
}
