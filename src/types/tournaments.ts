export interface Tournament {
  id: string
  name: string
  start_date: string
  end_date: string
  status: string
  category_id: string | null
  created_at: string
  updated_at: string
}

export interface TournamentInfo {
  id: string
  tournament_id: string
  first_place_prize: string
  second_place_prize: string
  third_place_prize: string
  description: string
  rules: string
  tournament_location: string
  signup_limit_date: string
  inscription_cost: number
  sponsors: string
  tournament_thumbnail: string
  tournament_address: string
  tournament_club_name: string
} 