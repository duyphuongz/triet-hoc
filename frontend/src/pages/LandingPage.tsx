import { ArrowRight, History, Sparkles } from "lucide-react";
import { motion, Variants } from "framer-motion";

import { ButtonLink } from "../shared/components/Button";
import { ThemeToggle } from "../shared/components/ThemeToggle";
import { Illustration } from "../shared/illustrations";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
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

export function LandingPage() {
  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="text-lg font-black dark:text-white">TriếtHọclàgì?</div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ButtonLink to="/history" variant="ghost">
            <History className="h-4 w-4" aria-hidden="true" />
            Lịch sử
          </ButtonLink>
        </div>
      </header>
      <main className="mx-auto flex min-h-[calc(100vh-84px)] max-w-6xl flex-col items-center justify-center px-4 pb-12 text-center">
        <motion.div
          className="relative w-full max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mx-auto mb-2 inline-flex items-center gap-2 rounded-lg bg-white dark:bg-slate-800 px-3 py-2 text-sm font-black shadow-soft dark:text-white">
            <Sparkles className="h-4 w-4 text-coral" aria-hidden="true" />
            Quiz học thuật nhưng không làm mặt nghiêm 24/7
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-5xl font-black leading-none text-ink dark:text-white md:text-7xl">TriếtHọclàgì?</motion.h1>
          <motion.p variants={itemVariants} className="mx-auto mt-5 max-w-2xl text-lg font-semibold leading-8 text-ink/75 dark:text-white/75">
            Một bài quiz giúp bạn phát hiện mình đang vô tình sống như triết gia hay nhà tư bản nào.
          </motion.p>
          
          <motion.div variants={itemVariants} className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 text-left">
            <motion.div
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 p-8 shadow-soft"
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-teal/10 dark:bg-teal/20 transition-transform duration-700 group-hover:scale-[2.5]"></div>
              <h2 className="relative text-2xl font-black text-ink dark:text-white">MLN111</h2>
              <h3 className="relative mt-1 text-lg font-bold text-ink/80 dark:text-white/80">Triết học Mác - Lênin</h3>
              <p className="relative mt-4 text-sm leading-6 text-ink/65 dark:text-white/65">
                Bạn thường đối mặt với cuộc sống theo trường phái triết học nào? Khắc kỷ, Hiện sinh hay Vị lợi?
              </p>
              <ButtonLink to="/quiz/MLN111/intro" className="relative mt-8 w-full justify-center">
                Bắt đầu quiz MLN111
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 p-8 shadow-soft"
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-coral/10 dark:bg-coral/20 transition-transform duration-700 group-hover:scale-[2.5]"></div>
              <h2 className="relative text-2xl font-black text-ink dark:text-white">MLN122</h2>
              <h3 className="relative mt-1 text-lg font-bold text-ink/80 dark:text-white/80">Kinh tế Chính trị Mác - Lênin</h3>
              <p className="relative mt-4 text-sm leading-6 text-ink/65 dark:text-white/65">
                Cách bạn quản lý tài sản và sức lao động nói lên điều gì? Bạn là nhà tư bản thặng dư hay người tạo giá trị?
              </p>
              <ButtonLink to="/quiz/MLN122/intro" className="relative mt-8 w-full justify-center">
                Bắt đầu quiz MLN122
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-12">
            <ButtonLink to="/about" variant="ghost">
              Ai đứng sau vậy? 🤔
            </ButtonLink>
          </motion.div>
          
          <motion.div variants={itemVariants} className="mx-auto mt-8 w-full max-w-sm">
            <motion.div variants={floatVariants} animate="animate">
              <Illustration illustrationKey="cartoon_philosopher" className="h-52 w-full drop-shadow-xl" />
            </motion.div>
          </motion.div>
          
          <motion.p variants={itemVariants} className="mx-auto mt-6 max-w-xl rounded-lg bg-white dark:bg-slate-800 px-4 py-3 text-sm font-semibold text-ink/65 dark:text-white/65 shadow-soft">
            Đây là quiz phản tư vui cho bài học, không phải chẩn đoán tâm lý hay kết luận chuyên môn.
          </motion.p>
        </motion.div>
      </main>
    </div>
  );
}
