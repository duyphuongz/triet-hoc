import confetti from "canvas-confetti";
import { RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion, Variants } from "framer-motion";

import { useQuizStore } from "../features/quiz/stores/quizStore";
import { ResultExplanation } from "../features/results/components/ResultExplanation";
import { ScoreBarChart } from "../features/results/components/ScoreBarChart";
import { ShareResultButton } from "../features/results/components/ShareResultButton";
import { TopThreeRanking } from "../features/results/components/TopThreeRanking";
import type { PublicResult } from "../features/results/types/resultTypes";
import { httpClient } from "../shared/api/httpClient";
import { ButtonLink } from "../shared/components/Button";
import { Card } from "../shared/components/Card";
import { ErrorState } from "../shared/components/ErrorState";
import { LoadingState } from "../shared/components/LoadingState";
import { PageShell } from "../shared/components/PageShell";
import { Illustration } from "../shared/illustrations";
import { formatPercent } from "../shared/utils/formatPercent";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 15 },
  },
};

const floatVariants: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3.5,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

export function ResultPage() {
  const { shareSlug } = useParams();
  const reset = useQuizStore((state) => state.reset);
  const [result, setResult] = useState<PublicResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadResult() {
      if (!shareSlug) return;
      setLoading(true);
      try {
        setResult(await httpClient.get<PublicResult>(`/results/${shareSlug}`));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Không tải được kết quả.");
      } finally {
        setLoading(false);
      }
    }
    void loadResult();
  }, [shareSlug]);

  useEffect(() => {
    if (result) {
      setTimeout(() => {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.5 },
          colors: ["#2d3436", "#00b894", "#fdcb6e", "#ff7675", "#6c5ce7"], // Neo-brutalist palette
        });
      }, 300); // slight delay to let animation settle
    }
  }, [result]);

  if (loading) {
    return (
      <PageShell>
        <LoadingState label="Đang mở phong bì triết học..." />
      </PageShell>
    );
  }

  if (error || !result) {
    return (
      <PageShell>
        <ErrorState message={error ?? "Không có kết quả."} />
      </PageShell>
    );
  }

  const dominantScore = result.topThree[0];

  return (
    <PageShell>
      <motion.div 
        className="space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <div className="grid gap-8 overflow-hidden rounded-3xl bg-white/60 p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] backdrop-blur-xl dark:bg-slate-900/60 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] md:grid-cols-[1fr_240px] md:items-center md:p-12 border border-white/50 dark:border-white/10">
            <div>
              <div className="mb-4 text-xs font-black uppercase tracking-widest text-ink/50 dark:text-white/50">Kết quả nổi bật</div>
              <h1 className="mt-2 text-4xl font-black leading-none md:text-6xl dark:text-white">
                Bạn nghiêng về <span className="text-teal">{result.dominant.nameVi}</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg font-semibold leading-relaxed text-ink/80 dark:text-white/80">
                {result.resultSummary}
              </p>
              <div className="mt-6 text-6xl font-black tracking-tighter text-teal dark:text-teal-400">
                {formatPercent(dominantScore.percentage)}
              </div>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <ShareResultButton result={result} />
                <ButtonLink to="/" variant="ghost" onClick={reset}>
                  <RefreshCcw className="h-5 w-5" aria-hidden="true" />
                  Làm lại bài
                </ButtonLink>
              </div>
            </div>
            <motion.div variants={floatVariants} animate="animate">
              <Illustration illustrationKey={result.dominant.illustrationKey} className="mx-auto h-64 w-full max-w-[16rem] drop-shadow-2xl" />
            </motion.div>
          </div>
        </motion.div>
        
        <motion.section variants={itemVariants}>
          <h2 className="mb-3 text-2xl font-black dark:text-white">Top 3 xu hướng</h2>
          <TopThreeRanking items={result.topThree} />
        </motion.section>
        
        <motion.section variants={itemVariants}>
          <h2 className="mb-3 text-2xl font-black dark:text-white">Bảng điểm toàn bộ hệ</h2>
          <ScoreBarChart data={result.scoreBreakdown} />
        </motion.section>
        
        <motion.section variants={itemVariants}>
          <h2 className="mb-3 text-2xl font-black dark:text-white">Giải thích chi tiết</h2>
          <ResultExplanation result={result} />
        </motion.section>
      </motion.div>
    </PageShell>
  );
}
