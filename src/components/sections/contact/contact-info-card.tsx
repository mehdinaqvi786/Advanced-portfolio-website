"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

import { SocialIcon } from "@/components/icons/social-icon";
import type { ContactInfoCardData } from "@/data/contact";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

type ContactInfoCardProps = {
  item: ContactInfoCardData;
  className?: string;
};

function ContactCardIcon({
  icon,
}: {
  icon: ContactInfoCardData["icon"];
}) {
  if (icon === "github") {
    return <SocialIcon platform="github" className="size-5" />;
  }
  if (icon === "linkedin") {
    return <SocialIcon platform="linkedin" className="size-5" />;
  }
  if (icon === "phone") {
    return <Phone className="size-5" aria-hidden />;
  }
  if (icon === "map") {
    return <MapPin className="size-5" aria-hidden />;
  }
  return <Mail className="size-5" aria-hidden />;
}

/**
 * Glass contact detail tile — reusable for email, phone, socials, location.
 */
export function ContactInfoCard({ item, className }: ContactInfoCardProps) {
  const reduced = usePrefersReducedMotion();

  const content = (
    <>
      <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl border border-border/60 bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
        <ContactCardIcon icon={item.icon} />
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {item.label}
        </span>
        <span className="mt-1 block truncate text-sm font-medium text-foreground sm:text-base">
          {item.value}
        </span>
      </span>
    </>
  );

  const sharedClassName = cn(
    "hover-lift group flex w-full items-center gap-3 rounded-2xl border border-border/50 bg-card/40 p-4 shadow-sm backdrop-blur-xl transition-[border-color,background-color,box-shadow] duration-500",
    "hover:border-primary/40 hover:bg-card/60 hover:shadow-[0_12px_32px_color-mix(in_oklab,var(--primary)_12%,transparent)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    className
  );

  return (
    <motion.li
      variants={
        reduced
          ? undefined
          : {
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0 },
            }
      }
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {item.href ? (
        <a
          href={item.href}
          target={item.external ? "_blank" : undefined}
          rel={item.external ? "noopener noreferrer" : undefined}
          className={sharedClassName}
          aria-label={`${item.label}: ${item.value}`}
        >
          {content}
        </a>
      ) : (
        <div
          className={sharedClassName}
          aria-label={`${item.label}: ${item.value}`}
        >
          {content}
        </div>
      )}
    </motion.li>
  );
}
