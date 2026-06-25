import { useQuery } from "@tanstack/react-query";
import { ArrowRight, BookOpen, Link2, X } from "lucide-react";
import { knowledgeApi, type KnowledgeNode } from "../api/knowledgeApi";
import { LoadingState } from "../../../shared/components/LoadingState";
import { ErrorState } from "../../../shared/components/ErrorState";

type Props = {
  activeNode: KnowledgeNode | null;
  onClose: () => void;
  onSelectNode: (slug: string) => void;
};

export function KnowledgeSidebar({ activeNode, onClose, onSelectNode }: Props) {
  const { data: detail, isLoading, error } = useQuery({
    queryKey: ["knowledge_node", activeNode?.id],
    queryFn: () => knowledgeApi.getNode(activeNode!.id),
    enabled: !!activeNode,
  });

  if (!activeNode) return null;

  return (
    <div className="flex h-full w-full flex-col bg-white shadow-2xl dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 transition-all">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 p-4">
        <div className="flex items-center gap-2 text-teal">
          <BookOpen size={20} />
          <h2 className="font-bold">Chi tiết khái niệm</h2>
        </div>
        <button
          onClick={onClose}
          className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-ink dark:hover:bg-slate-800 dark:hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message="Không tải được dữ liệu." />
        ) : detail ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
              <div className="mb-2 inline-block rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold text-teal uppercase tracking-wider">
                {detail.type}
              </div>
              <h1 className="text-3xl font-black text-ink dark:text-white leading-tight">
                {detail.title}
              </h1>
            </div>

            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed">
              {detail.content}
            </div>

            <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
              <h3 className="flex items-center gap-2 text-lg font-bold text-ink dark:text-white">
                <Link2 size={18} className="text-teal" />
                Mạng lưới liên kết
              </h3>

              {detail.linked_from.length > 0 && (
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                    Bị tác động bởi (Linked from):
                  </div>
                  <div className="flex flex-col gap-2">
                    {detail.linked_from.map((link) => (
                      <button
                        key={`from-${link.slug}`}
                        onClick={() => onSelectNode(link.slug)}
                        className="group flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-700 p-3 text-left transition-all hover:border-teal dark:hover:border-teal hover:bg-slate-50 dark:hover:bg-slate-800/50"
                      >
                        <div>
                          <div className="font-semibold text-ink dark:text-white group-hover:text-teal transition-colors">
                            {link.title}
                          </div>
                          <div className="text-xs text-slate-500">{link.label}</div>
                        </div>
                        <ArrowRight size={16} className="text-slate-400 group-hover:text-teal transform group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {detail.linked_to.length > 0 && (
                <div className="space-y-2 mt-4">
                  <div className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                    Tác động đến (Linked to):
                  </div>
                  <div className="flex flex-col gap-2">
                    {detail.linked_to.map((link) => (
                      <button
                        key={`to-${link.slug}`}
                        onClick={() => onSelectNode(link.slug)}
                        className="group flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-700 p-3 text-left transition-all hover:border-teal dark:hover:border-teal hover:bg-slate-50 dark:hover:bg-slate-800/50"
                      >
                        <div>
                          <div className="font-semibold text-ink dark:text-white group-hover:text-teal transition-colors">
                            {link.title}
                          </div>
                          <div className="text-xs text-slate-500">{link.label}</div>
                        </div>
                        <ArrowRight size={16} className="text-slate-400 group-hover:text-teal transform group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {detail.linked_from.length === 0 && detail.linked_to.length === 0 && (
                <div className="text-sm text-slate-500 italic text-center py-4 bg-slate-50 dark:bg-slate-800/30 rounded-xl">
                  Chưa có liên kết nào.
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
