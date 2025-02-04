import { useQuery } from '@tanstack/react-query';
import { tournamentService } from '@/lib/api/tournaments';
    
export function useTournaments() {
  return useQuery({
    queryKey: ['tournaments', 'upcoming'],
    queryFn: tournamentService.getUpcomingTournaments,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 30, // 30 minutes
  });
} 