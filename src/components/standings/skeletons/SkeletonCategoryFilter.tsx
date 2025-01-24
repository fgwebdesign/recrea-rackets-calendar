import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCategoryFilter() {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton 
          key={i} 
          className="h-10 w-32 rounded-full flex-shrink-0"
        />
      ))}
    </div>
  );
} 