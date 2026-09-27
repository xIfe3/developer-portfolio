# Portfolio Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the personal portfolio as a warm, premium, motion-rich Next.js site with per-project case-study pages and a full SEO foundation.

**Architecture:** Content moves into typed data modules (`src/content/*`). Sections are server components styled with Tailwind v4 theme tokens. Only the interactive pieces are client components: motion primitives, Header, ContactForm and smooth scroll. Framer Motion's `MotionConfig reducedMotion="user"` plus a global CSS rule honour reduced motion. A `<noscript>` style keeps revealed content visible without JS. Case studies are statically generated at `/work/[slug]`. SEO comes from the App Router metadata API, `sitemap.ts`, `robots.ts`, `next/og` images and JSON-LD.

**Tech Stack:** Next.js 15.5 (App Router, Turbopack), React 19.1, TypeScript, Tailwind CSS v4, Framer Motion 12, Lenis 1.3, @emailjs/browser, react-hot-toast, react-icons, Vitest 3 + Testing Library (jsdom).

**Spec:** `docs/superpowers/specs/2026-09-27-portfolio-overhaul-design.md`

## Global Constraints

- Palette: paper `#F3EDE3`, paper-2 `#EAE2D5`, ink `#1F1A17`, ink-soft `#5B514A`, line `#D9CFC0`, vermilion, saffron `#F2B33D`, forest `#1F4D3A`.
- Contrast fix per spec §3: vermilion fills that carry white text use `#D63A22` (4.7:1). Vermilion *text* on paper uses `#B8321C` (5.1:1). `#E8452C` is decorative only.
- Fonts: Fraunces (display, variable with opsz, normal + italic) and Inter (body), both via `next/font/google`. Sora and JetBrains Mono are removed.
- Motion eases: soft `[0.22, 1, 0.36, 1]` (word rise 0.9s, 0.08s stagger); spring `cubic-bezier(.34,1.56,.64,1)`; sticker 14s linear rotation; float ±8px over 6s.
- Every animation must be disabled or reduced to opacity under `prefers-reduced-motion: reduce`, and Lenis must not start.
- All text must be server-rendered. Content must stay visible with JS disabled.
- **No invented facts.** Case-study copy comes only from the existing repo data. Optional fields render nothing when empty.
- Socials, single source: GitHub `https://github.com/xIfe3`, LinkedIn `https://www.linkedin.com/in/ifeanyichukwu-onyekwelu`, X `https://x.com/_xIfe3`.
- `SITE_URL` resolution order: `NEXT_PUBLIC_SITE_URL`, then `https://${VERCEL_PROJECT_PRODUCTION_URL}`, then `http://localhost:3000`.
- Targets: Lighthouse (mobile) SEO ≥ 95, Accessibility ≥ 95, Performance ≥ 90. `npm run lint`, `npm run build` and `npm test` must all pass.
- Every commit message ends with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## Review Focus

1. **Case-sensitive image paths.** Windows is case-insensitive, so `/ifeanyi.JPEG` works locally but 404s on Vercel/Linux. Every image path in content must match the real filename exactly (a test in Task 3 reads directory listings, not `existsSync`).
2. **Missing `NEXT_PUBLIC_SITE_URL` in production.** Canonicals and the sitemap must not point at localhost on Vercel. Fall back to `VERCEL_PROJECT_PRODUCTION_URL` (tested in Task 3).
3. **Keyboard users on the mobile menu.** Esc closes it, focus returns to the toggle, and Tab is trapped inside while it's open (tested in Task 6).
4. **Reduced-motion users.** Headlines render as plain text and smooth scroll never initialises (tested in Task 5).
5. **Contact form without EmailJS keys, or with a failed send.** Show a direct-email fallback instead of crashing, and keep the visitor's typed message on error (tested in Task 10).

---

## File Structure

```
assets/fonts/                         OG-image font files (woff, committed)
vitest.config.mts, vitest.setup.tsx   test tooling
next.config.ts                        image formats
src/app/
  layout.tsx          fonts, root metadata, JSON-LD, skip link, Header/Footer, MotionProvider
  page.tsx            homepage composition
  globals.css         tokens, utilities, base, reduced-motion
  not-found.tsx
  sitemap.ts, robots.ts, opengraph-image.tsx
  work/[slug]/page.tsx, template.tsx, opengraph-image.tsx
src/content/
  site.ts             identity, SITE_URL, socials, nav, stats, images
  projects.ts         Project type, data, helpers
  experience.ts, skills.ts, testimonials.ts, process.ts
src/lib/
  utils.ts (existing cn), seo.ts, email.ts, og.tsx
src/types/grecaptcha.d.ts
src/components/
  motion/  MotionProvider.tsx SmoothScroll.tsx Reveal.tsx RevealImage.tsx WordRise.tsx Marquee.tsx Sticker.tsx
  ui/      Button.tsx Chip.tsx SectionHeading.tsx JsonLd.tsx
  sections/ Header.tsx Footer.tsx Hero.tsx IndustriesBand.tsx Work.tsx Story.tsx Zephra.tsx Process.tsx Experience.tsx Testimonials.tsx Contact.tsx ContactForm.tsx
  work/    ProjectCard.tsx CaseStudy.tsx
```

The old `src/components/*.tsx` sections stay in place and keep rendering until Task 11 swaps `page.tsx` over and deletes them. Between Task 2 and Task 11 the old sections will look visually broken, because their CSS variables are gone. That's expected on this branch, and the build stays green throughout.

---

### Task 1: Test tooling, dependencies, OG fonts

**Files:**
- Modify: `package.json` (scripts and dependencies, via npm)
- Create: `vitest.config.mts`, `vitest.setup.tsx`, `src/lib/utils.test.ts`, `assets/fonts/*.woff`
- Modify: `next.config.ts`

**Interfaces:**
- Produces: `npm test` (Vitest, jsdom, `@/` alias, `next/image` mocked to a plain `<img>`, `matchMedia` and `IntersectionObserver` stubs); `lenis` installed.

- [ ] **Step 1: Install dependencies**

```bash
npm install lenis@^1.3
npm install -D vitest@^3 @vitejs/plugin-react vite-tsconfig-paths jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

- [ ] **Step 2: Add scripts to `package.json`** (inside `"scripts"`)

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 3: Create `vitest.config.mts`**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.tsx"],
    include: ["src/**/*.test.{ts,tsx}"],
    css: false,
  },
});
```

- [ ] **Step 4: Create `vitest.setup.tsx`**

```tsx
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";
import type { AnchorHTMLAttributes, ImgHTMLAttributes } from "react";

afterEach(() => cleanup());

vi.mock("next/image", () => ({
  default: ({
    priority,
    fill,
    sizes,
    ...rest
  }: ImgHTMLAttributes<HTMLImageElement> & { priority?: boolean; fill?: boolean }) => {
    void priority;
    void fill;
    void sizes;
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...rest} />;
  },
}));

// next/link needs the App Router context; a plain anchor is enough for unit tests.
vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a
      href={href}
      {...rest}
      onClick={(e) => {
        e.preventDefault();
        rest.onClick?.(e);
      }}
    >
      {children}
    </a>
  ),
}));

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }),
});

class IO {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
// @ts-expect-error jsdom has no IntersectionObserver
window.IntersectionObserver = IO;
```

- [ ] **Step 5: Write a smoke test `src/lib/utils.test.ts`**

```ts
import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("merges conflicting tailwind classes, last wins", () => {
    expect(cn("px-2 text-ink", "px-4")).toBe("text-ink px-4");
  });
});
```

- [ ] **Step 6: Run it**

Run: `npm test`
Expected: 1 passed.

- [ ] **Step 7: Download the OG-image fonts** (static woff, which Satori can read)

```bash
mkdir -p assets/fonts
curl -fsSL -o assets/fonts/fraunces-latin-400-normal.woff https://cdn.jsdelivr.net/npm/@fontsource/fraunces@5/files/fraunces-latin-400-normal.woff
curl -fsSL -o assets/fonts/fraunces-latin-400-italic.woff https://cdn.jsdelivr.net/npm/@fontsource/fraunces@5/files/fraunces-latin-400-italic.woff
curl -fsSL -o assets/fonts/inter-latin-600-normal.woff https://cdn.jsdelivr.net/npm/@fontsource/inter@5/files/inter-latin-600-normal.woff
ls -la assets/fonts
```
Expected: three files, each larger than 10 KB.

- [ ] **Step 8: Replace `next.config.ts`**

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
```

- [ ] **Step 9: Verify the build and commit**

Run: `npm run build`. Expected: success.

```bash
git add package.json package-lock.json vitest.config.mts vitest.setup.tsx src/lib/utils.test.ts assets/fonts next.config.ts
git commit -m "chore: add vitest, lenis, OG fonts and image formats

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 2: Design tokens, fonts, motion provider shell

**Files:**
- Replace: `src/app/globals.css`
- Modify: `src/app/layout.tsx`
- Create: `src/components/motion/MotionProvider.tsx`, `src/components/motion/SmoothScroll.tsx` (a stub, completed in Task 5)

**Interfaces:**
- Produces these Tailwind utilities, which every later task uses: `bg-paper bg-paper-2 text-ink text-ink-soft border-line bg-vermilion text-vermilion-ink bg-saffron bg-forest bg-forest-deep font-display font-sans ease-spring ease-soft animate-marquee animate-spin-slow animate-float container-page grain`.
- Produces `<MotionProvider>{children}</MotionProvider>`.

- [ ] **Step 1: Replace `src/app/globals.css`**

```css
@import "tailwindcss";

@theme {
  --color-paper: #f3ede3;
  --color-paper-2: #eae2d5;
  --color-ink: #1f1a17;
  --color-ink-soft: #5b514a;
  --color-line: #d9cfc0;
  --color-vermilion: #d63a22;
  --color-vermilion-bright: #e8452c;
  --color-vermilion-ink: #b8321c;
  --color-saffron: #f2b33d;
  --color-forest: #1f4d3a;
  --color-forest-deep: #173b2c;

  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-soft: cubic-bezier(0.22, 1, 0.36, 1);

  --animate-marquee: marquee var(--marquee-duration, 30s) linear infinite;
  --animate-spin-slow: spin 14s linear infinite;
  --animate-float: float 6s ease-in-out infinite;

  @keyframes marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }
}

@theme inline {
  --font-display: var(--font-fraunces), Georgia, "Times New Roman", serif;
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
}

@utility container-page {
  width: 100%;
  max-width: 80rem;
  margin-inline: auto;
  padding-inline: clamp(1.25rem, 4vw, 3.5rem);
}

@utility grain {
  position: relative;
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0.15;
    mix-blend-mode: multiply;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.6'/%3E%3C/svg%3E");
  }
}

@layer base {
  html {
    background: var(--color-paper);
    color: var(--color-ink);
  }
  body {
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
  section[id] {
    scroll-margin-top: 5rem;
  }
  ::selection {
    background: var(--color-saffron);
    color: var(--color-ink);
  }
  :focus-visible {
    outline: 2px solid var(--color-vermilion);
    outline-offset: 3px;
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 2: Create a temporary `src/components/motion/SmoothScroll.tsx`** (Task 5 fills it in)

```tsx
"use client";

export function SmoothScroll() {
  return null;
}
```

- [ ] **Step 3: Create `src/components/motion/MotionProvider.tsx`**

```tsx
"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { SmoothScroll } from "./SmoothScroll";

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
      <SmoothScroll />
    </MotionConfig>
  );
}
```

- [ ] **Step 4: Replace `src/app/layout.tsx`** (metadata grows in Task 4; Header/Footer arrive in Task 11)

```tsx
import type { Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { MotionProvider } from "@/components/motion/MotionProvider";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
  variable: "--font-fraunces",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: "Ifeanyi Onyekwelu — Full-Stack Engineer · AI Integration",
  description:
    "Full-stack engineer with 5+ years building production web platforms, scalable backend systems, and AI-integrated products for fintech, SaaS, and education teams.",
  icons: { icon: "/favicon.png" },
};

export const viewport: Viewport = { themeColor: "#f3ede3" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <head>
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
      </head>
      <body className="bg-paper font-sans text-ink antialiased">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 5: Verify**

Run: `npm run build && npm test`. Expected: both pass.

- [ ] **Step 6: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx src/components/motion
git commit -m "feat: warm design tokens, Fraunces/Inter fonts, motion provider

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 3: Content layer

**Files:**
- Create: `src/content/site.ts`, `src/content/projects.ts`, `src/content/experience.ts`, `src/content/skills.ts`, `src/content/testimonials.ts`, `src/content/process.ts`
- Test: `src/content/site.test.ts`, `src/content/projects.test.ts`, `src/content/assets.test.ts`

**Interfaces:**
- Produces:
  - `resolveSiteUrl(env: { NEXT_PUBLIC_SITE_URL?: string; VERCEL_PROJECT_PRODUCTION_URL?: string }): string`
  - `SITE_URL: string`
  - `site` (see code), `socials: readonly Social[]`, `navLinks: readonly { label: string; href: string }[]`
  - `type Project`, `projects: Project[]`, `getAllProjects(): Project[]`, `getFeaturedProjects(): Project[]`, `getOtherProjects(): Project[]`, `getProjectBySlug(slug: string): Project | undefined`, `getNextProject(slug: string): Project`
  - `experiences: Experience[]`, `skillGroups: SkillGroup[]`, `testimonials: Testimonial[]`, `processSteps: ProcessStep[]`

- [ ] **Step 1: Write failing tests `src/content/site.test.ts`**

```ts
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
```

- [ ] **Step 2: Write failing tests `src/content/projects.test.ts`**

```ts
import { describe, expect, it } from "vitest";
import {
  getAllProjects,
  getFeaturedProjects,
  getNextProject,
  getOtherProjects,
  getProjectBySlug,
} from "./projects";

describe("projects", () => {
  it("has 8 projects with unique url-safe slugs", () => {
    const slugs = getAllProjects().map((p) => p.slug);
    expect(slugs).toHaveLength(8);
    expect(new Set(slugs).size).toBe(8);
    for (const s of slugs) expect(s).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it("features exactly Hedgeon, PayZeph, FlowAnalytics and ReginaNostra, in order", () => {
    expect(getFeaturedProjects().map((p) => p.slug)).toEqual([
      "hedgeon",
      "payzeph",
      "flowanalytics",
      "reginanostra",
    ]);
  });

  it("splits featured and other projects without overlap", () => {
    const other = getOtherProjects().map((p) => p.slug);
    expect(other).toEqual(["mintverse", "1010-realty", "medibook", "savvio"]);
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
```

- [ ] **Step 3: Write failing tests `src/content/assets.test.ts`** (Review Focus 1: exact-case paths)

```ts
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
```

- [ ] **Step 4: Run tests to confirm they fail**

Run: `npm test`
Expected: FAIL, with "Failed to resolve import ./site" (and ./projects).

- [ ] **Step 5: Create `src/content/site.ts`**

```ts
export function resolveSiteUrl(env: {
  NEXT_PUBLIC_SITE_URL?: string;
  VERCEL_PROJECT_PRODUCTION_URL?: string;
}): string {
  const explicit = env.NEXT_PUBLIC_SITE_URL?.trim();
  const vercel = env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  const raw = explicit || (vercel ? `https://${vercel}` : "http://localhost:3000");
  const url = new URL(raw);
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error(`Site URL must use http or https, got "${raw}"`);
  }
  return url.origin;
}

export const SITE_URL = resolveSiteUrl({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL,
});

export const site = {
  name: "Ifeanyi Onyekwelu",
  shortName: "Ifeanyi O.",
  role: "Full-Stack Engineer & Founder of Zephra",
  jobTitle: "Full-Stack Engineer",
  description:
    "Full-stack engineer with 5+ years building production web platforms, scalable backend systems and AI-integrated products for fintech, SaaS and education teams. Founder of Zephra Studio.",
  keywords: [
    "Ifeanyi Onyekwelu",
    "full-stack engineer",
    "full-stack developer Nigeria",
    "hire Next.js developer",
    "AI integration engineer",
    "LangChain developer",
    "fintech developer",
    "SaaS developer",
    "Zephra Studio",
  ],
  location: { city: "Enugu", country: "Nigeria", timezone: "UTC+1" },
  email: "ifeanyi@xife3.space",
  phone: { display: "+234 816 619 0067", href: "tel:+2348166190067" },
  whatsapp: "https://wa.link/rlr1e3",
  resume: "/IFEANYI%20ONYEKWELU.pdf",
  twitterHandle: "@_xIfe3",
  portraits: {
    hero: {
      src: "/profile.jpg",
      alt: "Portrait of Ifeanyi Onyekwelu, full-stack engineer",
      width: 1024,
      height: 1024,
    },
    story: [
      {
        src: "/ifeanyi.jpeg",
        alt: "Ifeanyi Onyekwelu smiling, photographed in warm light",
        width: 896,
        height: 970,
      },
      {
        src: "/profile.jpg",
        alt: "Ifeanyi Onyekwelu, founder of Zephra Studio",
        width: 1024,
        height: 1024,
      },
    ],
  },
  stats: [
    { value: "5+", label: "Years engineering" },
    { value: "25+", label: "Shipped projects" },
    { value: "10+", label: "Production clients" },
    { value: "99.9%", label: "Uptime delivered" },
  ],
  clients: ["Babelos", "Kedusoft", "World Brain Tech", "ReginaNostra", "Proxima", "Zephra Studio", "Ricald AI"],
  industries: ["Fintech", "SaaS platforms", "AI products", "Payments", "Education", "Real estate"],
  zephra: {
    name: "Zephra Studio",
    url: "https://zephra.dev",
    description:
      "Senior-led engineering studio for early-stage startups, growth teams and founders who need a reliable development partner.",
  },
} as const;

export type Social = { label: "GitHub" | "LinkedIn" | "X"; href: string };

export const socials: readonly Social[] = [
  { label: "GitHub", href: "https://github.com/xIfe3" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ifeanyichukwu-onyekwelu" },
  { label: "X", href: "https://x.com/_xIfe3" },
];

export const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Story", href: "/#story" },
  { label: "Zephra", href: "/#zephra" },
  { label: "Contact", href: "/#contact" },
] as const;
```

- [ ] **Step 6: Create `src/content/projects.ts`** (data copied from the old `src/components/Projects.tsx`; `impact` is existing data, not invented)

```ts
export type ProjectTone = "saffron" | "vermilion" | "forest" | "paper";

export type Project = {
  slug: string;
  title: string;
  client: string;
  year: string;
  category: string;
  summary: string;
  impact?: string;
  technologies: string[];
  image: string;
  imageAlt: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  tone: ProjectTone;
  role?: string;
  challenge?: string;
  built?: string[];
  results?: string[];
  gallery?: { src: string; alt: string }[];
};

export const projects: Project[] = [
  {
    slug: "hedgeon",
    title: "Hedgeon Investment Analytics",
    client: "Hedgeon Finance",
    year: "2025",
    category: "Fintech · Dashboard",
    summary:
      "Full-stack investment dashboard delivering real-time portfolio analytics to professional traders. Aggregation pipelines feed chart renderers sub-second on 10M+ rows.",
    impact: "60% latency reduction on core analytics queries",
    technologies: ["Next.js", "Node.js", "MongoDB", "Chart.js"],
    image: "/projects/hedgeon-finance.png",
    imageAlt: "Hedgeon investment analytics dashboard showing portfolio charts",
    githubUrl: "https://github.com/xIfe3/hedgeon-finance",
    liveUrl: "https://hedgeon-finance-ifekels-projects.vercel.app/",
    featured: true,
    tone: "saffron",
  },
  {
    slug: "payzeph",
    title: "PayZeph",
    client: "Zephra Studio",
    year: "2026",
    category: "Fintech · Platform",
    summary:
      "A full-stack monorepo bill payment app with shared UI components, automated testing with Jest & Playwright, and Docker-based deployment.",
    impact: "Shipped in 14 days",
    technologies: ["Next.js", "NestJS", "TypeScript", "Turborepo", "Docker"],
    image: "/projects/payzeph.png",
    imageAlt: "PayZeph bill payment app home screen",
    githubUrl: "https://github.com/zephradev/payzeph",
    liveUrl: "https://payzeph-zephra.vercel.app/",
    featured: true,
    tone: "vermilion",
  },
  {
    slug: "flowanalytics",
    title: "FlowAnalytics",
    client: "Zephra Studio",
    year: "2026",
    category: "SaaS · Analytics",
    summary:
      "A production-ready SaaS dashboard with tiered subscriptions, revenue analytics, CSV exports, Stripe billing, and Google OAuth.",
    impact: "Ready for production in 2 weeks",
    technologies: ["Next.js 16", "Prisma", "Stripe", "Recharts", "NextAuth"],
    image: "/projects/flowanalytics.png",
    imageAlt: "FlowAnalytics revenue dashboard with subscription charts",
    githubUrl: "https://github.com/zephradev/flowanalytics",
    liveUrl: "https://flowanalytics-zephra.vercel.app/",
    featured: true,
    tone: "forest",
  },
  {
    slug: "reginanostra",
    title: "ReginaNostra Schools",
    client: "ReginaNostra",
    year: "2025",
    category: "SaaS · Education",
    summary:
      "End-to-end school management platform in production use by staff and students — replaced a paper-based workflow with attendance, reporting, and role-based access.",
    impact: "Adopted across the entire institution",
    technologies: ["Next.js", "Node.js", "Tailwind"],
    image: "/projects/reginanostra.png",
    imageAlt: "ReginaNostra Schools website homepage",
    githubUrl: "https://github.com/xIfe3/regina-nostras-schools",
    liveUrl: "https://www.reginanostraschools.com/",
    featured: true,
    tone: "paper",
  },
  {
    slug: "mintverse",
    title: "MintVerse NFT Marketplace",
    client: "MintVerse",
    year: "2024",
    category: "Frontend · Light Web3",
    summary:
      "Frontend and supporting backend for an NFT marketplace — wallet UX, listings, and minting flows. My scope was the product surface and API integration; on-chain contracts were owned by the blockchain team.",
    impact: "Launched with zero sev-1 incidents",
    technologies: ["Next.js", "Python", "Flask", "IPFS", "MySQL"],
    image: "/projects/mintverse.png",
    imageAlt: "MintVerse NFT marketplace listings page",
    githubUrl: "https://github.com/xIfe3/mintverse",
    liveUrl: "https://mintverse.art/",
    featured: false,
    tone: "saffron",
  },
  {
    slug: "1010-realty",
    title: "1010 Realty Group",
    client: "1010 Realty",
    year: "2024",
    category: "Real Estate · Platform",
    summary:
      "Production real estate platform with live property listings, advanced search, and a fully typed Prisma + PostgreSQL data layer with SSR for solid SEO.",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    image: "/projects/1010.png",
    imageAlt: "1010 Realty Group property listings",
    githubUrl: "https://github.com/xIfe3/10-10-realty-group",
    liveUrl: "https://1010-realty-group.vercel.app/",
    featured: false,
    tone: "forest",
  },
  {
    slug: "medibook",
    title: "MediBook",
    client: "Zephra Studio",
    year: "2026",
    category: "SaaS · Health",
    summary:
      "A doctor appointment platform with specialty search, real-time slot availability, JWT auth, and separate dashboards for patients and doctors.",
    impact: "2× faster than industry average",
    technologies: ["Next.js 14", "NestJS", "Prisma", "PostgreSQL", "Tailwind"],
    image: "/projects/medibook.png",
    imageAlt: "MediBook doctor search and appointment booking screen",
    githubUrl: "https://github.com/zephradev/medibook",
    liveUrl: "https://medibook-zephra.vercel.app/",
    featured: false,
    tone: "vermilion",
  },
  {
    slug: "savvio",
    title: "Savvio",
    client: "Personal project",
    year: "2026",
    category: "SaaS · Finance",
    summary:
      "A budget management app with expense tracking, income monitoring, savings goals, recurring payments, budget alerts, and interactive analytics charts.",
    impact: "Built without scope creep",
    technologies: ["Next.js 15", "NestJS", "Prisma", "PostgreSQL", "Recharts", "JWT"],
    image: "/projects/savvio.png",
    imageAlt: "Savvio budgeting dashboard with spending charts",
    githubUrl: "https://github.com/xIfe3/savvio",
    liveUrl: "https://savvio-budgetting.vercel.app/",
    featured: false,
    tone: "paper",
  },
];

export const getAllProjects = () => projects;
export const getFeaturedProjects = () => projects.filter((p) => p.featured);
export const getOtherProjects = () => projects.filter((p) => !p.featured);
export const getProjectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
export function getNextProject(slug: string): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
```

- [ ] **Step 7: Create `src/content/experience.ts`** (verbatim from the old `src/components/Experience.tsx`)

```ts
export type Experience = {
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  technologies: string[];
};

export const experiences: Experience[] = [
  {
    role: "Founder · Engineering Lead",
    company: "Zephra Studio",
    location: "Remote",
    period: "Mar 2026 — Present",
    description:
      "Leading Zephra Studio as a senior-led engineering practice for early-stage startups and growth teams. Building AI-enabled SaaS products, productizing LangChain workflows, and shipping platform-grade software with a focus on reliability and speed.",
    achievements: [
      "Established Zephra Studio as a production engineering partner for AI and SaaS teams",
      "Delivered end-to-end web platforms and agency-grade delivery capabilities while maintaining a lean founder-led team",
    ],
    technologies: ["Next.js", "TypeScript", "Node.js", "LangChain", "Prisma", "PostgreSQL", "Docker"],
  },
  {
    role: "Software Engineer · Full-Stack",
    company: "Babelos",
    location: "Remote",
    period: "Sep 2025 — Present",
    description:
      "Building a production SaaS on Next.js + NestJS with Dockerised microservices. Designing PostgreSQL schemas, Redis caching, REST/GraphQL surfaces, and integrating LLM-powered features into the product.",
    achievements: [
      "Wired LangChain-based assistant into the product UX",
      "Owned GraphQL schema design for a multi-tenant surface",
    ],
    technologies: ["Next.js", "NestJS", "TypeScript", "PostgreSQL", "Redis", "LangChain", "Docker"],
  },
  {
    role: "Software Engineer · Full-Stack",
    company: "Kedusoft",
    location: "Remote",
    period: "Sep 2024 — Jul 2025",
    description:
      "Built SaaS and fintech platforms with Stripe and Paystack payment integrations. Optimised PostgreSQL queries, added Redis caching, and deployed via Docker + GitHub Actions CI/CD.",
    achievements: [
      "Rebuilt payment layer eliminating silent failures",
      "Cut API response times via targeted query and cache optimisation",
    ],
    technologies: ["React", "TypeScript", "PostgreSQL", "Redis", "Docker", "Stripe", "Paystack"],
  },
  {
    role: "Software Engineer · Full-Stack",
    company: "World Brain Technology",
    location: "Enugu, NG",
    period: "Feb 2024 — Aug 2024",
    description:
      "Built a SaaS platform for SMEs using React, Node.js, GraphQL, and PostgreSQL. Designed dashboards for data visualisation and deployed to AWS + GCP.",
    achievements: [
      "Proposed services split cutting API latency by ~45%",
      "Stood up observability stack for early incident detection",
    ],
    technologies: ["React", "Node.js", "GraphQL", "PostgreSQL", "AWS", "GCP", "Docker"],
  },
  {
    role: "Junior Developer Intern",
    company: "CV2 Career Internship",
    location: "Remote",
    period: "Aug 2023 — Jan 2024",
    description:
      "Contributed to a SaaS platform built with Python and Firebase. Shipped features, fixed bugs, and participated in code reviews — hands-on exposure to agile workflows and CI/CD.",
    achievements: [],
    technologies: ["Python", "Firebase", "Agile", "CI/CD"],
  },
  {
    role: "Lecturer · Software Development",
    company: "Aptech Computer Education",
    location: "Enugu, NG",
    period: "Sep 2022 — Dec 2023",
    description:
      "Taught full-stack web development — JavaScript, React, Node.js, and databases. Mentored students through hands-on projects and designed structured curriculum materials.",
    achievements: [
      "Designed curriculum graduates still reference on the job",
      "Mentored dozens of students into junior dev roles",
    ],
    technologies: ["JavaScript", "React", "Node.js", "MongoDB", "MySQL"],
  },
  {
    role: "Freelance Contract Developer",
    company: "BeeTec",
    location: "Remote",
    period: "Apr 2022 — Aug 2022",
    description:
      "Delivered client projects end-to-end — built and deployed responsive web applications, integrated third-party APIs, and optimised performance against tight deadlines while collaborating with remote teams.",
    achievements: [
      "Shipped multiple production sites inside a 4-month sprint",
      "Built recurring client relationships from one-off gigs",
    ],
    technologies: ["React", "Next.js", "Node.js", "TailwindCSS"],
  },
];
```

- [ ] **Step 8: Create `src/content/skills.ts`** (from the old Skills. The meters are dropped. Wrong icons are fixed: Redis now uses `redis.svg`, and AI tools have no icon)

```ts
export type SkillGroup = {
  title: string;
  blurb: string;
  skills: { name: string; icon?: string }[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    blurb: "Typed React apps, design systems, and interfaces that stay performant under real-world data loads.",
    skills: [
      { name: "TypeScript", icon: "/icons/typeScript.svg" },
      { name: "React / Next.js", icon: "/icons/react.svg" },
      { name: "Tailwind CSS", icon: "/icons/tailwind.svg" },
      { name: "JavaScript", icon: "/icons/JavaScript.svg" },
      { name: "HTML / CSS", icon: "/icons/html5.svg" },
    ],
  },
  {
    title: "Backend & APIs",
    blurb: "REST and GraphQL services, event-driven pipelines, queue workers, and payment integrations at scale.",
    skills: [
      { name: "Node.js / NestJS", icon: "/icons/nodejs.svg" },
      { name: "PostgreSQL", icon: "/icons/postgres.svg" },
      { name: "Python / FastAPI", icon: "/icons/fastapi.svg" },
      { name: "Go", icon: "/icons/go.svg" },
      { name: "Redis", icon: "/icons/redis.svg" },
    ],
  },
  {
    title: "AI & DevOps",
    blurb: "LLM-powered features, LangChain workflows, RAG pipelines, plus the containers and CI/CD that keep them shipping.",
    skills: [
      { name: "LangChain" },
      { name: "OpenAI / Anthropic APIs" },
      { name: "RAG · Embeddings" },
      { name: "Docker · CI/CD", icon: "/icons/docker.svg" },
      { name: "AWS / GCP", icon: "/icons/aws.svg" },
    ],
  },
];
```

- [ ] **Step 9: Create `src/content/testimonials.ts`** (quotes verbatim from the old Testimonials)

```ts
export type Testimonial = { name: string; role: string; company: string; initials: string; quote: string };

export const testimonials: Testimonial[] = [
  {
    name: "Rev Fr Christopher",
    role: "Product Manager",
    company: "ReginaNostra Schools",
    initials: "RC",
    quote:
      "When our school launched in mid-2025, we urgently needed a proper school management website. I reached out to Ifeanyi, and he delivered a complete platform from scratch. He didn't just build it — he also trained our staff and stayed available even after launch to make sure everything worked smoothly. We were very satisfied with the result.",
  },
  {
    name: "Nnamdi",
    role: "Co-Founder & CEO",
    company: "Kedusoft",
    initials: "Nn",
    quote:
      "Ifeanyi joined us mid-sprint and hit the ground running — no hand-holding needed. He rebuilt our payment integration with Stripe and Paystack in under two weeks, fixing edge cases that had been causing silent failures for months. If you need someone who understands fintech complexity and still ships fast, he's your guy.",
  },
  {
    name: "Godson Pius",
    role: "Co-Founder & CEO",
    company: "World Brain Technology",
    initials: "GP",
    quote:
      "What stood out about Ifeanyi wasn't just the code quality — it was the thinking behind it. He proposed the microservices split that cut our API response times by nearly half, and he documented everything properly. Rare combination of speed and precision.",
  },
  {
    name: "Samuel",
    role: "Blockchain Developer",
    company: "MintVerse",
    initials: "S",
    quote:
      "Ifeanyi owned the frontend and the API surface that talked to our contracts — including the messy IPFS pieces most devs avoid. He got it working and kept it stable under load. The marketplace launched with zero critical incidents.",
  },
];
```

- [ ] **Step 10: Create `src/content/process.ts`**

```ts
export type ProcessStep = { number: string; title: string; body: string };

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    body: "We start with a call about the problem, the people it's for and what success looks like. You get a written scope and estimate.",
  },
  {
    number: "02",
    title: "Design",
    body: "I map the architecture and the key screens before writing code, so surprises happen on paper, not in production.",
  },
  {
    number: "03",
    title: "Build",
    body: "Weekly demos on a live preview link. You see real progress, not status reports.",
  },
  {
    number: "04",
    title: "Launch & support",
    body: "Deployment, monitoring, handover docs and team training — and I stay reachable after launch.",
  },
];
```

- [ ] **Step 11: Run the tests**

Run: `npm test`
Expected: all pass (site 7, projects 5, assets 22).

- [ ] **Step 12: Commit**

```bash
git add src/content
git commit -m "feat: typed content layer with exact-case asset checks

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 4: SEO foundation (JSON-LD, metadata, sitemap, robots)

**Files:**
- Create: `src/lib/seo.ts`, `src/components/ui/JsonLd.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`
- Modify: `src/app/layout.tsx`
- Test: `src/lib/seo.test.ts`, `src/app/sitemap.test.ts`

**Interfaces:**
- Consumes: `SITE_URL`, `site`, `socials`, `Project`, `getAllProjects` (Task 3).
- Produces: `absoluteUrl(path?: string): string`, `personJsonLd(): Record<string, unknown>`, `organizationJsonLd(): Record<string, unknown>`, `projectJsonLd(p: Project): Record<string, unknown>`, `serializeJsonLd(data: unknown): string`, `<JsonLd data={...} />`, `rootMetadata: Metadata`.

- [ ] **Step 1: Write failing tests `src/lib/seo.test.ts`**

```ts
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
```

- [ ] **Step 2: Write failing tests `src/app/sitemap.test.ts`**

```ts
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
```

- [ ] **Step 3: Run the tests to confirm they fail**

Run: `npm test`
Expected: FAIL, "Failed to resolve import ./seo" / "./sitemap".

- [ ] **Step 4: Create `src/lib/seo.ts`**

```ts
import type { Metadata } from "next";
import type { Project } from "@/content/projects";
import { SITE_URL, site, socials } from "@/content/site";

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.zephra.name,
    url: site.zephra.url,
    description: site.zephra.description,
    founder: { "@type": "Person", name: site.name },
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: absoluteUrl("/"),
    image: absoluteUrl(site.portraits.hero.src),
    jobTitle: site.jobTitle,
    description: site.description,
    email: `mailto:${site.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.city,
      addressCountry: site.location.country,
    },
    sameAs: socials.map((s) => s.href),
    worksFor: { "@type": "Organization", name: site.zephra.name, url: site.zephra.url },
  };
}

export function projectJsonLd(p: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.title,
    url: absoluteUrl(`/work/${p.slug}`),
    image: absoluteUrl(p.image),
    description: p.summary,
    dateCreated: p.year,
    genre: p.category,
    keywords: p.technologies.join(", "),
    creator: { "@type": "Person", name: site.name, url: absoluteUrl("/") },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.name} — Full-Stack Engineer · Founder of Zephra`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [...site.keywords],
  authors: [{ name: site.name, url: SITE_URL }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: `${site.name} — Full-Stack Engineer · Founder of Zephra`,
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    creator: site.twitterHandle,
    title: `${site.name} — Full-Stack Engineer · Founder of Zephra`,
    description: site.description,
  },
  icons: { icon: "/favicon.png" },
};
```

- [ ] **Step 5: Create `src/components/ui/JsonLd.tsx`**

```tsx
import { serializeJsonLd } from "@/lib/seo";

export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />;
}
```

- [ ] **Step 6: Create `src/app/sitemap.ts`**

```ts
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
```

- [ ] **Step 7: Create `src/app/robots.ts`**

```ts
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
```

- [ ] **Step 8: Wire metadata and JSON-LD into `src/app/layout.tsx`**

Replace the `export const metadata = {...}` block with:

```tsx
export const metadata = rootMetadata;
```

Add these imports:

```tsx
import { JsonLd } from "@/components/ui/JsonLd";
import { organizationJsonLd, personJsonLd, rootMetadata } from "@/lib/seo";
```

Inside `<head>`, after the `<noscript>` block, add:

```tsx
<JsonLd data={personJsonLd()} />
<JsonLd data={organizationJsonLd()} />
```

- [ ] **Step 9: Run tests and build**

Run: `npm test && npm run build`
Expected: all tests pass. The build output lists `/sitemap.xml` and `/robots.txt`.

- [ ] **Step 10: Commit**

```bash
git add src/lib/seo.ts src/lib/seo.test.ts src/components/ui/JsonLd.tsx src/app/sitemap.ts src/app/robots.ts src/app/sitemap.test.ts src/app/layout.tsx
git commit -m "feat(seo): metadata, JSON-LD, sitemap and robots

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 5: Motion primitives

**Files:**
- Replace: `src/components/motion/SmoothScroll.tsx`
- Create: `src/components/motion/Reveal.tsx`, `RevealImage.tsx`, `WordRise.tsx`, `Marquee.tsx`, `Sticker.tsx`
- Test: `src/components/motion/WordRise.test.tsx`, `src/components/motion/SmoothScroll.test.tsx`

**Interfaces:**
- Produces:
  - `<Reveal delay?: number className?: string>{children}</Reveal>`
  - `<RevealImage src alt width height priority? sizes? className? imgClassName? />`
  - `type Segment = { text: string; className?: string }`; `<WordRise as?: "h1"|"h2"|"h3" segments: Segment[] className? id? animateOnMount?: boolean />`
  - `<Marquee items: readonly string[] className? separatorClassName? duration?: number />`
  - `<Sticker text: string className? />`
  - `<SmoothScroll />`
- All animated nodes carry the `data-reveal` attribute (for the Task 2 noscript rule).

- [ ] **Step 1: Write failing tests `src/components/motion/WordRise.test.tsx`**

```tsx
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
```

- [ ] **Step 2: Write failing tests `src/components/motion/SmoothScroll.test.tsx`** (Review Focus 4)

```tsx
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
```

- [ ] **Step 3: Run the tests to confirm they fail**

Run: `npm test -- src/components/motion`
Expected: FAIL. WordRise can't resolve `./WordRise`, and the SmoothScroll stub never constructs Lenis.

- [ ] **Step 4: Replace `src/components/motion/SmoothScroll.tsx`**

```tsx
"use client";

import { useReducedMotion } from "framer-motion";
import Lenis from "lenis";
import { useEffect } from "react";

export function SmoothScroll() {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.1, anchors: { offset: -80 } });
    return () => lenis.destroy();
  }, [reduce]);

  return null;
}
```

- [ ] **Step 5: Create `src/components/motion/WordRise.tsx`**

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";

export type Segment = { text: string; className?: string };

type Props = {
  as?: "h1" | "h2" | "h3";
  segments: Segment[];
  className?: string;
  id?: string;
  animateOnMount?: boolean;
};

const EASE = [0.22, 1, 0.36, 1] as const;

export function WordRise({ as: Tag = "h2", segments, className, id, animateOnMount = false }: Props) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <Tag id={id} className={className}>
        {segments.map((seg, i) => (
          <span key={i}>
            <span className={seg.className}>{seg.text}</span>
            {i < segments.length - 1 ? " " : null}
          </span>
        ))}
      </Tag>
    );
  }

  const words = segments.map((seg) => seg.text.split(" "));
  const offsets = words.map((_, i) => words.slice(0, i).reduce((n, w) => n + w.length, 0));
  const trigger = animateOnMount
    ? { animate: { y: 0, opacity: 1 } }
    : { whileInView: { y: 0, opacity: 1 }, viewport: { once: true, margin: "-60px" } };

  return (
    <Tag id={id} className={className}>
      {segments.map((seg, si) => (
        <span key={si}>
          <span className={seg.className}>
            {words[si].map((word, wi) => (
              <span key={wi}>
                <span className="inline-block overflow-hidden pb-[0.1em] align-bottom">
                  <motion.span
                    data-reveal
                    className="inline-block"
                    initial={{ y: "105%", opacity: 0 }}
                    {...trigger}
                    transition={{ duration: 0.9, delay: (offsets[si] + wi) * 0.08, ease: EASE }}
                  >
                    {word}
                  </motion.span>
                </span>
                {wi < words[si].length - 1 ? " " : null}
              </span>
            ))}
          </span>
          {si < segments.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
```

- [ ] **Step 6: Create `src/components/motion/Reveal.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 7: Create `src/components/motion/RevealImage.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  sizes?: string;
  className?: string;
  imgClassName?: string;
};

export function RevealImage({ src, alt, width, height, priority, sizes, className, imgClassName }: Props) {
  return (
    <motion.div
      data-reveal
      className={cn("overflow-hidden", className)}
      initial={{ clipPath: "inset(14% 0% 0% 0%)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        data-reveal
        initial={{ scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="size-full"
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes={sizes ?? "(min-width: 1024px) 40vw, 100vw"}
          className={cn("size-full object-cover", imgClassName)}
        />
      </motion.div>
    </motion.div>
  );
}
```

- [ ] **Step 8: Create `src/components/motion/Marquee.tsx`** (server-compatible; CSS animation, paused on hover, duplicate row hidden from screen readers)

```tsx
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

type Props = {
  items: readonly string[];
  className?: string;
  separatorClassName?: string;
  duration?: number;
};

export function Marquee({ items, className, separatorClassName, duration = 30 }: Props) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-10 pr-10">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-10 whitespace-nowrap">
          <span>{item}</span>
          <span aria-hidden className={separatorClassName}>
            ✺
          </span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className={cn("group flex overflow-hidden", className)}>
      <div
        className="flex w-max animate-marquee group-hover:[animation-play-state:paused]"
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
```

- [ ] **Step 9: Create `src/components/motion/Sticker.tsx`** (decorative, server-compatible)

```tsx
import { useId } from "react";
import { cn } from "@/lib/utils";

export function Sticker({ text, className }: { text: string; className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <div aria-hidden className={cn("relative grid size-24 place-items-center rounded-full", className)}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full animate-spin-slow">
        <defs>
          <path id={`sticker-${id}`} d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
        </defs>
        <text className="fill-current text-[10px] font-semibold uppercase tracking-[0.22em]">
          <textPath href={`#sticker-${id}`}>{text}</textPath>
        </text>
      </svg>
      <span className="text-2xl leading-none">✺</span>
    </div>
  );
}
```

- [ ] **Step 10: Run the tests**

Run: `npm test`
Expected: all pass.

- [ ] **Step 11: Commit**

```bash
git add src/components/motion
git commit -m "feat(motion): word rise, reveals, marquee, sticker, Lenis smooth scroll

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 6: UI primitives, Header, Footer

**Files:**
- Create: `src/components/ui/Button.tsx`, `Chip.tsx`, `SectionHeading.tsx`, `src/components/sections/Header.tsx`, `src/components/sections/Footer.tsx`, `src/components/ui/SocialIcon.tsx`
- Test: `src/components/sections/Header.test.tsx`

**Interfaces:**
- Consumes: `navLinks`, `site`, `socials` (Task 3); `WordRise`, `Segment` (Task 5).
- Produces:
  - `<Button href variant?: "primary"|"outline"|"light"|"ghost-light" external? className?>`
  - `<Chip tone?: "paper"|"forest">`
  - `<SectionHeading eyebrow: string title: Segment[] intro?: string id?: string tone?: "paper"|"forest" className? />`
  - `<SocialIcon label />`
  - `<Header />`, `<Footer />`

- [ ] **Step 1: Write failing tests `src/components/sections/Header.test.tsx`** (Review Focus 3)

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Header } from "./Header";

describe("Header mobile menu", () => {
  it("opens as a dialog and moves focus inside", async () => {
    const user = userEvent.setup();
    render(<Header />);
    const toggle = screen.getByRole("button", { name: /open menu/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    await user.click(toggle);
    const dialog = screen.getByRole("dialog", { name: /menu/i });
    expect(dialog).toBeInTheDocument();
    expect(dialog.contains(document.activeElement)).toBe(true);
  });

  it("closes on Escape and returns focus to the toggle", async () => {
    const user = userEvent.setup();
    render(<Header />);
    const toggle = screen.getByRole("button", { name: /open menu/i });
    await user.click(toggle);
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(toggle).toHaveFocus();
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("traps Tab inside the open menu", async () => {
    const user = userEvent.setup();
    render(<Header />);
    await user.click(screen.getByRole("button", { name: /open menu/i }));
    const dialog = screen.getByRole("dialog");
    for (let i = 0; i < 12; i++) {
      await user.tab();
      expect(dialog.contains(document.activeElement)).toBe(true);
    }
  });

  it("closes when a menu link is chosen", async () => {
    const user = userEvent.setup();
    render(<Header />);
    await user.click(screen.getByRole("button", { name: /open menu/i }));
    const dialog = screen.getByRole("dialog");
    await user.click(dialog.querySelector('a[href="/#work"]')!);
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});
```

- [ ] **Step 2: Run the tests to confirm they fail**

Run: `npm test -- Header`
Expected: FAIL, "Failed to resolve import ./Header".

- [ ] **Step 3: Create `src/components/ui/Button.tsx`**

```tsx
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "light" | "ghost-light";

const variants: Record<Variant, string> = {
  primary: "bg-vermilion text-white hover:bg-vermilion-ink",
  outline: "border border-ink text-ink hover:bg-ink hover:text-paper",
  light: "bg-paper text-forest hover:bg-saffron hover:text-ink",
  "ghost-light": "border border-paper/40 text-paper hover:bg-paper hover:text-forest",
};

export function Button({
  href,
  variant = "primary",
  external = false,
  className,
  children,
}: {
  href: string;
  variant?: Variant;
  external?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const cls = cn(
    "inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[0.95rem] font-semibold",
    "transition-[transform,background-color,color] duration-500 ease-spring",
    "hover:-translate-y-[3px] hover:-rotate-[1.5deg]",
    variants[variant],
    className,
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
```

- [ ] **Step 4: Create `src/components/ui/Chip.tsx`**

```tsx
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Chip({ children, tone = "paper" }: { children: ReactNode; tone?: "paper" | "forest" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
        tone === "paper" ? "border-line text-ink-soft" : "border-paper/30 text-paper/90",
      )}
    >
      {children}
    </span>
  );
}
```

- [ ] **Step 5: Create `src/components/ui/SectionHeading.tsx`**

```tsx
import { WordRise, type Segment } from "@/components/motion/WordRise";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
  tone = "paper",
  className,
}: {
  eyebrow: string;
  title: Segment[];
  intro?: string;
  id?: string;
  tone?: "paper" | "forest";
  className?: string;
}) {
  const onForest = tone === "forest";
  return (
    <div className={cn("grid gap-6 md:grid-cols-[1.3fr_1fr] md:items-end md:gap-16", className)}>
      <div>
        <p
          className={cn(
            "mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]",
            onForest ? "text-saffron" : "text-vermilion-ink",
          )}
        >
          <span aria-hidden>✺</span>
          {eyebrow}
        </p>
        <WordRise
          id={id}
          segments={title}
          className={cn(
            "font-display text-[clamp(2.1rem,5vw,4rem)] leading-[1.02] font-[350] tracking-[-0.02em]",
            onForest ? "text-paper" : "text-ink",
          )}
        />
      </div>
      {intro ? (
        <p className={cn("max-w-[42ch] text-lg leading-[1.7]", onForest ? "text-paper/80" : "text-ink-soft")}>
          {intro}
        </p>
      ) : null}
    </div>
  );
}
```

- [ ] **Step 6: Create `src/components/ui/SocialIcon.tsx`**

```tsx
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import type { Social } from "@/content/site";

export function SocialIcon({ label }: { label: Social["label"] }) {
  if (label === "GitHub") return <FaGithub aria-hidden />;
  if (label === "LinkedIn") return <FaLinkedin aria-hidden />;
  return <FaXTwitter aria-hidden />;
}
```

- [ ] **Step 7: Create `src/components/sections/Header.tsx`**

```tsx
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { navLinks, site } from "@/content/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) {
      if (wasOpen.current) toggleRef.current?.focus();
      wasOpen.current = false;
      return;
    }
    wasOpen.current = true;
    const focusables = () =>
      Array.from(menuRef.current?.querySelectorAll<HTMLElement>("a[href], button") ?? []);
    focusables()[0]?.focus();
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,padding,box-shadow] duration-500 ease-soft",
        scrolled ? "bg-paper/90 py-3 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md" : "py-6",
      )}
    >
      <div className="container-page flex items-center justify-between">
        <Link href="/" className="font-display text-xl font-semibold tracking-tight">
          {site.shortName}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="rounded-full bg-vermilion px-4 py-2 text-sm font-semibold text-white transition-transform duration-500 ease-spring hover:-translate-y-0.5 hover:-rotate-2"
          >
            Let&apos;s talk
          </Link>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="rounded-full border border-ink px-4 py-2 text-sm font-semibold md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          Menu
        </button>
      </div>

      {open ? (
        <div
          ref={menuRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 flex flex-col bg-forest px-6 pt-6 pb-10 text-paper md:hidden"
        >
          <div className="flex items-center justify-between">
            <span className="font-display text-xl font-semibold">{site.shortName}</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full border border-paper/40 px-4 py-2 text-sm font-semibold"
            >
              Close
            </button>
          </div>
          <nav aria-label="Mobile" className="mt-16 flex flex-col gap-4">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-5xl font-[350] tracking-tight"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/#contact"
            onClick={() => setOpen(false)}
            className="mt-auto rounded-full bg-saffron px-6 py-4 text-center font-semibold text-ink"
          >
            Start a project →
          </Link>
        </div>
      ) : null}
    </header>
  );
}
```

- [ ] **Step 8: Create `src/components/sections/Footer.tsx`**

```tsx
import Link from "next/link";
import { navLinks, site, socials } from "@/content/site";
import { SocialIcon } from "@/components/ui/SocialIcon";

export function Footer() {
  return (
    <footer className="grain bg-ink text-paper">
      <div className="container-page py-20 md:py-28">
        <p className="font-display text-[clamp(2.4rem,6vw,5.5rem)] leading-[1] font-[350] tracking-[-0.02em]">
          Let&apos;s build something <em className="font-light text-saffron">worth using.</em>
        </p>
        <Link
          href="/#contact"
          className="mt-10 inline-flex rounded-full bg-vermilion px-6 py-3.5 font-semibold text-white transition-transform duration-500 ease-spring hover:-translate-y-1 hover:-rotate-2"
        >
          Start a project →
        </Link>

        <div className="mt-20 grid gap-10 border-t border-paper/15 pt-10 md:grid-cols-3">
          <nav aria-label="Footer" className="flex flex-col gap-2">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className="text-paper/75 hover:text-paper">
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-2 text-paper/75">
            <a href={`mailto:${site.email}`} className="hover:text-paper">
              {site.email}
            </a>
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-paper">
              WhatsApp
            </a>
            <a href={site.zephra.url} target="_blank" rel="noopener noreferrer" className="hover:text-paper">
              Zephra Studio ↗
            </a>
          </div>
          <div className="flex gap-3 md:justify-end">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid size-11 place-items-center rounded-full border border-paper/25 transition-colors hover:bg-paper hover:text-ink"
              >
                <SocialIcon label={s.label} />
              </a>
            ))}
          </div>
        </div>
        <p className="mt-12 text-sm text-paper/60">
          © {new Date().getFullYear()} {site.name}. Made with care in {site.location.city}.
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 9: Run the tests**

Run: `npm test`
Expected: all pass, including 4 Header tests.

- [ ] **Step 10: Commit**

```bash
git add src/components/ui src/components/sections
git commit -m "feat: buttons, headings, accessible header menu and footer

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 7: Hero and industries band

**Files:**
- Create: `src/components/sections/Hero.tsx`, `src/components/sections/IndustriesBand.tsx`

**Interfaces:**
- Consumes: `site`, `socials`, `WordRise`, `Sticker`, `Marquee`, `Reveal`, `Button`, `SocialIcon`.
- Produces: `<Hero />`, `<IndustriesBand />`.

- [ ] **Step 1: Create `src/components/sections/Hero.tsx`**

```tsx
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Sticker } from "@/components/motion/Sticker";
import { WordRise } from "@/components/motion/WordRise";
import { Button } from "@/components/ui/Button";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { site, socials } from "@/content/site";

export function Hero() {
  const portrait = site.portraits.hero;
  return (
    <section id="home" aria-labelledby="hero-title" className="grain overflow-hidden bg-paper pt-32 pb-16 md:pt-40">
      <div className="container-page grid items-end gap-12 md:grid-cols-[1.35fr_1fr] md:gap-16">
        <div>
          <Reveal>
            <p className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-vermilion-ink">
              <span aria-hidden>✺</span> Full-stack engineer · Founder, Zephra
            </p>
          </Reveal>
          <WordRise
            as="h1"
            id="hero-title"
            animateOnMount
            className="font-display text-[clamp(2.9rem,7.4vw,6.5rem)] leading-[0.98] font-[350] tracking-[-0.025em]"
            segments={[
              { text: "I build software people" },
              {
                text: "quietly love",
                className: "rounded-lg bg-saffron px-2 italic font-light [box-decoration-break:clone]",
              },
              { text: "using." },
            ]}
          />
          <Reveal delay={0.5}>
            <p className="mt-8 max-w-[46ch] text-lg leading-[1.7] text-ink-soft">
              I&apos;m {site.name} — five years shipping fintech, SaaS and AI-integrated products, with a
              studio behind me when you need a whole team.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button href="/#contact">Start a project →</Button>
              <Button href={site.resume} variant="outline" external>
                Hiring? Résumé
              </Button>
              <div className="flex gap-2 sm:ml-2 sm:border-l sm:border-line sm:pl-5">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid size-11 place-items-center rounded-full border border-line text-ink-soft transition-colors hover:border-ink hover:text-ink"
                  >
                    <SocialIcon label={s.label} />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="animate-float">
            <div className="aspect-[4/5] overflow-hidden rounded-[18px_18px_90px_18px] bg-saffron">
              <Image
                src={portrait.src}
                alt={portrait.alt}
                width={portrait.width}
                height={portrait.height}
                priority
                sizes="(min-width: 768px) 28rem, 90vw"
                className="size-full object-cover"
              />
            </div>
          </div>
          <Sticker text="Open for projects ✺ 2026 ✺ " className="absolute -top-6 -left-6 bg-forest text-saffron" />
        </div>
      </div>

      <div className="container-page mt-16">
        <Reveal delay={0.2}>
          <dl className="grid grid-cols-2 overflow-hidden rounded-2xl border border-line md:grid-cols-4">
            {site.stats.map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-col-reverse gap-2 p-6 ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b md:border-b-0" : ""} border-line md:border-r md:last:border-r-0`}
              >
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-soft">{s.label}</dt>
                <dd className="font-display text-4xl font-[350] tracking-tight">{s.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center md:gap-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">Trusted by teams at</p>
            <ul className="flex flex-wrap gap-x-7 gap-y-2">
              {site.clients.map((c) => (
                <li key={c} className="font-display text-lg text-ink/80">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `src/components/sections/IndustriesBand.tsx`**

```tsx
import { Marquee } from "@/components/motion/Marquee";
import { site } from "@/content/site";

export function IndustriesBand() {
  return (
    <section aria-label="Industries I build for" className="bg-forest py-5 text-paper">
      <Marquee
        items={site.industries}
        className="font-display text-[clamp(1.4rem,3vw,2.2rem)] italic"
        separatorClassName="not-italic text-saffron"
        duration={28}
      />
    </section>
  );
}
```

- [ ] **Step 3: Temporarily preview.** Replace `src/app/page.tsx` with the following (the final composition comes in Task 11):

```tsx
import { Hero } from "@/components/sections/Hero";
import { IndustriesBand } from "@/components/sections/IndustriesBand";

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <IndustriesBand />
    </main>
  );
}
```

- [ ] **Step 4: Verify visually.** Run: `npm run dev` and open `http://localhost:3000` at 375px and 1440px widths. Expected:
  - The headline words rise in, and "quietly love" sits on a saffron highlight.
  - The sticker rotates and the portrait floats.
  - The marquee scrolls and pauses on hover.
  - With OS reduced motion on, nothing moves.

Then run `npm run build`. Expected: success.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/Hero.tsx src/components/sections/IndustriesBand.tsx src/app/page.tsx
git commit -m "feat: hero with word-rise headline, sticker, stats and industries marquee

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 8: Selected work

**Files:**
- Create: `src/components/work/ProjectCard.tsx`, `src/components/sections/Work.tsx`

**Interfaces:**
- Consumes: `Project`, `ProjectTone`, `getFeaturedProjects`, `getOtherProjects`, `SectionHeading`, `Reveal`.
- Produces: `<ProjectCard project size?: "large"|"small" />`, `toneClasses: Record<ProjectTone, string>`, `<Work />`.

- [ ] **Step 1: Create `src/components/work/ProjectCard.tsx`**

```tsx
import Image from "next/image";
import Link from "next/link";
import type { Project, ProjectTone } from "@/content/projects";
import { cn } from "@/lib/utils";

export const toneClasses: Record<ProjectTone, string> = {
  saffron: "bg-saffron text-ink",
  vermilion: "bg-vermilion text-white",
  forest: "bg-forest text-paper",
  paper: "bg-paper-2 text-ink",
};

export function ProjectCard({ project, size = "large" }: { project: Project; size?: "large" | "small" }) {
  const large = size === "large";
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block rounded-2xl focus-visible:outline-offset-4"
      aria-label={`${project.title} — read the case study`}
    >
      <div
        className={cn(
          "overflow-hidden rounded-2xl p-3 transition-transform duration-700 ease-spring group-hover:-translate-y-1.5 group-hover:-rotate-1 md:p-4",
          toneClasses[project.tone],
        )}
      >
        <div className={cn("relative overflow-hidden rounded-xl", large ? "aspect-[16/10]" : "aspect-[4/3]")}>
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            sizes={large ? "(min-width: 768px) 45vw, 100vw" : "(min-width: 768px) 22vw, 50vw"}
            className="object-cover object-top transition-transform duration-700 ease-soft group-hover:scale-[1.04]"
          />
        </div>
        <div className="flex items-end justify-between gap-4 px-1 pt-4 pb-1">
          <div>
            {/* No opacity on small text: white/80 on vermilion drops below 4.5:1. */}
            <p className="text-xs font-semibold uppercase tracking-[0.14em]">
              {project.category} · {project.year}
            </p>
            <h3 className={cn("mt-1 font-display font-[400] tracking-tight", large ? "text-3xl" : "text-xl")}>
              {project.title}
            </h3>
            {large && project.impact ? <p className="mt-2 text-sm">{project.impact}</p> : null}
          </div>
          <span
            aria-hidden
            className="grid size-10 shrink-0 place-items-center rounded-full border border-current transition-transform duration-500 ease-spring group-hover:rotate-45"
          >
            ↗
          </span>
        </div>
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Create `src/components/sections/Work.tsx`**

```tsx
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/work/ProjectCard";
import { getFeaturedProjects, getOtherProjects } from "@/content/projects";

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="bg-paper py-24 md:py-36">
      <div className="container-page">
        <SectionHeading
          id="work-title"
          eyebrow="Selected work"
          title={[{ text: "Products I've shipped, and the" }, { text: "stories", className: "italic font-light" }, { text: "behind them." }]}
          intro="Live platforms used by real people, from payments and analytics to schools. Open any project for the full story."
        />
        <div className="mt-16 grid gap-8 md:grid-cols-2 md:gap-10">
          {getFeaturedProjects().map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 0.12} className={i % 2 === 1 ? "md:mt-20" : undefined}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
        <h3 className="mt-24 font-display text-2xl font-[400]">More work</h3>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {getOtherProjects().map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <ProjectCard project={p} size="small" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Add `<Work />` to the temporary `src/app/page.tsx`** after `<IndustriesBand />`, with the import `import { Work } from "@/components/sections/Work";`.

- [ ] **Step 4: Verify.** Run `npm run dev`. Check that the cards spring on hover, the second column is offset, and all 8 screenshots load. The case-study links will 404 until Task 12; that's expected. Then run `npm run build`. Expected: success.

- [ ] **Step 5: Commit**

```bash
git add src/components/work/ProjectCard.tsx src/components/sections/Work.tsx src/app/page.tsx
git commit -m "feat: selected work grid with tone cards

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 9: Story, Zephra, Process

**Files:**
- Create: `src/components/sections/Story.tsx`, `src/components/sections/Zephra.tsx`, `src/components/sections/Process.tsx`

**Interfaces:**
- Consumes: `site`, `processSteps`, `getAllProjects`, `SectionHeading`, `Reveal`, `RevealImage`, `Marquee`, `Sticker`, `Button`, `Chip`.
- Produces: `<Story />`, `<Zephra />`, `<Process />`.

- [ ] **Step 1: Create `src/components/sections/Story.tsx`** (copy rewritten warmer from the old About; facts unchanged)

```tsx
import { Reveal } from "@/components/motion/Reveal";
import { RevealImage } from "@/components/motion/RevealImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/content/site";

const values = [
  {
    title: "Backend that lasts",
    body: "APIs, payments and databases that scale past MVP without a rewrite.",
  },
  {
    title: "AI that feels native",
    body: "LangChain workflows, RAG and assistants that feel like part of the product, not a gimmick.",
  },
  {
    title: "Interfaces people enjoy",
    body: "Typed React and Next.js apps that stay fast under real-world data.",
  },
];

export function Story() {
  const [first, second] = site.portraits.story;
  return (
    <section id="story" aria-labelledby="story-title" className="grain overflow-hidden bg-paper-2 py-24 md:py-36">
      <div className="container-page grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <div className="relative mx-auto h-[28rem] w-full max-w-md sm:h-[34rem]">
          <RevealImage
            src={first.src}
            alt={first.alt}
            width={first.width}
            height={first.height}
            className="absolute top-0 left-0 w-[72%] rotate-[-3deg] rounded-[18px_18px_80px_18px] shadow-xl"
            imgClassName="aspect-[4/5]"
          />
          <RevealImage
            src={second.src}
            alt={second.alt}
            width={second.width}
            height={second.height}
            className="absolute right-0 bottom-0 w-[55%] rotate-[4deg] rounded-2xl border-8 border-paper shadow-xl"
            imgClassName="aspect-square"
          />
          <p className="absolute bottom-4 left-2 rounded-full bg-forest px-4 py-2 text-sm font-semibold text-paper">
            {site.location.city}, {site.location.country} · {site.location.timezone}
          </p>
        </div>

        <div>
          <SectionHeading
            id="story-title"
            eyebrow="My story"
            title={[{ text: "I build software that" }, { text: "outlives", className: "italic font-light text-vermilion-ink" }, { text: "the sprint that shipped it." }]}
            className="md:grid-cols-1"
          />
          <Reveal className="mt-10 space-y-6 text-lg leading-[1.8] text-ink-soft">
            <p>
              I started out teaching — lecturing full-stack development at Aptech in Enugu and mentoring students
              into their first developer jobs. That habit of explaining the <em>why</em> never left me.
            </p>
            <p>
              Five years on, I&apos;ve shipped products across fintech, SaaS, education and real estate — the kind
              of codebases where a 2am incident is the real design review. These days I build AI-integrated
              products and lead Zephra, the studio I founded for teams that need more hands.
            </p>
            <p>
              My edge is judgement. I don&apos;t just close tickets; I fix the parts of the system that keep
              failing, write down why, and leave the codebase better than I found it.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <div className="h-1 w-10 rounded-full bg-vermilion-bright" />
                <h3 className="mt-4 font-display text-xl font-[450]">{v.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `src/components/sections/Zephra.tsx`**

```tsx
import Link from "next/link";
import { Marquee } from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";
import { Sticker } from "@/components/motion/Sticker";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllProjects } from "@/content/projects";
import { site } from "@/content/site";

const offerings = [
  {
    title: "Product builds",
    body: "SaaS platforms taken from idea to launch, with senior engineers owning delivery end to end.",
  },
  {
    title: "AI integration",
    body: "LLM features, LangChain workflows and RAG pipelines wired into real product flows.",
  },
  {
    title: "Platform engineering",
    body: "Payments, APIs, infrastructure and CI/CD that scale past MVP without a rewrite.",
  },
];

const services = ["SaaS builds", "AI workflows", "Payments", "Dashboards", "APIs", "Launch support"];

export function Zephra() {
  const studioWork = getAllProjects().filter((p) => p.client === "Zephra Studio");
  return (
    <section id="zephra" aria-labelledby="zephra-title" className="grain relative overflow-hidden bg-forest text-paper">
      <div className="container-page relative py-24 md:py-36">
        <Sticker text="Zephra Studio ✺ Senior-led ✺ " className="absolute top-10 right-6 hidden bg-saffron text-forest md:grid" />
        <SectionHeading
          id="zephra-title"
          tone="forest"
          eyebrow={site.zephra.name}
          title={[{ text: "Need a whole" }, { text: "team?", className: "italic font-light text-saffron" }]}
          intro="I founded Zephra to help founders and product teams ship production-ready SaaS and AI products without losing time to contractor churn. Same standards, more hands."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {offerings.map((o, i) => (
            <Reveal key={o.title} delay={i * 0.1}>
              <div className="h-full rounded-2xl border border-paper/15 bg-forest-deep/60 p-8 transition-transform duration-700 ease-spring hover:-translate-y-1.5 hover:-rotate-1">
                <span className="font-display text-sm text-saffron">0{i + 1}</span>
                <h3 className="mt-3 font-display text-2xl font-[400]">{o.title}</h3>
                <p className="mt-3 leading-relaxed text-paper/80">{o.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-14 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="text-paper/80">
            Recent studio work:{" "}
            {studioWork.map((p, i) => (
              <span key={p.slug}>
                <Link href={`/work/${p.slug}`} className="font-semibold text-paper underline decoration-saffron underline-offset-4 hover:text-saffron">
                  {p.title}
                </Link>
                {i < studioWork.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
          <Button href={site.zephra.url} variant="light" external>
            Visit Zephra.dev ↗
          </Button>
        </div>
      </div>
      <div className="border-t border-paper/15 bg-forest-deep py-4">
        <Marquee items={services} className="font-display text-xl italic" separatorClassName="not-italic text-saffron" duration={34} />
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create `src/components/sections/Process.tsx`**

```tsx
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/content/process";

export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="bg-paper py-24 md:py-36">
      <div className="container-page">
        <SectionHeading
          id="process-title"
          eyebrow="How I work"
          title={[{ text: "Clear steps," }, { text: "no surprises.", className: "italic font-light" }]}
          intro="Whether you're hiring me or the studio, every project runs the same calm, transparent way."
        />
        <ol className="mt-16 grid gap-6 md:grid-cols-4">
          {processSteps.map((s, i) => (
            <li key={s.number}>
              <Reveal delay={i * 0.1} className="h-full border-t-2 border-ink pt-6">
                <span className="font-display text-5xl font-[300] text-vermilion-ink">{s.number}</span>
                <h3 className="mt-4 font-display text-2xl font-[400]">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{s.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Add `<Story />`, `<Zephra />` and `<Process />` to the temporary page** after `<Work />`, with their imports. Run `npm run dev` and check the collage, the forest panel and the sticker at 375px and 1440px. Then run `npm run build`. Expected: success.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/Story.tsx src/components/sections/Zephra.tsx src/components/sections/Process.tsx src/app/page.tsx
git commit -m "feat: story, Zephra studio panel and process sections

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 10: Experience, testimonials, contact

**Files:**
- Create: `src/components/sections/Experience.tsx`, `src/components/sections/Testimonials.tsx`, `src/components/sections/Contact.tsx`, `src/components/sections/ContactForm.tsx`, `src/lib/email.ts`, `src/types/grecaptcha.d.ts`
- Test: `src/lib/email.test.ts`, `src/components/sections/ContactForm.test.tsx`

**Interfaces:**
- Consumes: `experiences`, `skillGroups`, `testimonials`, `site`, `SectionHeading`, `Reveal`, `Chip`.
- Produces: `type EmailConfig = { serviceId: string; templateId: string; publicKey: string; recaptchaKey?: string }`, `getEmailConfig(env?: Partial<Record<"serviceId"|"templateId"|"publicKey"|"recaptchaKey", string | undefined>>): EmailConfig | null`, `<ContactForm config: EmailConfig | null />`, `<Experience />`, `<Testimonials />`, `<Contact />`.

- [ ] **Step 1: Write failing tests `src/lib/email.test.ts`**

```ts
import { describe, expect, it } from "vitest";
import { getEmailConfig } from "./email";

describe("getEmailConfig", () => {
  it("returns null when any required key is missing or blank", () => {
    expect(getEmailConfig({ serviceId: "s", templateId: "t", publicKey: undefined })).toBeNull();
    expect(getEmailConfig({ serviceId: "s", templateId: " ", publicKey: "p" })).toBeNull();
  });
  it("returns config, with recaptcha optional", () => {
    expect(getEmailConfig({ serviceId: "s", templateId: "t", publicKey: "p" })).toEqual({
      serviceId: "s",
      templateId: "t",
      publicKey: "p",
      recaptchaKey: undefined,
    });
  });
});
```

- [ ] **Step 2: Write failing tests `src/components/sections/ContactForm.test.tsx`** (Review Focus 5)

```tsx
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const send = vi.hoisted(() => vi.fn());
vi.mock("@emailjs/browser", () => ({ default: { send } }));
vi.mock("next/script", () => ({ default: () => null }));

import { ContactForm } from "./ContactForm";

const config = { serviceId: "s", templateId: "t", publicKey: "p" };

async function fill(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/your name/i), "Ada");
  await user.type(screen.getByLabelText(/email/i), "ada@example.com");
  await user.type(screen.getByLabelText(/subject/i), "New SaaS");
  await user.type(screen.getByLabelText(/message/i), "We need a dashboard.");
}

describe("ContactForm", () => {
  beforeEach(() => send.mockReset());

  it("shows a direct-email fallback when EmailJS is not configured", () => {
    render(<ContactForm config={null} />);
    expect(screen.queryByRole("button", { name: /send/i })).toBeNull();
    expect(screen.getByRole("link", { name: /ifeanyi@xife3.space/i })).toHaveAttribute(
      "href",
      "mailto:ifeanyi@xife3.space",
    );
  });

  it("sends and clears the form on success", async () => {
    send.mockResolvedValue({ status: 200 });
    const user = userEvent.setup();
    render(<ContactForm config={config} />);
    await fill(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));
    await waitFor(() => expect(send).toHaveBeenCalledTimes(1));
    expect(send.mock.calls[0][0]).toBe("s");
    expect(send.mock.calls[0][2]).toMatchObject({ from_name: "Ada", reply_to: "ada@example.com" });
    await waitFor(() => expect(screen.getByLabelText(/message/i)).toHaveValue(""));
  });

  it("keeps what the visitor typed when sending fails", async () => {
    send.mockRejectedValue(new Error("network"));
    const user = userEvent.setup();
    render(<ContactForm config={config} />);
    await fill(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));
    await waitFor(() => expect(screen.getByRole("button", { name: /send message/i })).toBeEnabled());
    expect(screen.getByLabelText(/message/i)).toHaveValue("We need a dashboard.");
  });
});
```

- [ ] **Step 3: Run the tests to confirm they fail**

Run: `npm test -- email ContactForm`
Expected: FAIL, "Failed to resolve import".

- [ ] **Step 4: Create `src/lib/email.ts`**

```ts
export type EmailConfig = {
  serviceId: string;
  templateId: string;
  publicKey: string;
  recaptchaKey?: string;
};

type EmailEnv = Partial<Record<keyof EmailConfig, string | undefined>>;

export function getEmailConfig(
  env: EmailEnv = {
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
    templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
    recaptchaKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  },
): EmailConfig | null {
  const serviceId = env.serviceId?.trim();
  const templateId = env.templateId?.trim();
  const publicKey = env.publicKey?.trim();
  if (!serviceId || !templateId || !publicKey) return null;
  return { serviceId, templateId, publicKey, recaptchaKey: env.recaptchaKey?.trim() || undefined };
}
```

- [ ] **Step 5: Create `src/types/grecaptcha.d.ts`** (the old `declare global` lived in the old `Contact.tsx`, which Task 11 deletes)

```ts
export {};

declare global {
  interface Window {
    grecaptcha?: {
      enterprise: {
        ready: (cb: () => void) => void;
        execute: (siteKey: string, options: { action: string }) => Promise<string>;
      };
    };
  }
}
```

- [ ] **Step 6: Create `src/components/sections/ContactForm.tsx`**

```tsx
"use client";

import emailjs from "@emailjs/browser";
import Script from "next/script";
import { useState, type ChangeEvent, type FormEvent } from "react";
import toast, { Toaster } from "react-hot-toast";
import { site } from "@/content/site";
import type { EmailConfig } from "@/lib/email";

const empty = { from_name: "", reply_to: "", subject: "", message: "" };

const fieldCls =
  "w-full rounded-xl border border-line bg-paper px-4 py-3.5 text-ink placeholder:text-ink-soft/60 transition-colors focus:border-ink focus:outline-none focus-visible:outline-2 focus-visible:outline-vermilion";

export function ContactForm({ config }: { config: EmailConfig | null }) {
  const [form, setForm] = useState(empty);
  const [sending, setSending] = useState(false);

  if (!config) {
    return (
      <div role="status" className="rounded-2xl border border-line bg-paper p-8">
        <p className="font-display text-2xl">The form is resting today.</p>
        <p className="mt-3 text-ink-soft">
          Email me directly at{" "}
          <a href={`mailto:${site.email}`} className="font-semibold text-ink underline decoration-vermilion-bright underline-offset-4">
            {site.email}
          </a>{" "}
          and I&apos;ll reply within one business day.
        </p>
      </div>
    );
  }

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const id = toast.loading("Sending your message…");
    try {
      const params: Record<string, string> = { ...form };
      if (config.recaptchaKey && window.grecaptcha) {
        params["g-recaptcha-response"] = await window.grecaptcha.enterprise.execute(config.recaptchaKey, {
          action: "submit",
        });
      }
      await emailjs.send(config.serviceId, config.templateId, params, { publicKey: config.publicKey });
      toast.success("Message sent — I'll get back to you within a business day.", { id, duration: 5000 });
      setForm(empty);
    } catch {
      toast.error(`Couldn't send. Please try again, or email ${site.email}.`, { id, duration: 6000 });
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {config.recaptchaKey ? (
        <Script
          src={`https://www.google.com/recaptcha/enterprise.js?render=${config.recaptchaKey}`}
          strategy="lazyOnload"
        />
      ) : null}
      <Toaster
        position="top-center"
        toastOptions={{ style: { background: "#1f1a17", color: "#f3ede3", borderRadius: "999px" } }}
      />
      <form onSubmit={onSubmit} className="grid gap-5 rounded-2xl border border-line bg-paper p-6 md:p-10">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold">
            Your name
            <input name="from_name" required autoComplete="name" value={form.from_name} onChange={onChange} className={fieldCls} placeholder="Jane Doe" />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Email address
            <input name="reply_to" type="email" required autoComplete="email" value={form.reply_to} onChange={onChange} className={fieldCls} placeholder="jane@company.com" />
          </label>
        </div>
        <label className="grid gap-2 text-sm font-semibold">
          Subject
          <input name="subject" required value={form.subject} onChange={onChange} className={fieldCls} placeholder="A product, a role, an idea…" />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Message
          <textarea name="message" required rows={6} value={form.message} onChange={onChange} className={fieldCls} placeholder="What are you building, and where is it stuck?" />
        </label>
        <button
          type="submit"
          disabled={sending}
          className="justify-self-start rounded-full bg-vermilion px-7 py-4 font-semibold text-white transition-transform duration-500 ease-spring hover:-translate-y-[3px] hover:-rotate-[1.5deg] disabled:cursor-wait disabled:opacity-60"
        >
          {sending ? "Sending…" : "Send message →"}
        </button>
      </form>
    </>
  );
}
```

Note: the accessible name while sending is "Sending…". The test's `enabled` wait looks up "send message", which only matches once sending has finished, and that's intended.

- [ ] **Step 7: Run the tests**

Run: `npm test -- email ContactForm`
Expected: PASS (2 + 3).

- [ ] **Step 8: Create `src/components/sections/Contact.tsx`**

```tsx
import { FaEnvelope, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site, socials } from "@/content/site";
import { getEmailConfig } from "@/lib/email";
import { ContactForm } from "./ContactForm";

export function Contact() {
  const linkedin = socials.find((s) => s.label === "LinkedIn")!;
  const channels = [
    { label: "Email", value: site.email, href: `mailto:${site.email}`, icon: <FaEnvelope aria-hidden /> },
    { label: "WhatsApp", value: "Fastest reply", href: site.whatsapp, icon: <FaWhatsapp aria-hidden /> },
    { label: "LinkedIn", value: "Connect", href: linkedin.href, icon: <FaLinkedin aria-hidden /> },
  ];
  return (
    <section id="contact" aria-labelledby="contact-title" className="grain bg-paper-2 py-24 md:py-36">
      <div className="container-page">
        <SectionHeading
          id="contact-title"
          eyebrow="Say hello"
          title={[{ text: "Let's make something" }, { text: "people love.", className: "italic font-light text-vermilion-ink" }]}
          intro="Tell me what you're building (or hiring for), and where it's stuck. I reply within one business day."
        />
        <div className="mt-16 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <ul className="grid gap-4">
              {channels.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-4 rounded-2xl border border-line bg-paper p-5 transition-transform duration-500 ease-spring hover:-translate-y-1 hover:-rotate-1"
                  >
                    <span className="grid size-11 place-items-center rounded-full bg-saffron text-ink">{c.icon}</span>
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">{c.label}</span>
                      <span className="block font-semibold">{c.value}</span>
                    </span>
                    <span aria-hidden className="ml-auto transition-transform duration-500 ease-spring group-hover:rotate-45">↗</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-ink-soft">
              Based in {site.location.city}, {site.location.country} ({site.location.timezone}) · working remotely worldwide.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ContactForm config={getEmailConfig()} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 9: Create `src/components/sections/Experience.tsx`**

```tsx
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Chip } from "@/components/ui/Chip";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experiences } from "@/content/experience";
import { skillGroups } from "@/content/skills";

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="bg-paper py-24 md:py-36">
      <div className="container-page">
        <SectionHeading
          id="experience-title"
          eyebrow="Experience & stack"
          title={[{ text: "Five years of" }, { text: "production", className: "italic font-light" }, { text: "receipts." }]}
          intro="The teams I've shipped with, and the tools I reach for when reliability isn't optional."
        />
        <div className="mt-16 grid gap-16 lg:grid-cols-[1.4fr_1fr]">
          <ol className="relative border-l border-line">
            {experiences.map((e, i) => (
              <li key={e.company + e.period} className="relative pb-12 pl-8 last:pb-0">
                <span aria-hidden className="absolute top-2 -left-[7px] size-3.5 rounded-full border-2 border-paper bg-vermilion-bright" />
                <Reveal delay={Math.min(i * 0.05, 0.3)}>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">{e.period} · {e.location}</p>
                  <h3 className="mt-2 font-display text-2xl font-[400]">{e.role}</h3>
                  <p className="font-semibold text-vermilion-ink">{e.company}</p>
                  <p className="mt-3 leading-relaxed text-ink-soft">{e.description}</p>
                  {e.achievements.length > 0 ? (
                    <ul className="mt-3 space-y-1 text-[0.95rem]">
                      {e.achievements.map((a) => (
                        <li key={a} className="flex gap-2"><span aria-hidden className="text-forest">✓</span>{a}</li>
                      ))}
                    </ul>
                  ) : null}
                </Reveal>
              </li>
            ))}
          </ol>
          <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            {skillGroups.map((g, i) => (
              <Reveal key={g.title} delay={i * 0.1}>
                <div className="rounded-2xl border border-line bg-paper-2 p-6">
                  <h3 className="font-display text-xl font-[450]">{g.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{g.blurb}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {g.skills.map((s) => (
                      <li key={s.name}>
                        <Chip>
                          {s.icon ? <Image src={s.icon} alt="" width={14} height={14} className="mr-1.5" /> : <span aria-hidden className="mr-1.5 text-vermilion-bright">✺</span>}
                          {s.name}
                        </Chip>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 10: Create `src/components/sections/Testimonials.tsx`**

```tsx
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/content/testimonials";
import { cn } from "@/lib/utils";

const avatarTones = ["bg-saffron text-ink", "bg-forest text-paper", "bg-vermilion text-white", "bg-ink text-paper"];

export function Testimonials() {
  const [lead, ...rest] = testimonials;
  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="bg-paper py-24 md:py-36">
      <div className="container-page">
        <SectionHeading
          id="testimonials-title"
          eyebrow="Kind words"
          title={[{ text: "What the people who" }, { text: "paid the invoice", className: "rounded-lg bg-saffron px-2 italic font-light [box-decoration-break:clone]" }, { text: "said." }]}
        />
        <Reveal className="mt-16">
          <figure className="rounded-3xl bg-forest p-8 text-paper md:p-14">
            <blockquote className="font-display text-[clamp(1.4rem,2.6vw,2.2rem)] leading-[1.35] font-[350]">
              &ldquo;{lead.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              <span className="grid size-12 place-items-center rounded-full bg-saffron font-semibold text-ink">{lead.initials}</span>
              <span>
                <span className="block font-semibold">{lead.name}</span>
                <span className="block text-sm text-paper/75">{lead.role} · {lead.company}</span>
              </span>
            </figcaption>
          </figure>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {rest.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <figure className="flex h-full flex-col rounded-3xl border border-line bg-paper-2 p-8">
                <blockquote className="leading-[1.75] text-ink">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-auto flex items-center gap-3 pt-6">
                  <span className={cn("grid size-10 place-items-center rounded-full text-sm font-semibold", avatarTones[(i + 1) % avatarTones.length])}>{t.initials}</span>
                  <span>
                    <span className="block font-semibold">{t.name}</span>
                    <span className="block text-sm text-ink-soft">{t.role} · {t.company}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 11: Add `<Experience />`, `<Testimonials />` and `<Contact />` to the temporary page** after `<Process />`. Run `npm test && npm run build`. Expected: all pass.

- [ ] **Step 12: Commit**

```bash
git add src/lib/email.ts src/lib/email.test.ts src/types src/components/sections src/app/page.tsx
git commit -m "feat: experience, testimonials and resilient contact form

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 11: Compose the homepage, remove the old site, clean up dependencies

**Files:**
- Replace: `src/app/page.tsx`
- Modify: `src/app/layout.tsx` (skip link, Header, Footer)
- Create: `src/app/not-found.tsx`
- Delete: `src/components/{About,Agency,Contact,Experience,Footer,Header,Hero,Projects,Skills,Testimonials}.tsx`, `src/components/ui/button.tsx`, `src/components/ui/carousel.tsx`
- Modify: `package.json` (uninstall unused packages)

- [ ] **Step 1: Replace `src/app/page.tsx`** (`<main>` now lives in the layout)

```tsx
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { IndustriesBand } from "@/components/sections/IndustriesBand";
import { Process } from "@/components/sections/Process";
import { Story } from "@/components/sections/Story";
import { Testimonials } from "@/components/sections/Testimonials";
import { Work } from "@/components/sections/Work";
import { Zephra } from "@/components/sections/Zephra";

export default function HomePage() {
  return (
    <>
      <Hero />
      <IndustriesBand />
      <Work />
      <Story />
      <Zephra />
      <Process />
      <Experience />
      <Testimonials />
      <Contact />
    </>
  );
}
```

- [ ] **Step 2: Update the `<body>` in `src/app/layout.tsx`**

```tsx
<body className="bg-paper font-sans text-ink antialiased">
  <a
    href="#main"
    className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-paper"
  >
    Skip to content
  </a>
  <MotionProvider>
    <Header />
    <main id="main">{children}</main>
    <Footer />
  </MotionProvider>
</body>
```

Add the imports `import { Header } from "@/components/sections/Header";` and `import { Footer } from "@/components/sections/Footer";`.

- [ ] **Step 3: Create `src/app/not-found.tsx`**

```tsx
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="grain grid min-h-[80vh] place-items-center bg-paper pt-24">
      <div className="container-page text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-vermilion-ink">✺ 404</p>
        <h1 className="mt-4 font-display text-[clamp(2.6rem,7vw,5.5rem)] leading-none font-[350]">
          This page <em className="font-light">wandered off.</em>
        </h1>
        <p className="mx-auto mt-6 max-w-[40ch] text-lg text-ink-soft">
          The link may be old, or the project may have moved. The work is still all here.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Button href="/#work">See my work</Button>
          <Button href="/" variant="outline">Home</Button>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Delete the old components**

```bash
git rm src/components/About.tsx src/components/Agency.tsx src/components/Contact.tsx src/components/Experience.tsx src/components/Footer.tsx src/components/Header.tsx src/components/Hero.tsx src/components/Projects.tsx src/components/Skills.tsx src/components/Testimonials.tsx src/components/ui/button.tsx src/components/ui/carousel.tsx
```

- [ ] **Step 5: Confirm the packages are unused, then uninstall them**

Run: `grep -rnE "emailjs-com|react-simple-typewriter|geist|embla-carousel|tw-animate-css|class-variance-authority|@radix-ui/react-slot|lucide-react" src`
Expected: no output. If any line prints, keep that package and uninstall only the rest.

```bash
npm uninstall emailjs-com react-simple-typewriter geist embla-carousel-react tw-animate-css class-variance-authority @radix-ui/react-slot lucide-react
```

- [ ] **Step 6: Verify**

Run: `npm run lint && npm test && npm run build`
Expected: all pass, with zero lint errors.

- [ ] **Step 7: Commit**

```bash
git add -A src package.json package-lock.json
git commit -m "feat: compose new homepage, retire old sections and unused deps

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 12: Case-study pages

**Files:**
- Create: `src/components/work/CaseStudy.tsx`, `src/app/work/[slug]/page.tsx`, `src/app/work/[slug]/template.tsx`
- Test: `src/components/work/CaseStudy.test.tsx`

**Interfaces:**
- Consumes: `Project`, `getAllProjects`, `getProjectBySlug`, `getNextProject`, `projectJsonLd`, `JsonLd`, `RevealImage`, `Reveal`, `WordRise`, `Chip`, `Button`, `ProjectCard`, `site`.
- Produces: `<CaseStudy project next />`, the route `/work/[slug]` (static, 8 pages, `dynamicParams = false`).

- [ ] **Step 1: Write failing tests `src/components/work/CaseStudy.test.tsx`**

```tsx
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
```

- [ ] **Step 2: Run the tests to confirm they fail**

Run: `npm test -- CaseStudy`
Expected: FAIL, "Failed to resolve import ./CaseStudy".

- [ ] **Step 3: Create `src/components/work/CaseStudy.tsx`**

```tsx
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { RevealImage } from "@/components/motion/RevealImage";
import { WordRise } from "@/components/motion/WordRise";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import type { Project } from "@/content/projects";
import { ProjectCard, toneClasses } from "./ProjectCard";

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Reveal className="grid gap-4 border-t border-line py-12 md:grid-cols-[14rem_1fr] md:gap-12">
      <h2 className="font-display text-2xl font-[400]">{title}</h2>
      <div className="text-lg leading-[1.8] text-ink-soft">{children}</div>
    </Reveal>
  );
}

export function CaseStudy({ project: p, next }: { project: Project; next: Project }) {
  const results = [...(p.impact ? [p.impact] : []), ...(p.results ?? [])];
  return (
    <article>
      <header className={`grain pt-32 pb-12 md:pt-40 ${toneClasses[p.tone]}`}>
        <div className="container-page">
          <Link href="/#work" className="text-sm font-semibold underline-offset-4 hover:underline">
            ← All work
          </Link>
          <p className="mt-10 text-xs font-semibold uppercase tracking-[0.18em]">
            {p.category} · {p.year}
          </p>
          <WordRise
            as="h1"
            animateOnMount
            segments={[{ text: p.title }]}
            className="mt-4 font-display text-[clamp(2.6rem,7vw,6rem)] leading-[0.98] font-[350] tracking-[-0.025em]"
          />
          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-3 text-sm">
            <div><dt className="text-xs uppercase tracking-[0.14em]">Client</dt><dd className="font-semibold">{p.client}</dd></div>
            {p.role ? <div><dt className="text-xs uppercase tracking-[0.14em]">Role</dt><dd className="font-semibold">{p.role}</dd></div> : null}
            <div><dt className="text-xs uppercase tracking-[0.14em]">Year</dt><dd className="font-semibold">{p.year}</dd></div>
          </dl>
        </div>
      </header>

      <div className="container-page -mt-2 md:-mt-4">
        <RevealImage
          src={p.image}
          alt={p.imageAlt}
          width={1920}
          height={970}
          priority
          sizes="(min-width: 1280px) 80rem, 100vw"
          className="mt-10 rounded-3xl border border-line shadow-2xl"
          imgClassName="object-top"
        />
      </div>

      <div className="container-page py-16 md:py-24">
        <Block title="Overview"><p>{p.summary}</p></Block>
        {p.challenge ? <Block title="The challenge"><p>{p.challenge}</p></Block> : null}
        {p.built?.length ? (
          <Block title="What I built">
            <ul className="list-disc space-y-2 pl-5">{p.built.map((b) => <li key={b}>{b}</li>)}</ul>
          </Block>
        ) : null}
        <Block title="Stack">
          <ul className="flex flex-wrap gap-2">{p.technologies.map((t) => <li key={t}><Chip>{t}</Chip></li>)}</ul>
        </Block>
        {results.length ? (
          <Block title="Results">
            <ul className="space-y-3">
              {results.map((r) => (
                <li key={r} className="font-display text-2xl text-ink"><span aria-hidden className="mr-2 text-vermilion-bright">✺</span>{r}</li>
              ))}
            </ul>
          </Block>
        ) : null}
        {p.gallery?.length ? (
          <Block title="Screens">
            <div className="grid gap-4 sm:grid-cols-2">
              {p.gallery.map((g) => (
                <Image key={g.src} src={g.src} alt={g.alt} width={1200} height={800} className="rounded-xl border border-line" />
              ))}
            </div>
          </Block>
        ) : null}
        {p.liveUrl || p.githubUrl ? (
          <div className="flex flex-wrap gap-4 border-t border-line pt-12">
            {p.liveUrl ? <Button href={p.liveUrl} external>Visit live site ↗</Button> : null}
            {p.githubUrl ? <Button href={p.githubUrl} variant="outline" external>Source code ↗</Button> : null}
          </div>
        ) : null}
      </div>

      <aside aria-label="Next project" className="bg-paper-2 py-20">
        <div className="container-page grid gap-8 md:grid-cols-[1fr_1.4fr] md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-vermilion-ink">✺ Next project</p>
            <p className="mt-3 font-display text-4xl font-[350]">Keep exploring</p>
          </div>
          <ProjectCard project={next} />
        </div>
      </aside>
    </article>
  );
}
```

- [ ] **Step 4: Run the tests**

Run: `npm test -- CaseStudy`
Expected: PASS (4). The `ProjectCard` link's accessible name is "Next One — read the case study", which matches `/next one/i`.

- [ ] **Step 5: Create `src/app/work/[slug]/page.tsx`**

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/ui/JsonLd";
import { CaseStudy } from "@/components/work/CaseStudy";
import { getAllProjects, getNextProject, getProjectBySlug } from "@/content/projects";
import { site } from "@/content/site";
import { projectJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProjectBySlug(slug);
  if (!p) return {};
  const title = `${p.title} — ${p.category} case study`;
  return {
    title,
    description: p.summary,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: { type: "article", url: `/work/${p.slug}`, title: `${title} · ${site.name}`, description: p.summary },
    twitter: { card: "summary_large_image", title: `${title} · ${site.name}`, description: p.summary },
  };
}

export default async function WorkPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  return (
    <>
      <JsonLd data={projectJsonLd(project)} />
      <CaseStudy project={project} next={getNextProject(slug)} />
    </>
  );
}
```

- [ ] **Step 6: Create `src/app/work/[slug]/template.tsx`** (the page-enter transition. This is the spec's fallback for the shared-element transition, because App Router cross-route `layoutId` isn't reliable on React 19.1 stable. It still pairs with the RevealImage soft-zoom on the hero screenshot.)

```tsx
"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function WorkTemplate({ children }: { children: ReactNode }) {
  return (
    <motion.div
      data-reveal
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 7: Verify**

Run: `npm run build`
Expected: the output shows `● /work/[slug]` with 8 prerendered paths.

Then run `npm run dev` and check the following:
- Opening `/work/payzeph` gives a vermilion header with the word-rise title, the screenshot reveals, and there's no "The challenge" heading.
- `/work/does-not-exist` shows the styled 404.
- Clicking a homepage card fades into the case study.

- [ ] **Step 8: Commit**

```bash
git add src/components/work src/app/work
git commit -m "feat: statically generated case-study pages

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 13: Branded Open Graph images

**Files:**
- Create: `src/lib/og.tsx`, `src/app/opengraph-image.tsx`, `src/app/work/[slug]/opengraph-image.tsx`

**Interfaces:**
- Consumes: `site`, `getAllProjects`, `getProjectBySlug`, and the fonts in `assets/fonts/` (Task 1).
- Produces: `renderOgCard(opts: { eyebrow: string; title: string; titleItalic?: string; footer: string; accent?: string }): Promise<ImageResponse>`, `OG_SIZE`.

- [ ] **Step 1: Create `src/lib/og.tsx`**

```tsx
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

const font = (file: string) => readFile(join(process.cwd(), "assets/fonts", file));

export async function renderOgCard({
  eyebrow,
  title,
  titleItalic,
  footer,
  accent = "#F2B33D",
}: {
  eyebrow: string;
  title: string;
  titleItalic?: string;
  footer: string;
  accent?: string;
}) {
  const [fraunces, frauncesItalic, inter] = await Promise.all([
    font("fraunces-latin-400-normal.woff"),
    font("fraunces-latin-400-italic.woff"),
    font("inter-latin-600-normal.woff"),
  ]);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#F3EDE3", color: "#1F1A17", padding: "72px 80px", fontFamily: "Inter" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, letterSpacing: 4, textTransform: "uppercase", color: "#B8321C" }}>
          <span>✺</span>
          <span>{eyebrow}</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", fontFamily: "Fraunces", fontSize: 88, lineHeight: 1.02, letterSpacing: -2, maxWidth: 1000 }}>
          <span>{title}</span>
          {titleItalic ? (
            <span style={{ fontStyle: "italic", background: accent, borderRadius: 14, padding: "0 16px", marginLeft: 20 }}>{titleItalic}</span>
          ) : null}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 26 }}>
          <span>{footer}</span>
          <span style={{ display: "flex", background: "#1F4D3A", color: "#F3EDE3", borderRadius: 999, padding: "12px 26px" }}>Ifeanyi Onyekwelu</span>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Fraunces", data: fraunces, style: "normal", weight: 400 },
        { name: "Fraunces", data: frauncesItalic, style: "italic", weight: 400 },
        { name: "Inter", data: inter, style: "normal", weight: 600 },
      ],
    },
  );
}
```

- [ ] **Step 2: Create `src/app/opengraph-image.tsx`**

```tsx
import { OG_SIZE, renderOgCard } from "@/lib/og";
import { site } from "@/content/site";

export const alt = `${site.name} — Full-stack engineer and founder of Zephra`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgCard({
    eyebrow: "Full-stack engineer · Founder, Zephra",
    title: "I build software people",
    titleItalic: "quietly love using.",
    footer: "Fintech · SaaS · AI products",
  });
}
```

- [ ] **Step 3: Create `src/app/work/[slug]/opengraph-image.tsx`**

```tsx
import { getAllProjects, getProjectBySlug } from "@/content/projects";
import { OG_SIZE, renderOgCard } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Case study by Ifeanyi Onyekwelu";

const accents = { saffron: "#F2B33D", vermilion: "#E8452C", forest: "#9FC7B0", paper: "#F2B33D" } as const;

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: { slug: string } | Promise<{ slug: string }> }) {
  const { slug } = await Promise.resolve(params);
  const p = getProjectBySlug(slug)!;
  return renderOgCard({
    eyebrow: `Case study · ${p.category}`,
    title: "",
    titleItalic: p.title,
    footer: p.impact ?? p.technologies.slice(0, 4).join(" · "),
    accent: accents[p.tone],
  });
}
```

- [ ] **Step 4: Verify**

Run: `npm run build`. Expected: success; `/opengraph-image` and `/work/[slug]/opengraph-image` are listed.

Then run `npm run start` and open `http://localhost:3000/opengraph-image` and `http://localhost:3000/work/payzeph/opengraph-image`. Expected: a paper background, the Fraunces headline with a highlighted italic phrase, and the forest name pill. Also view the page source of `/work/payzeph` and confirm that `<meta property="og:image"` points to the case-study image.

- [ ] **Step 5: Commit**

```bash
git add src/lib/og.tsx src/app/opengraph-image.tsx "src/app/work/[slug]/opengraph-image.tsx"
git commit -m "feat(seo): branded Open Graph images for home and case studies

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 14: Verification pass

**Files:**
- Modify: only what the checks below find.
- Create: `docs/superpowers/photo-shot-list.md` (copied from spec §8, so it's easy to hand to a photographer)

- [ ] **Step 1: Run the full suite**

Run: `npm run lint && npm test && npm run build`
Expected: zero lint errors, all tests passing, and a successful build.

- [ ] **Step 2: Run Lighthouse (mobile)**

```bash
npm run start &
npx -y lighthouse http://localhost:3000 --form-factor=mobile --only-categories=performance,accessibility,seo --output=json --output-path=./lh-home.json --chrome-flags="--headless=new" --quiet
npx -y lighthouse http://localhost:3000/work/payzeph --form-factor=mobile --only-categories=performance,accessibility,seo --output=json --output-path=./lh-case.json --chrome-flags="--headless=new" --quiet
node -e "for (const f of ['lh-home.json','lh-case.json']) { const r=require('./'+f); console.log(f, Object.fromEntries(Object.entries(r.categories).map(([k,v])=>[k,Math.round(v.score*100)]))) }"
rm lh-home.json lh-case.json
```
Expected: SEO ≥ 95, accessibility ≥ 95, performance ≥ 90 on both pages. For any score below target, open the failing audits (`r.audits`), fix the root cause, and re-run. The usual suspects are contrast on `/80` opacity text, a missing `sizes` prop, or the LCP image lacking `priority`.

- [ ] **Step 3: Manual checks.** Walk through each of these and fix anything that fails.
  - **Widths:** 375px, 768px and 1440px. There should be no horizontal scroll, and no text overlapping the photos.
  - **Reduced motion:** with OS reduced motion on, nothing slides, floats, spins or scrolls smoothly, and all content is visible.
  - **JS disabled** (DevTools → disable JavaScript): every section's text is visible.
  - **Keyboard only:** the skip link appears on the first Tab, focus rings are visible on every link and button, and the mobile menu traps focus and closes on Esc.
  - **Rich Results Test** (https://search.google.com/test/rich-results): paste the rendered HTML of `/` and `/work/payzeph`. The Person, Organization and CreativeWork data should parse with no errors.
  - **Sitemap:** `http://localhost:3000/sitemap.xml` lists 9 URLs.

- [ ] **Step 4: Create `docs/superpowers/photo-shot-list.md`**

```markdown
# Photo shot list — portfolio

Warm natural light (late afternoon or by a window). A phone in portrait mode is fine. Deliver at ≥ 2000px on the long edge.

1. **Hero portrait**: chest-up, looking at the camera, relaxed half-smile, plain warm background. Vertical 4:5. → replaces `site.portraits.hero`
2. **Candid working**: at a laptop, looking at the screen rather than the camera, hands visible. Vertical and horizontal. → `site.portraits.story[0]`
3. **Thinking or whiteboard**: sketching or explaining something to someone. → `site.portraits.story[1]`
4. **Workspace detail**: desk, notebook, coffee, keyboard. Close-up, shallow focus.
5. **City/environment**: you in Enugu (a street, rooftop or café). Wide, with you small in the frame.
6. **Team moment (Zephra)**: with collaborators or on a video call. Optional.

To swap a photo: put the file in `public/photos/`, then update the `src`, `width` and `height` in `src/content/site.ts`. `npm test` checks that the path exists with the exact filename case.
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: verification fixes and photo shot list

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```
