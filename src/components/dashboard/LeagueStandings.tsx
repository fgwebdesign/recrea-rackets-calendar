import Link from 'next/link';
import { Trophy } from 'lucide-react';

interface TeamStanding {
  position: number;
  teamName: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

interface LeagueStandingsProps {
  category?: string;
  division?: string;
  standings: any[];
  showViewAllButton?: boolean;
}

export function LeagueStandings({
  category = "Categoría Quinta",
  division = "Liga Nocturna Recrea",
  standings = [],
  showViewAllButton = false
}: LeagueStandingsProps) {
  if (standings.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{category}</h3>
              <p className="text-sm text-gray-500 mt-1">{division}</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
              <Trophy className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Sin datos de posiciones
            </h3>
            <p className="text-gray-500 text-center max-w-sm">
              Aún no hay datos disponibles para esta categoría. Los resultados se actualizarán cuando comience la competencia.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{category}</h3>
            <p className="text-sm text-gray-500 mt-1">{division}</p>
          </div>
          <div className="flex flex-col items-end gap-4">
            {/* Leyenda de posiciones */}
            <div className="flex items-center gap-3 bg-gray-50 px-3 py-2 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                <span className="text-xs text-gray-600">Oro</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                <span className="text-xs text-gray-600">Plata</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                <span className="text-xs text-gray-600">Bronce</span>
              </div>
            </div>
            {showViewAllButton && (
              <Link 
                href="/standings" 
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Ver todos los resultados
              </Link>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-xs text-gray-500 border-b">
                  <th className="px-4 py-3 text-left">Posición</th>
                  <th className="px-4 py-3 text-left">Pareja</th>
                  <th className="px-4 py-3 text-center">PJ</th>
                  <th className="px-4 py-3 text-center">G</th>
                  <th className="px-4 py-3 text-center">E</th>
                  <th className="px-4 py-3 text-center">P</th>
                  <th className="px-4 py-3 text-center">GF</th>
                  <th className="px-4 py-3 text-center">GC</th>
                  <th className="px-4 py-3 text-center">DG</th>
                  <th className="px-4 py-3 text-center">Pts</th>
                </tr>
              </thead>
              <tbody>
                {standings.map((team, index) => (
                  <tr 
                    key={team.teamName}
                    className={`
                      text-sm border-b last:border-b-0 hover:bg-gray-50 transition-colors
                      ${index < 3 ? 'bg-green-50/30' : ''}
                      ${index > standings.length - 3 ? 'bg-red-50/30' : ''}
                    `}
                  >
                    <td className="px-4 py-3 font-medium">
                      <div className="flex items-center gap-2">
                        {getPositionBadge(team.position)}
                        {team.position}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium">{team.teamName}</td>
                    <td className="px-4 py-3 text-center">{team.played}</td>
                    <td className="px-4 py-3 text-center">{team.won}</td>
                    <td className="px-4 py-3 text-center">{team.drawn}</td>
                    <td className="px-4 py-3 text-center">{team.lost}</td>
                    <td className="px-4 py-3 text-center">{team.goalsFor}</td>
                    <td className="px-4 py-3 text-center">{team.goalsAgainst}</td>
                    <td className="px-4 py-3 text-center font-medium">
                      <span className={team.goalDifference > 0 ? 'text-green-600' : team.goalDifference < 0 ? 'text-red-600' : ''}>
                        {team.goalDifference > 0 ? '+' : ''}{team.goalDifference}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center font-bold">{team.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function getPositionBadge(position: number) {
  if (position === 1) {
    return <span className="w-2 h-2 rounded-full bg-yellow-400"></span>;
  }
  if (position === 2) {
    return <span className="w-2 h-2 rounded-full bg-gray-400"></span>;
  }
  if (position === 3) {
    return <span className="w-2 h-2 rounded-full bg-amber-600"></span>;
  }
  return null;
} 