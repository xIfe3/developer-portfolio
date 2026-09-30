import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/content/process";

export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="bg-paper py-24 md:py-36">
      <div className="container-page">
        <SectionHeading
          id="process-title"
          eyebrow="How I work"
          title={[{ text: "Clear steps," }, { text: "no surprises.", className: "italic font-light" }]}
          intro="Whether you're hiring me or the studio, every project runs the same calm, transparent way."
        />
        <ol className="mt-16 grid gap-6 md:grid-cols-4">
          {processSteps.map((s, i) => (
            <li key={s.number}>
              <Reveal delay={i * 0.1} className="h-full border-t-2 border-ink pt-6">
                <span className="font-display text-5xl font-[300] text-vermilion-ink">{s.number}</span>
                <h3 className="mt-4 font-display text-2xl font-[400]">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{s.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
