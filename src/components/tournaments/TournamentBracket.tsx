import { useCallback } from 'react';
import ReactFlow, {
  ConnectionLineType,
  Panel,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { BracketNode } from '@/components/tournaments/BracketNode';
import { MOCK_TOURNAMENT_BRACKET } from '@/mocks/tournamentBracket';
import { MOCK_TOURNAMENTS } from '@/mocks/tournaments';
import { createBracketNodes, createBracketEdges } from '@/utils/bracketUtils';

interface TournamentBracketProps {
  tournamentId: number;
}

const nodeTypes = {
  bracket: BracketNode,
};

export function TournamentBracket({ tournamentId }: TournamentBracketProps) {
  const tournament = MOCK_TOURNAMENTS.find(t => t.id === tournamentId);
  const initialNodes = createBracketNodes(MOCK_TOURNAMENT_BRACKET.rounds);
  const initialEdges = createBracketEdges(MOCK_TOURNAMENT_BRACKET.rounds);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="flex-1">
      <div className="max-w-full mx-auto">
        <div className="h-[calc(100vh-200px)] min-h-[1150px] bg-white rounded-xl shadow-sm p-4 w-full">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            connectionLineType={ConnectionLineType.SmoothStep}
            fitView
            className="bg-gray-50"
            minZoom={0.5}
            maxZoom={1.5}
            defaultViewport={{ x: 0, y: 0, zoom: 0.2 }}
          >
            <Panel position="top-right">
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md">
                <span className="text-sm font-medium">
                  Categoría: {tournament?.categories[0] || 'No especificada'}
                </span>
              </div>
            </Panel>
          </ReactFlow>
        </div>
      </div>
    </div>
  );
} 