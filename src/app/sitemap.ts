import type { MetadataRoute } from "next";

import { SITE_CONFIG } from "@/constants/site";
import { getAllProjectSlugs } from "@/data/projects";

/** Stable lastModified avoids false sitemap churn for static portfolio content. */
const LAST_UPDATED = new Date("2026-07-16");

export default function sitemap(): MetadataRoute.Sitemap {
  const projectEntries = getAllProjectSlugs().map((slug) => ({
    url: `${SITE_CONFIG.url}/projects/${slug}`,
    lastModified: LAST_UPDATED,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: SITE_CONFIG.url,
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_CONFIG.url}/projects`,
      lastModified: LAST_UPDATED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...projectEntries,
  ];
}
