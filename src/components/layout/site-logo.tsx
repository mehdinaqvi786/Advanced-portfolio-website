import Link from "next/link";

import { GradientText } from "@/components/ui/gradient-text";
import { PROFILE } from "@/constants/site";
import { cn } from "@/lib/utils";

type SiteLogoProps = {
  className?: string;
  showFullName?: boolean;
};

/**
 * Brand mark used in Navbar + Footer.
 * Subtle pulse on the accent dot keeps motion quiet but alive.
 */
export function SiteLogo({ className, showFullName = false }: SiteLogoProps) {
  const label = showFullName ? PROFILE.name : PROFILE.firstName;

  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-0.5 font-heading text-lg font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
      aria-label={`${PROFILE.name} — home`}
    >
      <span className="transition-transform duration-300 group-hover:translate-x-0.5">
        {showFullName ? (
          <GradientText className="font-heading font-semibold">
            {label}
          </GradientText>
        ) : (
          label
        )}
      </span>
      {!showFullName ? (
        <span
          aria-hidden
          className="inline-block text-primary transition-transform duration-300 group-hover:scale-125"
        >
          <span className="inline-block animate-logo-dot">.</span>
        </span>
      ) : null}
    </Link>
  );
}
