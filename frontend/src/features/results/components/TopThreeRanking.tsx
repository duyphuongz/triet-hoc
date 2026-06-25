import { Medal, Trophy } from "lucide-react";
import { motion } from "framer-motion";

import { formatPercent } from "../../../shared/utils/formatPercent";
import type { TopThreeItem } from "../types/resultTypes";

export function TopThreeRanking({ items }: { items: TopThreeItem[] }) {
  return (
    <ol className="grid gap-4 md:grid-cols-3">
      {items.map((item, i) => {
        const isFirst = i === 0;
        return (
          <motion.li
            key={item.key}
            whileHover={{ y: -4 }}
            className={`relative overflow-hidden rounded-3xl p-6 transition-all shadow-soft backdrop-blur-md border ${
              isFirst
                ? "bg-white/60 dark:bg-slate-800/60 border-white/50 dark:border-white/10"
                : "bg-white/40 dark:bg-slate-800/40 border-white/30 dark:border-white/5"
            }`}
          >
            {isFirst && (
              <div className="absolute -right-4 -top-4 opacity-10">
                <Trophy className="h-24 w-24" />
              </div>
            )}
            <div
              className={`flex items-center gap-2 text-xs font-black uppercase tracking-widest ${
                isFirst ? "text-yellow-700 dark:text-yellow-500" : "text-ink/40 dark:text-white/40"
              }`}
            >
              <Medal className="h-4 w-4" aria-hidden="true" />
              Hạng {item.rank}
            </div>
            <div className="mt-4 text-xl font-black dark:text-white">{item.nameVi}</div>
            <div
              className={`mt-2 text-3xl font-black ${
                isFirst ? "text-teal" : "text-ink/30 dark:text-white/30"
              }`}
            >
              {formatPercent(item.percentage)}
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}
