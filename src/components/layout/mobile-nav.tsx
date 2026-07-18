"use client";

import { motion } from "framer-motion";

import { HamburgerButton } from "@/components/layout/hamburger-button";
import { NavLink } from "@/components/layout/nav-link";
import { SiteLogo } from "@/components/layout/site-logo";
import { SocialLinks } from "@/components/layout/social-links";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { NAV_ITEMS, SECTION_IDS } from "@/constants/site";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { sectionHref, sectionIdFromHref } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type MobileNavProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeId: string;
};

/**
 * Mobile navigation drawer — controlled Sheet with staggered link entrance.
 */
export function MobileNav({ open, onOpenChange, activeId }: MobileNavProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="lg:hidden">
      <HamburgerButton
        open={open}
        aria-controls="mobile-navigation"
        onClick={() => onOpenChange(!open)}
      />

      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          id="mobile-navigation"
          side="right"
          className="flex w-[min(100%,20rem)] flex-col gap-0 border-l border-border/60 bg-background/95 backdrop-blur-xl"
        >
          <SheetHeader className="border-b border-border/50 pb-4">
            <SheetTitle className="sr-only">Mobile navigation</SheetTitle>
            <SiteLogo />
          </SheetHeader>

          <nav
            className="mt-6 flex flex-1 flex-col gap-1"
            aria-label="Mobile primary"
          >
            {NAV_ITEMS.map((item, index) => {
              const id = sectionIdFromHref(item.href);
              const link = (
                <NavLink
                  href={item.href}
                  label={item.label}
                  isActive={activeId === id}
                  orientation="vertical"
                  onClick={() => onOpenChange(false)}
                />
              );

              if (reduced) {
                return <div key={item.href}>{link}</div>;
              }

              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 16 }}
                  animate={open ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
                  transition={{ delay: 0.05 * index, duration: 0.28 }}
                >
                  {link}
                </motion.div>
              );
            })}
          </nav>

          <div className="mt-auto space-y-4 border-t border-border/50 pt-6">
            <a
              href={sectionHref(SECTION_IDS.contact)}
              onClick={() => onOpenChange(false)}
              className={cn(buttonVariants({ size: "lg" }), "w-full")}
            >
              Contact Me
            </a>
            <SocialLinks />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
