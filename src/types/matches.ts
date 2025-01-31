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

export interface Team {
  players: string[];
  seed?: number;
}

export interface Match {
  id: string;
  round: string;
  team1: Team;
  team2: Team;
  winner?: number;
  completed?: boolean;
  score?: string;
}

export interface Round {
  name: string;
  matches: Match[];
}

export interface TournamentBracket {
  rounds: Round[];
}