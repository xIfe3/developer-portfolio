import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { WordRise } from "@/components/motion/WordRise";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { Project } from "@/content/projects";
import { ProjectCard } from "./ProjectCard";

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Reveal className="grid gap-4 border-t border-line py-12 md:grid-cols-[14rem_1fr] md:gap-12">
      <h2 className="font-display text-2xl font-medium tracking-[-0.03em]">{title}</h2>
      <div className="text-lg leading-[1.8] text-muted">{children}</div>
    </Reveal>
  );
}

export function CaseStudy({ project: p, next }: { project: Project; next: Project }) {
  const results = [...(p.impact ? [p.impact] : []), ...(p.results ?? [])];
  return (
    <article>
      <header className="relative isolate overflow-hidden pt-32 pb-12 md:pt-40">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="ember-glow absolute -top-[30rem] left-[35%] h-[60rem] w-[70rem]" />
          <div className="tile-grid absolute inset-0 [mask-image:radial-gradient(ellipse_44rem_30rem_at_75%_0%,#000_10%,transparent_75%)]" />
        </div>
        <div className="container-page">
          <Link href="/#work" className="text-sm font-medium text-muted underline-offset-4 hover:text-text hover:underline">
            ← All work
          </Link>
          <p className="label-mono mt-10 text-muted">
            {p.category} · {p.year}
          </p>
          <WordRise
            as="h1"
            animateOnMount
            segments={[{ text: p.title }]}
            className="mt-4 font-display text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.98] font-medium tracking-[-0.035em]"
          />
          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-3 text-sm [&_dt]:mb-1 [&_dt]:font-mono [&_dt]:text-faint">
            <div><dt className="text-xs">Client</dt><dd className="font-medium">{p.client}</dd></div>
            {p.role ? <div><dt className="text-xs">Role</dt><dd className="font-medium">{p.role}</dd></div> : null}
            <div><dt className="text-xs">Year</dt><dd className="font-medium">{p.year}</dd></div>
          </dl>
        </div>
      </header>

      <div className="container-page -mt-2 md:-mt-4">
        {/* The LCP image: visible from first paint (no JS-gated fade), CSS-only soft zoom. */}
        <div className="mt-10 overflow-hidden rounded-3xl border border-line shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]">
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
                <li key={r} className="font-display text-2xl font-medium tracking-[-0.03em] text-text"><span aria-hidden className="mr-2 text-ember">✺</span>{r}</li>
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
            {p.githubUrl ? <Button href={p.githubUrl} variant="ghost" external>Source code ↗</Button> : null}
          </div>
        ) : null}
      </div>

      <aside aria-label="Next project" className="border-t border-line bg-surface py-20">
        <div className="container-page grid gap-8 md:grid-cols-[1fr_1.4fr] md:items-center">
          <div>
            <Eyebrow>Next project</Eyebrow>
            <p className="mt-4 font-display text-4xl font-medium tracking-[-0.03em]">Keep exploring</p>
          </div>
          <ProjectCard project={next} />
        </div>
      </aside>
    </article>
  );
}
