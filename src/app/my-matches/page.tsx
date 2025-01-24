'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app/Sidebar'
import { BottomNav } from '@/components/navigation/BottomNav'
import { MyBookingsPageSkeleton } from "@/components/skeletons/MyBookingsPageSkeleton"
import { MobileBookingFilters } from '@/components/bookings/MobileBookingFilters'
import { MatchCard } from '@/components/matches/MatchCard'
import { MatchTabs } from '@/components/matches/MatchTabs'
import { Match } from '@/mocks/matches'

export default function MyMatchesPage() {
  const [matches, setMatches] = useState<Match[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming')
  const [searchQuery, setSearchQuery] = useState('')
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId')

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setIsLoading(true)
        const { mockMatches } = await import('@/mocks/matches')
        setMatches(mockMatches)
      } catch (error) {
        console.error('Error fetching matches:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMatches()
  }, [])

  const filteredMatches = matches.filter(match => {
    // Filtrar por estado según el tab activo
    if (activeTab === 'upcoming') return match.status === 'pending'
    if (activeTab === 'completed') return match.status === 'completed'
    if (activeTab === 'cancelled') return match.status === 'cancelled'

    // Filtrar por búsqueda si hay una query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        match.opponent.name.toLowerCase().includes(query) ||
        match.tournament_name.toLowerCase().includes(query) ||
        match.court.name.toLowerCase().includes(query)
      )
    }

    return true
  })

  const handleCancel = async (matchId: string) => {
    try {
      console.log('Cancelando partido:', matchId)
      setMatches(prevMatches =>
        prevMatches.map(match =>
          match.id === matchId
            ? { ...match, status: 'cancelled' as const }
            : match
        )
      )
    } catch (error) {
      console.error('Error al cancelar el partido:', error)
    }
  }

  const handleReschedule = async (matchId: string) => {
    try {
      console.log('Reprogramando partido:', matchId)
    } catch (error) {
      console.error('Error al reprogramar el partido:', error)
    }
  }

  if (isLoading) {
    return (
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <MyBookingsPageSkeleton />
          <BottomNav />
        </div>
      </SidebarProvider>
    )
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1">
          <div className="flex flex-col h-full">
            <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 pb-24 md:pb-8">
              <div className="flex items-center justify-between gap-4 mb-8">
                <h2 className="text-xl font-semibold md:hidden">Mis Partidos</h2>
                
                <div className="hidden lg:block relative w-64">
                  <Input
                    type="text"
                    placeholder="Buscar partidos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                <div className="hidden lg:block">
                  <MatchTabs activeTab={activeTab} onTabChange={setActiveTab} />
                </div>

                <div className="lg:hidden">
                  <MobileBookingFilters
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    activeTab={activeTab}
                    onTabChange={(tab) => setActiveTab(tab as 'upcoming' | 'completed' | 'cancelled')}
                  />
                </div>
              </div>
              
              <div className="grid gap-4">
                {filteredMatches.map((match) => (
                  <MatchCard
                    key={match.id}
                    match={match}
                    className="text-base md:text-lg"
                    onCancel={handleCancel}
                    onReschedule={handleReschedule}
                  />
                ))}

                {filteredMatches.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    No hay partidos {activeTab === 'upcoming' ? 'próximos' : 
                                   activeTab === 'completed' ? 'completados' : 'cancelados'}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
        <BottomNav />
      </div>
    </SidebarProvider>
  )
}