import { AboutCopy } from "@/components/sections/about/about-copy";
import { AboutHighlights } from "@/components/sections/about/about-highlights";
import { AboutPortrait } from "@/components/sections/about/about-portrait";
import { Container } from "@/components/layout/container";
import { SectionAtmosphere } from "@/components/sections/shared/section-atmosphere";
import { SECTION_IDS } from "@/constants/site";

/**
 * Narrative About section — story first, then highlight cards.
 */
export function AboutSection() {
  return (
    <section
      id={SECTION_IDS.about}
      aria-labelledby="about-heading"
      className="relative scroll-mt-28 overflow-hidden py-20 md:scroll-mt-32 md:py-28"
    >
      <SectionAtmosphere />
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <AboutPortrait />
          <AboutCopy />
        </div>
        <AboutHighlights />
      </Container>
    </section>
  );
}
