import { Handle, Position } from 'reactflow';
import { BracketMatch } from '@/types/matches';
import { Calendar, Clock, MapPin, Trophy } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BracketNodeProps {
  data: {
    match: BracketMatch;
    round: string;
  };
}

function ScoreTooltip({ score }: { score: string }) {
  const [set1, set2, tiebreak] = score.split(',').map(s => s.trim());
  
  return (
    <div className="flex flex-col gap-1">
      <div className="text-sm font-medium">Resultado:</div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-sm">
        <span>Set 1:</span>
        <span>{set1}</span>
        <span>Set 2:</span>
        <span>{set2}</span>
        {tiebreak && (
          <>
            <span>Tiebreak:</span>
            <span>{tiebreak}</span>
          </>
        )}
      </div>
    </div>
  );
}

export function BracketNode({ data }: BracketNodeProps) {
  const { match } = data;
  const isCompleted = match.status === 'completed';
  const isScheduled = match.status === 'scheduled';

  const winnerTeam = isCompleted ? 
    (match.home_team_id === match.winner ? match.home_team : match.away_team) : null;

  return (
    <div className="px-4 py-3 shadow-md rounded-md bg-white border border-gray-200 min-w-[280px]">
      <Handle type="target" position={Position.Left} />
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs font-semibold text-gray-500">{data.round}</div>
          {isCompleted ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    <Trophy className="w-3 h-3" />
                    <span>Ganador: {winnerTeam?.players.join(' / ')}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <ScoreTooltip score={match.score || ''} />
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
              Programado
            </span>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 border border-gray-100">
            <span className="text-sm text-gray-600">
              {match.home_team?.players.join(' / ')}
            </span>
          </div>
          <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 border border-gray-100">
            <span className="text-sm text-gray-600">
              {match.away_team?.players.join(' / ')}
            </span>
          </div>
        </div>

        {isScheduled && match.start_time && (
          <div className="mt-3 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
            <div className="flex items-center gap-2 text-[10px] text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{format(new Date(match.start_time), 'dd/MM/yyyy', { locale: es })}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{format(new Date(match.start_time), 'HH:mm', { locale: es })}</span>
              </div>
              {match.court_id && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>Cancha {match.court_id}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
} 