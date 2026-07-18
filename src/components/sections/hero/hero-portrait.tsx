"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

import { HERO_CONTENT } from "@/data/hero";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

type HeroPortraitProps = {
  className?: string;
};

/**
 * Portrait frame — CSS float on outer, light pointer tilt on inner (no infinite Framer loops).
 */
export function HeroPortrait({ className }: HeroPortraitProps) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 180, damping: 22 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 180, damping: 22 });

  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[22rem] motion-safe:animate-[float-y_6.5s_ease-in-out_infinite] lg:max-w-md",
        className
      )}
    >
      <motion.div
        ref={ref}
        className="relative"
        style={
          reduced ? undefined : { rotateX, rotateY, transformPerspective: 900 }
        }
        onMouseMove={(event) => {
          if (reduced) return;
          if (window.matchMedia("(pointer: coarse)").matches) return;
          const node = ref.current;
          if (!node) return;
          const rect = node.getBoundingClientRect();
          const px = (event.clientX - rect.left) / rect.width;
          const py = (event.clientY - rect.top) / rect.height;
          rotateY.set((px - 0.5) * 6);
          rotateX.set((0.5 - py) * 6);
        }}
        onMouseLeave={() => {
          rotateX.set(0);
          rotateY.set(0);
        }}
      >
        <div
          aria-hidden
          className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-primary/20 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute top-10 -right-4 -z-10 size-28 rounded-full bg-sky-400/25 blur-2xl"
        />

        <div
          aria-hidden
          className="absolute -top-3 -left-3 z-20 rounded-2xl border border-white/15 bg-background/70 px-3 py-2 text-xs font-medium shadow-lg backdrop-blur-xl"
        >
          Available for roles
        </div>
        <div
          aria-hidden
          className="absolute right-[-0.5rem] bottom-16 z-20 rounded-2xl border border-white/15 bg-background/70 px-3 py-2 text-xs font-medium shadow-lg backdrop-blur-xl"
        >
          MERN · Next.js
        </div>

        <div className="rounded-[2rem] bg-gradient-to-br from-primary via-sky-400/80 to-cyan-300/70 p-[1.5px] shadow-[0_20px_60px_color-mix(in_oklab,var(--primary)_25%,transparent)]">
          <div className="relative overflow-hidden rounded-[calc(2rem-1.5px)] border border-white/10 bg-card/40 p-2 backdrop-blur-xl">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.35rem] bg-muted">
              <Image
                src={HERO_CONTENT.profileImage.src}
                alt={HERO_CONTENT.profileImage.alt}
                fill
                priority
                sizes="(max-width: 768px) 80vw, 400px"
                className="object-cover object-top"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-background/35 via-transparent to-white/5"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
