import { Node, Edge } from 'reactflow';
import { Round } from '@/types/matches';

export function createBracketNodes(rounds: Round[]): Node[] {
  const VERTICAL_SPACING = 200;
  const HORIZONTAL_SPACING = 320;
  
  return rounds.flatMap((round, roundIndex) =>
    round.matches.map((match, matchIndex) => {
      // Ajustar la posición vertical según la ronda
      const matchesInRound = round.matches.length;
      const totalHeight = (matchesInRound - 1) * VERTICAL_SPACING;
      const startY = -totalHeight / 2;
      const y = startY + (matchIndex * VERTICAL_SPACING);

      return {
        id: `${round.name}-${match.id}`,
        type: 'bracket',
        position: { 
          x: roundIndex * HORIZONTAL_SPACING, 
          y: y
        },
        data: {
          round: round.name,
          match,
        },
      };
    })
  );
}

export function createBracketEdges(rounds: Round[]): Edge[] {
  const edges: Edge[] = [];
  
  rounds.forEach((round, roundIndex) => {
    if (roundIndex < rounds.length - 1) {
      round.matches.forEach((match, matchIndex) => {
        const nextRoundMatch = Math.floor(matchIndex / 2);
        if (rounds[roundIndex + 1].matches[nextRoundMatch]) {
          edges.push({
            id: `e-${round.name}-${match.id}`,
            source: `${round.name}-${match.id}`,
            target: `${rounds[roundIndex + 1].name}-${rounds[roundIndex + 1].matches[nextRoundMatch].id}`,
            type: 'smoothstep',
            style: { stroke: '#94a3b8', strokeWidth: 2 },
            animated: false,
          });
        }
      });
    }
  });

  return edges;
} 