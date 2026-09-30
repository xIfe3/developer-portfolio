import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Project } from "@/content/projects";
import { CaseStudy } from "./CaseStudy";

const base: Project = {
  slug: "demo",
  title: "Demo App",
  client: "Acme",
  year: "2026",
  category: "SaaS · Demo",
  summary: "A demo summary.",
  technologies: ["Next.js", "Prisma"],
  image: "/projects/payzeph.png",
  imageAlt: "Demo screenshot",
  liveUrl: "https://demo.example.com",
  featured: true,
  tone: "saffron",
};
const next: Project = { ...base, slug: "next-one", title: "Next One" };

describe("CaseStudy", () => {
  it("renders the title as the only h1 and the overview", () => {
    render(<CaseStudy project={base} next={next} />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Demo App");
    expect(screen.getByText("A demo summary.")).toBeInTheDocument();
  });

  it("omits optional sections that have no content", () => {
    render(<CaseStudy project={base} next={next} />);
    for (const name of [/the challenge/i, /what i built/i, /results/i, /screens/i]) {
      expect(screen.queryByRole("heading", { name })).toBeNull();
    }
    expect(screen.queryByRole("link", { name: /source code/i })).toBeNull();
  });

  it("shows results from impact and the extra fields when present", () => {
    render(
      <CaseStudy
        project={{ ...base, impact: "Shipped in 14 days", challenge: "Old system was slow.", built: ["An API"], githubUrl: "https://github.com/x/y" }}
        next={next}
      />,
    );
    expect(screen.getByRole("heading", { name: /results/i })).toBeInTheDocument();
    expect(screen.getByText("Shipped in 14 days")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /the challenge/i })).toBeInTheDocument();
    expect(screen.getByText("An API")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /source code/i })).toHaveAttribute("href", "https://github.com/x/y");
  });

  it("links to the next project", () => {
    render(<CaseStudy project={base} next={next} />);
    expect(screen.getByRole("link", { name: /next one/i })).toHaveAttribute("href", "/work/next-one");
  });
});
