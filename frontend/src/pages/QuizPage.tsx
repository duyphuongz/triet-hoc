import { ArrowLeft, ArrowRight, Send } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

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
  const { courseCode } = useParams<{ courseCode: string }>();
  const navigate = useNavigate();
  const { questions, answers, currentIndex, setAnswer, next, back, setCourseCode } = useQuizStore();
  const { loading, submitting, error, reload, submit } = useQuiz();

  useEffect(() => {
    if (courseCode) {
      setCourseCode(courseCode);
    }
  }, [courseCode, setCourseCode]);

  const currentQuestion = questions[currentIndex];
  const allAnswered = useMemo(
    () => questions.length > 0 && questions.every((question) => Boolean(answers[question.code])),
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
        <LoadingState label="Đang gọi các câu hỏi ra sân..." />
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
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.code}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <QuestionCard
              question={currentQuestion}
              value={selected}
              onAnswer={(value) => setAnswer(currentQuestion.code, value)}
            />
          </motion.div>
        </AnimatePresence>

        {error ? <ErrorState message={error} /> : null}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button type="button" variant="ghost" onClick={back} disabled={currentIndex === 0}>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Quay lại
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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
          </motion.div>
        </div>
        
        {!allAnswered && isLast ? (
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-sm font-semibold text-ink/60 dark:text-white/60"
          >
            Cần trả lời đủ các câu hỏi rồi mới nộp được nha.
          </motion.p>
        ) : null}
      </div>
    </PageShell>
  );
}
