import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Download, X, Loader2 } from "lucide-react";
import html2canvas from "html2canvas";

import { Button } from "../../../shared/components/Button";
import type { PublicResult } from "../types/resultTypes";
import { TradingCard } from "./TradingCard";

type ShareModalProps = {
  isOpen: boolean;
  onClose: () => void;
  result: PublicResult;
};

export function ShareModal({ isOpen, onClose, result }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  async function copyLink() {
    const url = `${window.location.origin}/results/${result.shareSlug}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  async function downloadCard() {
    if (!cardRef.current) return;
    setIsExporting(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2, // High resolution
        useCORS: true,
        backgroundColor: null,
      });
      const dataUrl = canvas.toDataURL("image/png");
      
      const link = document.createElement("a");
      link.download = `triet-hoc-la-gi-${result.shareSlug}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to export card:", err);
    } finally {
      setIsExporting(false);
    }
  }

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-ink/60 backdrop-blur-sm dark:bg-black/60"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg pointer-events-auto"
            >
              <div className="flex flex-col items-center justify-start gap-4 rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900 md:p-8 max-h-[90vh] overflow-y-auto custom-scrollbar">
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 rounded-full bg-ink/5 p-2 text-ink/50 transition-colors hover:bg-ink/10 dark:bg-white/5 dark:text-white/50 dark:hover:bg-white/10 z-10"
                >
                  <X className="h-5 w-5" />
                </button>

                <h3 className="text-xl font-black text-ink dark:text-white shrink-0">Tải Thẻ Nhân Phẩm</h3>

                {/* The Trading Card Container */}
                <div className="flex w-full justify-center overflow-visible py-2">
                  <motion.div
                    initial={{ rotateY: 10, rotateX: 5 }}
                    animate={{ rotateY: 0, rotateX: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    style={{ perspective: "1000px" }}
                  >
                    <div className="overflow-hidden rounded-[24px]">
                       <TradingCard ref={cardRef} result={result} />
                    </div>
                  </motion.div>
                </div>

                <div className="flex w-full flex-col gap-3 sm:flex-row mt-auto shrink-0">
                  <Button 
                    className="flex-1" 
                    onClick={downloadCard}
                    disabled={isExporting}
                  >
                    {isExporting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Download className="h-4 w-4" />
                    )}
                    {isExporting ? "Đang tạo ảnh..." : "Tải ảnh về máy"}
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="flex-1" 
                    onClick={copyLink}
                  >
                    <Copy className="h-4 w-4" />
                    {copied ? "Đã copy link" : "Sao chép link"}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
