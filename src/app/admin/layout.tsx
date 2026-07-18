import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { AdminShell } from "@/components/admin/admin-shell";
import { clearAuthSession, resolveAdminGate } from "@/lib/auth/gate";
import { isNextProductionBuild } from "@/lib/next-phase";
import { buildLoginUrl, getSafeAdminPath } from "@/utils/auth-redirect";

/** Admin routes always need cookies/session — never statically prerender. */
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

/**
 * Admin layout — auth gate + reusable shell (sidebar / topbar).
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Skip cookie/header auth work during `next build` analysis.
  if (isNextProductionBuild()) {
    return null;
  }

  const gate = await resolveAdminGate();
  const headerStore = await headers();
  const pathname = getSafeAdminPath(
    headerStore.get("x-pathname"),
    "/admin/dashboard"
  );

  if (gate.status === "unauthenticated") {
    redirect(buildLoginUrl({ next: pathname, toast: "session" }));
  }

  if (gate.status === "forbidden") {
    await clearAuthSession();
    redirect("/unauthorized");
  }

  return <AdminShell admin={gate.profile}>{children}</AdminShell>;
}
