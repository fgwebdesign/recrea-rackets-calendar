'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Search, Calendar, Trophy, XCircle } from 'lucide-react'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app/Sidebar'
import { BottomNav } from '@/components/navigation/BottomNav'
import { MyBookingsPageSkeleton } from "@/components/skeletons/MyBookingsPageSkeleton"
import { MobileBookingFilters } from '@/components/bookings/MobileBookingFilters'
import { MatchCard } from '@/components/matches/MatchCard'
import { MatchTabs } from '@/components/matches/MatchTabs'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Toast } from '@/components/ui/toast'

// Primero definimos los tipos posibles para el status
type MatchStatus = 'pending' | 'completed' | 'cancelled';

// Definimos la interfaz para Match
interface Match {
  id: string;
  tournament_name: string;
  match_date: string;
  start_time: string;
  end_time: string;
  status: MatchStatus;
  court: {
    name: string;
  };
  opponent: {
    name: string;
    avatar_url: string;
  };
  score?: string;
}

const MATCH_STATUS = {
  UPCOMING: 'pending',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
} as const;

const EMPTY_STATE_CONTENT = {
  upcoming: {
    icon: Calendar,
    title: 'Sin partidos próximos',
    description: 'No tienes partidos programados. ¡Inscríbete en un torneo para comenzar a jugar!',
    actionLabel: 'Ver torneos disponibles',
    actionHref: '/tournaments'
  },
  completed: {
    icon: Trophy,
    title: 'Sin partidos completados',
    description: 'Aún no has completado ningún partido. ¡Tus resultados aparecerán aquí!',
    actionLabel: 'Ver próximos partidos',
    actionHref: '/my-matches?tab=upcoming'
  },
  cancelled: {
    icon: XCircle,
    title: 'Sin partidos cancelados',
    description: 'No tienes partidos cancelados. ¡Mantén el buen ritmo!',
    actionLabel: 'Ver próximos partidos',
    actionHref: '/my-matches?tab=upcoming'
  }
} as const;

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
        setMatches(mockMatches as Match[])
      } catch (error) {
        console.error('Error fetching matches:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMatches()
  }, [])

  const filteredMatches = matches.filter(match => {
    // Primero filtramos por estado según el tab activo
    const matchesStatusFilter = match.status === MATCH_STATUS[activeTab.toUpperCase() as keyof typeof MATCH_STATUS]
    
    // Si hay búsqueda, aplicamos el filtro de búsqueda
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return matchesStatusFilter && (
        match.opponent.name.toLowerCase().includes(query) ||
        match.tournament_name.toLowerCase().includes(query) ||
        match.court.name.toLowerCase().includes(query)
      )
    }

    return matchesStatusFilter
  })

  const handleCancel = async (matchId: string) => {
    try {
      const matchToCancel = matches.find(match => match.id === matchId)
      
      if (!matchToCancel) {
        throw new Error('Partido no encontrado')
      }

      if (matchToCancel.status !== 'pending') {
        throw new Error('Solo se pueden cancelar partidos pendientes')
      }

      setMatches(prevMatches =>
        prevMatches.map(match =>
          match.id === matchId
            ? { ...match, status: 'cancelled' }
            : match
        )
      )

      Toast({
        title: "Partido cancelado",
        variant: "default",
      })

    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Error al cancelar el partido'

      console.error('Error al cancelar el partido:', error)
      
      Toast({
        title: errorMessage,
        variant: "destructive",
      })
    }
  }

  const handleReschedule = async (matchId: string) => {
    try {
      console.log('Reprogramando partido:', matchId)
    } catch (error) {
      console.error('Error al reprogramar el partido:', error)
    }
  }

  const EmptyState = ({ 
    activeTab, 
    hasSearchQuery, 
    searchQuery 
  }: { 
    activeTab: keyof typeof EMPTY_STATE_CONTENT,
    hasSearchQuery: boolean,
    searchQuery: string 
  }) => {
    if (hasSearchQuery) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No se encontraron resultados
          </h3>
          <p className="text-gray-500 text-center max-w-sm mb-6">
            No hay partidos que coincidan con "{searchQuery}". 
            Intenta con otros términos de búsqueda.
          </p>
          <Button 
            variant="outline" 
            onClick={() => setSearchQuery('')}
          >
            Limpiar búsqueda
          </Button>
        </div>
      )
    }

    const content = EMPTY_STATE_CONTENT[activeTab]

    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <content.icon className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {content.title}
        </h3>
        <p className="text-gray-500 text-center max-w-sm mb-6">
          {content.description}
        </p>
        <Link href={content.actionHref}>
          <Button variant="default">
            {content.actionLabel}
          </Button>
        </Link>
      </div>
    )
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
                    match={match as Match}
                    className="text-base md:text-lg"
                    onCancel={handleCancel}
                    onReschedule={handleReschedule}
                  />
                ))}

                {filteredMatches.length === 0 && (
                  <EmptyState 
                    activeTab={activeTab}
                    hasSearchQuery={searchQuery.length > 0}
                    searchQuery={searchQuery}
                  />
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