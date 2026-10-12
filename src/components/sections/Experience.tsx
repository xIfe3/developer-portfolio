import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading, accent } from "@/components/ui/SectionHeading";
import { experiences } from "@/content/experience";

const words = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

export function Experience() {
  const teams = words[experiences.length] ?? String(experiences.length);
  return (
    <section id="experience" aria-labelledby="experience-title" className="border-t border-line bg-surface py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          id="experience-title"
          eyebrow="Experience"
          title={[{ text: `Five years, ${teams} teams, one habit: ship it,` }, { text: "then stay.", className: accent }]}
          intro="Most of my clients still have my number. That's the part of the job I'm proudest of."
        />
        <ol className="mt-14 border-t border-line">
          {experiences.map((e, i) => (
            <li key={e.company + e.period} className="border-b border-line">
              <Reveal delay={Math.min(i * 0.04, 0.24)} className="grid gap-4 py-7 md:grid-cols-[1fr_auto] md:gap-10">
                <div>
                  <p className="font-mono text-xs tracking-[0.04em] text-ember">{e.company}</p>
                  <h3 className="mt-2 font-display text-2xl font-medium tracking-[-0.03em]">{e.role}</h3>
                  <p className="mt-2 max-w-[68ch] text-sm leading-[1.65] text-muted">{e.description}</p>
                </div>
                <div className="flex items-center gap-3 md:self-start">
                  <span className="text-[0.8rem] text-muted">{e.location}</span>
                  <span className="rounded-full border border-line bg-surface-2 px-3 py-1.5 font-mono text-xs whitespace-nowrap">
                    {e.period}
                  </span>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
