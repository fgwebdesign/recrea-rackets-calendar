'use client'

import Image from 'next/image'
import { Calendar, MapPin, Trophy } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { cn } from '@/lib/utils'

interface TournamentBannerProps {
  tournament: {
    id: string;
    name: string;
    start_date: string;
    end_date: string;
    status: string;
    courts_available: number;
    time_slots: number[][];
    tournament_teams: Array<{
      team_id: string;
      teams: {
        id: string;
        player1_id: string;
        player2_id: string;
      };
    }>;
  };
}

export function TournamentBanner({ tournament }: TournamentBannerProps) {
  const formatDate = (date: string) => {
    return format(new Date(date), "d 'de' MMMM, yyyy", { locale: es })
  }

  const formatTimeSlot = (slot: number[]) => {
    return `${slot[0]}:00 - ${slot[1]}:00`
  }

  return (
    <div className="space-y-6">
      {/* Imagen del banner */}
      <div className="relative w-full h-[500px] sm:h-[400px] rounded-xl overflow-hidden">
        <Image
          src="/assets/banner.jpg"
          alt="Banner del torneo"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/20 to-transparent" />
      </div>

      {/* Detalles del torneo */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{tournament.name}</h2>
          
          <div className="flex flex-wrap items-center gap-6 text-sm mb-6">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="h-4 w-4 text-blue-500" />
              <span>{formatDate(tournament.start_date)} - {formatDate(tournament.end_date)}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Trophy className="h-4 w-4 text-blue-500" />
              <span>Canchas disponibles: {tournament.courts_available}</span>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Horarios del Torneo:</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {tournament.time_slots.map((slot, index) => (
                <div 
                  key={index}
                  className="p-3 rounded-lg bg-blue-50 border border-blue-100 text-center"
                >
                  <span className="text-sm text-blue-700">{formatTimeSlot(slot)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-100 mt-6 pt-6">
            <h3 className="text-sm font-medium text-gray-900 mb-4">
              Equipos Registrados: {tournament.tournament_teams.length}
            </h3>
          </div>
        </div>
      </div>
    </div>
  )
}