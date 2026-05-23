import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { adminApi, type AdminResult, type AdminStats } from "../../features/admin/api/adminApi";
import { AdminLayout } from "../../features/admin/components/AdminLayout";
import { StatsCards } from "../../features/admin/components/StatsCards";
import { Card } from "../../shared/components/Card";
import { ErrorState } from "../../shared/components/ErrorState";
import { LoadingState } from "../../shared/components/LoadingState";

export function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [results, setResults] = useState<AdminResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const [statsPayload, resultsPayload] = await Promise.all([adminApi.stats(), adminApi.results()]);
        setStats(statsPayload);
        setResults(resultsPayload);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Không tải được admin dashboard.");
      } finally {
        setLoading(false);
      }
    }
    void load();
  }, []);

  return (
    <AdminLayout>
      {loading ? <LoadingState /> : null}
      {error ? <ErrorState message={error} /> : null}
      {stats ? (
        <div className="space-y-6">
          <StatsCards stats={stats} />
          <Card>
            <h2 className="text-xl font-black">Điểm trung bình theo hệ</h2>
            <div className="mt-4 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.averageScoresByPhilosophy} margin={{ bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="nameVi" angle={-35} textAnchor="end" interval={0} tick={{ fontSize: 12 }} />
                  <YAxis domain={[0, 100]} />
                  <Tooltip formatter={(value) => [`${Math.round(Number(value))}%`, "Trung bình"]} />
                  <Bar dataKey="averagePercentage" fill="#6B5DD3" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card>
            <h2 className="text-xl font-black">Kết quả gần đây</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[620px] text-left text-sm">
                <thead>
                  <tr className="border-b border-ink/10">
                    <th className="py-2">Thời gian</th>
                    <th>Top 1</th>
                    <th>Top 3</th>
                    <th>Link</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result) => (
                    <tr key={result.resultId} className="border-b border-ink/5">
                      <td className="py-2">{new Date(result.createdAt).toLocaleString("vi-VN")}</td>
                      <td className="font-bold">{result.topPhilosophy}</td>
                      <td>{result.topThree.map((item) => item.nameVi).join(", ")}</td>
                      <td>
                        <a className="font-bold text-teal" href={`/results/${result.shareSlug}`}>
                          /results/{result.shareSlug}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      ) : null}
    </AdminLayout>
  );
}
