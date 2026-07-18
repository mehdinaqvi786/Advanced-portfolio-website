"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { Container } from "@/components/layout/container";
import { MobileNav } from "@/components/layout/mobile-nav";
import { NavLink } from "@/components/layout/nav-link";
import { SiteLogo } from "@/components/layout/site-logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Magnetic } from "@/components/motion/magnetic";
import { buttonVariants } from "@/components/ui/button";
import { NAV_ITEMS, SECTION_IDS } from "@/constants/site";
import { useActiveSection } from "@/hooks/use-active-section";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { sectionHref, sectionIdFromHref } from "@/lib/navigation";
import { cn } from "@/lib/utils";

const OBSERVED_SECTION_IDS = [
  SECTION_IDS.hero,
  SECTION_IDS.about,
  SECTION_IDS.projects,
  SECTION_IDS.skills,
  SECTION_IDS.experience,
  SECTION_IDS.contact,
] as const;

/**
 * Premium floating glass navbar.
 * Same export used by root layout — upgraded in place, not replaced elsewhere.
 */
export function Navbar() {
  const [open, setOpen] = useState(false);
  const { passed: scrolled } = useScrollPosition(16);
  const activeId = useActiveSection(OBSERVED_SECTION_IDS);
  const reduced = usePrefersReducedMotion();

  return (
    <motion.header
      initial={reduced ? false : { y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4"
    >
      <Container
        className={cn(
          "pointer-events-auto flex h-14 items-center justify-between gap-3 rounded-2xl border px-3 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 sm:h-16 sm:px-4",
          scrolled
            ? "border-border/60 bg-background/75 shadow-[0_12px_40px_rgba(0,0,0,0.14)] backdrop-blur-xl"
            : "border-border/40 bg-background/40 shadow-sm backdrop-blur-md"
        )}
      >
        <SiteLogo />

        <nav
          className="hidden items-center gap-0.5 lg:flex"
          aria-label="Primary"
        >
          {NAV_ITEMS.map((item) => {
            const id = sectionIdFromHref(item.href);
            return (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                isActive={activeId === id}
              />
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <ThemeToggle />

          <Magnetic className="hidden sm:inline-flex">
            <a
              href={sectionHref(SECTION_IDS.contact)}
              className={cn(
                buttonVariants({ size: "sm" }),
                "h-9 px-3 transition-transform duration-200 hover:-translate-y-0.5"
              )}
            >
              Contact Me
            </a>
          </Magnetic>

          <MobileNav open={open} onOpenChange={setOpen} activeId={activeId} />
        </div>
      </Container>
    </motion.header>
  );
}
