import { SOCIAL_LINKS } from "@/constants/site";
import { SocialIcon } from "@/components/icons/social-icon";
import { cn } from "@/lib/utils";

type SocialLinksProps = {
  className?: string;
  iconClassName?: string;
  size?: "sm" | "md";
};

/**
 * Reusable social icon row for navbar drawer, hero, and footer.
 */
export function SocialLinks({
  className,
  iconClassName,
  size = "md",
}: SocialLinksProps) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {SOCIAL_LINKS.map((link) => (
        <li key={link.platform}>
          <a
            href={link.href}
            target={link.platform === "email" ? undefined : "_blank"}
            rel={link.platform === "email" ? undefined : "noopener noreferrer"}
            aria-label={link.label}
            className={cn(
              "inline-flex items-center justify-center rounded-xl border border-border/60 bg-card/40 text-muted-foreground backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              size === "sm" ? "size-9" : "size-10",
              iconClassName
            )}
          >
            <SocialIcon platform={link.platform} />
          </a>
        </li>
      ))}
    </ul>
  );
}
