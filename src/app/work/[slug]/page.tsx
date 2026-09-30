import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/ui/JsonLd";
import { CaseStudy } from "@/components/work/CaseStudy";
import { getAllProjects, getNextProject, getProjectBySlug } from "@/content/projects";
import { site } from "@/content/site";
import { projectJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProjectBySlug(slug);
  if (!p) return {};
  const title = `${p.title} — ${p.category} case study`;
  return {
    title,
    description: p.summary,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: { type: "article", url: `/work/${p.slug}`, title: `${title} · ${site.name}`, description: p.summary },
    twitter: { card: "summary_large_image", title: `${title} · ${site.name}`, description: p.summary },
  };
}

export default async function WorkPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  return (
    <>
      <JsonLd data={projectJsonLd(project)} />
      <CaseStudy project={project} next={getNextProject(slug)} />
    </>
  );
}
