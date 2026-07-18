"use client";

import { Eye } from "lucide-react";
import { motion } from "framer-motion";

import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import type { AdminContact } from "@/server/admin/contacts";
import { formatAdminDateTime } from "@/utils/admin";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type ContactTableProps = {
  contacts: AdminContact[];
  onView: (contact: AdminContact) => void;
};

export function ContactTable({ contacts, onView }: ContactTableProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="hidden overflow-hidden rounded-2xl border border-border/50 bg-card/45 shadow-[0_12px_40px_color-mix(in_oklab,black_8%,transparent)] backdrop-blur-xl md:block">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[48rem] border-collapse text-left text-sm">
          <caption className="sr-only">
            All contact form submissions
          </caption>
          <thead>
            <tr className="border-b border-border/50 bg-muted/30 text-xs tracking-wide text-muted-foreground uppercase">
              <th scope="col" className="px-4 py-3 font-medium sm:px-5">
                Name
              </th>
              <th scope="col" className="px-4 py-3 font-medium sm:px-5">
                Email
              </th>
              <th scope="col" className="px-4 py-3 font-medium sm:px-5">
                Subject
              </th>
              <th scope="col" className="px-4 py-3 font-medium sm:px-5">
                Status
              </th>
              <th scope="col" className="px-4 py-3 font-medium sm:px-5">
                Created date
              </th>
              <th scope="col" className="px-4 py-3 font-medium sm:px-5">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <motion.tr
                key={contact.id}
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: reduced ? 0 : Math.min(0.04 * index, 0.28),
                }}
                className="border-b border-border/40 transition-colors hover:bg-muted/25 last:border-0"
              >
                <td className="px-4 py-3.5 font-medium text-foreground sm:px-5">
                  {contact.name}
                </td>
                <td className="px-4 py-3.5 text-muted-foreground sm:px-5">
                  {contact.email}
                </td>
                <td className="max-w-[16rem] truncate px-4 py-3.5 text-muted-foreground sm:px-5">
                  {contact.subject}
                </td>
                <td className="px-4 py-3.5 sm:px-5">
                  <StatusBadge status={contact.status} />
                </td>
                <td className="px-4 py-3.5 whitespace-nowrap text-muted-foreground sm:px-5">
                  <time dateTime={contact.createdAt}>
                    {formatAdminDateTime(contact.createdAt)}
                  </time>
                </td>
                <td className="px-4 py-3.5 sm:px-5">
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
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
