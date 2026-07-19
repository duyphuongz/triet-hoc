import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";

import { Button } from "../../../shared/components/Button";
import type { AdminQuestion, CourseCode, PhilosophyAdmin } from "../api/adminApi";

function blankQuestion(courseCode: CourseCode): Omit<AdminQuestion, "id"> {
  return {
    courseCode,
    code: courseCode === "MLN122" ? "mln122_q" : "q",
    section: courseCode === "MLN122" ? "general" : "meaning_life",
    text: "",
    orderIndex: 1,
    illustrationKey: "cartoon_philosopher",
    isActive: true,
    weights: [],
  };
}

type QuestionFormProps = {
  question?: AdminQuestion;
  courseCode: CourseCode;
  philosophies: PhilosophyAdmin[];
  onSubmit: (question: Omit<AdminQuestion, "id">, id?: string) => Promise<void>;
};

const fieldClassName =
  "mt-1 w-full rounded-lg border border-ink/20 bg-white px-3 py-2 text-ink outline-none transition placeholder:text-ink/30 focus:border-teal dark:border-white/10 dark:bg-slate-900 dark:text-white dark:placeholder:text-white/30";

export function QuestionForm({ question, courseCode, philosophies, onSubmit }: QuestionFormProps) {
  const initial = useMemo(() => question ?? blankQuestion(courseCode), [courseCode, question]);
  const [form, setForm] = useState<Omit<AdminQuestion, "id">>(initial);

  useEffect(() => {
    setForm(initial);
  }, [initial]);

  function weightFor(key: string) {
    return form.weights.find((item) => item.philosophyKey === key)?.weight ?? 0;
  }

  function setWeight(philosophyKey: string, weight: number) {
    setForm((current) => ({
      ...current,
      weights: [
        ...current.weights.filter((item) => item.philosophyKey !== philosophyKey),
        { philosophyKey, weight },
      ].filter((item) => item.weight > 0),
    }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    await onSubmit(form, question?.id);
  }

  return (
    <form className="space-y-4 rounded-lg border border-ink/10 bg-white p-4 text-ink shadow-soft transition-colors dark:border-white/10 dark:bg-slate-800 dark:text-white dark:shadow-none" onSubmit={handleSubmit}>
      <div className="flex items-center justify-between gap-3 border-b border-ink/10 pb-3 dark:border-white/10">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink/50 dark:text-white/45">Môn học</p>
          <p className="mt-1 text-lg font-black text-ink dark:text-white">{courseCode}</p>
        </div>
        <span className="rounded-lg bg-mint px-3 py-2 text-xs font-black text-ink">
          {question ? "Đang chỉnh sửa" : "Câu hỏi mới"}
        </span>
      </div>
      <div className="grid gap-3 md:grid-cols-4">
        <label className="text-sm font-bold">
          Mã
          <input className={fieldClassName} value={form.code} onChange={(event) => setForm({ ...form, code: event.target.value })} />
        </label>
        <label className="text-sm font-bold">
          Section
          <select className={fieldClassName} value={form.section} onChange={(event) => setForm({ ...form, section: event.target.value })}>
            {courseCode === "MLN122" ? <option value="general">Tổng quát</option> : null}
            <option value="meaning_life">Ý nghĩa</option>
            <option value="work_discipline">Công việc</option>
            <option value="ethics_society">Đạo đức</option>
            <option value="emotions_conflict">Cảm xúc</option>
          </select>
        </label>
        <label className="text-sm font-bold">
          Thứ tự
          <input className={fieldClassName} type="number" value={form.orderIndex} onChange={(event) => setForm({ ...form, orderIndex: Number(event.target.value) })} />
        </label>
        <label className="text-sm font-bold">
          Minh họa
          <input className={fieldClassName} value={form.illustrationKey} onChange={(event) => setForm({ ...form, illustrationKey: event.target.value })} />
        </label>
      </div>
      <label className="block text-sm font-bold">
        Nội dung câu hỏi
        <textarea className={`${fieldClassName} min-h-24`} value={form.text} onChange={(event) => setForm({ ...form, text: event.target.value })} />
      </label>
      <label className="flex items-center gap-2 text-sm font-bold">
        <input className="accent-teal" type="checkbox" checked={form.isActive} onChange={(event) => setForm({ ...form, isActive: event.target.checked })} />
        Đang hoạt động
      </label>
      <div>
        <div className="mb-2 text-sm font-black">Weights</div>
        <div className="grid gap-2 md:grid-cols-3">
          {philosophies.map((philosophy) => (
            <label key={philosophy.key} className="text-xs font-bold">
              {philosophy.nameVi}
              <input className={fieldClassName} type="number" min={0} max={5} value={weightFor(philosophy.key)} onChange={(event) => setWeight(philosophy.key, Number(event.target.value))} />
            </label>
          ))}
        </div>
      </div>
      <Button type="submit" variant="secondary">{question ? "Lưu câu hỏi" : "Tạo câu hỏi"}</Button>
    </form>
  );
}
