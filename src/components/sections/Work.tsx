import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { SectionHeading, accent } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/work/ProjectCard";
import { getFeaturedProjects, getOtherProjects } from "@/content/projects";

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          id="work-title"
          eyebrow="Selected work"
          title={[{ text: "Work that's live, used and" }, { text: "paying out.", className: accent }]}
          intro="Client platforms and Zephra products. Each case study says what I built — and what I'd fix next."
        />
        <div className="mt-16 grid gap-16 md:grid-cols-2 md:gap-x-8 md:gap-y-20">
          {getFeaturedProjects().map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 0.12} className={i % 2 === 1 ? "md:mt-36" : undefined}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>

        <h3 className="label-mono mt-24 text-muted">More work</h3>
        <ul className="mt-5 border-b border-line">
          {getOtherProjects().map((p) => (
            <li key={p.slug} className="border-t border-line">
              <Link
                href={`/work/${p.slug}`}
                className="group grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 py-5 md:grid-cols-[22rem_1fr_auto_auto]"
              >
                <span className="font-display text-2xl font-medium tracking-[-0.03em] transition-colors group-hover:text-saffron">
                  {p.title}
                </span>
                <span className="order-3 col-span-2 text-sm text-muted md:order-none md:col-span-1">{p.category}</span>
                <span className="hidden font-mono text-xs text-faint md:block">{p.year}</span>
                <span aria-hidden className="text-ember transition-transform duration-500 ease-spring group-hover:rotate-45">
                  ↗
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <Button href="/#contact" variant="ghost">
            Have something similar in mind? <span aria-hidden>↗</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
