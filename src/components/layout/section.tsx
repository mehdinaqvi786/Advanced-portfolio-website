import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  id: string;
  contained?: boolean;
  containerSize?: "sm" | "md" | "lg" | "xl" | "full";
};

/**
 * Semantic section wrapper with scroll margin for sticky/floating nav offset.
 */
export function Section({
  id,
  className,
  children,
  contained = true,
  containerSize = "lg",
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("relative scroll-mt-28 py-20 md:scroll-mt-32 md:py-28", className)}
      {...props}
    >
      {contained ? (
        <Container size={containerSize}>{children}</Container>
      ) : (
        children
      )}
    </section>
  );
}
