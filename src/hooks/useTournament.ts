import { useState, useEffect } from 'react'
import { Tournament, TournamentInfo, Sponsor } from '../types/tournaments'

export function useTournament(id: string) {
  const [tournament, setTournament] = useState<Tournament | null>(null)
  const [tournamentInfo, setTournamentInfo] = useState<TournamentInfo | null>(null)
  const [sponsors, setSponsors] = useState<Sponsor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTournamentData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tournaments/${id}`)
        
        if (!response.ok) {
          throw new Error(`Error fetching tournament: ${response.status}`)
        }
        
        const tournamentData = await response.json()

        if (!tournamentData || !tournamentData.tournament_info) {
          throw new Error('Tournament not found')
        }

        const {tournament_info, tournament_teams, ...tournamentDetails} = tournamentData
        const currentTournamentInfo = tournament_info[0]
        
        // Obtener los IDs de los sponsors
        const sponsorIds = JSON.parse(currentTournamentInfo.sponsors || '[]')
        
        // Fetch de la información de los sponsors
        if (sponsorIds.length > 0) {
          const sponsorsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sponsors?ids=${sponsorIds.join(',')}`)
          if (sponsorsResponse.ok) {
            const sponsorsData = await sponsorsResponse.json()
            setSponsors(sponsorsData)
          }
        }

        setTournament(tournamentDetails)
        setTournamentInfo(currentTournamentInfo)
        setError(null)
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Error desconocido')
        setTournament(null)
        setTournamentInfo(null)
        setSponsors([])
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchTournamentData()
    }
  }, [id])

  return { tournament, tournamentInfo, sponsors, loading, error }
} 