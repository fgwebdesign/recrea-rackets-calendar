'use client'

import { useParams } from 'next/navigation'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app/Sidebar'
import { MOCK_TOURNAMENTS } from '@/mocks/tournaments'
import { TournamentBracket } from '@/components/tournaments/TournamentBracket'
import { PageHeader } from '@/components/ui/page-header'

export default function TournamentFixturePage() {
  const params = useParams()
  const tournament = MOCK_TOURNAMENTS.find(t => t.id === Number(params.id))

  if (!tournament) {
    return <div>Torneo no encontrado</div>
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-50 w-full">
        <AppSidebar />
        <main className="flex-1">
          <PageHeader
            title={`Fixture - ${tournament.name}`}
            description="Visualiza el cuadro completo del torneo, los resultados de los partidos y los próximos encuentros."
          />
          <div className="px-6">
            <TournamentBracket tournamentId={tournament.id} />
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
} 