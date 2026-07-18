import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";

type HighlightCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
};

/**
 * Glass highlight tile — CSS hover lift (no Framer per card).
 */
export function HighlightCard({
  title,
  description,
  icon,
  className,
}: HighlightCardProps) {
  return (
    <div className={cn("hover-lift h-full", className)}>
      <GlassCard variant="story" className="group h-full">
        <div className="mb-4 inline-flex size-11 items-center justify-center rounded-2xl border border-border/60 bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>
        <h3 className="font-heading text-base font-semibold tracking-tight sm:text-lg">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </GlassCard>
    </div>
  );
}
