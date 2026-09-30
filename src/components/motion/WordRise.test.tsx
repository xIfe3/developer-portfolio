import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const reduced = vi.hoisted(() => ({ value: false }));
vi.mock("framer-motion", async (orig) => ({
  ...(await orig<typeof import("framer-motion")>()),
  useReducedMotion: () => reduced.value,
}));

import { WordRise } from "./WordRise";

const segments = [
  { text: "I build software people" },
  { text: "quietly love", className: "italic" },
  { text: "using." },
];
const clean = (s: string | null) => (s ?? "").replace(/\s+/g, " ").trim();

describe("WordRise", () => {
  beforeEach(() => {
    reduced.value = false;
  });

  it("renders the full sentence as one heading when animated", () => {
    render(<WordRise as="h1" segments={segments} animateOnMount />);
    expect(clean(screen.getByRole("heading", { level: 1 }).textContent)).toBe(
      "I build software people quietly love using.",
    );
  });

  it("renders plain text with no animated nodes under reduced motion", () => {
    reduced.value = true;
    const { container } = render(<WordRise as="h2" segments={segments} />);
    expect(clean(screen.getByRole("heading", { level: 2 }).textContent)).toBe(
      "I build software people quietly love using.",
    );
    expect(container.querySelector("[data-reveal]")).toBeNull();
    expect(screen.getByText("quietly love")).toHaveClass("italic");
  });
});
