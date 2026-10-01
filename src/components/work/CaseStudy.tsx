import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { WordRise } from "@/components/motion/WordRise";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import type { Project } from "@/content/projects";
import { ProjectCard, toneClasses } from "./ProjectCard";

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Reveal className="grid gap-4 border-t border-line py-12 md:grid-cols-[14rem_1fr] md:gap-12">
      <h2 className="font-display text-2xl font-[400]">{title}</h2>
      <div className="text-lg leading-[1.8] text-ink-soft">{children}</div>
    </Reveal>
  );
}

export function CaseStudy({ project: p, next }: { project: Project; next: Project }) {
  const results = [...(p.impact ? [p.impact] : []), ...(p.results ?? [])];
  return (
    <article>
      <header className={`grain pt-32 pb-12 md:pt-40 ${toneClasses[p.tone]}`}>
        <div className="container-page">
          <Link href="/#work" className="text-sm font-semibold underline-offset-4 hover:underline">
            ← All work
          </Link>
          <p className="mt-10 text-xs font-semibold uppercase tracking-[0.18em]">
            {p.category} · {p.year}
          </p>
          <WordRise
            as="h1"
            animateOnMount
            segments={[{ text: p.title }]}
            className="mt-4 font-display text-[clamp(2.6rem,7vw,6rem)] leading-[0.98] font-[350] tracking-[-0.025em]"
          />
          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-3 text-sm">
            <div><dt className="text-xs uppercase tracking-[0.14em]">Client</dt><dd className="font-semibold">{p.client}</dd></div>
            {p.role ? <div><dt className="text-xs uppercase tracking-[0.14em]">Role</dt><dd className="font-semibold">{p.role}</dd></div> : null}
            <div><dt className="text-xs uppercase tracking-[0.14em]">Year</dt><dd className="font-semibold">{p.year}</dd></div>
          </dl>
        </div>
      </header>

      <div className="container-page -mt-2 md:-mt-4">
        {/* The LCP image: visible from first paint (no JS-gated fade), CSS-only soft zoom. */}
        <div className="mt-10 overflow-hidden rounded-3xl border border-line shadow-2xl">
          <Image
            src={p.image}
            alt={p.imageAlt}
            width={1920}
            height={970}
            priority
            sizes="(min-width: 1280px) 80rem, 100vw"
            className="size-full animate-soft-zoom object-cover object-top"
          />
        </div>
      </div>

      <div className="container-page py-16 md:py-24">
        <Block title="Overview"><p>{p.summary}</p></Block>
        {p.challenge ? <Block title="The challenge"><p>{p.challenge}</p></Block> : null}
        {p.built?.length ? (
          <Block title="What I built">
            <ul className="list-disc space-y-2 pl-5">{p.built.map((b) => <li key={b}>{b}</li>)}</ul>
          </Block>
        ) : null}
        <Block title="Stack">
          <ul className="flex flex-wrap gap-2">{p.technologies.map((t) => <li key={t}><Chip>{t}</Chip></li>)}</ul>
        </Block>
        {results.length ? (
          <Block title="Results">
            <ul className="space-y-3">
              {results.map((r) => (
                <li key={r} className="font-display text-2xl text-ink"><span aria-hidden className="mr-2 text-vermilion-bright">✺</span>{r}</li>
              ))}
            </ul>
          </Block>
        ) : null}
        {p.learnings?.length ? (
          <Block title="What I'd change next">
            <ul className="list-disc space-y-2 pl-5">{p.learnings.map((l) => <li key={l}>{l}</li>)}</ul>
          </Block>
        ) : null}
        {p.gallery?.length ? (
          <Block title="Screens">
            <div className="grid gap-4 sm:grid-cols-2">
              {p.gallery.map((g) => (
                <Image key={g.src} src={g.src} alt={g.alt} width={1200} height={800} className="rounded-xl border border-line" />
              ))}
            </div>
          </Block>
        ) : null}
        {p.liveUrl || p.githubUrl ? (
          <div className="flex flex-wrap gap-4 border-t border-line pt-12">
            {p.liveUrl ? <Button href={p.liveUrl} external>Visit live site ↗</Button> : null}
            {p.githubUrl ? <Button href={p.githubUrl} variant="outline" external>Source code ↗</Button> : null}
          </div>
        ) : null}
      </div>

      <aside aria-label="Next project" className="bg-paper-2 py-20">
        <div className="container-page grid gap-8 md:grid-cols-[1fr_1.4fr] md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-vermilion-ink">✺ Next project</p>
            <p className="mt-3 font-display text-4xl font-[350]">Keep exploring</p>
          </div>
          <ProjectCard project={next} />
        </div>
      </aside>
    </article>
  );
}
