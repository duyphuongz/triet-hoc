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
    <form className="space-y-4 rounded-lg border border-ink/10 bg-white p-4 shadow-soft" onSubmit={handleSubmit}>
      <div className="grid gap-3 md:grid-cols-4">
        <label className="text-sm font-bold">Key<input className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2" value={form.key} onChange={(event) => setForm({ ...form, key: event.target.value })} disabled={Boolean(philosophy)} /></label>
        <label className="text-sm font-bold">Tên VI<input className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2" value={form.nameVi} onChange={(event) => setForm({ ...form, nameVi: event.target.value })} /></label>
        <label className="text-sm font-bold">Tên EN<input className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2" value={form.nameEn} onChange={(event) => setForm({ ...form, nameEn: event.target.value })} /></label>
        <label className="text-sm font-bold">Minh họa<input className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2" value={form.illustrationKey} onChange={(event) => setForm({ ...form, illustrationKey: event.target.value })} /></label>
      </div>
      <label className="block text-sm font-bold">Mô tả ngắn<textarea className="mt-1 min-h-20 w-full rounded-lg border border-ink/20 px-3 py-2" value={form.shortDescription} onChange={(event) => setForm({ ...form, shortDescription: event.target.value })} /></label>
      <label className="block text-sm font-bold">Mô tả dài<textarea className="mt-1 min-h-24 w-full rounded-lg border border-ink/20 px-3 py-2" value={form.longDescription} onChange={(event) => setForm({ ...form, longDescription: event.target.value })} /></label>
      <div className="grid gap-3 md:grid-cols-3">
        <label className="text-sm font-bold">Điểm mạnh<textarea className="mt-1 min-h-28 w-full rounded-lg border border-ink/20 px-3 py-2" value={strengths} onChange={(event) => setStrengths(event.target.value)} /></label>
        <label className="text-sm font-bold">Blind spots<textarea className="mt-1 min-h-28 w-full rounded-lg border border-ink/20 px-3 py-2" value={blindSpots} onChange={(event) => setBlindSpots(event.target.value)} /></label>
        <label className="text-sm font-bold">Gợi ý phát triển<textarea className="mt-1 min-h-28 w-full rounded-lg border border-ink/20 px-3 py-2" value={growth} onChange={(event) => setGrowth(event.target.value)} /></label>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <label className="text-sm font-bold">Work style<textarea className="mt-1 min-h-20 w-full rounded-lg border border-ink/20 px-3 py-2" value={form.workStyle} onChange={(event) => setForm({ ...form, workStyle: event.target.value })} /></label>
        <label className="text-sm font-bold">Learning style<textarea className="mt-1 min-h-20 w-full rounded-lg border border-ink/20 px-3 py-2" value={form.learningStyle} onChange={(event) => setForm({ ...form, learningStyle: event.target.value })} /></label>
        <label className="text-sm font-bold">Conflict style<textarea className="mt-1 min-h-20 w-full rounded-lg border border-ink/20 px-3 py-2" value={form.conflictStyle} onChange={(event) => setForm({ ...form, conflictStyle: event.target.value })} /></label>
        <label className="text-sm font-bold">Life meaning style<textarea className="mt-1 min-h-20 w-full rounded-lg border border-ink/20 px-3 py-2" value={form.lifeMeaningStyle} onChange={(event) => setForm({ ...form, lifeMeaningStyle: event.target.value })} /></label>
      </div>
      <Button type="submit" variant="secondary">{philosophy ? "Lưu hồ sơ" : "Tạo hồ sơ"}</Button>
    </form>
  );
}
