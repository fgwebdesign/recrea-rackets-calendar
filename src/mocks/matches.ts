export const mockMatches = [
  {
    id: '1',
    tournament_name: 'Liga Nocturna 2024',
    match_date: '2024-03-19',
    start_time: '20:00',
    end_time: '21:00',
    status: 'completed',
    court: {
      name: 'Cancha 3'
    },
    opponent: {
      name: 'Miguel Sánchez y Juan Pérez',
      avatar_url: '/avatars/player1.jpg'
    },
    score: '6-4, 7-5'
  },
  {
    id: '2',
    tournament_name: 'Liga Nocturna 2024',
    match_date: '2024-03-21',
    start_time: '19:00',
    end_time: '20:00',
    status: 'completed',
    court: {
      name: 'Cancha 1'
    },
    opponent: {
      name: 'Carlos Rodríguez y Jose González',
      avatar_url: '/avatars/player2.jpg'
    },
    score: '4-6, 6-4, 11-9' // Super tie break
  },
  {
    id: '3',
    tournament_name: 'Copa Otoño 2024',
    match_date: '2024-03-25',
    start_time: '21:00',
    end_time: '22:00',
    status: 'completed',
    court: {
      name: 'Cancha 2'
    },
    opponent: {
      name: 'Juan Pérez y Pedro López',
      avatar_url: '/avatars/player3.jpg'
    },
    score: '6-7, 7-6, 7-11' // Derrota en super tie break
  },
  {
    id: '4',
    tournament_name: 'Liga Nocturna 2024',
    match_date: '2024-03-28',
    start_time: '20:00',
    end_time: '21:00',
    status: 'pending',
    court: {
      name: 'Cancha 4'
    },
    opponent: {
      name: 'Diego Martínez y Antonio Martínez',
      avatar_url: '/avatars/player4.jpg'
    }
  },
  {
    id: '5',
    tournament_name: 'Copa Otoño 2024',
    match_date: '2024-03-15',
    start_time: '18:00',
    end_time: '19:00',
    status: 'cancelled',
    court: {
      name: 'Cancha 1'
    },
    opponent: {
      name: 'Luis González y Juan Pérez',
      avatar_url: '/avatars/player5.jpg'
    }
  }
] as const

export type Match = typeof mockMatches[number] 