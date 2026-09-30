import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const reduced = vi.hoisted(() => ({ value: false }));
const lenis = vi.hoisted(() => ({ ctor: vi.fn(), destroy: vi.fn() }));

vi.mock("framer-motion", async (orig) => ({
  ...(await orig<typeof import("framer-motion")>()),
  useReducedMotion: () => reduced.value,
}));
vi.mock("lenis", () => ({
  default: class {
    constructor(opts: unknown) {
      lenis.ctor(opts);
    }
    destroy() {
      lenis.destroy();
    }
  },
}));

import { SmoothScroll } from "./SmoothScroll";

describe("SmoothScroll", () => {
  beforeEach(() => {
    reduced.value = false;
    lenis.ctor.mockClear();
    lenis.destroy.mockClear();
  });

  it("starts Lenis and destroys it on unmount", () => {
    const { unmount } = render(<SmoothScroll />);
    expect(lenis.ctor).toHaveBeenCalledTimes(1);
    unmount();
    expect(lenis.destroy).toHaveBeenCalledTimes(1);
  });

  it("never starts Lenis for reduced-motion users", () => {
    reduced.value = true;
    render(<SmoothScroll />);
    expect(lenis.ctor).not.toHaveBeenCalled();
  });
});
