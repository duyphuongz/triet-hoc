import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";

type PageShellProps = {
  children: ReactNode;
  compact?: boolean;
};

export function PageShell({ children, compact = false }: PageShellProps) {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className={`mx-auto w-full max-w-6xl px-4 ${compact ? "py-6" : "py-10"}`}>
        {children}
      </main>
    </div>
  );
}
