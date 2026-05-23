import { LogIn } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { adminApi } from "../../features/admin/api/adminApi";
import { Button } from "../../shared/components/Button";
import { Card } from "../../shared/components/Card";
import { PageShell } from "../../shared/components/PageShell";

export function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await adminApi.login(email, password);
      navigate("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không đăng nhập được.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-md">
        <Card>
          <h1 className="text-3xl font-black">Admin đăng nhập</h1>
          <p className="mt-2 text-sm text-ink/60">Khu chỉnh câu hỏi, weights và nhìn dashboard lớp học.</p>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <label className="block text-sm font-bold">
              Email
              <input className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2" value={email} placeholder="admin@example.com" onChange={(event) => setEmail(event.target.value)} />
            </label>
            <label className="block text-sm font-bold">
              Mật khẩu
              <input className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2" type="password" placeholder="Mật khẩu từ ADMIN_PASSWORD" value={password} onChange={(event) => setPassword(event.target.value)} />
            </label>
            {error ? <p className="rounded-lg bg-coral/10 px-3 py-2 text-sm font-bold text-coral">{error}</p> : null}
            <Button type="submit" disabled={loading}>
              <LogIn className="h-4 w-4" aria-hidden="true" />
              {loading ? "Đang vào..." : "Đăng nhập"}
            </Button>
          </form>
        </Card>
      </div>
    </PageShell>
  );
}
