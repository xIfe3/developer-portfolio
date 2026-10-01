import { describe, expect, it } from "vitest";
import {
  getAllProjects,
  getFeaturedProjects,
  getNextProject,
  getOtherProjects,
  getProjectBySlug,
} from "./projects";

describe("projects", () => {
  it("has 10 projects with unique url-safe slugs", () => {
    const slugs = getAllProjects().map((p) => p.slug);
    expect(slugs).toHaveLength(10);
    expect(new Set(slugs).size).toBe(10);
    for (const s of slugs) expect(s).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it("features BoxieAI, X2Factor, ReginaNostra and PayZeph, in order", () => {
    expect(getFeaturedProjects().map((p) => p.slug)).toEqual(["boxieai", "x2factor", "reginanostra", "payzeph"]);
  });

  it("splits featured and other projects without overlap", () => {
    const other = getOtherProjects().map((p) => p.slug);
    expect(other).toEqual(["flowanalytics", "mintverse", "medibook", "savvio", "1010-realty", "hedgeon"]);
  });

  it("finds a project by slug and returns undefined for unknown slugs", () => {
    expect(getProjectBySlug("payzeph")?.title).toBe("PayZeph");
    expect(getProjectBySlug("nope")).toBeUndefined();
  });

  it("next project wraps from last to first", () => {
    const all = getAllProjects();
    expect(getNextProject(all[0].slug).slug).toBe(all[1].slug);
    expect(getNextProject(all[all.length - 1].slug).slug).toBe(all[0].slug);
  });
});
