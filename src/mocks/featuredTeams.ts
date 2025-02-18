export interface FeaturedTeamData {
  id: string;           // ID único del equipo
  players: {
    id: string;        // ID del jugador en la base de datos
    name: string;
    avatar?: string;   // URL de la imagen del jugador
  }[];
  position: number;
  category: string;
  stats: {
    matchesPlayed: number;
    wins: number;
    losses: number;    // Agregamos losses para tener el registro completo
    winRate: number;
    ranking: number;
    rankingPoints: number;  // Puntos totales del ranking
    streak?: number;        // Racha actual de victorias/derrotas
  };
  tournament?: {      // Información del último torneo
    id: string;
    name: string;
    result: string;
  };
}

export const mockFeaturedTeams: FeaturedTeamData[] = [
  {
    id: "team-001",
    players: [
      {
        id: "player-001",
        name: "Felipe Gutiérrez",
        avatar: "/assets/user.png"
      },
      {
        id: "player-002",
        name: "Juan Pérez",
        avatar: "/assets/user.png"
      }
    ],
    position: 1,
    category: "Primera A",
    stats: {
      matchesPlayed: 24,
      wins: 18,
      losses: 6,
      winRate: 75,
      ranking: 1520,
      rankingPoints: 1520,
      streak: 5
    },
    tournament: {
      id: "tournament-001",
      name: "Torneo Apertura 2024",
      result: "Campeón"
    }
  },
  // Puedes agregar más equipos mock aquí
];

// Helper function para calcular estadísticas
export function calculateTeamStats(matches: any[]): Omit<FeaturedTeamData['stats'], 'ranking' | 'rankingPoints'> {
  const totalMatches = matches.length;
  const wins = matches.filter(match => match.result === 'win').length;
  
  return {
    matchesPlayed: totalMatches,
    wins,
    losses: totalMatches - wins,
    winRate: Math.round((wins / totalMatches) * 100),
    streak: calculateCurrentStreak(matches)
  };
}

function calculateCurrentStreak(matches: any[]): number {
  // Implementar lógica para calcular racha actual
  return 0;
} 