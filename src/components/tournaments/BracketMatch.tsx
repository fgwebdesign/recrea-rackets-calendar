import { Calendar, Clock, MapPin } from 'lucide-react'
import { TournamentMatch, Set } from '../../types/matches'

interface BracketMatchProps {
  match: TournamentMatch
  position?: 'top' | 'bottom'
  showConnector?: boolean
  showVerticalConnector?: boolean
  verticalHeight?: string
  isLast?: boolean
  isMobile?: boolean
}

export function BracketMatch({
  match,
  position,
  showConnector = true,
  showVerticalConnector = true,
  verticalHeight,
  isLast,
  isMobile
}: BracketMatchProps) {
  const formatScore = (sets: Set[]) => {
    return sets.map(set => {
      if (set.tiebreak) {
        return `${set.team1Score}-${set.team2Score}(${set.tiebreakScore})`
      }
      return `${set.team1Score}-${set.team2Score}`
    }).join(' ')
  }

  return (
    <div className="relative group">
      <div className={`border rounded-lg overflow-hidden transition-all duration-200 ${
        match.completed ? 'border-gray-200 bg-gray-50' : 'border-gray-200 hover:border-blue-200 hover:shadow-md'
      }`}>
        <div className={`p-2 border-b ${match.winner === 1 ? 'bg-blue-50' : ''}`}>
          <div className="flex justify-between items-center">
            <span className={`text-xs font-medium ${match.winner === 1 ? 'text-blue-600' : match.completed ? 'text-gray-400' : 'text-gray-700'}`}>
              {match.team1.players.join(' ')}
            </span>
            {match.sets && <span className="text-xs text-gray-500">{formatScore(match.sets)}</span>}
          </div>
        </div>
        <div className={`p-2 ${match.winner === 2 ? 'bg-blue-50' : ''}`}>
          <div className="flex justify-between items-center">
            <span className={`text-xs font-medium ${match.winner === 2 ? 'text-blue-600' : match.completed ? 'text-gray-400' : 'text-gray-700'}`}>
              {match.team2.players.join(' ')}
            </span>
            {match.sets && <span className="text-xs text-gray-500">{formatScore(match.sets)}</span>}
          </div>
        </div>

        {/* Información adicional del partido */}
        {!match.completed && (match.date || match.time || match.court) && (
          <div className="bg-gray-50 px-2 py-1 border-t border-gray-100">
            <div className="flex items-center gap-2 text-[10px] text-gray-500">
              {match.date && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{match.date}</span>
                </div>
              )}
              {match.time && (
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{match.time}</span>
                </div>
              )}
              {match.court && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{match.court}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Sistema de conectores mejorado */}
      {!isMobile && (
        <>
          {/* Línea horizontal base */}
          {showConnector && (
            <div className="absolute top-1/2 -right-4 w-4 h-[2px] bg-gray-200" />
          )}

          {/* Líneas verticales con altura dinámica */}
          {showVerticalConnector && position === 'top' && (
            <div 
              className="absolute top-1/2 -right-4 w-[2px] bg-gray-200"
              style={{
                height: verticalHeight,
                transform: 'translateY(0%)'
              }}
            />
          )}
          {showVerticalConnector && position === 'bottom' && (
            <div 
              className="absolute top-1/2 -right-4 w-[2px] bg-gray-200"
              style={{
                height: verticalHeight,
                transform: 'translateY(-100%)'
              }}
            />
          )}

          {/* Línea conectora larga para siguiente ronda */}
          {!isLast && position && (
            <div 
              className="absolute top-1/2 w-8 h-[2px] bg-gray-200"
              style={{ right: '-2rem' }}
            />
          )}
        </>
      )}
    </div>
  )
} 