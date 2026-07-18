import { Mail, Phone } from "lucide-react";

import { Container } from "@/components/layout/container";
import { NavLink } from "@/components/layout/nav-link";
import { SiteLogo } from "@/components/layout/site-logo";
import { SocialLinks } from "@/components/layout/social-links";
import { FooterAdminAccess } from "@/components/layout/footer-admin-access";
import { FooterDivider } from "@/components/layout/footer-divider";
import { NAV_ITEMS, PROFILE } from "@/constants/site";
import { sectionHref } from "@/lib/navigation";
import { SECTION_IDS } from "@/constants/site";

/**
 * Site-wide premium footer — brand, nav, contact, socials, copyright.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-8 border-t border-border/40 bg-background/80">
      <Container className="py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div className="max-w-sm">
            <SiteLogo showFullName />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {PROFILE.tagline}
            </p>
            <div className="mt-6">
              <SocialLinks />
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold tracking-wide text-foreground uppercase">
              Navigate
            </p>
            <nav
              className="mt-4 flex flex-col gap-1"
              aria-label="Footer navigation"
            >
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  orientation="vertical"
                  className="px-0 py-1.5"
                />
              ))}
            </nav>
          </div>

          <div>
            <p className="text-sm font-semibold tracking-wide text-foreground uppercase">
              Contact
            </p>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Mail className="size-4 shrink-0 text-primary" aria-hidden />
                  {PROFILE.email}
                </a>
              </li>
              {PROFILE.phone ? (
                <li>
                  <a
                    href={`tel:${PROFILE.phone}`}
                    className="inline-flex items-center gap-2 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Phone
                      className="size-4 shrink-0 text-primary"
                      aria-hidden
                    />
                    {PROFILE.phone}
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <FooterDivider />

        <div className="flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {PROFILE.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-3 sm:justify-end">
            <a
              href={sectionHref(SECTION_IDS.hero)}
              className="inline-flex w-fit items-center gap-1 font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Back to top
            </a>
            <FooterAdminAccess />
          </div>
        </div>
      </Container>
    </footer>
  );
}
