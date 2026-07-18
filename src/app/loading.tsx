export default function RootLoading() {
  return (
    <main
      id="main-content"
      className="mx-auto w-full max-w-6xl px-4 py-28 sm:px-6"
      aria-busy="true"
      aria-label="Loading page"
    >
      <div className="space-y-4">
        <div className="h-4 w-28 animate-pulse rounded-md bg-muted/60" />
        <div className="h-12 w-full max-w-xl animate-pulse rounded-xl bg-muted/50" />
        <div className="h-4 w-full max-w-md animate-pulse rounded-md bg-muted/40" />
      </div>
      <div className="mt-14 grid gap-4 sm:grid-cols-2">
        <div className="h-48 animate-pulse rounded-2xl border border-border/40 bg-card/30" />
        <div className="h-48 animate-pulse rounded-2xl border border-border/40 bg-card/30" />
      </div>
    </main>
  );
}
