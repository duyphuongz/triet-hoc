import { Brain, Database } from "lucide-react";

export function LoadingState({ label = "Đang tải..." }: { label?: string }) {
  return (
    <div className="flex min-h-[250px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-ink/20 bg-white p-8 text-center shadow-soft">
      <div className="relative mb-8 flex w-full max-w-[240px] items-center justify-between">
        {/* Source */}
        <Database className="h-12 w-12 text-teal animate-bounce" />
        
        {/* Data transfer path */}
        <div className="relative mx-4 flex h-3 flex-1 overflow-hidden rounded-full bg-ink/5">
          <div className="absolute left-0 top-0 h-full w-6 rounded-full bg-coral animate-transfer" />
          <div className="absolute left-0 top-0 h-full w-6 rounded-full bg-lemon animate-transfer" style={{ animationDelay: "500ms" }} />
          <div className="absolute left-0 top-0 h-full w-6 rounded-full bg-grape animate-transfer" style={{ animationDelay: "1000ms" }} />
        </div>
        
        {/* Destination */}
        <Brain className="h-12 w-12 text-grape animate-pulse" />
      </div>
      
      <p className="animate-pulse text-xl font-black tracking-tight text-ink">{label}</p>
      <p className="mt-2 text-sm font-semibold italic text-ink/60">
        (Đang kết nối vũ trụ và tải triết lý vào não bạn...)
      </p>
    </div>
  );
}
