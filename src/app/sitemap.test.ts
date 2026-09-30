import { describe, expect, it } from "vitest";
import { getAllProjects } from "@/content/projects";
import { SITE_URL } from "@/content/site";
import robots from "./robots";
import sitemap from "./sitemap";

describe("sitemap", () => {
  it("lists the homepage and every case study with absolute urls", () => {
    const urls = sitemap().map((e) => e.url);
    expect(urls[0]).toBe(`${SITE_URL}/`);
    for (const p of getAllProjects()) expect(urls).toContain(`${SITE_URL}/work/${p.slug}`);
    expect(urls).toHaveLength(getAllProjects().length + 1);
  });
});

describe("robots", () => {
  it("allows everything and points to the sitemap", () => {
    const r = robots();
    expect(r.rules).toEqual({ userAgent: "*", allow: "/" });
    expect(r.sitemap).toBe(`${SITE_URL}/sitemap.xml`);
  });
});
