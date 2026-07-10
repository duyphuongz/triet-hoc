import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { knowledgeApi, type KnowledgeNode } from "../features/knowledge/api/knowledgeApi";
import { KnowledgeGraph } from "../features/knowledge/components/KnowledgeGraph";
import { KnowledgeSidebar } from "../features/knowledge/components/KnowledgeSidebar";
import { KnowledgeSearch } from "../features/knowledge/components/KnowledgeSearch";
import { BgModeDropdown } from "../features/knowledge/components/BgModeDropdown";
import { useIsMobile } from "../shared/hooks/useIsMobile";
import { LoadingState } from "../shared/components/LoadingState";
import { ErrorState } from "../shared/components/ErrorState";
import { PageShell } from "../shared/components/PageShell";
import { ArrowLeft, GripVertical } from "lucide-react";
import { Link } from "react-router-dom";

export type BgMode = "universe" | "blueprint" | "paper";

const SIDEBAR_MIN_WIDTH = 320;
const SIDEBAR_MAX_WIDTH_RATIO = 0.6;
const SIDEBAR_DEFAULT_WIDTH = 480;

export function KnowledgePage() {
  const [activeNode, setActiveNode] = useState<KnowledgeNode | null>(null);
  const [bgMode, setBgMode] = useState<BgMode>("universe");
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    const maxWidth = window.innerWidth * SIDEBAR_MAX_WIDTH_RATIO;
    const effectiveMax = Math.max(maxWidth, SIDEBAR_MIN_WIDTH);
    const saved = Number(localStorage.getItem("knowledge_sidebar_width"));
    return saved >= SIDEBAR_MIN_WIDTH && saved <= effectiveMax
      ? saved
      : Math.min(SIDEBAR_DEFAULT_WIDTH, effectiveMax);
  });
  const [isResizing, setIsResizing] = useState(false);
  const isMobile = useIsMobile();

  const { data, isLoading, error } = useQuery({
    queryKey: ["knowledge_graph"],
    queryFn: () => knowledgeApi.getGraph(),
  });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      const maxWidth = window.innerWidth * SIDEBAR_MAX_WIDTH_RATIO;
      const next = Math.min(maxWidth, Math.max(SIDEBAR_MIN_WIDTH, window.innerWidth - e.clientX));
      setSidebarWidth(next);
    };
    const handleMouseUp = () => {
      setIsResizing(false);
      setSidebarWidth((w) => {
        localStorage.setItem("knowledge_sidebar_width", String(w));
        return w;
      });
    };

    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  const handleSelectNodeSlug = (slug: string) => {
    if (data) {
      const node = data.nodes.find((n) => n.id === slug);
      if (node) setActiveNode(node);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-100 dark:bg-slate-950 flex flex-col relative">
      {/* Header (hidden on mobile while the full-screen detail panel is open) */}
      <div
        className={`absolute top-4 left-4 right-4 z-10 flex flex-col md:flex-row md:flex-wrap md:items-start gap-3 md:gap-4 pointer-events-none ${
          isMobile && activeNode ? "hidden" : ""
        }`}
      >
        <div className="flex items-center gap-3 pointer-events-none">
          <Link
            to="/"
            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-white/80 dark:bg-slate-900/80 shadow-lg backdrop-blur-sm text-ink dark:text-white hover:bg-teal hover:text-white dark:hover:bg-teal transition-all pointer-events-auto"
          >
            <ArrowLeft size={24} />
          </Link>
          <div className="rounded-2xl bg-white/80 dark:bg-slate-900/80 shadow-lg backdrop-blur-sm px-4 md:px-6 py-3 pointer-events-auto flex items-center justify-between gap-4 md:gap-6 min-w-0">
            <div className="min-w-0">
              <h1 className="text-base md:text-xl font-black text-ink dark:text-white truncate">Kho tàng Triết học</h1>
              <p className="hidden sm:block text-xs font-semibold text-slate-500 uppercase tracking-widest">Giáo trình MLN122</p>
            </div>
            <BgModeDropdown value={bgMode} onChange={setBgMode} />
          </div>
        </div>

        <KnowledgeSearch onSelectNode={handleSelectNodeSlug} />
      </div>

      <div className="flex-1 flex w-full relative">
        <div
          ref={containerRef}
          className={`flex-1 h-full ${isResizing ? "" : "transition-all duration-300"}`}
          style={{ paddingRight: activeNode && !isMobile ? sidebarWidth : 0 }}
        >
          {isLoading ? (
            <div className="h-full w-full flex items-center justify-center bg-transparent">
              <LoadingState />
            </div>
          ) : error ? (
            <div className="h-full w-full flex items-center justify-center bg-transparent">
              <ErrorState message="Không tải được dữ liệu đồ thị." />
            </div>
          ) : data ? (
            <KnowledgeGraph 
              data={data} 
              onNodeClick={setActiveNode} 
              width={dimensions.width} 
              height={dimensions.height} 
              bgMode={bgMode}
            />
          ) : null}
        </div>

        {/* Sidebar Panel */}
        <div
          className={`absolute top-0 right-0 h-full z-20 transform ease-in-out ${
            isResizing ? "" : "transition-transform duration-300"
          } ${activeNode ? "translate-x-0" : "translate-x-full"}`}
          style={{ width: isMobile ? "100%" : sidebarWidth }}
        >
          {/* Drag handle */}
          {!isMobile && (
            <div
              onMouseDown={() => setIsResizing(true)}
              className="group absolute left-0 top-0 z-10 h-full w-3 -translate-x-1/2 cursor-col-resize touch-none"
            >
              <div
                className={`mx-auto h-full w-1 transition-colors ${
                  isResizing ? "bg-teal" : "bg-transparent group-hover:bg-teal/60"
                }`}
              />
              <div
                className={`absolute left-1/2 top-1/2 flex h-14 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border shadow-md transition-colors ${
                  isResizing
                    ? "border-teal bg-teal text-white"
                    : "border-slate-200 bg-white text-slate-400 group-hover:border-teal group-hover:text-teal dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500"
                }`}
              >
                <GripVertical size={14} />
              </div>
            </div>
          )}

          <KnowledgeSidebar
            activeNode={activeNode}
            onClose={() => setActiveNode(null)}
            onSelectNode={handleSelectNodeSlug}
          />
        </div>
      </div>
    </div>
  );
}
