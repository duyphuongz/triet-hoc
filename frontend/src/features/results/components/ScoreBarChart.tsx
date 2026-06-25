import { motion } from "framer-motion";
import { Info } from "lucide-react";

import type { ScoreBreakdownItem } from "../types/resultTypes";
import { PHILOSOPHY_DEFINITIONS } from "./philosophyDefinitions";

export function ScoreBarChart({ data }: { data: ScoreBreakdownItem[] }) {
  // Sắp xếp dữ liệu từ cao xuống thấp
  const sortedData = [...data].sort((a, b) => b.percentage - a.percentage);
  
  return (
    <div className="flex flex-col gap-5 rounded-3xl bg-white/60 p-6 shadow-soft backdrop-blur-md border border-white/50 dark:border-white/10 dark:bg-slate-900/60 md:p-8">
      {sortedData.map((item, index) => {
        const def = PHILOSOPHY_DEFINITIONS[item.key];
        const isTop = index === 0;
        return (
          <div key={item.key} className="group relative flex items-center gap-4">
            <div className="w-48 shrink-0 text-sm font-black dark:text-white">
              <span className="flex items-center gap-2">
                {item.nameVi}
                {def && (
                  <span className="text-ink/30 transition-colors hover:text-teal dark:text-white/30" title={def.witty}>
                    <Info className="h-4 w-4 cursor-help" />
                  </span>
                )}
              </span>
            </div>
            
            <div className="relative h-6 flex-1 overflow-hidden rounded-full bg-ink/5 dark:bg-white/5">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${item.percentage}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, type: "spring", bounce: 0.2, delay: index * 0.1 }}
                className={`absolute inset-y-0 left-0 rounded-full ${
                  isTop ? "bg-teal" : "bg-ink/15 dark:bg-white/20"
                }`}
              />
            </div>
            
            <div className={`w-12 shrink-0 text-right text-sm font-black ${isTop ? "text-teal" : "text-ink/40 dark:text-white/40"}`}>
              {Math.round(item.percentage)}%
            </div>
          </div>
        );
      })}
    </div>
  );
}
