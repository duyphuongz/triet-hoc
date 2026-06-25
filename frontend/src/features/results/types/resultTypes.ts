export type TopThreeItem = {
  rank: number;
  key: string;
  nameVi: string;
  percentage: number;
};

export type ScoreBreakdownItem = TopThreeItem & {
  rawScore: number;
};

export type PhilosophyDetail = {
  id?: string | null;
  key: string;
  nameVi: string;
  nameEn: string;
  shortDescription: string;
  longDescription: string;
  strengths: string[];
  blindSpots: string[];
  workStyle: string;
  learningStyle: string;
  conflictStyle: string;
  lifeMeaningStyle: string;
  growthSuggestions: string[];
  illustrationKey: string;
};

export type PublicResult = {
  resultId: string;
  shareSlug: string;
  createdAt: string;
  topThree: TopThreeItem[];
  scoreBreakdown: ScoreBreakdownItem[];
  dominant: PhilosophyDetail;
  resultSummary: string;
  explanation: string;
  disclaimer: string;
};

export type HistoryResponse = {
  anonymousClientId: string;
  results: Array<{
    resultId: string;
    shareSlug: string;
    createdAt: string;
    courseCode: string;
    topThree: TopThreeItem[];
  }>;
};
