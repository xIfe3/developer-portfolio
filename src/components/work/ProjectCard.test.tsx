import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { getProjectBySlug } from "@/content/projects";
import { ProjectCard } from "./ProjectCard";

describe("ProjectCard", () => {
  it("uses its visible text as the link name (no mismatching aria-label)", () => {
    render(<ProjectCard project={getProjectBySlug("payzeph")!} />);
    const link = screen.getByRole("link");
    expect(link).not.toHaveAttribute("aria-label");
    expect(link).toHaveAccessibleName(/PayZeph/);
    expect(link).toHaveAttribute("href", "/work/payzeph");
  });
});
