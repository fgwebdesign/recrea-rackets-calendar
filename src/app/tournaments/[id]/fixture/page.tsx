'use client'

import { useParams } from 'next/navigation'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app/Sidebar'
import { MOCK_TOURNAMENTS } from '@/mocks/tournaments'
import { TournamentBracket } from '@/components/tournaments/TournamentBracket'
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
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Fixture - {tournament.name}
            </h1>
            <TournamentBracket tournamentId={tournament.id} />
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
} 