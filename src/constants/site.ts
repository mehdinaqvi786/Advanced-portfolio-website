import type { NavItem, Profile, SocialLink } from "@/types";

import { sectionHref } from "@/lib/navigation";

export const SITE_CONFIG = {
  name: "Syed Mehdi Naqvi",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en_US",
  description:
    "Software Engineer and MERN Stack Developer building modern web applications with clean code and creative solutions.",
} as const;

export const PROFILE: Profile = {
  name: "Syed Mehdi Naqvi",
  firstName: "Mehdi",
  title: "Software Engineer · MERN Stack Developer",
  tagline:
    "Turning ideas into modern web applications through clean code and creative solutions.",
  email: "mehdishahnaqv@gmail.com",
  phone: "03064049769",
  location: "Pakistan",
  availability: "Open to full-time Software Engineer roles",
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: "github",
    label: "GitHub",
    href: "https://github.com/mehdinaqvi786",
  },
  {
    platform: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mehdi-shah-naqvi-abb41a293?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },
  {
    platform: "email",
    label: "Email",
    href: "mailto:mehdishahnaqv@gmail.com",
  },
];

export const SECTION_IDS = {
  hero: "hero",
  about: "about",
  projects: "projects",
  otherProjects: "other-projects",
  skills: "skills",
  techStack: "tech-stack",
  experience: "experience",
  education: "education",
  journey: "journey",
  contact: "contact",
} as const;

export const NAV_ITEMS: NavItem[] = [
  { label: "About", href: sectionHref(SECTION_IDS.about) },
  { label: "Projects", href: sectionHref(SECTION_IDS.projects) },
  { label: "Skills", href: sectionHref(SECTION_IDS.skills) },
  { label: "Experience", href: sectionHref(SECTION_IDS.experience) },
  { label: "Contact", href: sectionHref(SECTION_IDS.contact) },
];
