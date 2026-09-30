"use client";

import { m, useReducedMotion } from "framer-motion";

export type Segment = { text: string; className?: string };

type Props = {
  as?: "h1" | "h2" | "h3";
  segments: Segment[];
  className?: string;
  id?: string;
  animateOnMount?: boolean;
};

const EASE = [0.22, 1, 0.36, 1] as const;

export function WordRise({ as: Tag = "h2", segments, className, id, animateOnMount = false }: Props) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <Tag id={id} className={className}>
        {segments.map((seg, i) => (
          <span key={i}>
            <span className={seg.className}>{seg.text}</span>
            {i < segments.length - 1 ? " " : null}
          </span>
        ))}
      </Tag>
    );
  }

  const words = segments.map((seg) => seg.text.split(" "));
  const offsets = words.map((_, i) => words.slice(0, i).reduce((n, w) => n + w.length, 0));
  const trigger = animateOnMount
    ? { animate: { y: 0, opacity: 1 } }
    : { whileInView: { y: 0, opacity: 1 }, viewport: { once: true, margin: "-60px" } };

  return (
    <Tag id={id} className={className}>
      {segments.map((seg, si) => (
        <span key={si}>
          <span className={seg.className}>
            {words[si].map((word, wi) => (
              <span key={wi}>
                <span className="inline-block overflow-hidden pb-[0.1em] align-bottom">
                  <m.span
                    data-reveal
                    className="inline-block"
                    initial={{ y: "105%", opacity: 0 }}
                    {...trigger}
                    transition={{ duration: 0.9, delay: (offsets[si] + wi) * 0.08, ease: EASE }}
                  >
                    {word}
                  </m.span>
                </span>
                {wi < words[si].length - 1 ? " " : null}
              </span>
            ))}
          </span>
          {si < segments.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
