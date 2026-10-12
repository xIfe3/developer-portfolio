import type { ReactNode } from "react";
import { WordRise, type Segment } from "@/components/motion/WordRise";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";

/** Class for the serif-italic emphasis words inside headings. */
export const accent = "font-serif font-light italic text-saffron";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  aside,
  id,
  className,
  titleClassName,
}: {
  eyebrow: string;
  title: Segment[];
  intro?: string;
  /** Extra content under the intro (usually a button). */
  aside?: ReactNode;
  id?: string;
  className?: string;
  /** Overrides the heading column's max width for long titles. */
  titleClassName?: string;
}) {
  return (
    <div className={cn("grid gap-8 md:grid-cols-[1fr_auto] md:items-end md:gap-16", className)}>
      <div className="min-w-0">
        <Eyebrow className="mb-5">{eyebrow}</Eyebrow>
        <WordRise
          id={id}
          segments={title}
          className={cn(
            "max-w-[20ch] font-display text-[clamp(2.1rem,4.6vw,3.4rem)] leading-[1.04] font-medium tracking-[-0.03em] text-text",
            titleClassName,
          )}
        />
      </div>
      {intro || aside ? (
        <div className="flex max-w-[34ch] flex-col items-start gap-5">
          {intro ? <p className="text-[0.95rem] leading-[1.65] text-muted">{intro}</p> : null}
          {aside}
        </div>
      ) : null}
    </div>
  );
}
