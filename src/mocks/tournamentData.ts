import { TournamentBracket } from "@/types/matches";

export const MOCK_TOURNAMENT_BRACKET: TournamentBracket = {
  rounds: [
    {
      name: 'Octavos de Final',
      matches: [
        {
          id: 1,
          round: 'R16',
          team1: { players: ['Díaz', 'Cuevas'], seed: 1 },
          team2: { players: ['Martínez', 'López'] },
          winner: 1,
          sets: [{ team1Score: 6, team2Score: 4 }, { team1Score: 6, team2Score: 2 }],
          date: '27 Mar',
          time: '20:00',
          court: 'Cancha 1',
          completed: true
        },
        {
          id: 2,
          round: 'R16',
          team1: { players: ['García', 'Pérez'] },
          team2: { players: ['Rodríguez', 'Sánchez'], seed: 8 },
          date: '27 Mar',
          time: '21:00',
          court: 'Cancha 2'
        },
        {
          id: 3,
          round: 'R16',
          team1: { players: ['Fernández', 'González'], seed: 4 },
          team2: { players: ['Torres', 'Ramírez'] },
          date: '28 Mar',
          time: '19:00',
          court: 'Cancha 3'
        },
        {
          id: 4,
          round: 'R16',
          team1: { players: ['Ruiz', 'Morales'] },
          team2: { players: ['Jiménez', 'Romero'], seed: 5 },
          date: '28 Mar',
          time: '20:00',
          court: 'Cancha 4'
        },
        {
          id: 5,
          round: 'R16',
          team1: { players: ['Castro', 'Ortiz'], seed: 3 },
          team2: { players: ['Silva', 'Vargas'] },
          date: '29 Mar',
          time: '19:00',
          court: 'Cancha 1'
        },
        {
          id: 6,
          round: 'R16',
          team1: { players: ['Herrera', 'Flores'] },
          team2: { players: ['Muñoz', 'Rojas'], seed: 6 },
          date: '29 Mar',
          time: '20:00',
          court: 'Cancha 2'
        },
        {
          id: 7,
          round: 'R16',
          team1: { players: ['Reyes', 'Cruz'], seed: 7 },
          team2: { players: ['Moreno', 'Acosta'] },
          date: '30 Mar',
          time: '19:00',
          court: 'Cancha 3'
        },
        {
          id: 8,
          round: 'R16',
          team1: { players: ['Medina', 'Vega'], seed: 2 },
          team2: { players: ['Campos', 'Molina'] },
          date: '30 Mar',
          time: '20:00',
          court: 'Cancha 4'
        }
      ]
    },
    {
      name: 'Cuartos de Final',
      matches: [
        {
          id: 9,
          round: 'QF',
          team1: { players: ['Díaz', 'Cuevas'], seed: 1 },
          team2: { players: ['Por definir', ''] },
          date: '31 Mar',
          time: '19:00',
          court: 'Cancha 1'
        },
        {
          id: 10,
          round: 'QF',
          team1: { players: ['Por definir', ''] },
          team2: { players: ['Por definir', ''] },
          date: '31 Mar',
          time: '20:00',
          court: 'Cancha 2'
        },
        {
          id: 11,
          round: 'QF',
          team1: { players: ['Por definir', ''] },
          team2: { players: ['Por definir', ''] },
          date: '1 Abr',
          time: '19:00',
          court: 'Cancha 1'
        },
        {
          id: 12,
          round: 'QF',
          team1: { players: ['Por definir', ''] },
          team2: { players: ['Por definir', ''] },
          date: '1 Abr',
          time: '20:00',
          court: 'Cancha 2'
        }
      ]
    },
    {
      name: 'Semifinales',
      matches: [
        {
          id: 13,
          round: 'SF',
          team1: { players: ['Por definir', ''] },
          team2: { players: ['Por definir', ''] },
          date: '2 Abr',
          time: '19:00',
          court: 'Cancha 1'
        },
        {
          id: 14,
          round: 'SF',
          team1: { players: ['Por definir', ''] },
          team2: { players: ['Por definir', ''] },
          date: '2 Abr',
          time: '20:00',
          court: 'Cancha 2'
        }
      ]
    },
    {
      name: 'Final',
      matches: [
        {
          id: 15,
          round: 'F',
          team1: { players: ['Por definir', ''] },
          team2: { players: ['Por definir', ''] },
          date: '3 Abr',
          time: '20:00',
          court: 'Cancha 1'
        }
      ]
    }
  ]
} 