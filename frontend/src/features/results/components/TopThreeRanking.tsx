import { Medal } from "lucide-react";

import { formatPercent } from "../../../shared/utils/formatPercent";
import type { TopThreeItem } from "../types/resultTypes";

export function TopThreeRanking({ items }: { items: TopThreeItem[] }) {
  return (
    <ol className="grid gap-3 md:grid-cols-3">
      {items.map((item) => (
        <li key={item.key} className="rounded-lg border border-ink/10 dark:border-white/10 bg-white dark:bg-slate-800 p-4 shadow-soft">
          <div className="flex items-center gap-2 text-sm font-black text-ink/60 dark:text-white/60">
            <Medal className="h-4 w-4" aria-hidden="true" />
            Hạng {item.rank}
          </div>
          <div className="mt-2 text-xl font-black dark:text-white">{item.nameVi}</div>
          <div className="mt-1 text-sm font-bold text-teal">{formatPercent(item.percentage)}</div>
        </li>
      ))}
    </ol>
  );
}
