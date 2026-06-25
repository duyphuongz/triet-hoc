import { forwardRef } from "react";
import { Sparkles } from "lucide-react";
import type { PublicResult } from "../types/resultTypes";
import { Illustration } from "../../../shared/illustrations";
import { formatPercent } from "../../../shared/utils/formatPercent";
import { PHILOSOPHY_DEFINITIONS } from "./philosophyDefinitions";

type TradingCardProps = {
  result: PublicResult;
};

export const TradingCard = forwardRef<HTMLDivElement, TradingCardProps>(({ result }, ref) => {
  const dominantScore = result.topThree[0];
  const wittyQuote = PHILOSOPHY_DEFINITIONS[result.dominant.key]?.witty || "Một tâm hồn đầy tính triết lý, luôn đi tìm ý nghĩa giữa những điều bình dị nhất.";

  return (
    <div
      ref={ref}
      className="relative flex flex-col justify-between overflow-hidden bg-gradient-to-br from-slate-900 via-ink to-slate-800 text-white shadow-2xl mx-auto"
      style={{
        width: "400px",
        height: "560px",
        borderRadius: "24px",
        padding: "28px",
      }}
    >
      {/* Decorative Background Elements */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-teal/20 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-yellow-500/10 blur-3xl" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between shrink-0">
        <div className="text-lg font-black tracking-widest text-white/90">
          TriếtHọc<span className="text-teal">làgì?</span>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/80 backdrop-blur-sm">
          <Sparkles className="h-3 w-3" /> Rare
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center pt-2 pb-4">
        <Illustration
          illustrationKey={result.dominant.illustrationKey}
          className="mb-4 h-36 w-36 drop-shadow-2xl"
        />
        <div className="text-center w-full">
          <div className="mb-1 text-[10px] font-black uppercase tracking-widest text-teal">
            Triết gia nội tâm
          </div>
          <h2 className="text-3xl font-black leading-tight text-white drop-shadow-md mb-3">
            {result.dominant.nameVi}
          </h2>
          {/* Semantic Witty Quote */}
          <div className="relative rounded-xl bg-white/5 border border-white/10 px-4 py-3 mx-2">
            <p className="text-[11px] leading-relaxed text-white/80 italic line-clamp-3">
              "{wittyQuote}"
            </p>
          </div>
        </div>
      </div>

      {/* Stats Board */}
      <div className="relative z-10 rounded-2xl bg-white/10 p-4 backdrop-blur-md border border-white/10 shrink-0">
        <div className="mb-3 text-[10px] font-black uppercase tracking-widest text-white/60">
          Chỉ số sức mạnh
        </div>
        <div className="flex justify-between gap-2">
          {result.topThree.map((item, index) => (
            <div
              key={item.key}
              className={`flex flex-col items-center justify-center rounded-xl p-2 text-center ${
                index === 0 ? "bg-teal/20 text-teal" : "bg-black/20 text-white/80"
              }`}
              style={{ flex: 1 }}
            >
              <div className="mb-1 text-[8px] sm:text-[9px] font-bold uppercase leading-tight px-1 h-6 flex items-center justify-center text-balance">
                {item.nameVi}
              </div>
              <div className="text-lg font-black">{formatPercent(item.percentage)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-4 flex items-center justify-between text-[9px] font-semibold text-white/40 uppercase tracking-widest shrink-0">
        <div>Season 1 • MLN Quiz</div>
        <div>SCAN TO PLAY</div>
      </div>
    </div>
  );
});

TradingCard.displayName = "TradingCard";
