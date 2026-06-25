import { motion } from "framer-motion";
import { Button } from "../../../shared/components/Button";

const labels: Record<number, string> = {
  1: "Rất không đồng ý",
  2: "Không đồng ý",
  3: "Chưa chắc",
  4: "Đồng ý",
  5: "Rất đồng ý",
};

type LikertScaleProps = {
  value?: number;
  onChange: (value: number) => void;
};

export function LikertScale({ value, onChange }: LikertScaleProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-5">
      {[1, 2, 3, 4, 5].map((option) => (
        <motion.div
          key={option}
          className="h-full"
          whileHover={{ scale: 1.05, y: -4 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Button
            type="button"
            variant={value === option ? "secondary" : "ghost"}
            className="w-full h-full min-h-20 flex-col px-2 text-center"
            aria-pressed={value === option}
            onClick={() => onChange(option)}
          >
            <span className="text-lg">{option}</span>
            <span className="text-xs leading-tight">{labels[option]}</span>
          </Button>
        </motion.div>
      ))}
    </div>
  );
}
