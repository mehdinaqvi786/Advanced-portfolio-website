"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AdminErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

/**
 * Friendly admin error boundary — never surfaces stack traces or internals.
 */
export default function AdminError({ error, reset }: AdminErrorProps) {
  useEffect(() => {
    console.error("[AdminError]", error);
  }, [error]);

  return (
    <main
      id="main-content"
      className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-4 py-16 text-center"
      role="alert"
    >
      <span className="mb-4 inline-flex size-14 items-center justify-center rounded-2xl border border-border/50 bg-destructive/10 text-destructive">
        <AlertTriangle className="size-6" aria-hidden />
      </span>
      <h2 className="font-heading text-2xl font-semibold tracking-tight">
        Something went wrong
      </h2>
      <p className="mt-3 text-sm text-muted-foreground">
        We couldn&apos;t load this page right now. Please try again. If the
        problem continues, sign out and sign back in.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        <Button type="button" onClick={reset}>
          Try again
        </Button>
        <Link
          href="/login"
          className={cn(buttonVariants({ variant: "outline" }), "rounded-lg")}
        >
          Go to login
        </Link>
      </div>
    </main>
  );
}
