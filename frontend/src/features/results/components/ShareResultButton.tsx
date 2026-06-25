import { Share2 } from "lucide-react";
import { useState } from "react";

import { Button } from "../../../shared/components/Button";
import type { PublicResult } from "../types/resultTypes";
import { ShareModal } from "./ShareModal";

export function ShareResultButton({ result }: { result: PublicResult }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button type="button" variant="secondary" onClick={() => setIsModalOpen(true)}>
        <Share2 className="h-4 w-4" aria-hidden="true" />
        Tải Thẻ & Chia sẻ
      </Button>

      <ShareModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        result={result} 
      />
    </>
  );
}
