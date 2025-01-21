'use client';

import { useState } from 'react';
import { LeagueStandings } from "@/components/dashboard/LeagueStandings";
import { mockLeagueStandings } from "@/mocks/leagueStandings";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app/Sidebar";
import { BottomNav } from "@/components/navigation/BottomNav";
import { FeaturedTeam } from "@/components/standings/FeaturedTeam";
import { TeamStats } from "@/components/standings/TeamStats";
import { CategoryFilter } from "@/components/standings/CategoryFilter";

const categories = [
  "Categoría Cuarta",
  "Categoría Quinta",
  "Categoría Sexta",
  "Categoría Séptima"
];

export default function StandingsPage() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  // Aquí podrías filtrar los datos según la categoría seleccionada
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

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <FeaturedTeam 
                players={[
                  { name: "Felipe Gutierrez" },
                  { name: "Francisco Erramuspe" }
                ]}
                position={1}
                category={selectedCategory}
              />
              <TeamStats 
                stats={{
                  played: 8,
                  won: 7,
                  lost: 1
                }}
              />
            </div>

            {/* Category Filter */}
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />

            {/* League Standings Table */}
            <div className="space-y-8">
              <LeagueStandings 
                category={filteredStandings.category}
                division={filteredStandings.division}
                standings={filteredStandings.standings}
              />
            </div>
          </div>
        </main>
        <BottomNav />
      </div>
    </SidebarProvider>
  );
} 