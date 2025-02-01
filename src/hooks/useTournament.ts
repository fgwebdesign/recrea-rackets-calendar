import { useState, useEffect } from 'react'
import { Tournament, TournamentInfo } from '../types/tournaments' 

export function useTournament(id: string) {
  const [tournament, setTournament] = useState<Tournament | null>(null)
  const [tournamentInfo, setTournamentInfo] = useState<TournamentInfo | null>(null)
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
        
        setTournament(tournamentDetails)
        setTournamentInfo(tournament_info[0])
        setError(null)
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Error desconocido')
        setTournament(null)
        setTournamentInfo(null)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchTournamentData()
    }
  }, [id])

  return { tournament, tournamentInfo, loading, error }
} 