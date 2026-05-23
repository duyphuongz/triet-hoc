import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { ScoreBreakdownItem } from "../types/resultTypes";

export function ScoreBarChart({ data }: { data: ScoreBreakdownItem[] }) {
  return (
    <div className="h-80 rounded-lg border border-ink/10 bg-white p-4 shadow-soft">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 12, bottom: 62, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="nameVi" angle={-35} interval={0} textAnchor="end" tick={{ fontSize: 12 }} />
          <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
          <Tooltip formatter={(value) => [`${Math.round(Number(value))}%`, "Điểm"]} />
          <Bar dataKey="percentage" fill="#2EC4B6" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
