import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

import { adminApi, type AdminQuestion, type PhilosophyAdmin } from "../../features/admin/api/adminApi";
import { AdminLayout } from "../../features/admin/components/AdminLayout";
import { QuestionForm } from "../../features/admin/components/QuestionForm";
import { Button } from "../../shared/components/Button";
import { Card } from "../../shared/components/Card";
import { ErrorState } from "../../shared/components/ErrorState";
import { LoadingState } from "../../shared/components/LoadingState";

export function AdminQuestionsPage() {
  const [questions, setQuestions] = useState<AdminQuestion[]>([]);
  const [philosophies, setPhilosophies] = useState<PhilosophyAdmin[]>([]);
  const [selected, setSelected] = useState<AdminQuestion | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const [questionPayload, philosophyPayload] = await Promise.all([
        adminApi.questions(),
        adminApi.philosophies(),
      ]);
      setQuestions(questionPayload);
      setPhilosophies(philosophyPayload);
      setSelected(questionPayload[0]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không tải được câu hỏi.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function save(question: Omit<AdminQuestion, "id">, id?: string) {
    await adminApi.saveQuestion(question, id);
    await load();
  }

  async function remove(id: string) {
    await adminApi.deleteQuestion(id);
    await load();
  }

  return (
    <AdminLayout>
      {loading ? <LoadingState /> : null}
      {error ? <ErrorState message={error} onRetry={load} /> : null}
      {!loading ? (
        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <Card className="h-fit">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h1 className="text-xl font-black">Câu hỏi</h1>
              <Button type="button" variant="secondary" onClick={() => setSelected(undefined)}>
                <Plus className="h-4 w-4" aria-hidden="true" />
                Mới
              </Button>
            </div>
            <div className="space-y-2">
              {questions.map((question) => (
                <button
                  key={question.id}
                  type="button"
                  className={`w-full rounded-lg border px-3 py-2 text-left text-sm font-bold transition ${
                    selected?.id === question.id ? "border-ink bg-ink text-white" : "border-ink/10 bg-paper"
                  }`}
                  onClick={() => setSelected(question)}
                >
                  {question.orderIndex}. {question.code}
                  <span className="block truncate text-xs opacity-70">{question.text}</span>
                </button>
              ))}
            </div>
          </Card>
          <div className="space-y-4">
            <QuestionForm key={selected?.id ?? "new"} question={selected} philosophies={philosophies} onSubmit={save} />
            {selected ? (
              <Button type="button" variant="danger" onClick={() => void remove(selected.id)}>
                <Trash2 className="h-4 w-4" aria-hidden="true" />
                Tắt câu hỏi này
              </Button>
            ) : null}
          </div>
        </div>
      ) : null}
    </AdminLayout>
  );
}
