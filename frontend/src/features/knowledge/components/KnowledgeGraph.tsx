import { useEffect, useRef, useState } from "react";
import ForceGraph2D from "react-force-graph-2d";
import { type KnowledgeGraphData, type KnowledgeNode } from "../api/knowledgeApi";

type Props = {
  data: KnowledgeGraphData;
  onNodeClick: (node: KnowledgeNode) => void;
  width: number;
  height: number;
};

export function KnowledgeGraph({ data, onNodeClick, width, height }: Props) {
  const fgRef = useRef<any>();
  const [hoverNode, setHoverNode] = useState<KnowledgeNode | null>(null);

  useEffect(() => {
    // Zoom out slightly to see the whole graph initially
    if (fgRef.current) {
      setTimeout(() => {
        fgRef.current.zoomToFit(400, 50);
      }, 500);
    }
  }, [data]);

  const getNodeColor = (node: KnowledgeNode) => {
    // Consistent color mapping based on group
    const colors = [
      "#6B5DD3", // Purple
      "#38B2AC", // Teal
      "#F56565", // Red
      "#ED8936", // Orange
      "#ECC94B", // Yellow
      "#4299E1", // Blue
    ];
    const index = (node.group - 1) % colors.length;
    return hoverNode === node ? "#FFFFFF" : colors[index];
  };

  return (
    <div className="overflow-hidden rounded-3xl bg-slate-900 shadow-2xl">
      <ForceGraph2D
        ref={fgRef}
        width={width}
        height={height}
        graphData={data}
        nodeLabel="title"
        nodeColor={getNodeColor as any}
        nodeRelSize={8}
        linkDirectionalArrowLength={3.5}
        linkDirectionalArrowRelPos={1}
        linkColor={() => "rgba(255,255,255,0.2)"}
        onNodeHover={(node) => setHoverNode(node as KnowledgeNode | null)}
        onNodeClick={(node) => {
          onNodeClick(node as KnowledgeNode);
          if (fgRef.current) {
            fgRef.current.centerAt(node.x, node.y, 1000);
            fgRef.current.zoom(2, 1000);
          }
        }}
        nodeCanvasObjectMode={() => "after"}
        nodeCanvasObject={(node: any, ctx, globalScale) => {
          const label = node.title;
          const fontSize = 14 / globalScale;
          ctx.font = `${fontSize}px Inter, sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          
          // Draw text shadow for readability
          ctx.shadowColor = "rgba(0,0,0,0.8)";
          ctx.shadowBlur = 4;
          ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
          
          // Draw text slightly below the node
          ctx.fillText(label, node.x, node.y + 12);
          
          ctx.shadowBlur = 0; // Reset shadow
        }}
      />
    </div>
  );
}
