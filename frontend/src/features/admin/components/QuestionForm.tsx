import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";

import { Button } from "../../../shared/components/Button";
import type { AdminQuestion, PhilosophyAdmin } from "../api/adminApi";

const blankQuestion: Omit<AdminQuestion, "id"> = {
  code: "",
  section: "meaning_life",
  text: "",
  orderIndex: 21,
  illustrationKey: "cartoon_philosopher",
  isActive: true,
  weights: [],
};

type QuestionFormProps = {
  question?: AdminQuestion;
  philosophies: PhilosophyAdmin[];
  onSubmit: (question: Omit<AdminQuestion, "id">, id?: string) => Promise<void>;
};

export function QuestionForm({ question, philosophies, onSubmit }: QuestionFormProps) {
  const initial = useMemo(() => question ?? blankQuestion, [question]);
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
    <form className="space-y-4 rounded-lg border border-ink/10 bg-white p-4 shadow-soft" onSubmit={handleSubmit}>
      <div className="grid gap-3 md:grid-cols-4">
        <label className="text-sm font-bold">
          Mã
          <input className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2" value={form.code} onChange={(event) => setForm({ ...form, code: event.target.value })} />
        </label>
        <label className="text-sm font-bold">
          Section
          <select className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2" value={form.section} onChange={(event) => setForm({ ...form, section: event.target.value })}>
            <option value="meaning_life">Ý nghĩa</option>
            <option value="work_discipline">Công việc</option>
            <option value="ethics_society">Đạo đức</option>
            <option value="emotions_conflict">Cảm xúc</option>
          </select>
        </label>
        <label className="text-sm font-bold">
          Thứ tự
          <input className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2" type="number" value={form.orderIndex} onChange={(event) => setForm({ ...form, orderIndex: Number(event.target.value) })} />
        </label>
        <label className="text-sm font-bold">
          Minh họa
          <input className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2" value={form.illustrationKey} onChange={(event) => setForm({ ...form, illustrationKey: event.target.value })} />
        </label>
      </div>
      <label className="block text-sm font-bold">
        Nội dung câu hỏi
        <textarea className="mt-1 min-h-24 w-full rounded-lg border border-ink/20 px-3 py-2" value={form.text} onChange={(event) => setForm({ ...form, text: event.target.value })} />
      </label>
      <label className="flex items-center gap-2 text-sm font-bold">
        <input type="checkbox" checked={form.isActive} onChange={(event) => setForm({ ...form, isActive: event.target.checked })} />
        Đang hoạt động
      </label>
      <div>
        <div className="mb-2 text-sm font-black">Weights</div>
        <div className="grid gap-2 md:grid-cols-3">
          {philosophies.map((philosophy) => (
            <label key={philosophy.key} className="text-xs font-bold">
              {philosophy.nameVi}
              <input className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2" type="number" min={0} max={5} value={weightFor(philosophy.key)} onChange={(event) => setWeight(philosophy.key, Number(event.target.value))} />
            </label>
          ))}
        </div>
      </div>
      <Button type="submit" variant="secondary">{question ? "Lưu câu hỏi" : "Tạo câu hỏi"}</Button>
    </form>
  );
}
