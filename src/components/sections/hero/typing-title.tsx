"use client";

import { useEffect, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

type TypingTitleProps = {
  titles: readonly string[];
  className?: string;
  typingMs?: number;
  pauseMs?: number;
};

/**
 * Elegant title rotator — typing only for the professional title line.
 * Falls back to a static first title when reduced motion is preferred.
 */
export function TypingTitle({
  titles,
  className,
  typingMs = 48,
  pauseMs = 1800,
}: TypingTitleProps) {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(titles[0] ?? "");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced || titles.length === 0) return;

    const current = titles[index] ?? "";

    if (!deleting && text === current) {
      const pause = window.setTimeout(() => setDeleting(true), pauseMs);
      return () => window.clearTimeout(pause);
    }

    if (deleting && text === "") {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % titles.length);
      return;
    }

    const timeout = window.setTimeout(
      () => {
        const next = deleting
          ? current.slice(0, Math.max(0, text.length - 1))
          : current.slice(0, text.length + 1);
        setText(next);
      },
      deleting ? typingMs / 1.6 : typingMs
    );

    return () => window.clearTimeout(timeout);
  }, [deleting, index, pauseMs, reduced, text, titles, typingMs]);

  if (reduced) {
    return (
      <p
        className={cn(
          "font-heading text-xl font-medium text-primary sm:text-2xl",
          className
        )}
      >
        {titles[0]}
      </p>
    );
  }

  return (
    <p
      className={cn(
        "font-heading text-xl font-medium text-primary sm:text-2xl",
        className
      )}
      aria-live="polite"
      aria-atomic="true"
    >
      <span>{text}</span>
      <span
        aria-hidden
        className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[0.12em] bg-primary align-middle animate-pulse"
      />
    </p>
  );
}
