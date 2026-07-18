"use client";

import { SocialIcon } from "@/components/icons/social-icon";
import { SOCIAL_LINKS } from "@/constants/site";
import { cn } from "@/lib/utils";

type HeroSocialsProps = {
  className?: string;
};

/**
 * Hero social row — CSS hover only (no Framer per icon).
 */
export function HeroSocials({ className }: HeroSocialsProps) {
  return (
    <ul
      className={cn("flex items-center gap-2.5", className)}
      aria-label="Social profiles"
    >
      {SOCIAL_LINKS.map((link) => (
        <li key={link.platform}>
          <a
            href={link.href}
            target={link.platform === "email" ? undefined : "_blank"}
            rel={
              link.platform === "email" ? undefined : "noopener noreferrer"
            }
            aria-label={link.label}
            className="group inline-flex size-11 items-center justify-center rounded-2xl border border-border/60 bg-card/45 text-muted-foreground shadow-sm backdrop-blur-md transition-[transform,colors,border-color,background-color] duration-300 hover:-translate-y-1 hover:scale-105 hover:border-primary/45 hover:bg-primary/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95"
          >
            <SocialIcon
              platform={link.platform}
              className="transition-transform duration-300 group-hover:scale-110"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
