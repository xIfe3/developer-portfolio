import { Reveal } from "@/components/motion/Reveal";
import { RevealImage } from "@/components/motion/RevealImage";
import { Chip } from "@/components/ui/Chip";
import { SectionHeading, accent } from "@/components/ui/SectionHeading";
import { site } from "@/content/site";

export function Story() {
  const photo = site.portraits.story;
  return (
    <section id="story" aria-labelledby="story-title" className="border-t border-line py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          id="story-title"
          eyebrow="The story"
          className="md:grid-cols-1"
          titleClassName="max-w-[26ch]"
          title={[
            { text: "I care about the boring parts — the ledger, the retry, the" },
            { text: "refund", className: accent },
            { text: "that fires when a provider fails." },
          ]}
        />
        <div className="mt-14 grid gap-12 lg:grid-cols-[26rem_1fr] lg:gap-16">
          <figure className="relative">
            <RevealImage
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(min-width: 1024px) 26rem, 100vw"
              className="rounded-[1.25rem]"
              imgClassName="aspect-[420/500] object-[50%_30%]"
            />
            <figcaption className="absolute inset-x-0 bottom-0 rounded-b-[1.25rem] bg-gradient-to-b from-transparent to-bg/95 px-6 pt-20 pb-6">
              <span className="block font-serif text-2xl font-light italic">“Every naira should be explainable.”</span>
              <span className="label-mono mt-2 block text-[0.625rem] text-muted">The rule I build by</span>
            </figcaption>
          </figure>

          <div>
            <Reveal className="space-y-5 text-base leading-[1.75] text-muted">
              <p>
                I started out teaching software development at Aptech in 2022, which taught me to explain
                systems before I build them. Since then I&apos;ve shipped for fintech, SaaS and education teams —
                payment layers, LLM pipelines and the dashboards people run their business on.
              </p>
              <p>
                Today I build product at Babelos and run Zephra Studio, a senior-led practice for founders who need
                one reliable engineer or a small team behind them.
              </p>
              <p>
                What drives me is simple: software that pays out real money or reads someone&apos;s inbox has to be
                boring in the best way. Signed webhooks, idempotent references, refunds that fire on their own.
                That&apos;s the work.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <dl className="mt-10 grid grid-cols-2 overflow-hidden rounded-2xl border border-line bg-surface sm:grid-cols-4">
                {site.stats.map((s, i) => (
                  <div
                    key={s.label}
                    className={`flex flex-col-reverse gap-1.5 p-5 ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t sm:border-t-0" : ""} border-line sm:border-l sm:first:border-l-0`}
                  >
                    <dt className="text-xs text-muted">{s.label}</dt>
                    <dd className="font-display text-3xl font-semibold tracking-[-0.04em]">{s.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <span className="label-mono mr-1 text-faint">Trusted by</span>
                {site.clients.map((c) => (
                  <Chip key={c}>{c}</Chip>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
