import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, FileText, LayoutGrid, Orbit, Palette } from "lucide-react";
import type { BgMode } from "../../../pages/KnowledgePage";

type Props = {
  value: BgMode;
  onChange: (mode: BgMode) => void;
};

const OPTIONS: { value: BgMode; label: string; icon: typeof Orbit }[] = [
  { value: "universe", label: "Vũ trụ", icon: Orbit },
  { value: "blueprint", label: "Bản vẽ", icon: LayoutGrid },
  { value: "paper", label: "Giấy ô ly", icon: FileText },
];

export function BgModeDropdown({ value, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const current = OPTIONS.find((o) => o.value === value) ?? OPTIONS[0];

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-10 items-center justify-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 px-3 text-sm font-bold text-ink dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        title="Đổi giao diện nền"
      >
        <Palette size={16} />
        <span className="hidden sm:inline">{current.label}</span>
        <ChevronDown size={14} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 z-20 w-44 rounded-2xl bg-white/95 dark:bg-slate-900/95 shadow-2xl backdrop-blur-sm border border-slate-200 dark:border-slate-800 p-1.5">
          {OPTIONS.map((option) => {
            const Icon = option.icon;
            const isActive = option.value === value;
            return (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-teal/10 text-teal"
                    : "text-ink dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <Icon size={16} className="flex-shrink-0" />
                <span className="flex-1">{option.label}</span>
                {isActive && <Check size={14} className="flex-shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
