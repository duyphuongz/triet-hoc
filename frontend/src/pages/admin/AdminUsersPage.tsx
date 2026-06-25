import { useQuery } from "@tanstack/react-query";
import { adminApi } from "../../features/admin/api/adminApi";
import { AdminLayout } from "../../features/admin/components/AdminLayout";
import { Card } from "../../shared/components/Card";
import { ErrorState } from "../../shared/components/ErrorState";
import { LoadingState } from "../../shared/components/LoadingState";
import { Users } from "lucide-react";

export function AdminUsersPage() {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ["admin_users"],
    queryFn: () => adminApi.users(),
    refetchInterval: 30000, // Poll every 30s for new users
  });

  return (
    <AdminLayout>
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500">
          <Users size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-black text-ink dark:text-white">Người dùng</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Quản lý các tài khoản đã đăng ký</p>
        </div>
      </div>

      {isLoading ? <LoadingState /> : null}
      {error ? <ErrorState message={error instanceof Error ? error.message : "Có lỗi xảy ra"} /> : null}
      {users ? (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead>
                <tr className="border-b border-ink/10 dark:border-white/10">
                  <th className="py-3 font-semibold">Tên gọi</th>
                  <th className="font-semibold">Email</th>
                  <th className="font-semibold">ID</th>
                  <th className="font-semibold">Ngày tham gia</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-slate-500">
                      Chưa có người dùng nào đăng ký
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="border-b border-ink/5 dark:border-white/5 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="py-3 font-bold">{user.name || "Ẩn danh"}</td>
                      <td className="text-slate-600 dark:text-slate-300">{user.email}</td>
                      <td className="font-mono text-xs text-slate-400">{user.id.substring(0, 8)}...</td>
                      <td>{new Date(user.createdAt).toLocaleString("vi-VN")}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      ) : null}
    </AdminLayout>
  );
}
