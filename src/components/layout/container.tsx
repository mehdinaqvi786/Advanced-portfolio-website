import { cn } from "@/lib/utils";

const sizeMap = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "max-w-none",
} as const;

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  as?: "div" | "section" | "main" | "header" | "footer";
  size?: keyof typeof sizeMap;
};

/**
 * Global horizontal rhythm + max-width system.
 * All major layout chrome (navbar, footer, sections) should compose this.
 */
export function Container({
  as: Comp = "div",
  size = "lg",
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Comp
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        sizeMap[size],
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
