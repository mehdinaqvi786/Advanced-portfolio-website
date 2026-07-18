import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";

import { AuthToastHandler } from "@/components/auth/auth-toast-handler";
import { LoginForm } from "@/components/auth/login-form";
import { LoginShell } from "@/components/auth/login-shell";
import { getAdminSession } from "@/lib/auth/session";
import { getSafeAdminPath } from "@/utils/auth-redirect";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

/** Login checks session cookies — must be dynamic. */
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

type LoginPageProps = {
  searchParams: Promise<{ next?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const session = await getAdminSession();
  if (session) {
    redirect("/admin/dashboard");
  }

  const params = await searchParams;
  const nextPath = getSafeAdminPath(params.next);

  return (
    <main id="main-content" tabIndex={-1}>
      <LoginShell>
        <LoginForm nextPath={nextPath} />
      </LoginShell>
      <Suspense fallback={null}>
        <AuthToastHandler />
      </Suspense>
    </main>
  );
}
