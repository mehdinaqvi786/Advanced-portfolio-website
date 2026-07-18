import { cn } from "@/lib/utils";

type GradientTextProps = React.HTMLAttributes<HTMLSpanElement> & {
  as?: "span" | "h1" | "h2" | "h3" | "p";
};

/**
 * Brand gradient text for logos and premium headings.
 * Placement: components/ui — pure presentational, theme-token driven.
 */
export function GradientText({
  as: Comp = "span",
  className,
  children,
  ...props
}: GradientTextProps) {
  return (
    <Comp
      className={cn(
        "bg-gradient-to-r from-primary via-sky-400 to-cyan-300 bg-clip-text text-transparent",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
