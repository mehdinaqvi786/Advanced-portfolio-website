import { cn } from "@/lib/utils";

type HeroBackgroundProps = {
  className?: string;
};

/**
 * Hero atmosphere via CSS only — no mousemove listeners or Framer loops.
 */
export function HeroBackground({ className }: HeroBackgroundProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,color-mix(in_oklab,var(--primary)_14%,transparent),transparent_50%),radial-gradient(ellipse_at_bottom_right,color-mix(in_oklab,var(--accent)_20%,transparent),transparent_45%)]" />

      <div className="absolute inset-0 opacity-[0.22] [background-image:linear-gradient(to_right,color-mix(in_oklab,var(--foreground)_8%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--foreground)_8%,transparent)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_78%)]" />

      <div className="absolute -top-24 left-[12%] size-[22rem] rounded-full bg-primary/20 blur-3xl motion-safe:animate-aurora" />
      <div className="absolute top-[28%] -right-16 size-[18rem] rounded-full bg-sky-400/15 blur-3xl motion-safe:animate-aurora-delayed" />
      <div className="absolute bottom-[8%] left-[40%] size-[16rem] rounded-full bg-cyan-300/10 blur-3xl" />

      <div className="absolute inset-0 bg-[radial-gradient(560px_circle_at_70%_30%,color-mix(in_oklab,var(--primary)_14%,transparent),transparent_55%)]" />

      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
