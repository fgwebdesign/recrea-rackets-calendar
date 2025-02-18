import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonWelcomeBanner() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 p-8 mb-8">
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
          </div>
        </div>
      </div>
    </div>
  );
} 