import dynamic from "next/dynamic";

import { HeroSection } from "@/components/sections/hero";

const FeaturedProjectsSection = dynamic(() =>
  import("@/components/sections/featured-projects").then((m) => ({
    default: m.FeaturedProjectsSection,
  }))
);
const AboutSection = dynamic(() =>
  import("@/components/sections/about").then((m) => ({ default: m.AboutSection }))
);
const ExperienceSection = dynamic(() =>
  import("@/components/sections/experience").then((m) => ({
    default: m.ExperienceSection,
  }))
);
const EducationSection = dynamic(() =>
  import("@/components/sections/education").then((m) => ({
    default: m.EducationSection,
  }))
);
const JourneySection = dynamic(() =>
  import("@/components/sections/journey").then((m) => ({
    default: m.JourneySection,
  }))
);
const SkillsSection = dynamic(() =>
  import("@/components/sections/skills").then((m) => ({
    default: m.SkillsSection,
  }))
);
const TechStackSection = dynamic(() =>
  import("@/components/sections/tech-stack").then((m) => ({
    default: m.TechStackSection,
  }))
);
const OtherProjectsSection = dynamic(() =>
  import("@/components/sections/other-projects").then((m) => ({
    default: m.OtherProjectsSection,
  }))
);
const ContactSection = dynamic(() =>
  import("@/components/sections/contact").then((m) => ({
    default: m.ContactSection,
  }))
);

export default function HomePage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <HeroSection />
      <FeaturedProjectsSection />
      <AboutSection />
      <ExperienceSection />
      <EducationSection />
      <JourneySection />
      <SkillsSection />
      <TechStackSection />
      <OtherProjectsSection />
      <ContactSection />
    </main>
  );
}
