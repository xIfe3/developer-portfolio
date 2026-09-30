import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/work/ProjectCard";
import { getFeaturedProjects, getOtherProjects } from "@/content/projects";

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="bg-paper py-24 md:py-36">
      <div className="container-page">
        <SectionHeading
          id="work-title"
          eyebrow="Selected work"
          title={[{ text: "Products I've shipped, and the" }, { text: "stories", className: "italic font-light" }, { text: "behind them." }]}
          intro="Live platforms used by real people, from payments and analytics to schools. Open any project for the full story."
        />
        <div className="mt-16 grid gap-8 md:grid-cols-2 md:gap-10">
          {getFeaturedProjects().map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 0.12} className={i % 2 === 1 ? "md:mt-20" : undefined}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
        <h3 className="mt-24 font-display text-2xl font-[400]">More work</h3>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {getOtherProjects().map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <ProjectCard project={p} size="small" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
