import { useState } from 'react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Clock, MapPin, Calendar } from 'lucide-react'
import { Match } from '@/types/matches'
import { CancelMatchDialog } from './CancelMatchDialog'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

interface MatchCardProps {
  match: Match
  className?: string
  onCancel?: (matchId: string) => void
  onReschedule?: (matchId: string) => void
  variant?: 'default' | 'compact'
}

export function MatchCard({ 
  match, 
  className = '',
  onCancel,
  onReschedule,
  variant = 'default'
}: MatchCardProps) {
  const [showCancelDialog, setShowCancelDialog] = useState(false)

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Fecha no disponible'
    
    try {
      // Verificamos si la fecha es válida
      const date = new Date(dateString)
      if (isNaN(date.getTime())) {
        return 'Fecha no disponible'
      }
      return format(date, "d 'de' MMMM", { locale: es })
    } catch (error) {
      console.error('Error parsing date:', error)
      return 'Fecha no disponible'
    }
  }

  const formatDayNumber = (dateString?: string) => {
    if (!dateString) return '--'
    
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) {
        return '--'
      }
      return format(date, 'd')
    } catch (error) {
      return '--'
    }
  }

  const formatDayName = (dateString?: string) => {
    if (!dateString) return '--'
    
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) {
        return '--'
      }
      return format(date, 'EEE', { locale: es })
    } catch (error) {
      return '--'
    }
  }

  const formatMonth = (dateString?: string) => {
    if (!dateString) return '--'
    
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) {
        return '--'
      }
      return format(date, 'MMM', { locale: es })
    } catch (error) {
      return '--'
    }
  }

  const getInitials = (name?: string) => {
    if (!name) return '--'
    
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

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

  if (variant === 'compact') {
    return (
      <div className="p-4 rounded-lg border border-gray-100 hover:border-blue-100 hover:bg-blue-50/50 transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <Avatar>
              <AvatarImage 
                src={match.opponent?.avatar_url} 
                alt={match.opponent?.name || 'Oponente'} 
              />
              <AvatarFallback>{getInitials(match.opponent?.name)}</AvatarFallback>
            </Avatar>
          </div>
          
          <div className="flex-grow min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium text-gray-900 truncate">
                vs. {match.opponent?.name || 'Por definir'}
              </span>
              <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
                {match.tournament_name || 'Torneo'}
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{match.match_date ? formatDate(match.match_date) : 'Fecha no disponible'}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{match.start_time || 'Hora no disponible'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className={`bg-white rounded-xl p-4 shadow-sm border border-gray-100 ${className}`}>
        <div className="flex items-start gap-4">
          {/* Fecha */}
          <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-3 text-center min-w-[4.5rem]">
            <span className="text-sm font-medium text-gray-400 uppercase">
              {formatDayName(match.match_date)}
            </span>
            <span className="text-2xl font-bold text-gray-900">
              {formatDayNumber(match.match_date)}
            </span>
            <span className="text-sm font-medium text-gray-400 uppercase">
              {formatMonth(match.match_date)}
            </span>
          </div>

          {/* Contenido principal */}
          <div className="flex-grow">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-medium">
                vs. {match.opponent?.name || 'Por definir'}
              </h3>
              <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
                {match.tournament_name}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{match.start_time}hs</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{match.court.name}</span>
              </div>
            </div>
          </div>

          {/* Acciones */}
          {match.status === 'pending' && (
            <div className="flex flex-col gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onReschedule?.(match.id)}
              >
                Reprogramar
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleCancelClick}
              >
                Cancelar
              </Button>
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