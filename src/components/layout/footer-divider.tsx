/**
 * Animated gradient divider — CSS only (no Framer on every page).
 */
export function FooterDivider() {
  return (
    <div className="relative my-10 h-px w-full overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-primary/70 to-transparent motion-safe:animate-footer-sheen" />
    </div>
  );
}
