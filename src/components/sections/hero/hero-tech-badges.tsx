import { Badge } from "@/components/ui/badge";
import { HERO_TECH_STACK } from "@/data/hero";
import { cn } from "@/lib/utils";

type HeroTechBadgesProps = {
  className?: string;
};

export function HeroTechBadges({ className }: HeroTechBadgesProps) {
  return (
    <ul
      className={cn("flex flex-wrap gap-2", className)}
      aria-label="Core tech stack"
    >
      {HERO_TECH_STACK.map((tech) => (
        <li key={tech}>
          <Badge
            variant="outline"
            className="h-7 rounded-full border-border/70 bg-card/50 px-3 text-[0.72rem] backdrop-blur-sm transition-[transform,colors,border-color] duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:text-foreground"
          >
            {tech}
          </Badge>
        </li>
      ))}
    </ul>
  );
}
