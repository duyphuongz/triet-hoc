import { formatPercent } from "../../../shared/utils/formatPercent";

type QuizProgressProps = {
  current: number;
  total: number;
};

export function QuizProgress({ current, total }: QuizProgressProps) {
  const percentage = total > 0 ? (current / total) * 100 : 0;
  return (
    <div aria-label={`Tiến độ ${current} trên ${total}`}>
      <div className="mb-2 flex items-center justify-between text-sm font-bold text-ink/70 dark:text-white/70">
        <span>
          Câu {current}/{total}
        </span>
        <span>{formatPercent(percentage)}</span>
      </div>
      <div className="h-3 overflow-hidden rounded-lg bg-white dark:bg-slate-800 ring-1 ring-ink/10 dark:ring-white/10">
        <div className="h-full rounded-lg bg-teal transition-all" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
