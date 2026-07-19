import { httpClient } from "../../../shared/api/httpClient";
import type { PublicResult, TopThreeItem } from "../../results/types/resultTypes";

export const ADMIN_TOKEN_KEY = "trietlylagi.adminToken";
export const ADMIN_EMAIL_KEY = "trietlylagi.adminEmail";

export type CourseCode = "MLN111" | "MLN122";

export type AdminStats = {
  totalSurveyCount: number;
  mostCommonDominantPhilosophy: string | null;
  averageScoresByPhilosophy: Array<{
    key: string;
    nameVi: string;
    averagePercentage: number;
  }>;
  completionCountByDay: Array<{ date: string; count: number }>;
  hourlyTraffic: Array<{ hour: string; count: number }>;
};

export type AdminQuestion = {
  id: string;
  courseCode: CourseCode;
  code: string;
  section: string;
  text: string;
  orderIndex: number;
  illustrationKey: string;
  isActive: boolean;
  weights: Array<{ philosophyKey: string; weight: number }>;
};

export type PhilosophyAdmin = PublicResult["dominant"];

export type CourseStatus = {
  courseCode: string;
  isSuspended: boolean;
  message: string | null;
};

export type AdminResult = {
  resultId: string;
  shareSlug: string;
  createdAt: string;
  topPhilosophy: string;
  topThree: TopThreeItem[];
};

export function getAdminToken() {
  return sessionStorage.getItem(ADMIN_TOKEN_KEY);
}

export function getAdminEmail() {
  const storedEmail = sessionStorage.getItem(ADMIN_EMAIL_KEY);
  if (storedEmail) return storedEmail;

  const token = getAdminToken();
  if (!token) return null;

  try {
    const encodedPayload = token.split(".")[1];
    const normalizedPayload = encodedPayload.replace(/-/g, "+").replace(/_/g, "/");
    const paddedPayload = normalizedPayload.padEnd(
      Math.ceil(normalizedPayload.length / 4) * 4,
      "=",
    );
    const payload = JSON.parse(
      atob(paddedPayload),
    ) as { sub?: unknown };
    return typeof payload.sub === "string" ? payload.sub : null;
  } catch {
    return null;
  }
}

export const adminApi = {
  async login(email: string, password: string) {
    const payload = await httpClient.post<{ accessToken: string; tokenType: string }>(
      "/admin/auth/login",
      { email, password },
    );
    sessionStorage.setItem(ADMIN_TOKEN_KEY, payload.accessToken);
    sessionStorage.setItem(ADMIN_EMAIL_KEY, email);
    return payload.accessToken;
  },
  logout() {
    sessionStorage.removeItem(ADMIN_TOKEN_KEY);
    sessionStorage.removeItem(ADMIN_EMAIL_KEY);
  },
  stats() {
    return httpClient.get<AdminStats>("/admin/stats", { token: getAdminToken() });
  },
  results() {
    return httpClient.get<AdminResult[]>("/admin/results", { token: getAdminToken() });
  },
  questions() {
    return httpClient.get<AdminQuestion[]>("/admin/questions", { token: getAdminToken() });
  },
  saveQuestion(question: Partial<AdminQuestion> & Omit<AdminQuestion, "id">, id?: string) {
    const body = {
      code: question.code,
      courseCode: question.courseCode,
      section: question.section,
      text: question.text,
      orderIndex: question.orderIndex,
      illustrationKey: question.illustrationKey,
      isActive: question.isActive,
      weights: question.weights,
    };
    if (id) return httpClient.put<AdminQuestion>(`/admin/questions/${id}`, body, { token: getAdminToken() });
    return httpClient.post<AdminQuestion>("/admin/questions", body, { token: getAdminToken() });
  },
  deleteQuestion(id: string) {
    return httpClient.delete<{ ok: boolean }>(`/admin/questions/${id}`, { token: getAdminToken() });
  },
  philosophies(courseCode: CourseCode = "MLN111") {
    return httpClient.get<PhilosophyAdmin[]>(
      `/admin/philosophies?course_code=${courseCode}`,
      { token: getAdminToken() },
    );
  },
  savePhilosophy(philosophy: PhilosophyAdmin, id?: string | null) {
    if (id) return httpClient.put<PhilosophyAdmin>(`/admin/philosophies/${id}`, philosophy, { token: getAdminToken() });
    return httpClient.post<PhilosophyAdmin>("/admin/philosophies", philosophy, { token: getAdminToken() });
  },
  users() {
    return httpClient.get<Array<{ id: string; email: string; name: string | null; createdAt: string }>>("/admin/users", { token: getAdminToken() });
  },
  courseStatuses() {
    return httpClient.get<CourseStatus[]>("/admin/courses", { token: getAdminToken() });
  },
  setCourseStatus(courseCode: string, isSuspended: boolean, message: string | null) {
    return httpClient.put<CourseStatus>(
      `/admin/courses/${courseCode}`,
      { isSuspended, message },
      { token: getAdminToken() },
    );
  },
  get<T>(path: string) {
    return httpClient.get<T>(path, { token: getAdminToken() });
  },
};
