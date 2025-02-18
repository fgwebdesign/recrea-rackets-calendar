import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonLastMatchResult() {
  return (
    <div className="bg-blue-500/20 rounded-3xl p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-5 w-24 rounded-full" />
      </div>

      <div className="bg-white/5 rounded-2xl p-4">
        {/* Player 1 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-5 w-48" />
          </div>
          <div className="flex gap-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="w-10 h-10 rounded-lg" />
            ))}
          </div>
        </div>

        {/* Player 2 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-5 w-48" />
          </div>
          <div className="flex gap-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="w-10 h-10 rounded-lg" />
            ))}
          </div>
        </div>
      </div>

      <Skeleton className="h-4 w-20 mt-4" />
    </div>
  );
} 