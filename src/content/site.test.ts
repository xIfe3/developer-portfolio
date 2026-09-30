import { describe, expect, it } from "vitest";
import { resolveSiteUrl, socials, navLinks } from "./site";

describe("resolveSiteUrl", () => {
  it("uses NEXT_PUBLIC_SITE_URL and strips path and trailing slash", () => {
    expect(resolveSiteUrl({ NEXT_PUBLIC_SITE_URL: "https://xife3.space/" })).toBe("https://xife3.space");
  });
  it("falls back to the Vercel production URL", () => {
    expect(resolveSiteUrl({ VERCEL_PROJECT_PRODUCTION_URL: "portfolio.vercel.app" })).toBe(
      "https://portfolio.vercel.app",
    );
  });
  it("falls back to localhost when nothing is set", () => {
    expect(resolveSiteUrl({})).toBe("http://localhost:3000");
  });
  it("treats a blank env var as unset", () => {
    expect(resolveSiteUrl({ NEXT_PUBLIC_SITE_URL: "  " })).toBe("http://localhost:3000");
  });
  it("rejects non-http protocols", () => {
    expect(() => resolveSiteUrl({ NEXT_PUBLIC_SITE_URL: "ftp://x.com" })).toThrow(/http/);
  });
});

describe("socials and nav", () => {
  it("has exactly one entry per network with the canonical handles", () => {
    expect(socials.map((s) => s.href)).toEqual([
      "https://github.com/xIfe3",
      "https://www.linkedin.com/in/ifeanyichukwu-onyekwelu",
      "https://x.com/_xIfe3",
    ]);
  });
  it("nav links point at homepage anchors so they work from case-study pages", () => {
    for (const l of navLinks) expect(l.href).toMatch(/^\/#[a-z]+$/);
  });
});
