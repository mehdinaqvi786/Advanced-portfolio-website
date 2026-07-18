import type { Metadata } from "next";

import { ContactsManager } from "@/components/admin/contacts-manager";
import { getAdminContacts } from "@/server/admin/contacts";

export const metadata: Metadata = {
  title: "Contact Queries",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminContactsPage() {
  const contacts = await getAdminContacts();

  return (
    <main id="main-content" tabIndex={-1} className="mx-auto max-w-7xl space-y-8">
      <section className="space-y-2">
        <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
          Contact Queries
        </h2>
        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
          Manage and respond to portfolio contact submissions.
        </p>
      </section>

      <ContactsManager initialContacts={contacts} />
    </main>
  );
}
