import { cn } from "@/lib/utils";

type SectionAtmosphereProps = {
  className?: string;
};

/**
 * Lightweight static atmosphere (no Framer / no infinite JS animation).
 * Safe to mount on many sections without drowning the main thread.
 */
export function SectionAtmosphere({ className }: SectionAtmosphereProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--primary)_8%,transparent),transparent_55%)]" />
      <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,color-mix(in_oklab,var(--foreground)_7%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--foreground)_7%,transparent)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />

      <div className="absolute top-10 -left-24 size-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute right-0 bottom-0 size-80 rounded-full bg-sky-400/10 blur-3xl" />

      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
