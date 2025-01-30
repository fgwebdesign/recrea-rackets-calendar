'use client';

import { LeagueStandings } from "@/components/dashboard/LeagueStandings";
import { mockLeagueStandings } from "@/mocks/leagueStandings";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app/Sidebar";
import { BottomNav } from "@/components/navigation/BottomNav";
import { CategoryFilter } from "@/components/standings/CategoryFilter";
import { SkeletonCategoryFilter } from "@/components/standings/skeletons/SkeletonCategoryFilter";
import { SkeletonStandingsTable } from "@/components/standings/skeletons/SkeletonStandingsTable";
import { useCategories } from "@/hooks/useCategories";

export default function StandingsPage() {
  const { 
    categories, 
    selectedCategory, 
    loading, 
    error, 
    setSelectedCategory 
  } = useCategories();

  // Filtrar los datos según la categoría seleccionada
  const filteredStandings = {
    ...mockLeagueStandings,
    category: selectedCategory
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 overflow-auto bg-[#FAF9F6] pb-16 md:pb-0">
          <div className="p-4 md:p-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Tabla de Posiciones</h1>
              <p className="text-gray-500 mt-1">
                Visualiza la tabla de posiciones actualizada de todas las categorías
              </p>
            </div>

            {loading ? (
              <>
                <SkeletonCategoryFilter />
                <div className="mt-6">
                  <SkeletonStandingsTable />
                </div>
              </>
            ) : (
              <>
                <CategoryFilter
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                />
                <div className="mt-6">
                  <LeagueStandings 
                    category={filteredStandings.category}
                    division={filteredStandings.division}
                    standings={filteredStandings.standings}
                  />
                </div>
              </>
            )}
          </div>
        </main>
        <BottomNav />
      </div>
    </SidebarProvider>
  );
} 