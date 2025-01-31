'use client'

import { useState } from 'react'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app/Sidebar'
import { PageHeader } from '@/components/ui/page-header'
import { TournamentList } from '@/components/tournaments/my-tournaments/TournamentList'
import { UpcomingMatches } from '@/components/tournaments/my-tournaments/UpcomingMatches'
import { TournamentCalendar } from '@/components/tournaments/my-tournaments/TournamentCalendar'
import { USER_TOURNAMENTS } from '@/mocks/userTournaments'
import { Match } from '@/types/matches'
import { Trophy } from 'lucide-react'

export default function MyTournamentsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-50 w-full">
        <AppSidebar />
        <main className="flex-1 overflow-x-hidden w-full">
          <PageHeader
            title="Mis Torneos"
            description="Gestiona tus torneos activos y revisa el historial de participaciones anteriores."
            icon={Trophy}
          />

          {/* Content Area */}
          <div className="p-6">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Lista de torneos */}
                <div className="lg:col-span-2">
                  <TournamentList tournaments={USER_TOURNAMENTS} />
                </div>

                {/* Sidebar derecho */}
                <div className="space-y-6">
                  {/* Calendario */}
                  <div className="bg-blue-100 rounded-xl shadow-sm p-4 border border-blue-300">
                    <div className="flex flex-col items-center">
                      <TournamentCalendar 
                        date={date}
                        onSelect={setDate}
                      />
                    </div>
                  </div>

                  {/* Próximos partidos */}
                  <UpcomingMatches 
                    matches={USER_TOURNAMENTS.flatMap(t => 
                      t.matches.filter(m => m.status === 'pending') as Match[]
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
} 