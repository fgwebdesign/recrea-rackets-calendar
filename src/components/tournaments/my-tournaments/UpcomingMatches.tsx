import { Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MatchCard } from '@/components/matches/MatchCard'
import { Match } from '@/types/matches'

interface UpcomingMatchesProps {
  matches: Match[]
}

export function UpcomingMatches({ matches }: UpcomingMatchesProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Próximos Partidos
        </h2>
        <Button variant="outline" size="sm">Ver todos</Button>
      </div>
      
      <div className="space-y-4">
        {matches.map((match) => (
          <MatchCard
            key={match.id}
            match={match}
            variant="compact"
          />
        ))}

        {matches.length === 0 && (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No tienes partidos programados</p>
            <p className="text-sm text-gray-400 mt-1">
              Los próximos partidos aparecerán aquí
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 