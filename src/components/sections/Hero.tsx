import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { WordRise } from "@/components/motion/WordRise";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { accent } from "@/components/ui/SectionHeading";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { site, socials } from "@/content/site";
import { cn } from "@/lib/utils";

const focus = ["LLM pipelines", "Payments & wallets", "Multi-tenant SaaS", "Next.js", "NestJS"];

export function Hero() {
  const portrait = site.portraits.hero;
  return (
    <section id="home" aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      {/* Backdrop: ember glow + rounded tiles that fade out from the portrait side, then the hollow name. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="ember-glow absolute -top-[26rem] left-[30%] h-[68rem] w-[80rem] md:left-[30%]" />
        <div className="tile-grid absolute inset-0 [mask-image:radial-gradient(ellipse_48rem_40rem_at_74%_28%,#000_15%,transparent_75%)]" />
        <p className="text-outline absolute bottom-[-0.18em] left-1/2 -translate-x-1/2 font-display text-[clamp(8rem,21vw,19rem)] leading-none font-semibold tracking-[-0.04em] whitespace-nowrap [--outline-alpha:6%]">
          IFEANYI
        </p>
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <div className="container-page grid items-center gap-16 lg:grid-cols-[1.35fr_1fr] lg:gap-10">
        <div>
          <Reveal>
            <Eyebrow className="mb-7">Full-stack engineer · Founder, Zephra</Eyebrow>
          </Reveal>
          <WordRise
            as="h1"
            id="hero-title"
            animateOnMount
            className="max-w-[16ch] font-display text-[clamp(2.8rem,6.4vw,5rem)] leading-[0.98] font-medium tracking-[-0.035em]"
            segments={[
              { text: "I build AI and fintech software that" },
              { text: "holds up", className: accent },
              { text: "in production." },
            ]}
          />
          <Reveal delay={0.45}>
            <p className="mt-7 max-w-[44ch] text-lg leading-[1.65] text-muted">
              LLM pipelines, wallets and payouts, and multi-tenant SaaS — shipped for real users. Founder of
              Zephra, the studio behind me when you need a whole team.
            </p>
            <ul className="mt-7 flex flex-wrap gap-2">
              {focus.map((f) => (
                <li key={f}>
                  <Chip>{f}</Chip>
                </li>
              ))}
            </ul>
            <dl className="mt-8 grid max-w-xl grid-cols-3 gap-3">
              {site.stats.slice(0, 3).map((s, i) => (
                <div
                  key={s.label}
                  className={cn(
                    "flex flex-col-reverse justify-between gap-6 rounded-2xl p-4 sm:p-5",
                    i === 0 ? "bg-text text-bg" : "border border-text/[0.08] bg-surface/70 backdrop-blur",
                  )}
                >
                  <dd className="font-display text-4xl font-semibold tracking-[-0.04em]">{s.value}</dd>
                  <dt className={cn("text-xs", i === 0 ? "text-bg/70" : "text-muted")}>{s.label}</dt>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="/#contact">
                Start a project <span aria-hidden>↗</span>
              </Button>
              <Button href="/#work" variant="ghost">
                See the work <span aria-hidden>↓</span>
              </Button>
            </div>
          </Reveal>
        </div>

        {/* The ID card. */}
        <Reveal delay={0.25} className="mx-auto w-full max-w-[22rem]">
          <div className="animate-float rounded-[1.75rem] border border-text/10 bg-surface/80 p-3.5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl">
            <p className="flex items-center gap-2 px-1.5 pt-0.5 pb-3 font-mono text-[0.7rem] text-muted">
              <span aria-hidden className="size-1.5 rounded-full bg-ember" />
              Booking projects for Q4 2026
            </p>
            <div className="aspect-[312/340] overflow-hidden rounded-2xl bg-ember-deep">
              <Image
                src={portrait.src}
                alt={portrait.alt}
                width={portrait.width}
                height={portrait.height}
                priority
                sizes="(min-width: 1024px) 20rem, 90vw"
                className="size-full object-cover object-[50%_28%]"
              />
            </div>
            <div className="px-1.5 pt-4">
              <a href={`mailto:${site.email}`} className="font-medium hover:text-saffron">
                {site.email}
              </a>
              <p className="mt-1 text-xs text-muted">
                {site.location.city}, {site.location.country} · {site.location.timezone}
              </p>
              <div className="mt-4 flex gap-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid size-9 place-items-center rounded-full border border-line bg-surface-2 text-sm text-muted transition-colors hover:border-text/40 hover:text-text"
                  >
                    <SocialIcon label={s.label} />
                  </a>
                ))}
              </div>
            </div>
            <a
              href={site.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-between rounded-xl border border-line bg-bg px-4 py-3 text-sm font-medium transition-colors hover:border-text/30"
            >
              Download résumé <span aria-hidden className="text-ember">↗</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
