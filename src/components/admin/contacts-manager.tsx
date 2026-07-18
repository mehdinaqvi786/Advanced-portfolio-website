"use client";

import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Inbox } from "lucide-react";
import { motion } from "framer-motion";

import { ContactCard } from "@/components/admin/contact-card";
import { ContactDialog } from "@/components/admin/contact-dialog";
import { ContactTable } from "@/components/admin/contact-table";
import { EmptyState } from "@/components/admin/empty-state";
import {
  FilterTabs,
  type ContactFilter,
} from "@/components/admin/filter-tabs";
import { SearchBar } from "@/components/admin/search-bar";
import type { ContactStatus } from "@/generated/prisma/client";
import type { AdminContact } from "@/server/admin/contacts";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type ContactsManagerProps = {
  initialContacts: AdminContact[];
};

function matchesSearch(contact: AdminContact, query: string): boolean {
  if (!query) return true;
  const q = query.toLowerCase();
  return (
    contact.name.toLowerCase().includes(q) ||
    contact.email.toLowerCase().includes(q) ||
    contact.subject.toLowerCase().includes(q)
  );
}

export function ContactsManager({ initialContacts }: ContactsManagerProps) {
  const router = useRouter();
  const reduced = usePrefersReducedMotion();
  const [contacts, setContacts] = useState(initialContacts);
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);
  const [filter, setFilter] = useState<ContactFilter>("All");
  const [selected, setSelected] = useState<AdminContact | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    setContacts(initialContacts);
  }, [initialContacts]);

  const counts = useMemo(() => {
    const next: Record<ContactFilter, number> = {
      All: contacts.length,
      Pending: 0,
      Completed: 0,
      Resolved: 0,
      Done: 0,
    };
    for (const contact of contacts) {
      next[contact.status] += 1;
    }
    return next;
  }, [contacts]);

  const filtered = useMemo(() => {
    return contacts.filter((contact) => {
      const statusOk = filter === "All" || contact.status === filter;
      return statusOk && matchesSearch(contact, deferredSearch.trim());
    });
  }, [contacts, deferredSearch, filter]);

  function handleView(contact: AdminContact) {
    setSelected(contact);
    setDialogOpen(true);
  }

  function handleStatusUpdated(id: string, status: ContactStatus) {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === id ? { ...contact, status } : contact
      )
    );
    setSelected((prev) => (prev?.id === id ? { ...prev, status } : prev));
    router.refresh();
  }

  const hasAnyContacts = contacts.length > 0;
  const showEmptyFiltered = hasAnyContacts && filtered.length === 0;

  return (
    <div className="space-y-6">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-4"
      >
        <SearchBar value={search} onChange={setSearch} />
        <FilterTabs value={filter} counts={counts} onChange={setFilter} />
        <p className="text-xs text-muted-foreground" aria-live="polite">
          Showing {filtered.length} of {contacts.length}{" "}
          {contacts.length === 1 ? "query" : "queries"}
          {filter !== "All" ? ` · ${filter}` : null}
        </p>
      </motion.div>

      {!hasAnyContacts ? (
        <EmptyState
          icon={Inbox}
          title="No contact queries yet"
          description="When visitors submit the portfolio contact form, their messages will appear here for you to review and manage."
        />
      ) : showEmptyFiltered ? (
        <EmptyState
          icon={Inbox}
          title="No matching queries"
          description="Try a different search term or status filter to find the contact you’re looking for."
        />
      ) : (
        <>
          <ContactTable contacts={filtered} onView={handleView} />
          <div className="grid gap-3 md:hidden">
            {filtered.map((contact, index) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                index={index}
                onView={handleView}
              />
            ))}
          </div>
        </>
      )}

      <ContactDialog
        contact={selected}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onStatusUpdated={handleStatusUpdated}
      />
    </div>
  );
}
