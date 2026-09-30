import { getAllProjects, getProjectBySlug } from "@/content/projects";
import { OG_SIZE, renderOgCard } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Case study by Ifeanyi Onyekwelu";

const accents = { saffron: "#F2B33D", vermilion: "#E8452C", forest: "#9FC7B0", paper: "#F2B33D" } as const;

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: { slug: string } | Promise<{ slug: string }> }) {
  const { slug } = await Promise.resolve(params);
  const p = getProjectBySlug(slug)!;
  return renderOgCard({
    eyebrow: `Case study · ${p.category}`,
    title: "",
    titleItalic: p.title,
    footer: p.impact ?? p.technologies.slice(0, 4).join(" · "),
    accent: accents[p.tone],
  });
}
