import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

const glassCardVariants = cva(
  "rounded-2xl border shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-[border-color,box-shadow,background-color] duration-500",
  {
    variants: {
      variant: {
        plain:
          "border-white/10 bg-white/5 p-6 dark:border-white/10 dark:bg-white/[0.04]",
        story:
          "border-border/50 bg-card/40 p-6 hover:border-primary/35 hover:shadow-[0_16px_40px_color-mix(in_oklab,var(--primary)_10%,transparent)]",
        interactive:
          "border-border/50 bg-card/40 p-6 hover:border-primary/40 hover:shadow-[0_0_0_1px_color-mix(in_oklab,var(--primary)_25%,transparent),0_18px_44px_color-mix(in_oklab,var(--primary)_12%,transparent)]",
      },
    },
    defaultVariants: {
      variant: "plain",
    },
  }
);

type GlassCardProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof glassCardVariants>;

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  function GlassCard({ className, children, variant = "plain", ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn(glassCardVariants({ variant }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

export { glassCardVariants };
