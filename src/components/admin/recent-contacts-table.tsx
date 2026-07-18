"use client";

import { motion } from "framer-motion";

import { EmptyState } from "@/components/admin/empty-state";
import type { RecentContactRow } from "@/server/admin/dashboard";
import {
  contactStatusClassName,
  formatAdminDateTime,
  formatContactStatus,
} from "@/utils/admin";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type RecentContactsTableProps = {
  contacts: RecentContactRow[];
};

export function RecentContactsTable({ contacts }: RecentContactsTableProps) {
  const reduced = usePrefersReducedMotion();

  if (contacts.length === 0) {
    return (
      <EmptyState
        title="No contacts yet"
        description="When visitors submit the contact form, their messages will show up here."
      />
    );
  }

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
      className="overflow-hidden rounded-2xl border border-border/50 bg-card/45 shadow-[0_12px_40px_color-mix(in_oklab,black_8%,transparent)] backdrop-blur-xl"
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
          <caption className="sr-only">
            Latest five contact form submissions
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
                Submitted
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
                  delay: reduced ? 0 : 0.05 * index,
                }}
                className="border-b border-border/40 last:border-0"
              >
                <td className="px-4 py-3.5 font-medium text-foreground sm:px-5">
                  {contact.name}
                </td>
                <td className="px-4 py-3.5 text-muted-foreground sm:px-5">
                  {contact.email}
                </td>
                <td className="max-w-[14rem] truncate px-4 py-3.5 text-muted-foreground sm:px-5">
                  {contact.subject}
                </td>
                <td className="px-4 py-3.5 sm:px-5">
                  <span className={contactStatusClassName(contact.status)}>
                    {formatContactStatus(contact.status)}
                  </span>
                </td>
                <td className="px-4 py-3.5 whitespace-nowrap text-muted-foreground sm:px-5">
                  <time dateTime={contact.createdAt}>
                    {formatAdminDateTime(new Date(contact.createdAt))}
                  </time>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
