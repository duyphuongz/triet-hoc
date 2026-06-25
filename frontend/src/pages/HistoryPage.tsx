import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import type { HistoryResponse } from "../features/results/types/resultTypes";
import { httpClient } from "../shared/api/httpClient";
import { Card } from "../shared/components/Card";
import { ErrorState } from "../shared/components/ErrorState";
import { LoadingState } from "../shared/components/LoadingState";
import { PageShell } from "../shared/components/PageShell";
import { getAnonymousClientId } from "../shared/utils/anonymousClientId";
import { formatPercent } from "../shared/utils/formatPercent";

export function HistoryPage() {
  const [history, setHistory] = useState<HistoryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [courseFilter, setCourseFilter] = useState<"all" | "MLN111" | "MLN122">("all");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

  useEffect(() => {
    async function loadHistory() {
      try {
        const clientId = getAnonymousClientId();
        setHistory(await httpClient.get<HistoryResponse>(`/history/${clientId}`));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Không tải được lịch sử.");
      } finally {
        setLoading(false);
      }
    }
    void loadHistory();
  }, []);

  if (loading) {
    return (
      <PageShell>
        <LoadingState label="Đang lục lại lịch sử triết học..." />
      </PageShell>
    );
  }

  const processedHistory = history?.results
    .filter((item) => courseFilter === "all" || item.courseCode === courseFilter)
    .sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime();
      const timeB = new Date(b.createdAt).getTime();
      return sortOrder === "desc" ? timeB - timeA : timeA - timeB;
    }) ?? [];

  return (
    <PageShell>
      <h1 className="text-4xl font-black dark:text-white">Lịch sử quiz trên máy này</h1>
      <p className="mt-3 max-w-2xl text-ink/65 dark:text-white/65">
        Dữ liệu dựa trên mã ẩn danh lưu trong trình duyệt. Không cần đăng nhập, không hỏi danh tính.
      </p>
      
      {error ? <div className="mt-6"><ErrorState message={error} /></div> : null}
      
      {!error && history && history.results.length > 0 && (
        <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:items-center justify-between rounded-xl bg-white/50 dark:bg-slate-800/50 p-4 shadow-soft">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-bold text-ink/70 dark:text-white/70 mr-2">Môn học:</span>
            {(["all", "MLN111", "MLN122"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setCourseFilter(filter)}
                className={`rounded-lg px-3 py-1.5 text-sm font-bold transition-colors ${
                  courseFilter === filter
                    ? "bg-ink text-white dark:bg-white dark:text-ink"
                    : "bg-ink/5 text-ink/70 hover:bg-ink/10 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10"
                }`}
              >
                {filter === "all" ? "Tất cả" : filter}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-ink/70 dark:text-white/70 mr-2">Thời gian:</span>
            <button
              onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
              className="rounded-lg bg-ink/5 dark:bg-white/5 px-3 py-1.5 text-sm font-bold text-ink/80 dark:text-white/80 hover:bg-ink/10 dark:hover:bg-white/10 transition-colors"
            >
              {sortOrder === "desc" ? "Mới nhất trước ↓" : "Cũ nhất trước ↑"}
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 grid gap-4">
        {processedHistory.length > 0 ? (
          processedHistory.map((item) => (
            <Card key={item.resultId} className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm font-bold text-ink/60 dark:text-white/60">
                  <span className="rounded bg-teal/10 px-2 py-0.5 text-teal-700 dark:bg-teal/20 dark:text-teal-300">
                    {item.courseCode}
                  </span>
                  <span>{new Date(item.createdAt).toLocaleString("vi-VN")}</span>
                </div>
                <div className="mt-2 text-xl font-black dark:text-white">
                  {item.topThree[0]?.nameVi} · {formatPercent(item.topThree[0]?.percentage ?? 0)}
                </div>
                <div className="mt-1 text-sm text-ink/60 dark:text-white/60">
                  Top 3: {item.topThree.map((top) => top.nameVi).join(", ")}
                </div>
              </div>
              <Link className="inline-flex items-center justify-center gap-2 rounded-lg bg-ink dark:bg-white px-4 py-2 text-sm font-bold text-white dark:text-ink hover:bg-black dark:hover:bg-slate-200 transition-colors" to={`/results/${item.shareSlug}`}>
                Mở kết quả
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Card>
          ))
        ) : (
          <Card>
            <p className="font-semibold text-ink/70 dark:text-white/70">
              {history?.results.length === 0 
                ? "Chưa có kết quả nào. Nội tâm triết gia vẫn đang ở chế độ ẩn danh." 
                : "Không có kết quả nào phù hợp với bộ lọc hiện tại."}
            </p>
          </Card>
        )}
      </div>
    </PageShell>
  );
}
