import { create } from "zustand";

import type { Question } from "../types/quizTypes";

type QuizState = {
  courseCode: string;
  setCourseCode: (code: string) => void;
  questions: Question[];
  answers: Record<string, number>;
  currentIndex: number;
  quizLength: number;
  setQuizLength: (length: number) => void;
  setQuestions: (questions: Question[]) => void;
  setAnswer: (questionCode: string, answerValue: number) => void;
  next: () => void;
  back: () => void;
  reset: () => void;
};

export const useQuizStore = create<QuizState>((set, get) => ({
  courseCode: "MLN111",
  setCourseCode: (code) => set({ courseCode: code }),
  questions: [],
  answers: {},
  currentIndex: 0,
  quizLength: 20,
  setQuizLength: (length) => set({ quizLength: length }),
  setQuestions: (questions) => set((state) => ({ questions: questions.slice(0, state.quizLength), currentIndex: 0, answers: {} })),
  setAnswer: (questionCode, answerValue) =>
    set((state) => ({ answers: { ...state.answers, [questionCode]: answerValue } })),
  next: () =>
    set((state) => ({
      currentIndex: Math.min(state.currentIndex + 1, Math.max(state.questions.length - 1, 0)),
    })),
  back: () => set((state) => ({ currentIndex: Math.max(state.currentIndex - 1, 0) })),
  reset: () => set({ questions: [], answers: {}, currentIndex: 0, quizLength: 20 }),
}));
