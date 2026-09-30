import Link from "next/link";
import { Marquee } from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";
import { Sticker } from "@/components/motion/Sticker";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllProjects } from "@/content/projects";
import { site } from "@/content/site";

const offerings = [
  {
    title: "Product builds",
    body: "SaaS platforms taken from idea to launch, with senior engineers owning delivery end to end.",
  },
  {
    title: "AI integration",
    body: "LLM features, LangChain workflows and RAG pipelines wired into real product flows.",
  },
  {
    title: "Platform engineering",
    body: "Payments, APIs, infrastructure and CI/CD that scale past MVP without a rewrite.",
  },
];

const services = ["SaaS builds", "AI workflows", "Payments", "Dashboards", "APIs", "Launch support"];

export function Zephra() {
  const studioWork = getAllProjects().filter((p) => p.client === "Zephra Studio");
  return (
    <section id="zephra" aria-labelledby="zephra-title" className="grain relative overflow-hidden bg-forest text-paper">
      <div className="container-page relative py-24 md:py-36">
        <Sticker text="Zephra Studio ✺ Senior-led ✺ " className="absolute top-10 right-6 hidden bg-saffron text-forest md:grid" />
        <SectionHeading
          id="zephra-title"
          tone="forest"
          eyebrow={site.zephra.name}
          title={[{ text: "Need a whole" }, { text: "team?", className: "italic font-light text-saffron" }]}
          intro="I founded Zephra to help founders and product teams ship production-ready SaaS and AI products without losing time to contractor churn. Same standards, more hands."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {offerings.map((o, i) => (
            <Reveal key={o.title} delay={i * 0.1}>
              <div className="h-full rounded-2xl border border-paper/15 bg-forest-deep/60 p-8 transition-transform duration-700 ease-spring hover:-translate-y-1.5 hover:-rotate-1">
                <span className="font-display text-sm text-saffron">0{i + 1}</span>
                <h3 className="mt-3 font-display text-2xl font-[400]">{o.title}</h3>
                <p className="mt-3 leading-relaxed text-paper/80">{o.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-14 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="text-paper/80">
            Recent studio work:{" "}
            {studioWork.map((p, i) => (
              <span key={p.slug}>
                <Link href={`/work/${p.slug}`} className="font-semibold text-paper underline decoration-saffron underline-offset-4 hover:text-saffron">
                  {p.title}
                </Link>
                {i < studioWork.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
          <Button href={site.zephra.url} variant="light" external>
            Visit Zephra.dev ↗
          </Button>
        </div>
      </div>
      <div className="border-t border-paper/15 bg-forest-deep py-4">
        <Marquee items={services} className="font-display text-xl italic" separatorClassName="not-italic text-saffron" duration={34} />
      </div>
    </section>
  );
}
