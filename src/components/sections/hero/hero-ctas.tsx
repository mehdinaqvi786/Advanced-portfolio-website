"use client";

import { ArrowRight, Download, Mail } from "lucide-react";

import { Magnetic } from "@/components/motion/magnetic";
import { buttonVariants } from "@/components/ui/button";
import { SECTION_IDS } from "@/constants/site";
import { HERO_CONTENT } from "@/data/hero";
import { sectionHref } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type HeroCtasProps = {
  className?: string;
};

export function HeroCtas({ className }: HeroCtasProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center",
        className
      )}
    >
      <Magnetic strength={0.22} className="w-full sm:w-auto">
        <a
          href={sectionHref(SECTION_IDS.projects)}
          className={cn(
            buttonVariants({ size: "lg" }),
            "h-11 w-full gap-2 rounded-xl px-5 shadow-[0_10px_28px_color-mix(in_oklab,var(--primary)_30%,transparent)] transition-[transform,box-shadow] duration-300 hover:scale-[1.02] hover:shadow-[0_14px_36px_color-mix(in_oklab,var(--primary)_38%,transparent)] active:scale-[0.98] sm:w-auto"
          )}
        >
          View My Projects
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
        </a>
      </Magnetic>

      <Magnetic strength={0.18} className="w-full sm:w-auto">
        <a
          href={sectionHref(SECTION_IDS.contact)}
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "h-11 w-full gap-2 rounded-xl px-5 transition-[transform,background-color,border-color] duration-300 hover:scale-[1.02] hover:border-primary/40 active:scale-[0.98] sm:w-auto"
          )}
        >
          <Mail className="size-4" aria-hidden />
          Contact Me
        </a>
      </Magnetic>

      <a
        href={HERO_CONTENT.resumeHref}
        download
        className={cn(
          buttonVariants({ variant: "ghost", size: "lg" }),
          "h-11 w-full justify-center gap-2 rounded-xl px-4 text-muted-foreground transition-colors hover:text-foreground sm:w-auto sm:justify-start"
        )}
      >
        <Download className="size-4" aria-hidden />
        Download Resume
      </a>
    </div>
  );
}
