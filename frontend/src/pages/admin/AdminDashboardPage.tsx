import { useQuery } from "@tanstack/react-query";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  LineChart,
  Line,
} from "recharts";

import { adminApi } from "../../features/admin/api/adminApi";
import { AdminLayout } from "../../features/admin/components/AdminLayout";
import { StatsCards } from "../../features/admin/components/StatsCards";
import { Card } from "../../shared/components/Card";
import { ErrorState } from "../../shared/components/ErrorState";
import { LoadingState } from "../../shared/components/LoadingState";
import { Activity } from "lucide-react";

export function AdminDashboardPage() {
  const { data: stats, isLoading: statsLoading, error: statsError } = useQuery({
    queryKey: ["admin_stats"],
    queryFn: () => adminApi.stats(),
    refetchInterval: 10000, // Live update every 10s
  });

  const { data: results, isLoading: resultsLoading } = useQuery({
    queryKey: ["admin_results"],
    queryFn: () => adminApi.results(),
    refetchInterval: 10000,
  });

  const loading = statsLoading || resultsLoading;
  const error = statsError;

  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
            <Activity className="animate-pulse" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-ink dark:text-white">Tổng quan Live</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Dữ liệu được cập nhật liên tục</p>
          </div>
        </div>
      </div>

      {loading && !stats ? <LoadingState /> : null}
      {error ? <ErrorState message={error instanceof Error ? error.message : "Có lỗi xảy ra"} /> : null}
      
      {stats ? (
        <div className="space-y-6">
          <StatsCards stats={stats} />
          
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <h2 className="text-xl font-black">Lưu lượng truy cập (24h qua)</h2>
              <div className="mt-4 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stats.hourlyTraffic} margin={{ bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.5} />
                    <XAxis dataKey="hour" tick={{ fontSize: 12 }} />
                    <YAxis allowDecimals={false} />
                    <Tooltip 
                      contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="count" 
                      stroke="#ef4444" 
                      strokeWidth={3} 
                      dot={{ r: 4, strokeWidth: 2 }} 
                      activeDot={{ r: 6 }} 
                      animationDuration={500}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card>
              <h2 className="text-xl font-black">Điểm trung bình theo hệ</h2>
              <div className="mt-4 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.averageScoresByPhilosophy} margin={{ bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.5} />
                    <XAxis dataKey="nameVi" angle={-35} textAnchor="end" interval={0} tick={{ fontSize: 12 }} />
                    <YAxis domain={[0, 100]} />
                    <Tooltip 
                      formatter={(value) => [`${Math.round(Number(value))}%`, "Trung bình"]} 
                      contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                    />
                    <Bar dataKey="averagePercentage" fill="#6B5DD3" radius={[8, 8, 0, 0]} animationDuration={500} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          <Card>
            <h2 className="text-xl font-black">Lượt làm bài gần đây</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[620px] text-left text-sm">
                <thead>
                  <tr className="border-b border-ink/10 dark:border-white/10">
                    <th className="py-3 font-semibold">Thời gian</th>
                    <th className="font-semibold">Top 1</th>
                    <th className="font-semibold">Top 3</th>
                    <th className="font-semibold">Link</th>
                  </tr>
                </thead>
                <tbody>
                  {results?.map((result) => (
                    <tr key={result.resultId} className="border-b border-ink/5 dark:border-white/5 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="py-3">{new Date(result.createdAt).toLocaleString("vi-VN")}</td>
                      <td className="font-bold">{result.topPhilosophy}</td>
                      <td>{result.topThree.map((item) => item.nameVi).join(", ")}</td>
                      <td>
                        <a className="font-bold text-teal transition-colors hover:text-teal/80" href={`/results/${result.shareSlug}`} target="_blank" rel="noreferrer">
                          /results/{result.shareSlug}
                        </a>
                      </td>
                    </tr>
                  ))}
                  {(!results || results.length === 0) && (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-slate-500">Chưa có kết quả nào</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      ) : null}
    </AdminLayout>
  );
}
