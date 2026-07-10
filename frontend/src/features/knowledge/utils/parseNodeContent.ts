export type ContentSection = {
  label: string;
  items?: string[];
  text?: string;
};

export type ParsedContent = {
  intro: string;
  sections: ContentSection[];
};

const isLabelLine = (line: string) => {
  const trimmed = line.trim();
  return trimmed.length > 1 && trimmed.length <= 40 && trimmed.endsWith(":");
};

export function parseNodeContent(raw: string): ParsedContent {
  const blocks = raw.trim().split(/\n\s*\n/);
  if (blocks.length === 0) return { intro: raw, sections: [] };

  const [firstBlock, ...rest] = blocks;
  const intro = firstBlock.trim();
  const sections: ContentSection[] = [];

  for (const block of rest) {
    const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
    if (lines.length === 0) continue;

    if (isLabelLine(lines[0])) {
      const label = lines[0].slice(0, -1).trim();
      const body = lines.slice(1);
      const isList = body.length > 0 && body.every((l) => l.startsWith("- "));
      if (isList) {
        sections.push({ label, items: body.map((l) => l.replace(/^- /, "")) });
      } else {
        sections.push({ label, text: body.join(" ") });
      }
    } else {
      sections.push({ label: "", text: lines.join(" ") });
    }
  }

  return { intro, sections };
}
