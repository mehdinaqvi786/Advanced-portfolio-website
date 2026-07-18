import { PROFILE, SOCIAL_LINKS } from "@/constants/site";

export const CONTACT_CONTENT = {
  eyebrow: "Contact",
  heading: "Let's Work Together",
  description:
    "I'm always interested in discussing new opportunities, freelance projects and innovative ideas. Feel free to reach out.",
} as const;

function displayUrl(href: string) {
  return href.replace(/^https?:\/\//, "").replace(/^mailto:/, "").replace(/^tel:/, "");
}

const github = SOCIAL_LINKS.find((link) => link.platform === "github");
const linkedin = SOCIAL_LINKS.find((link) => link.platform === "linkedin");

export const CONTACT_INFO_CARDS = [
  {
    id: "email",
    label: "Email",
    value: PROFILE.email,
    href: `mailto:${PROFILE.email}`,
    external: false,
    icon: "mail" as const,
  },
  {
    id: "phone",
    label: "Phone",
    value: PROFILE.phone ?? "",
    href: PROFILE.phone ? `tel:${PROFILE.phone}` : undefined,
    external: false,
    icon: "phone" as const,
  },
  {
    id: "location",
    label: "Location",
    value: PROFILE.location ?? "Pakistan",
    href: undefined,
    external: false,
    icon: "map" as const,
  },
  {
    id: "github",
    label: "GitHub",
    value: github ? displayUrl(github.href) : "github.com/mehdinaqvi786",
    href: github?.href,
    external: true,
    icon: "github" as const,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: linkedin ? displayUrl(linkedin.href) : "lhttps://www.linkedin.com/in/mehdi-shah-naqvi-abb41a293?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    href: linkedin?.href,
    external: true,
    icon: "linkedin" as const,
  },
] as const;

export type ContactInfoCardData = (typeof CONTACT_INFO_CARDS)[number];
