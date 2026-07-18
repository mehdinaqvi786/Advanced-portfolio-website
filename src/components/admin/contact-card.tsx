"use client";

import { Eye } from "lucide-react";
import { motion } from "framer-motion";

import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import type { AdminContact } from "@/server/admin/contacts";
import { formatAdminDateTime } from "@/utils/admin";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type ContactCardProps = {
  contact: AdminContact;
  index?: number;
  onView: (contact: AdminContact) => void;
};

export function ContactCard({ contact, index = 0, onView }: ContactCardProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: reduced ? 0 : Math.min(0.05 * index, 0.3),
        ease: [0.16, 1, 0.3, 1],
      }}
      className="rounded-2xl border border-border/50 bg-card/45 p-4 shadow-[0_10px_30px_color-mix(in_oklab,black_6%,transparent)] backdrop-blur-xl transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-border"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate font-heading text-base font-semibold tracking-tight">
            {contact.name}
          </h3>
          <p className="mt-0.5 truncate text-sm text-muted-foreground">
            {contact.email}
          </p>
        </div>
        <StatusBadge status={contact.status} />
      </div>

      <p className="mt-3 line-clamp-2 text-sm text-foreground/90">
        {contact.subject}
      </p>

      <div className="mt-4 flex items-center justify-between gap-3">
        <time
          dateTime={contact.createdAt}
          className="text-xs text-muted-foreground"
        >
          {formatAdminDateTime(contact.createdAt)}
        </time>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onView(contact)}
          aria-label={`View message from ${contact.name}`}
        >
          <Eye data-icon="inline-start" />
          View
        </Button>
      </div>
    </motion.article>
  );
}
