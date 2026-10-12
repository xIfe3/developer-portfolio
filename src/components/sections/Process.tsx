import { FiCode, FiPenTool, FiSearch, FiSend } from "react-icons/fi";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading, accent } from "@/components/ui/SectionHeading";
import { processSteps } from "@/content/process";

const icons = [FiSearch, FiPenTool, FiCode, FiSend];

export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="border-t border-line bg-surface py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          id="process-title"
          eyebrow="Process"
          title={[{ text: "How a project moves from brief to" }, { text: "launch.", className: accent }]}
          intro="Whether you're hiring me or the studio, every project runs the same calm, transparent way."
        />
        <div aria-hidden className="mt-14 hidden md:block">
          <div className="label-mono flex justify-between text-ember">
            {processSteps.map((s) => (
              <span key={s.number}>{s.number}</span>
            ))}
            <span>Live</span>
          </div>
          <div className="mt-3 h-[3px] rounded-full bg-gradient-to-r from-ember-deep via-ember to-saffron" />
        </div>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((s, i) => {
            const Icon = icons[i % icons.length];
            return (
              <li key={s.number}>
                <Reveal delay={i * 0.1} className="flex h-full flex-col gap-10 rounded-[1.25rem] border border-text/[0.08] bg-bg p-6">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-surface-2 px-2.5 py-1 font-mono text-[0.7rem] text-muted">
                      Step {i + 1}
                    </span>
                    <span className="grid size-9 place-items-center rounded-full border border-line bg-surface-2 text-ember">
                      <Icon aria-hidden />
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-[1.4rem] font-medium tracking-[-0.03em]">{s.title}</h3>
                    <p className="mt-2.5 text-sm leading-[1.6] text-muted">{s.body}</p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
