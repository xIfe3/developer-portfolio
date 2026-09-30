import { WordRise, type Segment } from "@/components/motion/WordRise";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
  tone = "paper",
  className,
}: {
  eyebrow: string;
  title: Segment[];
  intro?: string;
  id?: string;
  tone?: "paper" | "forest";
  className?: string;
}) {
  const onForest = tone === "forest";
  return (
    <div className={cn("grid gap-6 md:grid-cols-[1.3fr_1fr] md:items-end md:gap-16", className)}>
      <div>
        <p
          className={cn(
            "mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]",
            onForest ? "text-saffron" : "text-vermilion-ink",
          )}
        >
          <span aria-hidden>✺</span>
          {eyebrow}
        </p>
        <WordRise
          id={id}
          segments={title}
          className={cn(
            "font-display text-[clamp(2.1rem,5vw,4rem)] leading-[1.02] font-[350] tracking-[-0.02em]",
            onForest ? "text-paper" : "text-ink",
          )}
        />
      </div>
      {intro ? (
        <p className={cn("max-w-[42ch] text-lg leading-[1.7]", onForest ? "text-paper/80" : "text-ink-soft")}>
          {intro}
        </p>
      ) : null}
    </div>
  );
}
