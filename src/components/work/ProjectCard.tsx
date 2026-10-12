import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";
import { Chip } from "@/components/ui/Chip";

/** "Sole engineer, full stack" → "Sole engineer". */
const shortRole = (role: string) => role.split(/[,:]/)[0];

export function ProjectCard({ project: p }: { project: Project }) {
  const stack = p.keyStack ?? p.technologies.slice(0, 3);
  const live = p.liveUrl ? new URL(p.liveUrl).hostname.replace(/^www\./, "") : null;
  return (
    <Link href={`/work/${p.slug}`} className="group block rounded-3xl focus-visible:outline-offset-4">
      {/* Media: ember glow + tile frame holding the screenshot. */}
      <div className="relative aspect-[544/380] overflow-hidden rounded-3xl border border-text/[0.08] bg-ember-deep">
        <div aria-hidden className="ember-glow absolute -top-[70%] -left-[15%] h-[130%] w-[130%]" />
        <div aria-hidden className="tile-grid absolute inset-0 [--tile:80px]" />
        <div className="absolute inset-x-[6.6%] top-[14.7%] bottom-0 overflow-hidden rounded-t-xl shadow-[0_24px_48px_rgba(0,0,0,0.5)] transition-transform duration-700 ease-soft group-hover:-translate-y-2">
          <Image
            src={p.image}
            alt={p.imageAlt}
            fill
            sizes="(min-width: 768px) 36rem, 100vw"
            className="object-cover object-top"
          />
        </div>
      </div>

      <div className="mt-6 grid gap-3">
        <p className="label-mono text-muted">
          {p.category} · {p.year}
        </p>
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-display text-[2rem] leading-tight font-medium tracking-[-0.03em]">{p.title}</h3>
          <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line bg-surface-2 transition-transform duration-500 ease-spring group-hover:rotate-45">
            <span aria-hidden>↗</span>
            <span className="sr-only">Read the case study</span>
          </span>
        </div>
        <p className="max-w-[52ch] text-[0.95rem] leading-[1.6] text-muted">{p.teaser ?? p.summary}</p>
        <div className="flex flex-wrap gap-2">
          {p.role ? (
            <span className="rounded-full bg-text px-3 py-1 text-xs font-medium text-bg">{shortRole(p.role)}</span>
          ) : null}
          <Chip>{stack.join(" · ")}</Chip>
        </div>
        {p.nextFix || live ? (
          <p className="flex w-fit items-center gap-2.5 rounded-xl border border-dashed border-line bg-surface px-3.5 py-2.5 text-[0.8rem] text-muted">
            <span className="label-mono text-[0.625rem] text-ember">{p.nextFix ? "Next fix" : "Live"}</span>
            {p.nextFix ?? live}
          </p>
        ) : null}
      </div>
    </Link>
  );
}
