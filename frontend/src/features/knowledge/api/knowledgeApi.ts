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

export type KnowledgeSearchResult = {
  slug: string;
  title: string;
  type: string;
  matched_in: "title" | "content" | "both";
  snippet: string;
};

export const knowledgeApi = {
  getGraph: (): Promise<KnowledgeGraphData> => httpClient.get("/knowledge/graph"),
  getNode: (slug: string): Promise<KnowledgeNodeDetail> => httpClient.get(`/knowledge/nodes/${slug}`),
  search: (q: string): Promise<{ results: KnowledgeSearchResult[] }> =>
    httpClient.get(`/knowledge/search?q=${encodeURIComponent(q)}`),
};
