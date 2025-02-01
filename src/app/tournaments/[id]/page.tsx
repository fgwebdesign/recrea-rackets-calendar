"use client"

import { useParams, useRouter } from "next/navigation"
import { Trophy, MapPin, Calendar, ChevronLeft, Medal, ArrowRight, AlertCircle, Download } from "lucide-react"
import { AppSidebar } from "@/components/app/Sidebar"
import { BottomNav } from "@/components/navigation/BottomNav"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import Image from "next/image"
import { useTournament } from "@/hooks/useTournament"
import { TournamentSkeleton } from "@/components/tournaments/TournamentSkeleton"
import { TournamentError } from "@/components/tournaments/TournamentError"
import { generateRulesPDF } from "@/utils/pdfUtils"


export default function TournamentDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { tournament, tournamentInfo, sponsors, loading, error } = useTournament(params.id as string)

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "d 'de' MMMM, yyyy", { locale: es })
  }

  if (loading) {
    return <TournamentSkeleton />
  }

  if (error || !tournament || !tournamentInfo) {
    return <TournamentError message={error || 'No se pudo encontrar la información del torneo'} />
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-50 w-full">
        <AppSidebar />
        <main className="flex-1 overflow-x-hidden w-full">
          {/* Hero Banner */}
          <div className="relative h-[300px] w-full">
            <Image
              src={tournamentInfo.tournament_thumbnail || "/assets/padelcancha.jpeg"}
              alt="Banner del torneo"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
            
            {/* Contenido del banner */}
            <div className="absolute bottom-0 w-full p-6 md:p-8">
              <div className="flex justify-between items-end">
                {/* Información del torneo */}
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{tournament.name}</h1>
                  <div className="flex items-center gap-4 text-white/90">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{formatDate(tournament.start_date)} - {formatDate(tournament.end_date)}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{tournamentInfo.tournament_location}</span>
                    </div>
                  </div>
                </div>

                {/* Sponsors */}
                {sponsors.length > 0 && (
                  <div className="hidden md:block">
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-white/80 text-sm font-medium">
                        Patrocinado por
                      </span>
                      <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-6 py-4 rounded-xl">
                        {sponsors.map((sponsor) => (
                          <div key={sponsor.id} className="relative h-8 w-24">
                            <Image
                              src={sponsor.logo_url}
                              alt={sponsor.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="w-full px-4 py-6 sm:px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6 md:space-y-8">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 h-12 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  onClick={() => router.back()}
                >
                  <ChevronLeft className="w-5 h-5" />
                  Volver a Torneos
                </Button>

                {/* Descripción */}
                <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Acerca del torneo</h2>
                  <p className="text-gray-600">{tournamentInfo.description}</p>
                </section>

                {/* Premios */}
                <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <Trophy className="h-6 w-6 text-yellow-500" />
                    Premios
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="relative bg-gradient-to-br from-yellow-50 to-yellow-100/50 rounded-xl p-6 border border-yellow-200">
                      <div className="absolute -top-4 right-4">
                        <Trophy className="h-8 w-8 text-yellow-500" />
                      </div>
                      <div className="text-yellow-600 font-semibold mb-2 text-lg">1° Lugar</div>
                      <div className="text-gray-700 font-medium">{tournamentInfo.first_place_prize}</div>
                    </div>
                    <div className="relative bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl p-6 border border-gray-200">
                      <div className="absolute -top-4 right-4">
                        <Medal className="h-8 w-8 text-gray-400" />
                      </div>
                      <div className="text-gray-600 font-semibold mb-2 text-lg">2° Lugar</div>
                      <div className="text-gray-700 font-medium">{tournamentInfo.second_place_prize}</div>
                    </div>
                    <div className="relative bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl p-6 border border-orange-200">
                      <div className="absolute -top-4 right-4">
                        <Medal className="h-8 w-8 text-orange-500" />
                      </div>
                      <div className="text-orange-600 font-semibold mb-2 text-lg">3° Lugar</div>
                      <div className="text-gray-700 font-medium">{tournamentInfo.third_place_prize}</div>
                    </div>
                  </div>
                </section>

                {/* Reglamento */}
                <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Reglamento</h2>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                      onClick={() => generateRulesPDF(tournament.name, tournamentInfo.rules)}
                    >
                      <Download className="w-4 h-4" />
                      Descargar PDF
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {tournamentInfo.rules.split('\n').map((rule: string, index: number) => (
                      <div key={index} className="flex gap-2 text-gray-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                        {rule}
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Inscripción */}
                <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
                  <div className="space-y-6">
                    {/* Precio y estado */}
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-3xl font-bold text-blue-600">${tournamentInfo.inscription_cost}</div>
                        <div className="text-gray-500 text-sm">por equipo</div>
                      </div>
                      <div className="bg-green-100 px-4 py-2 rounded-full">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                          <span className="text-green-700 text-sm font-medium">
                            {tournament.status === 'upcoming' ? 'Inscripciones abiertas' : 'Inscripciones cerradas'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Información importante */}
                    <div className="space-y-4 py-4 border-y border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-50 p-2 rounded-lg">
                          <Calendar className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Fecha límite de inscripción</div>
                          <div className="font-medium">{formatDate(tournamentInfo.signup_limit_date)}</div>
                        </div>
                      </div>
                    </div>

                    {/* Botón de inscripción */}
                    <Button 
                      className="w-full h-12 text-base bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/35 transition-all duration-300 hover:scale-[1.02] group"
                      onClick={() => router.push(`/tournaments/${tournament.id}/register`)}
                    >
                      Inscribirse ahora
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>

                    {/* Nota informativa */}
                    <div className="flex items-start gap-2 text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                      <p>
                        Al inscribirte aceptas el reglamento del torneo y las políticas de participación.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Sede */}
                <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
                  <h3 className="font-semibold mb-4">Sede del torneo</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="font-medium text-gray-900 mb-1">
                        {tournamentInfo.tournament_club_name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {tournamentInfo.tournament_address}
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
        <BottomNav />
      </div>
    </SidebarProvider>
  )
}