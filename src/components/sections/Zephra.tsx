import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { SectionHeading, accent } from "@/components/ui/SectionHeading";
import { getAllProjects, getProjectBySlug } from "@/content/projects";
import { site } from "@/content/site";

/** Offering 01: a tiny dashboard app. */
function MiniApp() {
  const bars = [30, 46, 38, 62, 54, 74, 68];
  return (
    <div className="absolute inset-x-5 top-6 bottom-0 overflow-hidden rounded-t-[10px] border border-line bg-surface">
      <div className="flex gap-1.5 border-b border-line px-2.5 py-2">
        {[0, 1, 2].map((i) => (
          <span key={i} className="size-1.5 rounded-full bg-faint" />
        ))}
      </div>
      <div className="flex h-full gap-2.5 p-2.5">
        <div className="w-12 space-y-2 rounded-md bg-surface-2 p-1.5">
          <span className="block h-1.5 w-8 rounded-full bg-ember" />
          {[0, 1, 2].map((i) => (
            <span key={i} className="block h-1.5 w-6 rounded-full bg-faint/60" />
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-2.5">
          <div className="grid grid-cols-3 gap-1.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="space-y-1 rounded-md bg-surface-2 p-1.5">
                <span className="block h-1 w-6 rounded-full bg-faint" />
                <span className="block h-1.5 w-9 rounded-full bg-text/85" />
              </div>
            ))}
          </div>
          <div className="flex h-20 items-end gap-2">
            {bars.map((h, i) => (
              <span
                key={i}
                className={`w-full rounded-t-[3px] ${i === 5 ? "bg-ember" : "bg-ember/35"}`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Offering 02: a user rule short-circuits the model call (BoxieAI). */
function RuleFlow() {
  const pill = "rounded-full border border-line px-3.5 py-2 font-mono text-xs";
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
      <span className={`${pill} bg-surface text-muted`}>new email in</span>
      <span className="text-xs text-faint">↓</span>
      <span className={`${pill} bg-ember text-text`}>user rule matched ✓</span>
      <span className="text-xs text-faint">↓</span>
      <span className={`${pill} bg-surface text-muted line-through opacity-45`}>GPT-4o call</span>
    </div>
  );
}

/** Offering 03: a wallet ledger with an automatic refund (PayZeph). */
function Ledger() {
  const rows = [
    { amount: "+₦25,000", note: "wallet funded", tone: "text-text" },
    { amount: "−₦2,000", note: "airtime · MTN", tone: "text-muted" },
    { amount: "+₦2,000", note: "refund · timeout", tone: "text-saffron" },
  ];
  return (
    <div className="absolute inset-x-5 top-1/2 -translate-y-1/2 overflow-hidden rounded-[10px] border border-line bg-surface font-mono">
      <div className="flex justify-between border-b border-line px-3.5 py-2 text-[0.625rem] tracking-[0.1em] text-faint">
        <span>LEDGER</span>
        <span>BAL ₦25,000</span>
      </div>
      {rows.map((r) => (
        <div key={r.note} className="flex justify-between border-b border-line px-3.5 py-2.5 last:border-b-0">
          <span className={`text-xs font-medium ${r.tone}`}>{r.amount}</span>
          <span className="text-[0.7rem] text-faint">{r.note}</span>
        </div>
      ))}
    </div>
  );
}

const offerings: { title: string; body: string; seen: string[]; visual: ReactNode }[] = [
  {
    title: "Product builds",
    body: "SaaS platforms taken from idea to launch, with senior engineers owning delivery end to end.",
    seen: ["flowanalytics", "medibook"],
    visual: <MiniApp />,
  },
  {
    title: "AI integration",
    body: "LLM features, LangChain workflows and RAG pipelines wired into real product flows — and kept cheap.",
    seen: ["boxieai"],
    visual: <RuleFlow />,
  },
  {
    title: "Platform engineering",
    body: "Payments, APIs, infrastructure and CI/CD that scale past MVP without a rewrite.",
    seen: ["payzeph", "x2factor"],
    visual: <Ledger />,
  },
];

export function Zephra() {
  const studioWork = getAllProjects().filter((p) => p.client.startsWith("Zephra Studio"));
  return (
    <section id="zephra" aria-labelledby="zephra-title" className="border-t border-line py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          id="zephra-title"
          eyebrow={site.zephra.name}
          titleClassName="max-w-[24ch]"
          title={[{ text: "One engineer when you need focus. A studio when you need" }, { text: "a team.", className: accent }]}
          intro={site.zephra.description}
          aside={
            <Button href={site.zephra.url} variant="ember" external>
              Visit zephra.dev <span aria-hidden>↗</span>
            </Button>
          }
        />
        <ol className="mt-14 grid gap-5 md:grid-cols-3">
          {offerings.map((o, i) => (
            <li key={o.title}>
              <Reveal delay={i * 0.1} className="flex h-full flex-col gap-6 rounded-3xl border border-line bg-surface p-7">
                <span className="label-mono text-ember">0{i + 1}</span>
                <div
                  aria-hidden
                  className="relative h-48 overflow-hidden rounded-2xl border border-line bg-bg bg-[radial-gradient(closest-side,rgb(232_69_44/0.4),transparent)]"
                >
                  {o.visual}
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-[1.65rem] font-medium tracking-[-0.03em]">{o.title}</h3>
                  <p className="mt-2.5 text-[0.95rem] leading-[1.6] text-muted">{o.body}</p>
                </div>
                <p className="flex flex-wrap items-center gap-2 border-t border-line pt-5">
                  <span className="label-mono mr-1 text-[0.625rem] text-faint">Seen in</span>
                  {o.seen.map((slug) => {
                    const p = getProjectBySlug(slug);
                    return p ? (
                      <Link
                        key={slug}
                        href={`/work/${slug}`}
                        className="rounded-full border border-line bg-surface-2 px-3 py-1 text-xs font-medium text-muted transition-colors hover:border-text/40 hover:text-text"
                      >
                        {p.title} <span aria-hidden>↗</span>
                      </Link>
                    ) : null;
                  })}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
        <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-line pt-8">
          <span className="label-mono text-muted">Recent studio work</span>
          {studioWork.map((p) => (
            <Link
              key={p.slug}
              href={`/work/${p.slug}`}
              className="group flex items-center gap-1.5 font-display text-xl font-medium tracking-[-0.03em] hover:text-saffron"
            >
              {p.title}
              <span aria-hidden className="text-base text-ember transition-transform duration-500 ease-spring group-hover:rotate-45">
                ↗
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
