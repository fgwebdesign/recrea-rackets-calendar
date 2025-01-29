import { Flag, Trophy } from 'lucide-react';

interface LastMatchResultProps {
  tournament?: string;
  category?: string;
  player1?: {
    name: string;
    country: string;
    score: number[];
  };
  player2?: {
    name: string;
    country: string;
    score: number[];
  };
  isCompleted?: boolean;
  hasMatch?: boolean;
}

export function LastMatchResult({
  tournament = "Recrea Padel Club",
  category = "Liga Nocturna Recrea",
  player1 = {
    name: "Felipe Gutierrez y Francisco Erramuspe",
    country: "UY",
    score: [6, 4, 7]
  },
  player2 = {
    name: "Juan Rodriguez y Matias Martinez",
    country: "ARG",
    score: [1, 6, 4]
  },
  isCompleted = true,
  hasMatch = false
}: LastMatchResultProps) {
  if (!hasMatch) {
    return (
      <div className="bg-[#4B83F2] rounded-3xl shadow-sm p-6 text-white h-full flex flex-col items-center justify-center text-center">
        <Trophy className="w-12 h-12 text-blue-100 mb-3" />
        <h3 className="text-xl font-medium mb-2">Sin partidos jugados</h3>
        <p className="text-blue-100">
          Aún no has disputado ningún partido. ¡Inscríbete en un torneo para comenzar!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#4B83F2] rounded-3xl shadow-sm p-6 text-white h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-blue-100" />
          <span className="font-medium">{tournament}</span>
        </div>
        {isCompleted && (
          <span className="px-3 py-1 text-xs font-medium bg-white/20 rounded-full">
            Completado
          </span>
        )}
      </div>

      <div className="bg-white/10 rounded-2xl p-4">
        {[player1, player2].map((player, index) => (
          <div 
            key={player.name} 
            className={`flex items-center justify-between ${index === 0 ? 'mb-4' : ''}`}
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">
                {getCountryFlag(player.country)}
              </span>
              <span className="font-medium">{player.name}</span>
            </div>
            <div className="flex gap-3">
              {player.score.map((score, idx) => (
                <div
                  key={idx}
                  className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-lg"
                >
                  <span className="font-['DS-Digital'] text-4xl font-bold text-green-400">
                    {score}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-sm text-blue-100">
        Fecha 4
      </div>
    </div>
  );
}

function getCountryFlag(countryCode: string) {
  const flagEmoji = {
    'ES': '🇪🇸',
    'GB': '🇬🇧',
    'ARG': '🇦🇷',
    'UY': '🇺🇾',
  };
  return flagEmoji[countryCode as keyof typeof flagEmoji] || '🏳️';
} 

