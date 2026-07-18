import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";

/**
 * Generic admin content skeleton used by route-level loading.tsx.
 */
export function AdminPageSkeleton() {
  return (
    <div
      className="mx-auto max-w-7xl space-y-8"
      aria-busy="true"
      aria-label="Loading admin page"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="space-y-3">
          <Skeleton className="h-8 w-48 sm:w-64" />
          <Skeleton className="h-4 w-72 max-w-full" />
        </div>
        <Spinner className="hidden sm:inline-flex" label="Loading page" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-28 w-full rounded-2xl" />
        ))}
      </div>

      <div className="space-y-3">
        <Skeleton className="h-10 w-full max-w-md rounded-xl" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-8 w-24 rounded-full" />
          ))}
        </div>
        <Skeleton className="h-72 w-full rounded-2xl" />
      </div>
    </div>
  );
}
