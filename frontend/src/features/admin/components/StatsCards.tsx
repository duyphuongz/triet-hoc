import { BarChart3, Trophy, Users } from "lucide-react";

import { Card } from "../../../shared/components/Card";
import type { AdminStats } from "../api/adminApi";

export function StatsCards({ stats }: { stats: AdminStats }) {
  const cards = [
    {
      label: "Lượt hoàn thành",
      value: stats.totalSurveyCount,
      icon: Users,
    },
    {
      label: "Xu hướng phổ biến nhất",
      value: stats.mostCommonDominantPhilosophy ?? "Chưa có",
      icon: Trophy,
    },
    {
      label: "Số ngày có dữ liệu",
      value: stats.completionCountByDay.length,
      icon: BarChart3,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.label}>
            <Icon className="h-5 w-5 text-teal" aria-hidden="true" />
            <div className="mt-3 text-sm font-bold text-ink/60">{card.label}</div>
            <div className="mt-1 text-2xl font-black">{card.value}</div>
          </Card>
        );
      })}
    </div>
  );
}
