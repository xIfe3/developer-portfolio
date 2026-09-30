import type { MetadataRoute } from "next";
import { getAllProjects } from "@/content/projects";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...getAllProjects().map((p) => ({
      url: absoluteUrl(`/work/${p.slug}`),
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: p.featured ? 0.8 : 0.6,
    })),
  ];
}
