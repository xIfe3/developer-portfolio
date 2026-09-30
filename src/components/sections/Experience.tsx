import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Chip } from "@/components/ui/Chip";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experiences } from "@/content/experience";
import { skillGroups } from "@/content/skills";

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="bg-paper py-24 md:py-36">
      <div className="container-page">
        <SectionHeading
          id="experience-title"
          eyebrow="Experience & stack"
          title={[{ text: "Five years of" }, { text: "production", className: "italic font-light" }, { text: "receipts." }]}
          intro="The teams I've shipped with, and the tools I reach for when reliability isn't optional."
        />
        <div className="mt-16 grid gap-16 lg:grid-cols-[1.4fr_1fr]">
          <ol className="relative border-l border-line">
            {experiences.map((e, i) => (
              <li key={e.company + e.period} className="relative pb-12 pl-8 last:pb-0">
                <span aria-hidden className="absolute top-2 -left-[7px] size-3.5 rounded-full border-2 border-paper bg-vermilion-bright" />
                <Reveal delay={Math.min(i * 0.05, 0.3)}>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">{e.period} · {e.location}</p>
                  <h3 className="mt-2 font-display text-2xl font-[400]">{e.role}</h3>
                  <p className="font-semibold text-vermilion-ink">{e.company}</p>
                  <p className="mt-3 leading-relaxed text-ink-soft">{e.description}</p>
                  {e.achievements.length > 0 ? (
                    <ul className="mt-3 space-y-1 text-[0.95rem]">
                      {e.achievements.map((a) => (
                        <li key={a} className="flex gap-2"><span aria-hidden className="text-forest">✓</span>{a}</li>
                      ))}
                    </ul>
                  ) : null}
                </Reveal>
              </li>
            ))}
          </ol>
          <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            {skillGroups.map((g, i) => (
              <Reveal key={g.title} delay={i * 0.1}>
                <div className="rounded-2xl border border-line bg-paper-2 p-6">
                  <h3 className="font-display text-xl font-[450]">{g.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{g.blurb}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {g.skills.map((s) => (
                      <li key={s.name}>
                        <Chip>
                          {s.icon ? <Image src={s.icon} alt="" width={14} height={14} className="mr-1.5" /> : <span aria-hidden className="mr-1.5 text-vermilion-bright">✺</span>}
                          {s.name}
                        </Chip>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
