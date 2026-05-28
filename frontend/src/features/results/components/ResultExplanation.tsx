import { Card } from "../../../shared/components/Card";
import type { PublicResult } from "../types/resultTypes";
import { PHILOSOPHY_DEFINITIONS } from "./philosophyDefinitions";

function TextBlock({ title, content }: { title: string; content: string }) {
  return (
    <Card>
      <h3 className="text-base font-black">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-ink/75">{content}</p>
    </Card>
  );
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <Card>
      <h3 className="text-base font-black">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-ink/75">
        {items.map((item) => (
          <li key={item} className="rounded-lg bg-paper px-3 py-2">
            {item}
          </li>
        ))}
      </ul>
    </Card>
  );
}

export function ResultExplanation({ result }: { result: PublicResult }) {
  const def = PHILOSOPHY_DEFINITIONS[result.dominant.key];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <TextBlock title="Vì sao bạn ra kết quả này?" content={result.explanation} />
      {def && (
        <Card className="md:col-span-2">
          <h3 className="text-base font-black">Triết học này là gì?</h3>
          <div className="mt-4 space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-ink">Góc nhìn học thuật:</h4>
              <p className="mt-1 text-sm leading-6 text-ink/75">{def.academic}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-ink">Nói một cách dí dỏm:</h4>
              <p className="mt-1 text-sm leading-6 text-ink/75">{def.witty}</p>
            </div>
          </div>
        </Card>
      )}
      <TextBlock title="Mô tả chính" content={result.dominant.longDescription} />
      <ListBlock title="Điểm mạnh" items={result.dominant.strengths} />
      <ListBlock title="Khi mất cân bằng, bạn có thể..." items={result.dominant.blindSpots} />
      <TextBlock title="Phong cách làm việc" content={result.dominant.workStyle} />
      <TextBlock title="Phong cách học tập" content={result.dominant.learningStyle} />
      <TextBlock title="Khi có xung đột" content={result.dominant.conflictStyle} />
      <TextBlock title="Kiểu tìm ý nghĩa" content={result.dominant.lifeMeaningStyle} />
      <ListBlock title="Gợi ý phát triển" items={result.dominant.growthSuggestions} />
      <Card className="bg-ink text-white">
        <h3 className="text-base font-black">Ghi chú nhỏ nhưng quan trọng</h3>
        <p className="mt-2 text-sm leading-6 text-white/80">{result.disclaimer}</p>
      </Card>
    </div>
  );
}
