import { Reveal } from "@/components/motion/Reveal";
import { RevealImage } from "@/components/motion/RevealImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/content/site";

const values = [
  {
    title: "Backend that lasts",
    body: "APIs, payments and databases that scale past MVP without a rewrite.",
  },
  {
    title: "AI that feels native",
    body: "LangChain workflows, RAG and assistants that feel like part of the product, not a gimmick.",
  },
  {
    title: "Interfaces people enjoy",
    body: "Typed React and Next.js apps that stay fast under real-world data.",
  },
];

export function Story() {
  const [first, second] = site.portraits.story;
  return (
    <section id="story" aria-labelledby="story-title" className="grain overflow-hidden bg-paper-2 py-24 md:py-36">
      <div className="container-page grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <div className="relative mx-auto h-[28rem] w-full max-w-md sm:h-[34rem]">
          <RevealImage
            src={first.src}
            alt={first.alt}
            width={first.width}
            height={first.height}
            className="absolute top-0 left-0 w-[72%] rotate-[-3deg] rounded-[18px_18px_80px_18px] shadow-xl"
            imgClassName="aspect-[4/5]"
          />
          <RevealImage
            src={second.src}
            alt={second.alt}
            width={second.width}
            height={second.height}
            className="absolute right-0 bottom-0 w-[55%] rotate-[4deg] rounded-2xl border-8 border-paper shadow-xl"
            imgClassName="aspect-square"
          />
          <p className="absolute bottom-4 left-2 rounded-full bg-forest px-4 py-2 text-sm font-semibold text-paper">
            {site.location.city}, {site.location.country} · {site.location.timezone}
          </p>
        </div>

        <div>
          <SectionHeading
            id="story-title"
            eyebrow="My story"
            title={[{ text: "I build software that" }, { text: "outlives", className: "italic font-light text-vermilion-ink" }, { text: "the sprint that shipped it." }]}
            className="md:grid-cols-1"
          />
          <Reveal className="mt-10 space-y-6 text-lg leading-[1.8] text-ink-soft">
            <p>
              I started out teaching — lecturing full-stack development at Aptech in Enugu and mentoring students
              into their first developer jobs. That habit of explaining the <em>why</em> never left me.
            </p>
            <p>
              Five years on, I&apos;ve shipped products across fintech, SaaS, education and real estate — the kind
              of codebases where a 2am incident is the real design review. These days I build AI-integrated
              products and lead Zephra, the studio I founded for teams that need more hands.
            </p>
            <p>
              My edge is judgement. I don&apos;t just close tickets; I fix the parts of the system that keep
              failing, write down why, and leave the codebase better than I found it.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <div className="h-1 w-10 rounded-full bg-vermilion-bright" />
                <h3 className="mt-4 font-display text-xl font-[450]">{v.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
