import { MOCK_TOURNAMENTS } from './tournaments'

export const USER_TOURNAMENTS = [
  {
    id: '1',
    tournament_id: '1',
    name: 'Liga Nocturna 2024',
    status: 'active',
    category: 'Primera',
    registrationDate: '2024-03-15',
    matches: [
      {
        id: '1',
        tournament_name: 'Liga Nocturna 2024',
        match_date: '2024-03-27',
        start_time: '20:00',
        end_time: '21:30',
        status: 'pending',
        court: {
          name: 'Cancha 4'
        },
        opponent: {
          name: 'Diego Martinez y Antonio Martinez',
          avatar_url: '/avatars/opponent1.jpg'
        }
      },
      {
        id: '2',
        tournament_name: 'Liga Nocturna 2024',
        match_date: '2024-04-03',
        start_time: '21:00',
        end_time: '22:30',
        status: 'pending',
        court: {
          name: 'Cancha 2'
        },
        opponent: {
          name: 'Juan Pérez y Pedro González',
          avatar_url: '/avatars/opponent2.jpg'
        }
      }
    ]
  },
  {
    id: '2',
    tournament_id: '2',
    name: 'Torneo Apertura 2024',
    status: 'active',
    category: 'Segunda',
    registrationDate: '2024-03-10',
    matches: [
      {
        id: '3',
        tournament_name: 'Torneo Apertura 2024',
        match_date: '2024-03-30',
        start_time: '19:00',
        end_time: '20:30',
        status: 'pending',
        court: {
          name: 'Cancha 1'
        },
        opponent: {
          name: 'Carlos Rodriguez y Martin Silva',
          avatar_url: '/avatars/opponent3.jpg'
        }
      }
    ]
  }
] 