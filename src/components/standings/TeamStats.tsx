import { Trophy, XCircle, Circle } from 'lucide-react';

interface TeamStatsProps {
  stats: {
    played: number;
    won: number;
    lost: number;
  };
}

export function TeamStats({ stats }: TeamStatsProps) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm h-full border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">
        Estadísticas de la Temporada
      </h3>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-4 bg-gray-50 rounded-2xl">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Circle className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-1">{stats.played}</div>
          <div className="text-sm text-gray-500">Jugados</div>
        </div>

        <div className="text-center p-4 bg-gray-50 rounded-2xl">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Trophy className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-1">{stats.won}</div>
          <div className="text-sm text-gray-500">Ganados</div>
        </div>

        <div className="text-center p-4 bg-gray-50 rounded-2xl">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <XCircle className="w-5 h-5 text-red-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-1">{stats.lost}</div>
          <div className="text-sm text-gray-500">Perdidos</div>
        </div>
      </div>
    </div>
  );
} 