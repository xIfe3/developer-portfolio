import { describe, expect, it } from "vitest";
import { getProjectBySlug } from "@/content/projects";
import { SITE_URL, socials } from "@/content/site";
import { absoluteUrl, organizationJsonLd, personJsonLd, projectJsonLd, serializeJsonLd } from "./seo";

describe("seo helpers", () => {
  it("builds absolute urls from paths", () => {
    expect(absoluteUrl("/work/payzeph")).toBe(`${SITE_URL}/work/payzeph`);
    expect(absoluteUrl()).toBe(`${SITE_URL}/`);
  });

  it("Person links every social profile and works for Zephra", () => {
    const p = personJsonLd();
    expect(p["@type"]).toBe("Person");
    expect(p.sameAs).toEqual(socials.map((s) => s.href));
    expect((p.worksFor as { url: string }).url).toBe("https://zephra.dev");
  });

  it("Organization describes Zephra", () => {
    expect(organizationJsonLd()).toMatchObject({ "@type": "Organization", name: "Zephra Studio" });
  });

  it("CreativeWork uses the absolute case-study url", () => {
    const work = projectJsonLd(getProjectBySlug("payzeph")!);
    expect(work.url).toBe(`${SITE_URL}/work/payzeph`);
    expect(work.image).toBe(`${SITE_URL}/projects/payzeph.png`);
  });

  it("serialization escapes < so content cannot close the script tag", () => {
    expect(serializeJsonLd({ x: "</script><script>alert(1)</script>" })).not.toContain("</script>");
  });
});
