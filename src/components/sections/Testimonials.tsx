import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/content/testimonials";
import { cn } from "@/lib/utils";

const avatarTones = ["bg-saffron text-ink", "bg-forest text-paper", "bg-vermilion text-white", "bg-ink text-paper"];

export function Testimonials() {
  const [lead, ...rest] = testimonials;
  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="bg-paper py-24 md:py-36">
      <div className="container-page">
        <SectionHeading
          id="testimonials-title"
          eyebrow="Kind words"
          title={[{ text: "What the people who" }, { text: "paid the invoice", className: "rounded-lg bg-saffron px-2 italic font-light [box-decoration-break:clone]" }, { text: "said." }]}
        />
        <Reveal className="mt-16">
          <figure className="rounded-3xl bg-forest p-8 text-paper md:p-14">
            <blockquote className="font-display text-[clamp(1.4rem,2.6vw,2.2rem)] leading-[1.35] font-[350]">
              &ldquo;{lead.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              <span className="grid size-12 place-items-center rounded-full bg-saffron font-semibold text-ink">{lead.initials}</span>
              <span>
                <span className="block font-semibold">{lead.name}</span>
                <span className="block text-sm text-paper/75">{lead.role} · {lead.company}</span>
              </span>
            </figcaption>
          </figure>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {rest.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <figure className="flex h-full flex-col rounded-3xl border border-line bg-paper-2 p-8">
                <blockquote className="leading-[1.75] text-ink">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-auto flex items-center gap-3 pt-6">
                  <span className={cn("grid size-10 place-items-center rounded-full text-sm font-semibold", avatarTones[(i + 1) % avatarTones.length])}>{t.initials}</span>
                  <span>
                    <span className="block font-semibold">{t.name}</span>
                    <span className="block text-sm text-ink-soft">{t.role} · {t.company}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
