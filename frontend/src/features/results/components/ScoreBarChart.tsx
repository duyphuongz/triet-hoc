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
import { PHILOSOPHY_DEFINITIONS } from "./philosophyDefinitions";

const CustomTick = (props: any) => {
  const { x, y, payload, data } = props;
  const item = data.find((d: any) => d.nameVi === payload.value);
  const def = item ? PHILOSOPHY_DEFINITIONS[item.key] : null;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#666"
        transform="rotate(-35)"
        fontSize={12}
        className="cursor-help"
      >
        <title>{def ? def.witty : payload.value}</title>
        {payload.value}
      </text>
    </g>
  );
};

export function ScoreBarChart({ data }: { data: ScoreBreakdownItem[] }) {
  return (
    <div className="h-80 rounded-lg border border-ink/10 bg-white p-4 shadow-soft">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 12, bottom: 62, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="nameVi" 
            interval={0} 
            tick={<CustomTick data={data} />} 
          />
          <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
          <Tooltip formatter={(value) => [`${Math.round(Number(value))}%`, "Điểm"]} />
          <Bar dataKey="percentage" fill="#2EC4B6" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
