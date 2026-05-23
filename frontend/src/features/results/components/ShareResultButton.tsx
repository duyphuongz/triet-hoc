import { Copy } from "lucide-react";
import { useState } from "react";

import { Button } from "../../../shared/components/Button";

export function ShareResultButton({ shareSlug }: { shareSlug: string }) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    const url = `${window.location.origin}/results/${shareSlug}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <Button type="button" variant="secondary" onClick={copyLink}>
      <Copy className="h-4 w-4" aria-hidden="true" />
      {copied ? "Đã copy link" : "Chia sẻ kết quả"}
    </Button>
  );
}
