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
import { PageHeader } from "@/components/ui/page-header";
import { LineChart } from "lucide-react";

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
          <PageHeader
            title="Tabla de Posiciones"
            description="Visualiza la tabla de posiciones actualizada de todas las categorías"
            icon={LineChart}
          />
          
          <div className="p-4 md:p-8">
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