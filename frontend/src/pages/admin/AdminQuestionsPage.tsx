import { BookOpen, CheckCircle2, Plus, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

import {
  adminApi,
  type AdminQuestion,
  type CourseCode,
  type PhilosophyAdmin,
} from "../../features/admin/api/adminApi";
import { AdminLayout } from "../../features/admin/components/AdminLayout";
import { QuestionForm } from "../../features/admin/components/QuestionForm";
import { Button } from "../../shared/components/Button";
import { Card } from "../../shared/components/Card";
import { ErrorState } from "../../shared/components/ErrorState";
import { LoadingState } from "../../shared/components/LoadingState";

const COURSES: Array<{ code: CourseCode; name: string; accentSurface: string }> = [
  {
    code: "MLN111",
    name: "Triết học Mác - Lênin",
    accentSurface: "bg-teal/15",
  },
  {
    code: "MLN122",
    name: "Kinh tế Chính trị Mác - Lênin",
    accentSurface: "bg-coral/15",
  },
];

const EMPTY_PHILOSOPHIES: Record<CourseCode, PhilosophyAdmin[]> = {
  MLN111: [],
  MLN122: [],
};

export function AdminQuestionsPage() {
  const [questions, setQuestions] = useState<AdminQuestion[]>([]);
  const [philosophiesByCourse, setPhilosophiesByCourse] =
    useState<Record<CourseCode, PhilosophyAdmin[]>>(EMPTY_PHILOSOPHIES);
  const [selectedCourse, setSelectedCourse] = useState<CourseCode>("MLN111");
  const [selectedId, setSelectedId] = useState<string>();
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load(preferredCourse: CourseCode, preferredId?: string) {
    setLoading(true);
    setError(null);
    try {
      const [questionPayload, mln111Philosophies, mln122Philosophies] =
        await Promise.all([
          adminApi.questions(),
          adminApi.philosophies("MLN111"),
          adminApi.philosophies("MLN122"),
        ]);

      setQuestions(questionPayload);
      setPhilosophiesByCourse({
        MLN111: mln111Philosophies,
        MLN122: mln122Philosophies,
      });
      setSelectedCourse(preferredCourse);

      const preferredExists = questionPayload.some(
        (question) =>
          question.id === preferredId && question.courseCode === preferredCourse,
      );
      const firstInCourse = questionPayload.find(
        (question) => question.courseCode === preferredCourse,
      );
      setSelectedId(preferredExists ? preferredId : firstInCourse?.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không tải được câu hỏi.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load("MLN111");
  }, []);

  const courseQuestions = questions.filter(
    (question) => question.courseCode === selectedCourse,
  );
  const normalizedQuery = searchQuery.trim().toLocaleLowerCase("vi");
  const visibleQuestions = normalizedQuery
    ? courseQuestions.filter((question) =>
        `${question.code} ${question.text}`.toLocaleLowerCase("vi").includes(normalizedQuery),
      )
    : courseQuestions;
  const selected = questions.find(
    (question) =>
      question.id === selectedId && question.courseCode === selectedCourse,
  );

  function selectCourse(courseCode: CourseCode) {
    const firstQuestion = questions.find(
      (question) => question.courseCode === courseCode,
    );
    setSelectedCourse(courseCode);
    setSelectedId(firstQuestion?.id);
    setSearchQuery("");
  }

  async function save(question: Omit<AdminQuestion, "id">, id?: string) {
    const saved = await adminApi.saveQuestion(question, id);
    await load(saved.courseCode, saved.id);
  }

  async function remove(id: string) {
    await adminApi.deleteQuestion(id);
    await load(selectedCourse);
  }

  return (
    <AdminLayout>
      {loading ? <LoadingState /> : null}
      {error ? (
        <ErrorState
          message={error}
          onRetry={() => void load(selectedCourse, selectedId)}
        />
      ) : null}

      {!loading && !error ? (
        <section className="space-y-6" aria-labelledby="question-bank-title">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.16em] text-ink/50 dark:text-white/45">
                Quản trị nội dung
              </p>
              <h1 id="question-bank-title" className="mt-0.5 text-2xl font-black tracking-tight text-ink dark:text-white">
                Ngân hàng câu hỏi
              </h1>
              <p className="mt-1 max-w-2xl text-sm font-medium text-ink/60 dark:text-white/60">
                Mỗi môn có danh sách và bộ trọng số riêng. Chọn môn trước khi tạo hoặc chỉnh sửa câu hỏi.
              </p>
            </div>
            <Button
              type="button"
              variant="secondary"
              className="self-start !min-h-0 !px-3 !py-2 text-xs sm:mt-1 sm:mr-1"
              onClick={() => setSelectedId(undefined)}
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              Thêm câu {selectedCourse}
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2" role="tablist" aria-label="Chọn môn học">
            {COURSES.map((course) => {
              const isSelected = selectedCourse === course.code;
              const courseCount = questions.filter(
                (question) => question.courseCode === course.code,
              ).length;
              const activeCount = questions.filter(
                (question) => question.courseCode === course.code && question.isActive,
              ).length;

              return (
                <button
                  key={course.code}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => selectCourse(course.code)}
                  className={`group flex items-center gap-3 rounded-lg border px-4 py-3 text-left transition duration-200 hover:-translate-y-0.5 ${
                    isSelected
                      ? "border-ink bg-ink text-white shadow-soft dark:border-teal dark:bg-slate-950"
                      : "border-ink/10 bg-white text-ink hover:border-ink/25 dark:border-white/10 dark:bg-slate-800 dark:text-white dark:hover:border-teal/50 dark:hover:bg-slate-700"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${
                      isSelected ? "bg-white/15" : course.accentSurface
                    }`}
                  >
                    <BookOpen className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-base font-black">{course.code}</span>
                    <span className={`block truncate text-xs ${isSelected ? "text-white/70" : "text-ink/55 dark:text-white/55"}`}>
                      {course.name}
                    </span>
                  </span>
                  <span className="shrink-0 text-right tabular-nums">
                    <span className="block text-lg font-black leading-none">{courseCount}</span>
                    <span className={`mt-1 block text-[11px] font-bold ${isSelected ? "text-white/60" : "text-ink/45 dark:text-white/45"}`}>
                      {activeCount} hoạt động
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="grid items-start gap-6 pt-2 lg:grid-cols-[340px_minmax(0,1fr)]">
            <Card className="h-fit lg:sticky lg:top-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink/45 dark:text-white/45">
                    Danh sách môn
                  </p>
                  <h2 className="mt-1 text-xl font-black">{selectedCourse}</h2>
                </div>
                <span className="rounded-lg bg-paper px-2.5 py-1.5 text-xs font-black tabular-nums text-ink/60 dark:bg-white/10 dark:text-white/65">
                  {visibleQuestions.length}/{courseQuestions.length}
                </span>
              </div>

              <label className="relative mb-4 block">
                <span className="sr-only">Tìm câu hỏi</span>
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40 dark:text-white/40"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Tìm theo mã hoặc nội dung..."
                  className="w-full rounded-lg border border-ink/15 bg-paper py-2.5 pl-9 pr-3 text-sm font-semibold text-ink outline-none transition placeholder:text-ink/35 focus:border-teal dark:border-white/10 dark:bg-slate-900 dark:text-white dark:placeholder:text-white/35"
                />
              </label>

              <div className="max-h-[62dvh] space-y-2 overflow-y-auto pr-1">
                {visibleQuestions.map((question) => {
                  const isSelected = selected?.id === question.id;
                  return (
                    <button
                      key={question.id}
                      type="button"
                      className={`w-full rounded-lg border px-3 py-3 text-left transition duration-200 ${
                        isSelected
                          ? "border-ink bg-ink text-white dark:border-teal dark:bg-slate-950"
                          : "border-ink/10 bg-paper text-ink hover:border-ink/25 hover:bg-white dark:border-white/10 dark:bg-slate-900 dark:text-white dark:hover:border-teal/40 dark:hover:bg-slate-700"
                      }`}
                      onClick={() => setSelectedId(question.id)}
                    >
                      <span className="flex items-center gap-2">
                        <span className={`text-xs font-black tabular-nums ${isSelected ? "text-white/55" : "text-ink/40 dark:text-white/40"}`}>
                          {String(question.orderIndex).padStart(2, "0")}
                        </span>
                        <span className="min-w-0 flex-1 truncate text-sm font-black">
                          {question.code}
                        </span>
                        <CheckCircle2
                          className={`h-4 w-4 shrink-0 ${
                            question.isActive
                              ? isSelected
                                ? "text-mint"
                                : "text-teal"
                              : "text-ink/20 dark:text-white/20"
                          }`}
                          aria-label={question.isActive ? "Đang hoạt động" : "Đã tắt"}
                        />
                      </span>
                      <span className={`mt-1 block truncate text-xs font-medium ${isSelected ? "text-white/65" : "text-ink/55 dark:text-white/55"}`}>
                        {question.text}
                      </span>
                    </button>
                  );
                })}

                {visibleQuestions.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-ink/15 px-4 py-8 text-center dark:border-white/15">
                    <p className="text-sm font-bold text-ink/55 dark:text-white/55">Không tìm thấy câu hỏi phù hợp.</p>
                  </div>
                ) : null}
              </div>
            </Card>

            <div className="min-w-0 space-y-4">
              <QuestionForm
                key={selected?.id ?? `new-${selectedCourse}`}
                question={selected}
                courseCode={selectedCourse}
                philosophies={philosophiesByCourse[selectedCourse]}
                onSubmit={save}
              />
              {selected ? (
                <Button type="button" variant="danger" onClick={() => void remove(selected.id)}>
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                  Tắt câu hỏi này
                </Button>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}
    </AdminLayout>
  );
}
