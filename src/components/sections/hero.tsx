import { Container } from "@/components/layout/container";
import { HeroBackground } from "@/components/sections/hero/hero-background";
import { HeroIntro } from "@/components/sections/hero/hero-intro";
import { HeroPortrait } from "@/components/sections/hero/hero-portrait";
import { HeroScrollIndicator } from "@/components/sections/hero/hero-scroll-indicator";
import { SECTION_IDS } from "@/constants/site";

/**
 * Award-level hero composition.
 * Subcomponents live under sections/hero/* so layout chrome stays untouched.
 */
export function HeroSection() {
  return (
    <section
      id={SECTION_IDS.hero}
      aria-labelledby="hero-heading"
      className="relative flex min-h-svh scroll-mt-28 items-center overflow-hidden pt-24 pb-24 md:scroll-mt-32 md:pt-28 md:pb-28"
    >
      <HeroBackground />

      <Container className="relative z-10 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <HeroIntro />
        <div className="flex justify-center lg:justify-end">
          <HeroPortrait />
        </div>
      </Container>

      <HeroScrollIndicator />
    </section>
  );
}
