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

  return (
    <PageShell>
      <h1 className="text-4xl font-black">Lịch sử quiz trên máy này</h1>
      <p className="mt-3 max-w-2xl text-ink/65">
        Dữ liệu dựa trên mã ẩn danh lưu trong trình duyệt. Không cần đăng nhập, không hỏi danh tính.
      </p>
      {error ? <div className="mt-6"><ErrorState message={error} /></div> : null}
      <div className="mt-8 grid gap-4">
        {history?.results.length ? (
          history.results.map((item) => (
            <Card key={item.resultId} className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-sm font-bold text-ink/60">
                  {new Date(item.createdAt).toLocaleString("vi-VN")}
                </div>
                <div className="mt-1 text-xl font-black">
                  {item.topThree[0]?.nameVi} · {formatPercent(item.topThree[0]?.percentage ?? 0)}
                </div>
                <div className="mt-1 text-sm text-ink/60">
                  Top 3: {item.topThree.map((top) => top.nameVi).join(", ")}
                </div>
              </div>
              <Link className="inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2 text-sm font-bold text-white" to={`/results/${item.shareSlug}`}>
                Mở kết quả
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Card>
          ))
        ) : (
          <Card>
            <p className="font-semibold text-ink/70">Chưa có kết quả nào. Nội tâm triết gia vẫn đang ở chế độ ẩn danh.</p>
          </Card>
        )}
      </div>
    </PageShell>
  );
}
