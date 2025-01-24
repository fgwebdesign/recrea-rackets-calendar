import { useState } from 'react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Clock, MapPin, User2, Trophy, MoreVertical } from 'lucide-react'
import { Match } from '@/mocks/matches'
import { CancelMatchDialog } from './CancelMatchDialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

interface MatchCardProps {
  match: Match
  className?: string
  onCancel?: (matchId: string) => void
  onReschedule?: (matchId: string) => void
}

export function MatchCard({ 
  match, 
  className = '',
  onCancel,
  onReschedule 
}: MatchCardProps) {
  const [showCancelDialog, setShowCancelDialog] = useState(false)

  const date = new Date(match.match_date)
  const dayNumber = format(date, 'd')
  const dayName = format(date, 'EEE', { locale: es })
  const month = format(date, 'MMM', { locale: es })
  
  // Función para parsear el score (ejemplo: "6-4, 7-5" -> [[6,4], [7,5]])
  const parseScore = (score: string) => {
    return score.split(', ').map(set => set.split('-').map(Number))
  }
  
  // Función para determinar si fue victoria
  const isVictory = (score: string) => {
    const sets = parseScore(score)
    let setsWon = 0
    sets.forEach(([myScore, opponentScore]) => {
      if (myScore > opponentScore) setsWon++
    })
    return setsWon > sets.length / 2
  }

  // Función para determinar si un set es super tie break
  const isSuperTieBreak = (set: number[]) => {
    return set[0] >= 10 || set[1] >= 10
  }
  
  const handleCancelClick = () => {
    setShowCancelDialog(true)
  }

  const handleConfirmCancel = () => {
    onCancel?.(match.id)
    setShowCancelDialog(false)
  }

  return (
    <>
      <div className={`bg-white rounded-xl p-4 shadow-sm border border-gray-100 ${className}`}>
        <div className="flex gap-4">
          {/* Date */}
          <div className="flex flex-col items-center min-w-[60px]">
            <span className="text-red-500 font-medium capitalize">{dayName}</span>
            <span className="text-3xl font-bold">{dayNumber}</span>
            <span className="text-sm text-gray-500 capitalize">{month}</span>
          </div>

          <div className="flex-1">
            {/* Time and location */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="h-4 w-4" />
                <span>
                  {match.start_time} - {match.end_time}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span className="font-semibold text-gray-800 text-lg">{match.court.name}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <User2 className="h-4 w-4" />
                <span>vs {match.opponent.name}</span>
              </div>
            </div>

            {/* Status and Tournament */}
            <div className="mt-3">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700">{match.tournament_name}</span>
                <span className={`ml-2 px-2 py-0.5 rounded-full text-sm ${
                  match.status === 'pending' 
                    ? 'bg-yellow-100 text-yellow-700'
                    : match.status === 'completed'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {match.status === 'pending' ? 'Pendiente' : 
                   match.status === 'completed' ? 'Completado' : 'Cancelado'}
                </span>
              </div>
            </div>
          </div>

          {/* Score - Solo se muestra si el partido está completado */}
          {match.status === 'completed' && match.score && (
            <div className="flex flex-col items-end justify-center min-w-[140px] border-l border-gray-100 pl-6">
              <span className="text-base font-medium text-gray-600 mb-2">Resultado</span>
              <div className="flex gap-3 mb-2">
                {parseScore(match.score).map((set, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center ${
                      isSuperTieBreak(set) ? 'bg-blue-50 px-2 rounded-lg' : ''
                    }`}
                  >
                    <span className={`font-['DS-Digital'] text-3xl font-bold ${
                      isSuperTieBreak(set) ? 'text-blue-800' : 'text-green-400'
                    }`}>
                      {set[0]}
                    </span>
                    <span className={`font-['DS-Digital'] text-3xl font-bold mx-1 ${
                      isSuperTieBreak(set) ? 'text-blue-400' : 'text-green-500'
                    }`}>
                      -
                    </span>
                    <span className={`font-['DS-Digital'] text-3xl font-bold ${
                      isSuperTieBreak(set) ? 'text-blue-800' : 'text-green-400'
                    }`}>
                      {set[1]}
                    </span>
                  </div>
                ))}
              </div>
              <span className={`text-sm font-medium ${
                isVictory(match.score) 
                  ? 'text-green-500'
                  : 'text-red-500'
              }`}>
                {isVictory(match.score) ? 'Victoria' : 'Derrota'}
              </span>
            </div>
          )}

          {/* Menú de opciones para partidos pendientes */}
          {match.status === 'pending' && (
            <div className="flex flex-col items-end justify-center min-w-[140px] border-l border-gray-100 pl-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">Abrir menú</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => onReschedule?.(match.id)}
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 cursor-pointer"
                  >
                    Reprogramar partido
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleCancelClick}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                  >
                    Cancelar partido
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>

      <CancelMatchDialog
        isOpen={showCancelDialog}
        onClose={() => setShowCancelDialog(false)}
        onConfirm={handleConfirmCancel}
        matchId={match.id}
        match={match}
      />
    </>
  )
} 