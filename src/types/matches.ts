export type MatchStatus = 'pending' | 'completed' | 'cancelled';

export interface Match {
  id: string;
  tournament_name: string;
  match_date: string;
  start_time: string;
  end_time: string;
  status: MatchStatus;
  court: {
    name: string;
  };
  opponent: {
    name: string;
    avatar_url: string;
  };
  score?: string;
}

export type Set = {
  team1Score: number
  team2Score: number
  tiebreak?: boolean
  tiebreakScore?: string // "7-5" por ejemplo
}

export type TournamentMatch = {
  id: number
  round: 'R16' | 'QF' | 'SF' | 'F' // Octavos, Cuartos, Semifinal, Final
  team1: {
    players: string[]
    seed?: number
  }
  team2: {
    players: string[]
    seed?: number
  }
  winner?: 1 | 2
  sets?: Set[]
  date?: string
  time?: string
  court?: string
  completed?: boolean
}

export type TournamentRound = {
  name: string
  matches: TournamentMatch[]
}

export type TournamentBracket = {
  rounds: TournamentRound[]
}