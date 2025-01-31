import { Handle, Position } from 'reactflow';
import { BracketMatch } from '@/types/matches';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface BracketNodeProps {
  data: {
    match: BracketMatch;
    round: string;
  };
}

export function BracketNode({ data }: BracketNodeProps) {
  const { match } = data;
  const isCompleted = match.status === 'completed';
  const isScheduled = match.status === 'scheduled';

  return (
    <div className="px-4 py-3 shadow-md rounded-md bg-white border border-gray-200 min-w-[280px]">
      <Handle type="target" position={Position.Left} />
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs font-semibold text-gray-500">{data.round}</div>
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            isCompleted ? 'bg-green-100 text-green-800' : 
            'bg-blue-100 text-blue-800'
          }`}>
            {isCompleted ? 'Finalizado' : 'Programado'}
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {/* Equipo Local */}
          <div className={`flex items-center justify-between p-2 rounded-lg ${
            isCompleted && match.score && match.score.split('-')[0].trim() > match.score.split('-')[1].trim()
              ? 'bg-blue-50 border border-blue-100'
              : 'bg-gray-50 border border-gray-100'
          }`}>
            <span className={`text-sm ${
              isCompleted && match.score && match.score.split('-')[0].trim() > match.score.split('-')[1].trim()
                ? 'font-semibold text-blue-900'
                : 'text-gray-600'
            }`}>
              {match.home_team?.players.join(' / ')}
            </span>
            {isCompleted && (
              <span className="text-sm font-medium">
                {match.score?.split('-')[0].trim()}
              </span>
            )}
          </div>

          {/* Equipo Visitante */}
          <div className={`flex items-center justify-between p-2 rounded-lg ${
            isCompleted && match.score && match.score.split('-')[1].trim() > match.score.split('-')[0].trim()
              ? 'bg-blue-50 border border-blue-100'
              : 'bg-gray-50 border border-gray-100'
          }`}>
            <span className={`text-sm ${
              isCompleted && match.score && match.score.split('-')[1].trim() > match.score.split('-')[0].trim()
                ? 'font-semibold text-blue-900'
                : 'text-gray-600'
            }`}>
              {match.away_team?.players.join(' / ')}
            </span>
            {isCompleted && (
              <span className="text-sm font-medium">
                {match.score?.split('-')[1].trim()}
              </span>
            )}
          </div>
        </div>

        {/* Información adicional del partido */}
        {isScheduled && (
          <div className="mt-3 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
            <div className="flex items-center gap-2 text-[10px] text-gray-500">
              {match.start_time && (
                <>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{format(new Date(match.start_time), 'dd/MM/yyyy', { locale: es })}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{format(new Date(match.start_time), 'HH:mm', { locale: es })}</span>
                  </div>
                </>
              )}
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