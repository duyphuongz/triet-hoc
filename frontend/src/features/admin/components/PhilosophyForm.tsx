import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";

import { Button } from "../../../shared/components/Button";
import type { PhilosophyAdmin } from "../api/adminApi";

const blankPhilosophy: PhilosophyAdmin = {
  key: "",
  nameVi: "",
  nameEn: "",
  shortDescription: "",
  longDescription: "",
  strengths: [],
  blindSpots: [],
  workStyle: "",
  learningStyle: "",
  conflictStyle: "",
  lifeMeaningStyle: "",
  growthSuggestions: [],
  illustrationKey: "cartoon_philosopher",
};

function lines(value: string) {
  return value.split("\n").map((item) => item.trim()).filter(Boolean);
}

type PhilosophyFormProps = {
  philosophy?: PhilosophyAdmin;
  onSubmit: (philosophy: PhilosophyAdmin, id?: string) => Promise<void>;
};

const fieldClassName =
  "mt-1 w-full rounded-lg border border-ink/20 bg-white px-3 py-2 text-ink outline-none transition placeholder:text-ink/30 focus:border-teal disabled:cursor-not-allowed disabled:bg-ink/5 disabled:text-ink/45 dark:border-white/10 dark:bg-slate-900 dark:text-white dark:placeholder:text-white/30 dark:disabled:bg-white/5 dark:disabled:text-white/40";

export function PhilosophyForm({ philosophy, onSubmit }: PhilosophyFormProps) {
  const initial = useMemo(() => philosophy ?? blankPhilosophy, [philosophy]);
  const [form, setForm] = useState<PhilosophyAdmin>(initial);
  const [strengths, setStrengths] = useState(initial.strengths.join("\n"));
  const [blindSpots, setBlindSpots] = useState(initial.blindSpots.join("\n"));
  const [growth, setGrowth] = useState(initial.growthSuggestions.join("\n"));

  useEffect(() => {
    setForm(initial);
    setStrengths(initial.strengths.join("\n"));
    setBlindSpots(initial.blindSpots.join("\n"));
    setGrowth(initial.growthSuggestions.join("\n"));
  }, [initial]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    await onSubmit(
      {
        ...form,
        strengths: lines(strengths),
        blindSpots: lines(blindSpots),
        growthSuggestions: lines(growth),
      },
      philosophy?.id ?? undefined,
    );
  }

  return (
    <form className="space-y-4 rounded-lg border border-ink/10 bg-white p-4 text-ink shadow-soft transition-colors dark:border-white/10 dark:bg-slate-800 dark:text-white dark:shadow-none" onSubmit={handleSubmit}>
      <div className="grid gap-3 md:grid-cols-4">
        <label className="text-sm font-bold">Key<input className={fieldClassName} value={form.key} onChange={(event) => setForm({ ...form, key: event.target.value })} disabled={Boolean(philosophy)} /></label>
        <label className="text-sm font-bold">Tên VI<input className={fieldClassName} value={form.nameVi} onChange={(event) => setForm({ ...form, nameVi: event.target.value })} /></label>
        <label className="text-sm font-bold">Tên EN<input className={fieldClassName} value={form.nameEn} onChange={(event) => setForm({ ...form, nameEn: event.target.value })} /></label>
        <label className="text-sm font-bold">Minh họa<input className={fieldClassName} value={form.illustrationKey} onChange={(event) => setForm({ ...form, illustrationKey: event.target.value })} /></label>
      </div>
      <label className="block text-sm font-bold">Mô tả ngắn<textarea className={`${fieldClassName} min-h-20`} value={form.shortDescription} onChange={(event) => setForm({ ...form, shortDescription: event.target.value })} /></label>
      <label className="block text-sm font-bold">Mô tả dài<textarea className={`${fieldClassName} min-h-24`} value={form.longDescription} onChange={(event) => setForm({ ...form, longDescription: event.target.value })} /></label>
      <div className="grid gap-3 md:grid-cols-3">
        <label className="text-sm font-bold">Điểm mạnh<textarea className={`${fieldClassName} min-h-28`} value={strengths} onChange={(event) => setStrengths(event.target.value)} /></label>
        <label className="text-sm font-bold">Blind spots<textarea className={`${fieldClassName} min-h-28`} value={blindSpots} onChange={(event) => setBlindSpots(event.target.value)} /></label>
        <label className="text-sm font-bold">Gợi ý phát triển<textarea className={`${fieldClassName} min-h-28`} value={growth} onChange={(event) => setGrowth(event.target.value)} /></label>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <label className="text-sm font-bold">Work style<textarea className={`${fieldClassName} min-h-20`} value={form.workStyle} onChange={(event) => setForm({ ...form, workStyle: event.target.value })} /></label>
        <label className="text-sm font-bold">Learning style<textarea className={`${fieldClassName} min-h-20`} value={form.learningStyle} onChange={(event) => setForm({ ...form, learningStyle: event.target.value })} /></label>
        <label className="text-sm font-bold">Conflict style<textarea className={`${fieldClassName} min-h-20`} value={form.conflictStyle} onChange={(event) => setForm({ ...form, conflictStyle: event.target.value })} /></label>
        <label className="text-sm font-bold">Life meaning style<textarea className={`${fieldClassName} min-h-20`} value={form.lifeMeaningStyle} onChange={(event) => setForm({ ...form, lifeMeaningStyle: event.target.value })} /></label>
      </div>
      <Button type="submit" variant="secondary">{philosophy ? "Lưu hồ sơ" : "Tạo hồ sơ"}</Button>
    </form>
  );
}
