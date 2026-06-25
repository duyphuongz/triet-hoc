export type KnowledgeNode = {
  id: string;
  title: string;
  group: number;
  type: string;
};

export type KnowledgeEdge = {
  source: string;
  target: string;
  label: string;
};

export type KnowledgeGraphData = {
  nodes: KnowledgeNode[];
  links: KnowledgeEdge[];
};

export type KnowledgeNodeDetail = {
  id: string;
  title: string;
  content: string;
  type: string;
  linked_to: { slug: string; title: string; label: string }[];
  linked_from: { slug: string; title: string; label: string }[];
};

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export const knowledgeApi = {
  getGraph: async (): Promise<KnowledgeGraphData> => {
    const res = await fetch(`${API_URL}/knowledge/graph`);
    if (!res.ok) throw new Error("Failed to fetch knowledge graph");
    return res.json();
  },
  getNode: async (slug: string): Promise<KnowledgeNodeDetail> => {
    const res = await fetch(`${API_URL}/knowledge/nodes/${slug}`);
    if (!res.ok) throw new Error("Failed to fetch knowledge node");
    return res.json();
  },
};
