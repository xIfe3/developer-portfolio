import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

type Props = {
  items: readonly string[];
  className?: string;
  separatorClassName?: string;
  duration?: number;
};

export function Marquee({ items, className, separatorClassName, duration = 30 }: Props) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-10 pr-10">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-10 whitespace-nowrap">
          <span>{item}</span>
          <span aria-hidden className={separatorClassName}>
            ✺
          </span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className={cn("group flex overflow-hidden", className)}>
      <div
        className="flex w-max animate-marquee group-hover:[animation-play-state:paused]"
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
