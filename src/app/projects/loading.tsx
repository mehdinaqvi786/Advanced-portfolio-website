export default function ProjectsLoading() {
  return (
    <main
      id="main-content"
      className="relative overflow-hidden pt-28 pb-20"
      aria-busy="true"
      aria-label="Loading projects"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="mb-10 h-8 w-40 animate-pulse rounded-lg bg-muted/60" />
        <div className="mb-14 h-12 w-72 max-w-full animate-pulse rounded-xl bg-muted/50" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-72 animate-pulse rounded-2xl border border-border/40 bg-card/30"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
