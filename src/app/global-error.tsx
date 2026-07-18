"use client";

import { useEffect } from "react";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

/**
 * Root-most error UI — must define its own html/body.
 */
export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("[GlobalError]", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-svh items-center justify-center bg-neutral-950 px-4 text-neutral-100">
        <main
          id="main-content"
          className="max-w-md text-center"
          role="alert"
        >
          <h1 className="text-2xl font-semibold tracking-tight">
            Something went wrong
          </h1>
          <p className="mt-3 text-sm text-neutral-400">
            Please refresh the page or try again in a moment.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-500"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
