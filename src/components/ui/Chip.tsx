import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Chip({ children, tone = "paper" }: { children: ReactNode; tone?: "paper" | "forest" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
        tone === "paper" ? "border-line text-ink-soft" : "border-paper/30 text-paper/90",
      )}
    >
      {children}
    </span>
  );
}
