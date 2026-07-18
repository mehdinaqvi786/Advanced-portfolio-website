"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

type MagneticProps = {
  children: React.ReactNode;
  className?: string;
  strength?: number;
};

/**
 * Desktop magnetic hover wrapper for CTAs.
 * Disabled on reduced-motion and coarse pointers (touch).
 */
export function Magnetic({
  children,
  className,
  strength = 0.28,
}: MagneticProps) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={cn("inline-flex", className)}
      style={{ x: springX, y: springY }}
      onMouseEnter={() => {
        rectRef.current = ref.current?.getBoundingClientRect() ?? null;
      }}
      onMouseMove={(event) => {
        const rect = rectRef.current;
        if (!rect) return;
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const offsetX = event.clientX - rect.left - rect.width / 2;
        const offsetY = event.clientY - rect.top - rect.height / 2;
        x.set(offsetX * strength);
        y.set(offsetY * strength);
      }}
      onMouseLeave={() => {
        rectRef.current = null;
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
