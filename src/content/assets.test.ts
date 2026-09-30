import { readdirSync } from "node:fs";
import { join, posix } from "node:path";
import { describe, expect, it } from "vitest";
import { getAllProjects } from "./projects";
import { site } from "./site";
import { skillGroups } from "./skills";

const publicDir = join(process.cwd(), "public");

function existsExactCase(urlPath: string) {
  const decoded = decodeURIComponent(urlPath);
  const dir = posix.dirname(decoded);
  const base = posix.basename(decoded);
  const entries = readdirSync(join(publicDir, ...dir.split("/").filter(Boolean)));
  return entries.includes(base);
}

describe("every referenced public asset exists with exact filename case", () => {
  const paths = [
    site.portraits.hero.src,
    ...site.portraits.story.map((p) => p.src),
    site.resume,
    ...getAllProjects().map((p) => p.image),
    ...skillGroups.flatMap((g) => g.skills.map((s) => s.icon).filter((i): i is string => !!i)),
  ];
  it.each(paths)("%s", (p) => {
    expect(existsExactCase(p)).toBe(true);
  });
});
