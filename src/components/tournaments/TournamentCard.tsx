"use client"

import {  ChevronRight, Calendar } from "lucide-react"  
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { useRouter } from "next/navigation"

interface TournamentCardProps {
  tournament: {
    id: string
    name: string
    start_date: string
    end_date: string
  }
}

export function TournamentCard({ tournament }: TournamentCardProps) {
  const router = useRouter()
  
  console.log('Tournament in card:', tournament)
  
  const formatDate = (date: string) => {
    return format(new Date(date), "d 'de' MMMM, yyyy", { locale: es })
  }

  return (
    <div className="group cursor-pointer bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-gray-200">
      <div className="p-3 sm:p-4 md:p-5">
        <div className="mb-3 sm:mb-4">
          <h3 className="font-semibold text-gray-900 text-base sm:text-lg">
            {tournament.name}
          </h3>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span>Inicio: {formatDate(tournament.start_date)}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span>Fin: {formatDate(tournament.end_date)}</span>
          </div>
        </div>
      </div>

      <div className="p-3 sm:p-4 md:p-5 border-t border-gray-100">
        <div className="flex gap-2">
          <Button 
            onClick={(e) => {
              e.stopPropagation();
              console.log('Navigating to tournament:', tournament.id)
              router.push(`/tournaments/${tournament.id}`)
            }}
            variant="outline"
            className="flex-1 h-8 sm:h-10 text-xs sm:text-sm border-gray-200 hover:bg-gray-50 group-hover:scale-[1.02] transition-transform"
          >
            Ver detalles
          </Button>
          <Button 
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/tournaments/${tournament.id}/register`)
            }}
            className="flex-1 h-8 sm:h-10 text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 text-white group-hover:scale-[1.02] transition-transform"
          >
            Inscribirse <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 ml-1 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </div>
      </div>
    </div>
  )
}