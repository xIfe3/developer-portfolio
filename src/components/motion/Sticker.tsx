import { useId } from "react";
import { cn } from "@/lib/utils";

export function Sticker({ text, className }: { text: string; className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <div aria-hidden className={cn("relative grid size-24 place-items-center rounded-full", className)}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full animate-spin-slow">
        <defs>
          <path id={`sticker-${id}`} d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
        </defs>
        <text className="fill-current text-[10px] font-semibold uppercase tracking-[0.22em]">
          <textPath href={`#sticker-${id}`}>{text}</textPath>
        </text>
      </svg>
      <span className="text-2xl leading-none">✺</span>
    </div>
  );
}
