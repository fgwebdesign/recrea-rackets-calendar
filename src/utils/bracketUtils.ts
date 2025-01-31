import { Node, Edge } from 'reactflow';
import { Round } from '@/types/matches';

export function createBracketNodes(rounds: Round[]): Node[] {
  const VERTICAL_SPACING = 200;  
  const HORIZONTAL_SPACING = 400; 

  return rounds.flatMap((round, roundIndex) => {
    const matchesInRound = round.matches.length;
    const totalHeight = matchesInRound * VERTICAL_SPACING;
    
    const startY = -(totalHeight / 2) + (VERTICAL_SPACING / 2);

    return round.matches.map((match, matchIndex) => {
      const y = startY + (matchIndex * VERTICAL_SPACING * Math.pow(1, roundIndex));
      
      const x = roundIndex * HORIZONTAL_SPACING;

      return {
        id: `${round.name}-${match.id}`,
        type: 'bracket',
        position: { x, y },
        data: {
          match,
          round: round.name,
        },
        style: {
          width: 280,
        },
      };
    });
  });
}

export function createBracketEdges(rounds: Round[]): Edge[] {
  const edges: Edge[] = [];

  rounds.forEach((round, roundIndex) => {
    if (roundIndex < rounds.length - 1) {
      round.matches.forEach((match, matchIndex) => {
        const nextRoundMatch = Math.floor(matchIndex / 2);
        
        if (rounds[roundIndex + 1]?.matches[nextRoundMatch]) {
          edges.push({
            id: `e-${round.name}-${match.id}`,
            source: `${round.name}-${match.id}`,
            target: `${rounds[roundIndex + 1].name}-${rounds[roundIndex + 1].matches[nextRoundMatch].id}`,
            type: 'smoothstep',
            // Mejoramos el estilo de las conexiones
            style: { 
              stroke: '#cbd5e1', 
              strokeWidth: 2,
              opacity: 0.8,
            },
            sourceHandle: 'right',
            targetHandle: 'left',
          });
        }
      });
    }
  });

  return edges;
} 