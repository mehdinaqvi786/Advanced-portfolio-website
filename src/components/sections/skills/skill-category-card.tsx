import { TechIcon } from "@/components/projects/tech-icon";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/glass-card";
import type { Skill } from "@/types";
import { cn } from "@/lib/utils";

type SkillCategoryCardProps = {
  title: string;
  description: string;
  skills: Skill[];
  className?: string;
};

export function SkillCategoryCard({
  title,
  description,
  skills,
  className,
}: SkillCategoryCardProps) {
  return (
    <div className={cn("hover-lift h-full", className)}>
      <GlassCard variant="story" className="group h-full">
        <div className="mb-4 inline-flex size-11 items-center justify-center rounded-2xl border border-border/60 bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
          <TechIcon name={skills[0]?.name ?? title} className="size-5" />
        </div>
        <h3 className="font-heading text-lg font-semibold tracking-tight">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        <ul
          className="mt-5 flex flex-wrap gap-2"
          aria-label={`${title} technologies`}
        >
          {skills.map((skill) => (
            <li key={skill.name}>
              <Badge
                variant="outline"
                className="gap-1.5 border-border/60 bg-background/35 transition-colors group-hover:border-primary/30"
              >
                <TechIcon name={skill.name} className="size-3" />
                {skill.name}
              </Badge>
            </li>
          ))}
        </ul>
      </GlassCard>
    </div>
  );
}
