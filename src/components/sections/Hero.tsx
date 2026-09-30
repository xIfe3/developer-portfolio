import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Sticker } from "@/components/motion/Sticker";
import { WordRise } from "@/components/motion/WordRise";
import { Button } from "@/components/ui/Button";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { site, socials } from "@/content/site";

export function Hero() {
  const portrait = site.portraits.hero;
  return (
    <section id="home" aria-labelledby="hero-title" className="grain overflow-hidden bg-paper pt-32 pb-16 md:pt-40">
      <div className="container-page grid items-end gap-12 md:grid-cols-[1.35fr_1fr] md:gap-16">
        <div>
          <Reveal>
            <p className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-vermilion-ink">
              <span aria-hidden>✺</span> Full-stack engineer · Founder, Zephra
            </p>
          </Reveal>
          <WordRise
            as="h1"
            id="hero-title"
            animateOnMount
            className="font-display text-[clamp(2.9rem,7.4vw,6.5rem)] leading-[0.98] font-[350] tracking-[-0.025em]"
            segments={[
              { text: "I build software people" },
              {
                text: "quietly love",
                className: "rounded-lg bg-saffron px-2 italic font-light [box-decoration-break:clone]",
              },
              { text: "using." },
            ]}
          />
          <Reveal delay={0.5}>
            <p className="mt-8 max-w-[46ch] text-lg leading-[1.7] text-ink-soft">
              I&apos;m {site.name} — five years shipping fintech, SaaS and AI-integrated products, with a
              studio behind me when you need a whole team.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button href="/#contact">Start a project →</Button>
              <Button href={site.resume} variant="outline" external>
                Hiring? Résumé
              </Button>
              <div className="flex gap-2 sm:ml-2 sm:border-l sm:border-line sm:pl-5">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid size-11 place-items-center rounded-full border border-line text-ink-soft transition-colors hover:border-ink hover:text-ink"
                  >
                    <SocialIcon label={s.label} />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="animate-float">
            <div className="aspect-[4/5] overflow-hidden rounded-[18px_18px_90px_18px] bg-saffron">
              <Image
                src={portrait.src}
                alt={portrait.alt}
                width={portrait.width}
                height={portrait.height}
                priority
                sizes="(min-width: 768px) 28rem, 90vw"
                className="size-full object-cover"
              />
            </div>
          </div>
          <Sticker text="Open for projects ✺ 2026 ✺ " className="absolute -top-6 -left-6 bg-forest text-saffron" />
        </div>
      </div>

      <div className="container-page mt-16">
        <Reveal delay={0.2}>
          <dl className="grid grid-cols-2 overflow-hidden rounded-2xl border border-line md:grid-cols-4">
            {site.stats.map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-col-reverse gap-2 p-6 ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b md:border-b-0" : ""} border-line md:border-r md:last:border-r-0`}
              >
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-soft">{s.label}</dt>
                <dd className="font-display text-4xl font-[350] tracking-tight">{s.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center md:gap-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">Trusted by teams at</p>
            <ul className="flex flex-wrap gap-x-7 gap-y-2">
              {site.clients.map((c) => (
                <li key={c} className="font-display text-lg text-ink/80">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
