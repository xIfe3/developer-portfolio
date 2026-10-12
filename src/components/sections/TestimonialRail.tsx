"use client";

import { useRef } from "react";
import type { Testimonial } from "@/content/testimonials";
import { cn } from "@/lib/utils";

export function TestimonialRail({ items }: { items: Testimonial[] }) {
  const rail = useRef<HTMLUListElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector("li");
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 360) + 20), behavior: "smooth" });
  };
  const arrow =
    "grid size-11 place-items-center rounded-xl border border-line transition-colors hover:border-text/40";

  return (
    <div>
      <div className="flex justify-end gap-2">
        <button type="button" onClick={() => scroll(-1)} aria-label="Previous testimonial" className={arrow}>
          <span aria-hidden>←</span>
        </button>
        <button
          type="button"
          onClick={() => scroll(1)}
          aria-label="Next testimonial"
          className={cn(arrow, "border-text bg-text text-bg hover:bg-saffron")}
        >
          <span aria-hidden>→</span>
        </button>
      </div>
      <ul
        ref={rail}
        className="mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((t, i) => {
          const lead = i === 0;
          return (
            <li key={t.name} className="w-[min(22.5rem,85vw)] shrink-0 snap-start">
              <figure
                className={cn(
                  "flex h-full flex-col gap-8 rounded-3xl border border-text/10 p-7",
                  lead
                    ? "bg-ember-deep bg-[radial-gradient(closest-side_at_50%_100%,rgb(232_69_44/0.6),transparent)]"
                    : "bg-surface",
                )}
              >
                <span aria-hidden className={cn("font-serif text-6xl leading-[0.6] font-light italic", lead ? "text-saffron" : "text-ember")}>
                  “
                </span>
                <blockquote className="flex-1 text-[1.05rem] leading-[1.6]">{t.quote}</blockquote>
                <figcaption className="flex items-center gap-3">
                  <span
                    className={cn(
                      "grid size-10 shrink-0 place-items-center rounded-full font-mono text-xs font-medium",
                      lead ? "bg-text text-bg" : "bg-surface-2",
                    )}
                  >
                    {t.initials}
                  </span>
                  <span>
                    <span className="block text-sm font-medium">{t.name}</span>
                    <span className={cn("block text-xs", lead ? "text-text/70" : "text-muted")}>
                      {t.role} · {t.company}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
