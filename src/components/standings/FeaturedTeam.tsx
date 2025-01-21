import { Trophy, Star } from 'lucide-react';

interface FeaturedTeamProps {
  players: {
    name: string;
  }[];
  position: number;
  category: string;
}

export function FeaturedTeam({ 
  players, 
  position, 
  category 
}: FeaturedTeamProps) {
  return (
    <div className="bg-gradient-to-br from-blue-500 to-indigo-700 rounded-3xl p-6 text-white h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-white ">
          <Star className="w-5 h-5 text-yellow-300" />
          Pareja Destacada
        </h3>
        <span className="px-3 py-1 text-xs font-medium bg-white/20 rounded-full">
          {category}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        {players.map((player, index) => (
          <div key={player.name} className="flex items-center gap-2">
            <p className="font-medium text-lg text-white">{player.name}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 mt-4">
        <Trophy className="w-5 h-5 text-yellow-300" />
        <span className="text-lg font-semibold">
          Posición #{position} del ranking
        </span>
      </div>
    </div>
  );
} 