import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonNextMatch() {
  return (
    <div className="bg-green-500/20 rounded-3xl p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5" />
          <Skeleton className="h-5 w-32" />
        </div>
        <Skeleton className="h-5 w-24 rounded-full" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <Skeleton className="h-4 w-16 mb-1" />
          <Skeleton className="h-6 w-48" />
        </div>

        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i}>
              <Skeleton className="h-4 w-20 mb-1" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i}>
              <Skeleton className="h-4 w-20 mb-1" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}