import type { Metadata } from "next";

import { PROFILE, SITE_CONFIG, SOCIAL_LINKS } from "@/constants/site";
import type { Project } from "@/types";

const title = `${PROFILE.name} | Software Engineer`;
const description = SITE_CONFIG.description;
const ogImage = "/images/profile/hashim-qureshi.png";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: title,
    template: `%s | ${PROFILE.name}`,
  },
  description,
  applicationName: PROFILE.name,
  authors: [{ name: PROFILE.name, url: SITE_CONFIG.url }],
  creator: PROFILE.name,
  keywords: [
    "Hashim Qureshi",
    "Software Engineer",
    "MERN Stack Developer",
    "Next.js Developer",
    "React Developer",
    "Full Stack Developer",
    "Portfolio",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/favicon.ico" }],
    apple: [{ url: "/favicon.ico" }],
  },
  openGraph: {
    type: "website",
    locale: SITE_CONFIG.locale,
    url: SITE_CONFIG.url,
    title,
    description,
    siteName: PROFILE.name,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: `${PROFILE.name} — Software Engineer`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export function personJsonLd() {
  const sameAs = SOCIAL_LINKS.filter(
    (link) => link.platform === "github" || link.platform === "linkedin"
  ).map((link) => link.href);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PROFILE.name,
    jobTitle: "Software Engineer",
    email: PROFILE.email,
    url: SITE_CONFIG.url,
    sameAs,
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "University of Central Punjab",
    },
  };
}

export function projectJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.shortDescription,
    url: `${SITE_CONFIG.url}/projects/${project.slug}`,
    creator: {
      "@type": "Person",
      name: PROFILE.name,
      url: SITE_CONFIG.url,
    },
    keywords: project.technologies.join(", "),
    ...(project.liveDemo ? { sameAs: [project.liveDemo] } : {}),
  };
}
