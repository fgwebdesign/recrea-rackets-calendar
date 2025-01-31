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
  id: string;
  name: string;
  players: string[];
}

export interface TournamentMatch {
  id: string;
  tournament_id: string;
  home_team_id: string;
  away_team_id: string;
  court_id?: string;
  start_time?: string;
  score?: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface Round {
  name: string;
  matches: TournamentMatch[];
}

export interface BracketMatch extends TournamentMatch {
  home_team?: Team;
  away_team?: Team;
  round: string;
  court?: string;
}

export interface TournamentBracket {
  rounds: {
    name: string;
    matches: BracketMatch[];
  }[];
}