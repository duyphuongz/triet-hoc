import { ArrowRight, ListChecks, SlidersHorizontal, Target } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, Variants } from "framer-motion";

import { useQuizStore } from "../features/quiz/stores/quizStore";
import { Button } from "../shared/components/Button";
import { Card } from "../shared/components/Card";
import { PageShell } from "../shared/components/PageShell";
import { Illustration } from "../shared/illustrations";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 100, damping: 12 },
  },
};

const floatVariants: Variants = {
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 4,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

export function QuizIntroPage() {
  const { courseCode } = useParams<{ courseCode: string }>();
  const navigate = useNavigate();
  const reset = useQuizStore((state) => state.reset);
  const quizLength = useQuizStore((state) => state.quizLength);
  const setQuizLength = useQuizStore((state) => state.setQuizLength);
  const setCourseCode = useQuizStore((state) => state.setCourseCode);

  useEffect(() => {
    reset();
    if (courseCode) {
      setCourseCode(courseCode);
    }
  }, [reset, courseCode, setCourseCode]);

  const handleStart = () => {
    navigate(`/quiz/${courseCode || "MLN111"}`);
  };

  return (
    <PageShell>
      <motion.div 
        className="grid gap-8 md:grid-cols-[1fr_320px] md:items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div>
          <motion.h1 variants={itemVariants} className="text-4xl font-black leading-tight text-ink dark:text-white md:text-5xl">Trước khi soi triết gia nội tâm</motion.h1>
          <motion.p variants={itemVariants} className="mt-4 max-w-2xl text-lg leading-8 text-ink/70 dark:text-white/70">
            Bạn sẽ trả lời các câu hỏi theo tình huống đời thường. Mỗi câu dùng thang 1-5, từ rất không
            đồng ý đến rất đồng ý.
          </motion.p>
          <motion.div variants={itemVariants} className="mt-6 grid gap-4 md:grid-cols-2">
            <motion.div whileHover={{ scale: 1.05, y: -5 }} transition={{ type: "spring" }}>
              <Card>
                <ListChecks className="h-6 w-6 text-teal" aria-hidden="true" />
                <h2 className="mt-3 text-lg font-black text-ink dark:text-white">4 mảng chính</h2>
                <p className="mt-2 text-sm leading-6 text-ink/65 dark:text-white/65">
                  Ý nghĩa, công việc, xã hội, cảm xúc. Đủ để tự nhận thức, chưa đủ để phán xét cả đời.
                </p>
              </Card>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, y: -5 }} transition={{ type: "spring" }}>
              <Card>
                <SlidersHorizontal className="h-6 w-6 text-coral" aria-hidden="true" />
                <h2 className="mt-3 text-lg font-black text-ink dark:text-white">Thang 1-5</h2>
                <p className="mt-2 text-sm leading-6 text-ink/65 dark:text-white/65">
                  Không có đáp án đúng sai. Chỉ có bạn và những pha tự nhận thức hơi đau nhẹ.
                </p>
              </Card>
            </motion.div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="mt-8">
            <h3 className="mb-4 text-lg font-black flex items-center gap-2 text-ink dark:text-white">
              <Target className="h-5 w-5 text-grape" />
              Chọn độ chính xác mong muốn (Số lượng câu hỏi)
            </h3>
            <p className="mb-4 text-sm text-ink/70 dark:text-white/70 italic">
              *Nhắn nhỏ: Làm càng nhiều câu thì kết quả "bắt bệnh" càng chuẩn nha! Bạn thích "khám nhanh" hay "soi tới bến"? 🧐
            </p>
            <div className="flex flex-wrap gap-3">
              {[20, 30, 50].map((len) => (
                <Button
                  key={len}
                  variant={quizLength === len ? "primary" : "ghost"}
                  onClick={() => setQuizLength(len)}
                  className={quizLength === len ? "ring-2 ring-offset-2 ring-ink transition-all hover:scale-105" : "transition-all hover:scale-105"}
                >
                  {len} câu
                </Button>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-8">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
              <Button onClick={handleStart}>
                Vào quiz thôi
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
        <motion.div variants={itemVariants} className="mx-auto w-full max-w-xs">
          <motion.div variants={floatVariants} animate="animate">
            <Illustration illustrationKey="cartoon_philosopher" className="h-72 w-full drop-shadow-2xl" />
          </motion.div>
        </motion.div>
      </motion.div>
    </PageShell>
  );
}
