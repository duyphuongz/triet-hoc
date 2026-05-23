const SECTION_LABELS: Record<string, string> = {
  meaning_life: "Ý nghĩa cuộc sống",
  work_discipline: "Công việc & kỷ luật",
  ethics_society: "Đạo đức & xã hội",
  emotions_conflict: "Cảm xúc & xung đột",
};

export function SectionBadge({ section }: { section: string }) {
  return (
    <span className="inline-flex rounded-lg bg-mint px-3 py-1 text-xs font-black uppercase tracking-normal text-ink">
      {SECTION_LABELS[section] ?? section}
    </span>
  );
}
