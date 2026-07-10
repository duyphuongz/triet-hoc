import { useQuery } from "@tanstack/react-query";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Lightbulb,
  Link2,
  ListChecks,
  Quote,
  Sparkles,
  X,
} from "lucide-react";
import { knowledgeApi, type KnowledgeNode } from "../api/knowledgeApi";
import { LoadingState } from "../../../shared/components/LoadingState";
import { ErrorState } from "../../../shared/components/ErrorState";
import { parseNodeContent, type ContentSection } from "../utils/parseNodeContent";

const SECTION_STYLES: Record<
  string,
  { icon: typeof ListChecks; iconWrap: string; dot: string; label: string }
> = {
  example: { 
    icon: Lightbulb, 
    iconWrap: "bg-coral/10 text-coral dark:bg-coral/20 dark:text-coral", 
    dot: "bg-coral", 
    label: "text-coral/80 dark:text-coral/80" 
  },
  note: { 
    icon: AlertTriangle, 
    iconWrap: "bg-lemon/30 text-ink/60 dark:bg-lemon/20 dark:text-lemon", 
    dot: "bg-lemon", 
    label: "text-ink/50 dark:text-lemon/80" 
  },
  meaning: { 
    icon: Sparkles, 
    iconWrap: "bg-grape/10 text-grape dark:bg-grape/20 dark:text-grape", 
    dot: "bg-grape", 
    label: "text-grape/80 dark:text-grape/80" 
  },
  quote: { 
    icon: Quote, 
    iconWrap: "bg-teal/10 text-teal dark:bg-teal/20 dark:text-teal", 
    dot: "bg-teal", 
    label: "text-teal/80 dark:text-teal/80" 
  },
  default: { 
    icon: ListChecks, 
    iconWrap: "bg-ink/5 text-ink/50 dark:bg-white/10 dark:text-white/60", 
    dot: "bg-ink/30 dark:bg-slate-600", 
    label: "text-ink/50 dark:text-slate-400" 
  },
};

function getSectionStyle(label: string) {
  const l = label.toLowerCase();
  if (l.includes("ví dụ")) return SECTION_STYLES.example;
  if (l.includes("lưu ý")) return SECTION_STYLES.note;
  if (l.includes("ý nghĩa") || l.includes("tác động") || l.includes("hệ quả") || l.includes("vai trò"))
    return SECTION_STYLES.meaning;
  if (l.includes("tác phẩm")) return SECTION_STYLES.quote;
  return SECTION_STYLES.default;
}

function ContentSectionCard({ section }: { section: ContentSection }) {
  const style = getSectionStyle(section.label);
  const Icon = style.icon;
  return (
    <div className="relative flex flex-col md:flex-row gap-4 md:gap-6 group">
      {/* Marginalia: Soft Icon & Label */}
      <div className="w-full md:w-24 flex-shrink-0 flex flex-row md:flex-col items-center md:items-end justify-start gap-2 pt-2">
        <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${style.iconWrap} opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300`}>
          <Icon size={18} strokeWidth={2.5} />
        </div>
        {section.label && (
          <span className={`font-sans text-[11px] font-bold uppercase tracking-wider text-left md:text-right leading-tight ${style.label}`}>
            {section.label}
          </span>
        )}
      </div>

      {/* Main Content: Soft Card */}
      <div className="flex-1 bg-white/50 dark:bg-slate-900/50 p-5 md:p-6 rounded-3xl border border-ink/5 dark:border-slate-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.04)] transition-shadow">
        {section.items ? (
          <ul className="space-y-4">
            {section.items.map((item, i) => (
              <li key={i} className="flex gap-4 text-base leading-relaxed text-ink/80 dark:text-slate-300">
                <span className={`mt-2.5 h-2 w-2 flex-shrink-0 rounded-full ${style.dot}`} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-base leading-relaxed text-ink/80 dark:text-slate-300">
            {section.text}
          </p>
        )}
      </div>
    </div>
  );
}

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
    <div className="flex h-full w-full flex-col bg-paper shadow-2xl dark:bg-slate-950 border-l border-ink/5 dark:border-slate-800 transition-all font-sans">
      <div className="flex items-center justify-between border-b border-ink/5 dark:border-slate-800 p-6 bg-white/20 dark:bg-slate-900/20 backdrop-blur-md">
        <div className="flex items-center gap-3 text-ink/70 dark:text-slate-300">
          <BookOpen size={20} strokeWidth={2} />
          <h2 className="text-[12px] font-bold uppercase tracking-widest text-ink/60 dark:text-slate-400">
            Chi tiết khái niệm
          </h2>
        </div>
        <button
          onClick={onClose}
          className="rounded-full p-2.5 bg-ink/5 dark:bg-slate-800 text-ink/40 dark:text-slate-400 hover:bg-ink/10 dark:hover:bg-slate-700 hover:text-ink dark:hover:text-white transition-all active:scale-95"
        >
          <X size={18} strokeWidth={2.5} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message="Không tải được dữ liệu." />
        ) : detail ? (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500 max-w-2xl mx-auto">
            <div className="mb-10 text-center md:text-left">
              <div className="mb-4 inline-flex items-center justify-center rounded-full bg-teal/10 dark:bg-teal/20 px-4 py-1.5 text-[10px] font-bold text-teal uppercase tracking-[0.2em]">
                {detail.type}
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-ink dark:text-slate-50 leading-tight tracking-tight">
                {detail.title}
              </h1>
            </div>

            {(() => {
              const { intro, sections } = parseNodeContent(detail.content);
              return (
                <div className="space-y-10">
                  <p className="text-lg md:text-xl font-medium leading-relaxed text-ink/70 dark:text-slate-300">
                    {intro}
                  </p>
                  
                  {sections.length > 0 && (
                    <div className="pt-2 space-y-8">
                      {sections.map((section, i) => (
                        <ContentSectionCard key={i} section={section} />
                      ))}
                    </div>
                  )}
                </div>
              );
            })()}

            <div className="mt-16 pt-12 border-t border-ink/10 dark:border-slate-800">
              <h3 className="text-xl font-bold text-ink dark:text-white mb-8 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-ink/5 dark:bg-slate-800 text-ink/40 dark:text-slate-400">
                  <Link2 size={20} strokeWidth={2} />
                </div>
                Mạng lưới liên kết
              </h3>

              {detail.linked_from.length > 0 && (
                <div className="space-y-4 mb-8">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-ink/40 dark:text-slate-500">
                    Bị tác động bởi
                  </div>
                  <div className="flex flex-col gap-3">
                    {detail.linked_from.map((link) => (
                      <button
                        key={`from-${link.slug}`}
                        onClick={() => onSelectNode(link.slug)}
                        className="group flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4 p-4 rounded-2xl border border-ink/5 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md transition-all text-left"
                      >
                        <p className="text-sm leading-relaxed">
                          <span className="font-bold text-ink dark:text-white group-hover:text-teal transition-colors">
                            {link.title}
                          </span>{" "}
                          <span className="text-ink/50 dark:text-slate-400 font-medium px-2">{link.label}</span>{" "}
                          <span className="text-ink/60 dark:text-slate-300">{detail.title}</span>
                        </p>
                        <ArrowRight size={18} strokeWidth={2} className="flex-shrink-0 text-ink/20 dark:text-slate-600 group-hover:text-teal transform group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {detail.linked_to.length > 0 && (
                <div className="space-y-4">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-ink/40 dark:text-slate-500">
                    Tác động đến
                  </div>
                  <div className="flex flex-col gap-3">
                    {detail.linked_to.map((link) => (
                      <button
                        key={`to-${link.slug}`}
                        onClick={() => onSelectNode(link.slug)}
                        className="group flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4 p-4 rounded-2xl border border-ink/5 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md transition-all text-left"
                      >
                        <p className="text-sm leading-relaxed">
                          <span className="text-ink/60 dark:text-slate-300">{detail.title}</span>{" "}
                          <span className="text-ink/50 dark:text-slate-400 font-medium px-2">{link.label}</span>{" "}
                          <span className="font-bold text-ink dark:text-white group-hover:text-teal transition-colors">
                            {link.title}
                          </span>
                        </p>
                        <ArrowRight size={18} strokeWidth={2} className="flex-shrink-0 text-ink/20 dark:text-slate-600 group-hover:text-teal transform group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {detail.linked_from.length === 0 && detail.linked_to.length === 0 && (
                <div className="text-sm text-ink/40 dark:text-slate-500 py-8 text-center bg-white/30 dark:bg-slate-900/30 rounded-3xl border border-ink/5 dark:border-slate-800">
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


