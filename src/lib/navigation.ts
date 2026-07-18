/**
 * Home section deep-link helpers.
 * Use root-anchored hashes so links work from /projects and other routes.
 */
export function sectionHref(sectionId: string): string {
  return `/#${sectionId}`;
}

export function sectionIdFromHref(href: string): string {
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) return "";
  return href.slice(hashIndex + 1);
}
