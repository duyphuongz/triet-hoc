import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

import { adminApi, type PhilosophyAdmin } from "../../features/admin/api/adminApi";
import { AdminLayout } from "../../features/admin/components/AdminLayout";
import { PhilosophyForm } from "../../features/admin/components/PhilosophyForm";
import { Button } from "../../shared/components/Button";
import { Card } from "../../shared/components/Card";
import { ErrorState } from "../../shared/components/ErrorState";
import { LoadingState } from "../../shared/components/LoadingState";

export function AdminPhilosophiesPage() {
  const [philosophies, setPhilosophies] = useState<PhilosophyAdmin[]>([]);
  const [selected, setSelected] = useState<PhilosophyAdmin | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const payload = await adminApi.philosophies();
      setPhilosophies(payload);
      setSelected(payload[0]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không tải được hồ sơ triết học.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function save(philosophy: PhilosophyAdmin, id?: string | null) {
    await adminApi.savePhilosophy(philosophy, id);
    await load();
  }

  return (
    <AdminLayout>
      {loading ? <LoadingState /> : null}
      {error ? <ErrorState message={error} onRetry={load} /> : null}
      {!loading ? (
        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
          <Card className="h-fit">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h1 className="text-xl font-black">Hồ sơ</h1>
              <Button type="button" variant="secondary" onClick={() => setSelected(undefined)}>
                <Plus className="h-4 w-4" aria-hidden="true" />
                Mới
              </Button>
            </div>
            <div className="space-y-2">
              {philosophies.map((philosophy) => (
                <button
                  key={philosophy.key}
                  type="button"
                  className={`w-full rounded-lg border px-3 py-2 text-left text-sm font-bold transition ${
                    selected?.key === philosophy.key ? "border-ink bg-ink text-white" : "border-ink/10 bg-paper"
                  }`}
                  onClick={() => setSelected(philosophy)}
                >
                  {philosophy.nameVi}
                  <span className="block text-xs opacity-70">{philosophy.key}</span>
                </button>
              ))}
            </div>
          </Card>
          <PhilosophyForm key={selected?.key ?? "new"} philosophy={selected} onSubmit={save} />
        </div>
      ) : null}
    </AdminLayout>
  );
}
