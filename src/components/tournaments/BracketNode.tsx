import { Handle, Position } from 'reactflow';
import { Match } from '@/types/matches';

interface BracketNodeData {
  match: Match;
  round: string;
}

interface BracketNodeProps {
  data: BracketNodeData;
}

export function BracketNode({ data }: BracketNodeProps) {
  return (
    <div className="px-4 py-3 shadow-md rounded-md bg-white border border-gray-200 min-w-[240px]">
      <Handle type="target" position={Position.Left} />
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs font-semibold text-gray-500">{data.round}</div>
          {data.match.completed && (
            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
              Finalizado
            </span>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <div className={`flex items-center justify-between p-2 rounded-lg ${
            data.match.winner === 1 ? 'bg-blue-50 border border-blue-100' : 'bg-gray-50 border border-gray-100'
          }`}>
            <span className={`text-sm ${
              data.match.winner === 1 ? 'font-semibold text-blue-900' : 'text-gray-600'
            }`}>
              {data.match.team1.players.join(' / ')}
            </span>
          </div>
          <div className={`flex items-center justify-between p-2 rounded-lg ${
            data.match.winner === 2 ? 'bg-blue-50 border border-blue-100' : 'bg-gray-50 border border-gray-100'
          }`}>
            <span className={`text-sm ${
              data.match.winner === 2 ? 'font-semibold text-blue-900' : 'text-gray-600'
            }`}>
              {data.match.team2.players.join(' / ')}
            </span>
          </div>
        </div>
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
} 