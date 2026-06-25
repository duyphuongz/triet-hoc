import type { Question } from "../types/quizTypes";
import { Illustration } from "../../../shared/illustrations";
import { LikertScale } from "./LikertScale";
import { SectionBadge } from "./SectionBadge";

type QuestionCardProps = {
  question: Question;
  value?: number;
  onAnswer: (value: number) => void;
};

export function QuestionCard({ question, value, onAnswer }: QuestionCardProps) {
  return (
    <section className="grid gap-6 rounded-lg border border-ink/10 dark:border-white/10 bg-white dark:bg-slate-800 p-5 shadow-soft md:grid-cols-[1fr_220px] md:items-center">
      <div>
        <SectionBadge section={question.section} />
        <h1 className="mt-4 text-2xl font-black leading-tight text-ink dark:text-white md:text-3xl">
          {question.text}
        </h1>
        <p className="mt-3 text-sm font-semibold text-ink/60 dark:text-white/60">
          Chọn mức độ giống bạn nhất. Không có đáp án đúng sai, chỉ có màn soi gương nhẹ.
        </p>
        <div className="mt-6">
          <LikertScale value={value} onChange={onAnswer} />
        </div>
      </div>
      <Illustration illustrationKey={question.illustrationKey} className="mx-auto h-48 w-full max-w-56" />
    </section>
  );
}
