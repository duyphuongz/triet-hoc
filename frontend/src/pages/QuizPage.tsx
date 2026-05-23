import { ArrowLeft, ArrowRight, Send } from "lucide-react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { QuestionCard } from "../features/quiz/components/QuestionCard";
import { QuizProgress } from "../features/quiz/components/QuizProgress";
import { useQuiz } from "../features/quiz/hooks/useQuiz";
import { useQuizStore } from "../features/quiz/stores/quizStore";
import { Button } from "../shared/components/Button";
import { ErrorState } from "../shared/components/ErrorState";
import { LoadingState } from "../shared/components/LoadingState";
import { PageShell } from "../shared/components/PageShell";
import { saveLocalResult } from "../shared/utils/anonymousClientId";

export function QuizPage() {
  const navigate = useNavigate();
  const { loading, submitting, error, reload, submit } = useQuiz();
  const { questions, answers, currentIndex, setAnswer, next, back } = useQuizStore();
  const currentQuestion = questions[currentIndex];
  const allAnswered = useMemo(
    () => questions.length === 20 && questions.every((question) => Boolean(answers[question.code])),
    [answers, questions],
  );

  async function handleSubmit() {
    if (!allAnswered) return;
    const result = await submit();
    if (result) {
      saveLocalResult(result.shareSlug);
      navigate(`/results/${result.shareSlug}`);
    }
  }

  if (loading) {
    return (
      <PageShell>
        <LoadingState label="Đang gọi 20 câu hỏi ra sân..." />
      </PageShell>
    );
  }

  if (error || !currentQuestion) {
    return (
      <PageShell>
        <ErrorState message={error ?? "Không tìm thấy câu hỏi."} onRetry={reload} />
      </PageShell>
    );
  }

  const selected = answers[currentQuestion.code];
  const isLast = currentIndex === questions.length - 1;

  return (
    <PageShell compact>
      <div className="mx-auto max-w-4xl space-y-6">
        <QuizProgress current={currentIndex + 1} total={questions.length} />
        <QuestionCard
          question={currentQuestion}
          value={selected}
          onAnswer={(value) => setAnswer(currentQuestion.code, value)}
        />
        {error ? <ErrorState message={error} /> : null}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button type="button" variant="ghost" onClick={back} disabled={currentIndex === 0}>
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Quay lại
          </Button>
          {isLast ? (
            <Button type="button" onClick={handleSubmit} disabled={!allAnswered || submitting}>
              <Send className="h-4 w-4" aria-hidden="true" />
              {submitting ? "Đang chấm..." : "Nộp bài"}
            </Button>
          ) : (
            <Button type="button" onClick={next} disabled={!selected}>
              Tiếp theo
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          )}
        </div>
        {!allAnswered && isLast ? (
          <p className="text-center text-sm font-semibold text-ink/60">
            Cần đủ 20 câu trả lời rồi mới nộp được nha.
          </p>
        ) : null}
      </div>
    </PageShell>
  );
}
