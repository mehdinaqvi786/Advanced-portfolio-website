import { Container } from "@/components/layout/container";
import { ContactInfo } from "@/components/sections/contact/contact-info";
import { SectionAtmosphere } from "@/components/sections/shared/section-atmosphere";
import { SECTION_IDS } from "@/constants/site";

/**
 * Premium Contact section — UI only, prepared for future Supabase/Resend.
 */
export function ContactSection() {
  return (
    <section
      id={SECTION_IDS.contact}
      aria-labelledby="contact-heading"
      className="relative scroll-mt-28 overflow-hidden py-20 md:scroll-mt-32 md:py-28"
    >
      <SectionAtmosphere />
      <Container>
        <div className="grid items-start gap-10">
          <ContactInfo />
        </div>
      </Container>
    </section>
  );
}
