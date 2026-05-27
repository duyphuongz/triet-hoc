import { ArrowRight, ListChecks, SlidersHorizontal, Target } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useQuizStore } from "../features/quiz/stores/quizStore";
import { Button, ButtonLink } from "../shared/components/Button";
import { Card } from "../shared/components/Card";
import { PageShell } from "../shared/components/PageShell";
import { Illustration } from "../shared/illustrations";

export function QuizIntroPage() {
  const navigate = useNavigate();
  const reset = useQuizStore((state) => state.reset);
  const quizLength = useQuizStore((state) => state.quizLength);
  const setQuizLength = useQuizStore((state) => state.setQuizLength);

  useEffect(() => {
    reset();
  }, [reset]);

  const handleStart = () => {
    navigate("/quiz");
  };

  return (
    <PageShell>
      <div className="grid gap-8 md:grid-cols-[1fr_320px] md:items-center">
        <div>
          <h1 className="text-4xl font-black leading-tight md:text-5xl">Trước khi soi triết gia nội tâm</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/70">
            Bạn sẽ trả lời các câu hỏi theo tình huống đời thường. Mỗi câu dùng thang 1-5, từ rất không
            đồng ý đến rất đồng ý.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Card>
              <ListChecks className="h-6 w-6 text-teal" aria-hidden="true" />
              <h2 className="mt-3 text-lg font-black">4 mảng chính</h2>
              <p className="mt-2 text-sm leading-6 text-ink/65">
                Ý nghĩa, công việc, xã hội, cảm xúc. Đủ để tự nhận thức, chưa đủ để phán xét cả đời.
              </p>
            </Card>
            <Card>
              <SlidersHorizontal className="h-6 w-6 text-coral" aria-hidden="true" />
              <h2 className="mt-3 text-lg font-black">Thang 1-5</h2>
              <p className="mt-2 text-sm leading-6 text-ink/65">
                Không có đáp án đúng sai. Chỉ có bạn và những pha tự nhận thức hơi đau nhẹ.
              </p>
            </Card>
          </div>
          
          <div className="mt-8">
            <h3 className="mb-4 text-lg font-black flex items-center gap-2">
              <Target className="h-5 w-5 text-grape" />
              Chọn độ chính xác mong muốn (Số lượng câu hỏi)
            </h3>
            <p className="mb-4 text-sm text-ink/70 italic">
              *Nhắn nhỏ: Làm càng nhiều câu thì kết quả "bắt bệnh" càng chuẩn nha! Bạn thích "khám nhanh" hay "soi tới bến"? 🧐
            </p>
            <div className="flex flex-wrap gap-3">
              {[20, 30, 50].map((len) => (
                <Button
                  key={len}
                  variant={quizLength === len ? "primary" : "ghost"}
                  onClick={() => setQuizLength(len)}
                  className={quizLength === len ? "ring-2 ring-offset-2 ring-ink" : ""}
                >
                  {len} câu
                </Button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <Button onClick={handleStart}>
              Vào quiz thôi
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
        </div>
        <Illustration illustrationKey="cartoon_philosopher" className="mx-auto h-72 w-full max-w-xs animate-float drop-shadow-2xl" />
      </div>
    </PageShell>
  );
}
