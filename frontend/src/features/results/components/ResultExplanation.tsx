import { ArrowRight, Brain, Shield, Target, Zap } from "lucide-react";

import type { PublicResult } from "../types/resultTypes";
import { PHILOSOPHY_DEFINITIONS } from "./philosophyDefinitions";

export function ResultExplanation({ result }: { result: PublicResult }) {
  const def = PHILOSOPHY_DEFINITIONS[result.dominant.key];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:auto-rows-min">
      
      {/* 1. Vì sao ra kết quả này? */}
      <div className="flex flex-col justify-center rounded-3xl bg-white/60 p-8 shadow-soft backdrop-blur-md border border-white/50 dark:border-white/10 dark:bg-slate-900/60 md:col-span-8">
        <h3 className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-teal">
          <Brain className="h-4 w-4" /> Vì sao bạn ra kết quả này?
        </h3>
        <p className="text-lg font-semibold leading-relaxed text-ink dark:text-white">
          {result.explanation}
        </p>
      </div>

      {/* 2. Điểm mạnh */}
      <div className="rounded-3xl bg-teal/10 p-8 backdrop-blur-md border border-teal-500/10 dark:bg-teal/20 md:col-span-4">
        <h3 className="mb-5 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-teal">
          <Zap className="h-4 w-4" /> Điểm mạnh
        </h3>
        <ul className="space-y-4">
          {result.dominant.strengths.map((item) => (
            <li key={item} className="flex gap-3 text-sm font-medium leading-relaxed text-ink/80 dark:text-white/80">
              <span className="font-black text-teal">·</span> {item}
            </li>
          ))}
        </ul>
      </div>

      {/* 3. Mô tả cốt lõi */}
      <div className="rounded-3xl bg-paper/60 p-8 backdrop-blur-md border border-white/30 dark:border-white/5 dark:bg-slate-900/40 md:col-span-5">
        <h3 className="mb-4 text-xs font-black uppercase tracking-widest text-ink/50 dark:text-white/50">
          Mô tả cốt lõi
        </h3>
        <p className="text-sm leading-relaxed text-ink/80 dark:text-white/80">
          {result.dominant.longDescription}
        </p>
      </div>

      {/* 4. Góc nhìn học thuật & Dí dỏm */}
      {def && (
        <div className="rounded-3xl border border-white/50 bg-white/60 p-8 shadow-soft backdrop-blur-md dark:border-white/5 dark:bg-slate-900/60 md:col-span-7">
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h4 className="mb-3 text-xs font-black uppercase tracking-widest text-ink/40 dark:text-white/40">
                Học thuật
              </h4>
              <p className="text-sm leading-relaxed text-ink/80 dark:text-white/80">
                {def.academic}
              </p>
            </div>
            <div>
              <h4 className="mb-3 text-xs font-black uppercase tracking-widest text-ink/40 dark:text-white/40">
                Đời thường
              </h4>
              <p className="text-sm leading-relaxed text-ink/80 dark:text-white/80">
                {def.witty}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 5. Cẩn thận khi mất cân bằng */}
      <div className="rounded-3xl bg-rose-50/60 p-8 backdrop-blur-md border border-rose-500/10 dark:bg-rose-950/30 md:col-span-4">
        <h3 className="mb-5 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-rose-500">
          <Shield className="h-4 w-4" /> Cẩn thận
        </h3>
        <ul className="space-y-4">
          {result.dominant.blindSpots.map((item) => (
            <li key={item} className="flex gap-3 text-sm font-medium leading-relaxed text-ink/80 dark:text-white/80">
              <span className="font-black text-rose-500">·</span> {item}
            </li>
          ))}
        </ul>
      </div>

      {/* 6. Kiểu làm việc & học tập */}
      <div className="rounded-3xl bg-white/60 p-8 shadow-soft backdrop-blur-md border border-white/50 dark:border-white/10 dark:bg-slate-900/60 md:col-span-8">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <h4 className="mb-3 text-xs font-black uppercase tracking-widest text-ink/40 dark:text-white/40">
              Làm việc
            </h4>
            <p className="text-sm leading-relaxed text-ink/75 dark:text-white/75">
              {result.dominant.workStyle}
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-xs font-black uppercase tracking-widest text-ink/40 dark:text-white/40">
              Học tập
            </h4>
            <p className="text-sm leading-relaxed text-ink/75 dark:text-white/75">
              {result.dominant.learningStyle}
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-xs font-black uppercase tracking-widest text-ink/40 dark:text-white/40">
              Xung đột
            </h4>
            <p className="text-sm leading-relaxed text-ink/75 dark:text-white/75">
              {result.dominant.conflictStyle}
            </p>
          </div>
        </div>
      </div>

      {/* 7. Lời khuyên */}
      <div className="relative overflow-hidden rounded-3xl bg-ink/90 text-white backdrop-blur-xl border border-white/10 dark:bg-slate-900/90 md:col-span-12">
        <div className="absolute -right-8 -top-8 p-8 opacity-5">
          <Target className="h-64 w-64" />
        </div>
        <div className="relative z-10 p-8 md:p-12">
          <h3 className="mb-8 text-xs font-black uppercase tracking-widest text-white/50">
            Gợi ý phát triển
          </h3>
          <ul className="grid gap-4 sm:grid-cols-2">
            {result.dominant.growthSuggestions.map((item) => (
              <li key={item} className="flex items-start gap-4 rounded-2xl bg-white/5 p-5 transition-colors hover:bg-white/10">
                <ArrowRight className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
                <span className="text-sm font-semibold leading-relaxed tracking-wide text-white/90">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 8. Ghi chú */}
      <div className="rounded-3xl border border-dashed border-ink/20 p-8 backdrop-blur-sm dark:border-white/20 md:col-span-12">
        <h3 className="mb-3 text-xs font-black uppercase tracking-widest text-ink/40 dark:text-white/40">
          Ghi chú nhỏ nhưng quan trọng
        </h3>
        <p className="text-sm leading-relaxed text-ink/60 dark:text-white/60">
          {result.disclaimer}
        </p>
      </div>
    </div>
  );
}
