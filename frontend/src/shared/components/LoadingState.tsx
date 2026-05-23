export function LoadingState({ label = "Đang tải..." }: { label?: string }) {
  return (
    <div className="rounded-lg border border-ink/10 bg-white p-6 text-center font-semibold shadow-soft">
      {label}
    </div>
  );
}
