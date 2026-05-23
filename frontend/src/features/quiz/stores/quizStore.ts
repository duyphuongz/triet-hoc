import { create } from "zustand";

import type { Question } from "../types/quizTypes";

type QuizState = {
  questions: Question[];
  answers: Record<string, number>;
  currentIndex: number;
  setQuestions: (questions: Question[]) => void;
  setAnswer: (questionCode: string, answerValue: number) => void;
  next: () => void;
  back: () => void;
  reset: () => void;
};

export const useQuizStore = create<QuizState>((set, get) => ({
  questions: [],
  answers: {},
  currentIndex: 0,
  setQuestions: (questions) => set({ questions, currentIndex: 0, answers: {} }),
  setAnswer: (questionCode, answerValue) =>
    set((state) => ({ answers: { ...state.answers, [questionCode]: answerValue } })),
  next: () =>
    set((state) => ({
      currentIndex: Math.min(state.currentIndex + 1, Math.max(state.questions.length - 1, 0)),
    })),
  back: () => set((state) => ({ currentIndex: Math.max(state.currentIndex - 1, 0) })),
  reset: () => set({ questions: get().questions, answers: {}, currentIndex: 0 }),
}));
