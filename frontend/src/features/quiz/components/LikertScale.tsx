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
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-5">
      {[1, 2, 3, 4, 5].map((option) => (
        <Button
          key={option}
          type="button"
          variant={value === option ? "secondary" : "ghost"}
          className="min-h-16 flex-col px-2 text-center"
          aria-pressed={value === option}
          onClick={() => onChange(option)}
        >
          <span className="text-lg">{option}</span>
          <span className="text-xs leading-tight">{labels[option]}</span>
        </Button>
      ))}
    </div>
  );
}
