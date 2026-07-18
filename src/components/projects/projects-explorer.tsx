"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

import { ProjectCard } from "@/components/projects/project-card";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import {
  PROJECT_CATEGORIES,
  projects,
} from "@/data/projects";
import type { ProjectCategory } from "@/types";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { defaultTransition, motionVariants } from "@/lib/motion";
import { cn } from "@/lib/utils";

type FilterId = ProjectCategory | "all";

export function ProjectsExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<FilterId>("all");
  const reduced = usePrefersReducedMotion();

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return projects
      .filter((project) =>
        category === "all" ? true : project.category === category
      )
      .filter((project) => {
        if (!normalized) return true;
        const haystack = [
          project.title,
          project.shortDescription,
          project.fullDescription,
          ...project.technologies,
          project.category,
        ]
          .join(" ")
          .toLowerCase();
        return haystack.includes(normalized);
      })
      .sort((a, b) => a.priority - b.priority);
  }, [category, query]);

  const featured = filtered.filter((project) => project.featured);
  const other = filtered.filter((project) => !project.featured);

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full max-w-md">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search projects, tech, categories..."
            className="h-11 pl-9"
            aria-label="Search projects"
          />
        </div>

        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter by category"
        >
          {PROJECT_CATEGORIES.map((item) => {
            const active = category === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setCategory(item.id)}
                className={cn(
                  buttonVariants({
                    variant: active ? "default" : "outline",
                    size: "sm",
                  }),
                  "rounded-full"
                )}
                aria-pressed={active}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <p className="text-sm text-muted-foreground" aria-live="polite">
        Showing {filtered.length} project{filtered.length === 1 ? "" : "s"}
        {category !== "all" ? ` in ${category}` : ""}
        {query ? ` matching “${query}”` : ""}.
      </p>

      {featured.length > 0 ? (
        <section aria-labelledby="explorer-featured">
          <h2
            id="explorer-featured"
            className="font-heading mb-5 text-2xl font-semibold"
          >
            Featured Projects
          </h2>
          <motion.ul
            className="grid gap-5 md:grid-cols-2"
            variants={motionVariants.staggerContainer}
            initial={reduced ? false : "hidden"}
            animate="visible"
          >
            {featured.map((project, index) => (
              <motion.li
                key={project.id}
                variants={reduced ? undefined : motionVariants.fadeUp}
                transition={{ ...defaultTransition, delay: index * 0.04 }}
              >
                <ProjectCard project={project} />
              </motion.li>
            ))}
          </motion.ul>
        </section>
      ) : null}

      {other.length > 0 ? (
        <section aria-labelledby="explorer-other">
          <h2
            id="explorer-other"
            className="font-heading mb-5 text-2xl font-semibold"
          >
            Other Projects
          </h2>
          <motion.ul
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            variants={motionVariants.staggerContainer}
            initial={reduced ? false : "hidden"}
            animate="visible"
          >
            {other.map((project, index) => (
              <motion.li
                key={project.id}
                variants={reduced ? undefined : motionVariants.fadeUp}
                transition={{ ...defaultTransition, delay: index * 0.03 }}
              >
                <ProjectCard project={project} compact />
              </motion.li>
            ))}
          </motion.ul>
        </section>
      ) : null}

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-border/60 bg-card/40 p-10 text-center backdrop-blur-sm">
          <p className="font-heading text-lg font-semibold">No projects found</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try another search term or category filter.
          </p>
          <button
            type="button"
            className={cn(buttonVariants({ variant: "outline" }), "mt-5")}
            onClick={() => {
              setQuery("");
              setCategory("all");
            }}
          >
            Reset filters
          </button>
        </div>
      ) : null}
    </div>
  );
}
