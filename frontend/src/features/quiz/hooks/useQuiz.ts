import { useCallback, useEffect, useState } from "react";

import { httpClient } from "../../../shared/api/httpClient";
import { getAnonymousClientId } from "../../../shared/utils/anonymousClientId";
import { useQuizStore } from "../stores/quizStore";
import type { QuestionsResponse, SurveySubmitResponse } from "../types/quizTypes";

export function useQuiz() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { questions, answers, setQuestions, courseCode, quizLength } = useQuizStore();

  const loadQuestions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const payload = await httpClient.get<QuestionsResponse>(`/questions?course_code=${courseCode}&limit=${quizLength}`);
      setQuestions(payload.questions);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không tải được câu hỏi.");
    } finally {
      setLoading(false);
    }
  }, [setQuestions, courseCode, quizLength]);

  useEffect(() => {
    if (questions.length === 0) {
      void loadQuestions();
    } else {
      setLoading(false);
    }
  }, [loadQuestions, questions.length]);

  const submit = useCallback(async () => {
    setSubmitting(true);
    setError(null);
    try {
      const response = await httpClient.post<SurveySubmitResponse>("/survey/submit", {
        courseCode,
        anonymousClientId: getAnonymousClientId(),
        answers: questions.map((question) => ({
          questionCode: question.code,
          answerValue: answers[question.code],
        })),
      });
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không gửi được bài quiz.");
      return null;
    } finally {
      setSubmitting(false);
    }
  }, [answers, questions]);

  return { loading, submitting, error, reload: loadQuestions, submit };
}
