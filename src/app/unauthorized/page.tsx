import type { Metadata } from "next";
import Link from "next/link";
import { ShieldOff } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Access Denied",
  robots: { index: false, follow: false },
};

/**
 * Friendly forbidden experience — no internal details exposed.
 */
export default function UnauthorizedPage() {
  return (
    <main
      id="main-content"
      className="relative flex min-h-svh items-center justify-center overflow-hidden px-4 py-16"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--primary)_10%,transparent),transparent_55%)]"
      />

      <section className="relative z-10 w-full max-w-md rounded-3xl border border-border/50 bg-card/55 p-8 text-center shadow-[0_24px_80px_color-mix(in_oklab,black_12%,transparent)] backdrop-blur-xl">
        <span className="mx-auto mb-5 inline-flex size-14 items-center justify-center rounded-2xl border border-border/50 bg-destructive/10 text-destructive">
          <ShieldOff className="size-6" aria-hidden />
        </span>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Access denied
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          You do not have permission to view this area. If you believe this is a
          mistake, contact the site owner.
        </p>
        <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-2xl")}
          >
            Back to portfolio
          </Link>
          <Link
            href="/login"
            className={cn(buttonVariants({ size: "lg" }), "rounded-2xl")}
          >
            Admin sign in
          </Link>
        </div>
      </section>
    </main>
  );
}
