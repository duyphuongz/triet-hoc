export type Question = {
  code: string;
  section: string;
  text: string;
  orderIndex: number;
  illustrationKey: string;
};

export type QuestionsResponse = {
  questions: Question[];
  scale: Record<string, string>;
};

export type SurveyAnswer = {
  questionCode: string;
  answerValue: number;
};

export type SurveySubmitResponse = {
  resultId: string;
  shareSlug: string;
  topThree: Array<{
    rank: number;
    key: string;
    nameVi: string;
    percentage: number;
  }>;
  shareUrl: string;
};
