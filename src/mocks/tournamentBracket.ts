import { TournamentBracket } from "@/types/matches";

export const MOCK_TOURNAMENT_BRACKET: TournamentBracket = {
  rounds: [
    {
      name: 'Octavos de Final',
      matches: [
        {
          id: '1',
          tournament_id: '1',
          home_team_id: 'team1',
          away_team_id: 'team2',
          home_team: {
            id: 'team1',
            name: 'Equipo 1',
            players: ['Gutierrez', 'Erramuspe']
          },
          away_team: {
            id: 'team2',
            name: 'Equipo 2',
            players: ['Silva', 'Pereira']
          },
          status: 'completed',
          score: '6-4, 6-2',
          start_time: '2024-03-20T15:00:00Z',
          court_id: 'court1',
          round: '8vos',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: '2',
          tournament_id: '1',
          home_team_id: 'team3',
          away_team_id: 'team4',
          home_team: {
            id: 'team3',
            name: 'Equipo 3',
            players: ['Rodriguez', 'Martinez']
          },
          away_team: {
            id: 'team4',
            name: 'Equipo 4',
            players: ['Lopez', 'Garcia']
          },
          status: 'completed',
          score: '7-5, 6-4',
          start_time: '2024-03-20T15:00:00Z',
          court_id: 'court2',
          round: '8vos',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: '3',
          tournament_id: '1',
          home_team_id: 'team5',
          away_team_id: 'team6',
          home_team: {
            id: 'team5',
            name: 'Equipo 5',
            players: ['Fernandez', 'Diaz']
          },
          away_team: {
            id: 'team6',
            name: 'Equipo 6',
            players: ['Perez', 'Gomez']
          },
          status: 'completed',
          score: '6-3, 7-6',
          start_time: '2024-03-20T15:00:00Z',
          court_id: 'court3',
          round: '8vos',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: '4',
          tournament_id: '1',
          home_team_id: 'team7',
          away_team_id: 'team8',
          home_team: {
            id: 'team7',
            name: 'Equipo 7',
            players: ['Torres', 'Ramirez']
          },
          away_team: {
            id: 'team8',
            name: 'Equipo 8',
            players: ['Sanchez', 'Ruiz']
          },
          status: 'completed',
          score: '6-2, 6-1',
          start_time: '2024-03-20T15:00:00Z',
          court_id: 'court4',
          round: '8vos',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: '5',
          tournament_id: '1',
          home_team_id: 'team9',
          away_team_id: 'team10',
          home_team: {
            id: 'team9',
            name: 'Equipo 9',
            players: ['Castro', 'Morales']
          },
          away_team: {
            id: 'team10',
            name: 'Equipo 10',
            players: ['Flores', 'Herrera']
          },
          status: 'completed',
          score: '7-6, 6-4',
          start_time: '2024-03-20T15:00:00Z',
          court_id: 'court5',
          round: '8vos',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: '6',
          tournament_id: '1',
          home_team_id: 'team11',
          away_team_id: 'team12',
          home_team: {
            id: 'team11',
            name: 'Equipo 11',
            players: ['Ortiz', 'Vargas']
          },
          away_team: {
            id: 'team12',
            name: 'Equipo 12',
            players: ['Jimenez', 'Romero']
          },
          status: 'completed',
          score: '6-4, 6-3',
          start_time: '2024-03-20T15:00:00Z',
          court_id: 'court6',
          round: '8vos',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: '7',
          tournament_id: '1',
          home_team_id: 'team13',
          away_team_id: 'team14',
          home_team: {
            id: 'team13',
            name: 'Equipo 13',
            players: ['Soto', 'Reyes']
          },
          away_team: {
            id: 'team14',
            name: 'Equipo 14',
            players: ['Cruz', 'Moreno']
          },
          status: 'completed',
          score: '6-2, 6-4',
          start_time: '2024-03-20T15:00:00Z',
          court_id: 'court7',
          round: '8vos',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: '8',
          tournament_id: '1',
          home_team_id: 'team15',
          away_team_id: 'team16',
          home_team: {
            id: 'team15',
            name: 'Equipo 15',
            players: ['Acosta', 'Medina']
          },
          away_team: {
            id: 'team16',
            name: 'Equipo 16',
            players: ['Rojas', 'Mendoza']
          },
          status: 'completed',
          score: '7-5, 7-5',
          start_time: '2024-03-20T15:00:00Z',
          court_id: 'court8',
          round: '8vos',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      ]
    },
    {
      name: 'Cuartos de Final',
      matches: [
        {
          id: '9',
          tournament_id: '1',
          home_team_id: 'team1',
          away_team_id: 'team3',
          home_team: {
            id: 'team1',
            name: 'Equipo 1',
            players: ['Gutierrez', 'Erramuspe']
          },
          away_team: {
            id: 'team3',
            name: 'Equipo 3',
            players: ['Rodriguez', 'Martinez']
          },
          status: 'completed',
          score: '6-3, 6-4',
          start_time: '2024-03-20T15:00:00Z',
          court_id: 'court9',
          round: '4tos',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: '10',
          tournament_id: '1',
          home_team_id: 'team5',
          away_team_id: 'team7',
          home_team: {
            id: 'team5',
            name: 'Equipo 5',
            players: ['Perez', 'Gomez']
          },
          away_team: {
            id: 'team7',
            name: 'Equipo 7',
            players: ['Torres', 'Ramirez']
          },
          status: 'completed',
          score: '7-6, 6-2',
          start_time: '2024-03-20T15:00:00Z',
          court_id: 'court10',
          round: '4tos',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: '11',
          tournament_id: '1',
          home_team_id: 'team9',
          away_team_id: 'team11',
          home_team: {
            id: 'team9',
            name: 'Equipo 9',
            players: ['Castro', 'Morales']
          },
          away_team: {
            id: 'team11',
            name: 'Equipo 11',
            players: ['Jimenez', 'Romero']
          },
          status: 'completed',
          score: '6-4, 7-5',
          start_time: '2024-03-20T15:00:00Z',
          court_id: 'court11',
          round: '4tos',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: '12',
          tournament_id: '1',
          home_team_id: 'team15',
          away_team_id: 'team16',
          home_team: {
            id: 'team15',
            name: 'Equipo 15',
            players: ['Acosta', 'Medina']
          },
          away_team: {
            id: 'team16',
            name: 'Equipo 16',
            players: ['Rojas', 'Mendoza']
          },
          status: 'completed',
          score: '6-3, 6-4',
          start_time: '2024-03-20T15:00:00Z',
          court_id: 'court12',
          round: '4tos',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      ]
    },
    {
      name: 'Semifinales',
      matches: [
        {
          id: '13',
          tournament_id: '1',
          home_team_id: 'team1',
          away_team_id: 'team5',
          home_team: {
            id: 'team1',
            name: 'Equipo 1',
            players: ['Gutierrez', 'Erramuspe']
          },
          away_team: {
            id: 'team5',
            name: 'Equipo 5',
            players: ['Torres', 'Ramirez']
          },
          status: 'completed',
          score: '7-5, 6-4',
          start_time: '2024-03-20T15:00:00Z',
          court_id: 'court13',
          round: 'SF',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: '14',
          tournament_id: '1',
          home_team_id: 'team9',
          away_team_id: 'team15',
          home_team: {
            id: 'team9',
            name: 'Equipo 9',
            players: ['Castro', 'Morales']
          },
          away_team: {
            id: 'team15',
            name: 'Equipo 15',
            players: ['Acosta', 'Medina']
          },
          status: 'completed',
          score: '6-4, 7-6',
          start_time: '2024-03-20T15:00:00Z',
          court_id: 'court14',
          round: 'SF',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      ]
    },
    {
      name: 'Final',
      matches: [
        {
          id: '15',
          tournament_id: '1',
          home_team_id: 'team1',
          away_team_id: 'team9',
          home_team: {
            id: 'team1',
            name: 'Equipo 1',
            players: ['Gutierrez', 'Erramuspe']
          },
          away_team: {
            id: 'team9',
            name: 'Equipo 9',
            players: ['Acosta', 'Medina']
          },
          status: 'completed',
          score: '6-4, 6-3',
          start_time: '2024-03-20T15:00:00Z',
          court_id: 'court15',
          round: 'F',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      ]
    }
  ]
}; 