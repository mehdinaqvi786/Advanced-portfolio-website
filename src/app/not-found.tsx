import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-4 py-24 text-center"
    >
      <p className="text-sm font-medium tracking-wide text-primary uppercase">
        404
      </p>
      <h1 className="mt-3 font-heading text-3xl font-semibold">
        Page not found
      </h1>
      <p className="mt-3 text-muted-foreground">
        The page you requested does not exist or was moved.
      </p>
      <Link href="/" className={cn(buttonVariants(), "mt-8")}>
        Back to home
      </Link>
    </main>
  );
}
