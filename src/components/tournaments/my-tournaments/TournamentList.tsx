import { Trophy, Calendar, MapPin, Eye, LayoutTemplate } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MOCK_TOURNAMENTS } from '@/mocks/tournaments'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { USER_TOURNAMENTS } from '@/mocks/userTournaments'
import Link from 'next/link'

interface TournamentListProps {
  tournaments: typeof USER_TOURNAMENTS
}

export function TournamentList({ tournaments }: TournamentListProps) {
  const getTournamentDetails = (tournamentId: string) => {
    return MOCK_TOURNAMENTS.find(t => t.id === parseInt(tournamentId))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700'
      case 'completed':
        return 'bg-gray-100 text-gray-700'
      case 'upcoming':
        return 'bg-blue-100 text-blue-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const formatDate = (date: string) => {
    return format(new Date(date), "d 'de' MMMM", { locale: es })
  }

  return (
    <div className="space-y-4">
      {tournaments.map((tournament) => {
        const details = getTournamentDetails(tournament.tournament_id)
        if (!details) return null

        return (
          <div
            key={tournament.tournament_id}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-medium">{details.name}</h3>
                  <Badge variant={details.status === 'open' ? 'default' : 'secondary'}>
                    {details.status === 'open' ? 'Open' : details.status}
                  </Badge>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(details.startDate)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{details.location}</span>
                  </div>
                </div>

                <div className="text-sm">
                  <span className="text-gray-500">Categoría: </span>
                  <span className="font-medium">{details.categories.join(', ')}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Link href={`/tournaments/${details.id}`}>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Ver detalles
                  </Button>
                </Link>
                <Link href={`/tournaments/${details.id}/fixture`}>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <LayoutTemplate className="h-4 w-4" />
                    Ver fixture
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
} 