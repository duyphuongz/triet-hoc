import { httpClient } from "../../../shared/api/httpClient";

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

export const knowledgeApi = {
  getGraph: (): Promise<KnowledgeGraphData> => httpClient.get("/knowledge/graph"),
  getNode: (slug: string): Promise<KnowledgeNodeDetail> => httpClient.get(`/knowledge/nodes/${slug}`),
};
