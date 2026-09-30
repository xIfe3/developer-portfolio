import Image from "next/image";
import Link from "next/link";
import type { Project, ProjectTone } from "@/content/projects";
import { cn } from "@/lib/utils";

export const toneClasses: Record<ProjectTone, string> = {
  saffron: "bg-saffron text-ink",
  vermilion: "bg-vermilion text-white",
  forest: "bg-forest text-paper",
  paper: "bg-paper-2 text-ink",
};

export function ProjectCard({ project, size = "large" }: { project: Project; size?: "large" | "small" }) {
  const large = size === "large";
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block rounded-2xl focus-visible:outline-offset-4"
    >
      <div
        className={cn(
          "overflow-hidden rounded-2xl p-3 transition-transform duration-700 ease-spring group-hover:-translate-y-1.5 group-hover:-rotate-1 md:p-4",
          toneClasses[project.tone],
        )}
      >
        <div className={cn("relative overflow-hidden rounded-xl", large ? "aspect-[16/10]" : "aspect-[4/3]")}>
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            sizes={large ? "(min-width: 768px) 45vw, 100vw" : "(min-width: 768px) 22vw, 50vw"}
            className="object-cover object-top transition-transform duration-700 ease-soft group-hover:scale-[1.04]"
          />
        </div>
        <div className="flex items-end justify-between gap-4 px-1 pt-4 pb-1">
          <div>
            {/* No opacity on small text: white/80 on vermilion drops below 4.5:1. */}
            <p className="text-xs font-semibold uppercase tracking-[0.14em]">
              {project.category} · {project.year}
            </p>
            <h3 className={cn("mt-1 font-display font-[400] tracking-tight", large ? "text-3xl" : "text-xl")}>
              {project.title}
            </h3>
            {large && project.impact ? <p className="mt-2 text-sm">{project.impact}</p> : null}
          </div>
          <span className="grid size-10 shrink-0 place-items-center rounded-full border border-current transition-transform duration-500 ease-spring group-hover:rotate-45">
            <span aria-hidden>↗</span>
            <span className="sr-only">Read the case study</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
