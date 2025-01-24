import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonStandingsTable() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-4 w-36" />
          </div>
          <div className="flex items-center gap-3 bg-gray-50 px-3 py-2 rounded-lg">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="w-2 h-2 rounded-full" />
                <Skeleton className="w-12 h-3" />
              </div>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table Header */}
            <thead className="bg-gray-50/50">
              <tr>
                {['', 'Equipo', 'PJ', 'PG', 'PE', 'PP', 'GF', 'GC', 'DG', 'PTS'].map((_, index) => (
                  <th key={index} className="px-4 py-3">
                    <Skeleton className="h-4 w-full max-w-[50px] mx-auto" />
                  </th>
                ))}
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((row) => (
                <tr key={row} className="border-b last:border-b-0">
                  <td className="px-4 py-3">
                    <Skeleton className="h-6 w-6 rounded-full mx-auto" />
                  </td>
                  <td className="px-4 py-3">
                    <Skeleton className="h-4 w-40" />
                  </td>
                  {[...Array(8)].map((_, i) => (
                    <td key={i} className="px-4 py-3 text-center">
                      <Skeleton className="h-4 w-8 mx-auto" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 