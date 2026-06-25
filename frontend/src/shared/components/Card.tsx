import type { HTMLAttributes } from "react";

export function Card({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-lg border border-ink/10 dark:border-white/10 bg-white dark:bg-slate-800 p-5 shadow-soft dark:text-white ${className}`}
      {...props}
    />
  );
}
