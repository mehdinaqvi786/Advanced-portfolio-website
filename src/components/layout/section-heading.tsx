"use client";

import { GradientText } from "@/components/ui/gradient-text";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  gradientTitle?: boolean;
  /** Applied to the h2 for aria-labelledby targets */
  headingId?: string;
};

/**
 * Consistent section intro block used across all page sections.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  gradientTitle = false,
  headingId,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "mb-10 max-w-2xl md:mb-14",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? (
        <p className="mb-3 text-sm font-medium tracking-[0.14em] text-primary uppercase">
          {eyebrow}
        </p>
      ) : null}

      <h2
        id={headingId}
        className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
      >
        {gradientTitle ? <GradientText as="span">{title}</GradientText> : title}
      </h2>

      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
