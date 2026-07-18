"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { ABOUT_CONTENT } from "@/data/about";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

type AboutPortraitProps = {
  className?: string;
};

export function AboutPortrait({ className }: AboutPortraitProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      className={cn("relative mx-auto w-full max-w-md lg:mx-0", className)}
      initial={reduced ? false : { opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        aria-hidden
        className="absolute -inset-4 -z-10 rounded-[2rem] bg-primary/15 blur-3xl"
      />

      <div className="rounded-[1.75rem] bg-gradient-to-br from-primary via-sky-400/70 to-cyan-300/60 p-[1.5px] shadow-[0_18px_50px_color-mix(in_oklab,var(--primary)_20%,transparent)]">
        <div className="overflow-hidden rounded-[calc(1.75rem-1.5px)] border border-white/10 bg-card/50 p-2 backdrop-blur-xl">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-muted">
            <Image
              src={ABOUT_CONTENT.image.src}
              alt={ABOUT_CONTENT.image.alt}
              fill
              loading="lazy"
              sizes="(max-width: 1024px) 80vw, 380px"
              className="object-cover object-top"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
