import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonTournamentCard } from "./SkeletonTournamentCard";

export function SkeletonTournamentsPage() {
  return (
    <div className="flex flex-col min-h-full w-full">
      {/* Header Banner Skeleton */}
      <div className="relative w-full bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600">
        <div className="relative px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <Skeleton className="h-8 w-48" />
          </div>
          <Skeleton className="h-5 w-2/3 max-w-2xl" />
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 w-full px-4 py-6 sm:px-6 md:px-8">
        {/* Filters Skeleton */}
        <div className="flex flex-col sm:flex-row gap-4 p-4 bg-white rounded-xl border border-gray-100">
          <Skeleton className="h-10 w-full sm:w-64" />
          <Skeleton className="h-10 w-full sm:w-48" />
          <Skeleton className="h-10 w-full sm:w-48" />
        </div>

        {/* Tournament Cards Grid */}
        <div className="mt-6 sm:mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonTournamentCard key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 