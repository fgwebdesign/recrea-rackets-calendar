import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonTournamentBanner() {
  return (
    <div className="relative w-full h-[180px] sm:h-[220px] rounded-xl sm:rounded-2xl overflow-hidden mb-6 sm:mb-8">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 animate-pulse" />
      
      <div className="relative h-full p-4 sm:p-6 md:p-8 flex flex-col justify-between">
        <div>
          <Skeleton className="h-6 w-32 rounded-full mb-4" />
          <Skeleton className="h-8 w-72 mb-2" />
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Skeleton className="h-4 w-96 hidden sm:block" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  );
} 