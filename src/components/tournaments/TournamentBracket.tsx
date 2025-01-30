import { Trophy } from 'lucide-react'
import { BracketMatch } from './BracketMatch'
import { MOCK_TOURNAMENT_BRACKET } from '@/mocks/tournamentData'
import { TournamentMatch } from '@/types/matches'

interface TournamentBracketProps {
  tournamentId: number
}

export function TournamentBracket({ tournamentId }: TournamentBracketProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
      {/* Tabs de categorías */}
      <div className="mb-6 border-b border-gray-200 overflow-x-auto">
        <div className="flex space-x-8 min-w-max">
          <button className="border-b-2 border-blue-500 pb-4 px-1">
            <span className="text-sm font-medium text-blue-600">Primera</span>
          </button>
          <button className="pb-4 px-1">
            <span className="text-sm font-medium text-gray-500 hover:text-gray-700">Segunda</span>
          </button>
          <button className="pb-4 px-1">
            <span className="text-sm font-medium text-gray-500 hover:text-gray-700">Tercera</span>
          </button>
        </div>
      </div>

      {/* Vista móvil - Acordeón vertical */}
      <div className="md:hidden space-y-6">
        {MOCK_TOURNAMENT_BRACKET.rounds.map((round, roundIndex) => (
          <div key={round.name} className="space-y-4">
            <h3 className="text-sm font-medium text-gray-900 bg-gray-50 p-2 rounded-lg">
              {round.name}
            </h3>
            <div className="space-y-4">
              {round.matches.map((match) => (
                <BracketMatch
                  key={match.id}
                  match={match}
                  isMobile={true}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Vista desktop - Bracket horizontal */}
      <div className="hidden md:block overflow-x-auto">
        <div className="min-w-[1200px] max-w-[1400px] mx-auto p-4">
          <div className="grid grid-cols-5 gap-4">
            {/* Octavos de Final */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-xs font-medium text-blue-600">1</span>
                </div>
                <h3 className="text-xs font-medium text-gray-900">Octavos de Final</h3>
              </div>
              <div className="space-y-4">
                {MOCK_TOURNAMENT_BRACKET.rounds[0].matches.map((match, index) => (
                  <BracketMatch
                    key={match.id}
                    match={match}
                    position={index % 2 === 0 ? 'top' : 'bottom'}
                    verticalHeight="5.5rem"
                  />
                ))}
              </div>
            </div>

            {/* Cuartos de Final */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-xs font-medium text-blue-600">2</span>
                </div>
                <h3 className="text-xs font-medium text-gray-900">Cuartos de Final</h3>
              </div>
              <div className="space-y-[5.5rem] pt-8">
                {MOCK_TOURNAMENT_BRACKET.rounds[1].matches.map((match, index) => (
                  <BracketMatch
                    key={match.id}
                    match={match}
                    position={index % 2 === 0 ? 'top' : 'bottom'}
                    verticalHeight="12rem"
                  />
                ))}
              </div>
            </div>

            {/* Semifinales */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-xs font-medium text-blue-600">3</span>
                </div>
                <h3 className="text-xs font-medium text-gray-900">Semifinales</h3>
              </div>
              <div className="space-y-[12rem] pt-[7rem]">
                {MOCK_TOURNAMENT_BRACKET.rounds[2].matches.map((match, index) => (
                  <BracketMatch
                    key={match.id}
                    match={match}
                    position={index % 2 === 0 ? 'top' : 'bottom'}
                    verticalHeight="24rem"
                  />
                ))}
              </div>
            </div>

            {/* Final */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-xs font-medium text-blue-600">4</span>
                </div>
                <h3 className="text-xs font-medium text-gray-900">Final</h3>
              </div>
              <div className="pt-[15rem]">
                <BracketMatch
                  match={MOCK_TOURNAMENT_BRACKET.rounds[3].matches[0]}
                  showVerticalConnector={false}
                  showConnector={true}
                />
              </div>
            </div>

            {/* Campeón */}
            <div className="flex items-center justify-center pt-[15rem]">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-3 shadow-lg shadow-blue-200 group hover:scale-105 transition-transform duration-200">
                  <div className="text-center">
                    <Trophy className="h-8 w-8 text-white mb-1 mx-auto" />
                    <span className="text-white text-sm font-bold">Campeón</span>
                  </div>
                </div>
                <span className="text-xs font-medium text-gray-600">Por definir</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 