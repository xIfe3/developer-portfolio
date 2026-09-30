# Portfolio Overhaul — Design Spec

**Date:** 2026-09-27
**Status:** Approved in conversation, awaiting written-spec review
**Branch:** `new`

## 1. Intent

Rebuild Ifeanyi Onyekwelu's personal portfolio so it feels premium, warm and alive, builds a real emotional connection with visitors, and ranks well in search.

- **Stays personal.** The site is about Ifeanyi. Zephra Studio is a strong supporting section, not the headline.
- **Two audiences, equal weight.** Founders/clients (primary visual path: "Start a project") and recruiters/hiring managers (clearly marked secondary path: "Hiring? Résumé"). Neither should feel like an afterthought.
- **Success looks like:** a visitor can tell within five seconds who Ifeanyi is, what Ifeanyi builds and what to click next. Lighthouse SEO ≥ 95, Accessibility ≥ 95, Performance ≥ 90 on mobile. Each featured project has its own indexable page.

Chosen in the visual companion: **Direction A "Editorial Warmth" + Direction C's motion, Variant 2 "Warm with sunny pops."** Mockups are in `.superpowers/brainstorm/` (not committed).

## 2. Scope

**In:** a redesigned homepage; `/work/[slug]` case-study pages; a new design system (tokens, fonts, motion); an SEO foundation; a photography shot list.

**Out (can be added later without rework):** a blog/articles section, CMS integration, dark mode, i18n.

## 3. Visual system

### Colour tokens (defined once in `globals.css` as CSS custom properties, exposed to Tailwind v4 via `@theme`)

| Token | Value | Use |
|---|---|---|
| `--paper` | `#F3EDE3` | page background |
| `--paper-2` | `#EAE2D5` | alternate section background, cards |
| `--ink` | `#1F1A17` | primary text, dark buttons |
| `--ink-soft` | `#5B514A` | body copy |
| `--line` | `#D9CFC0` | hairlines, borders |
| `--vermilion` | `#E8452C` | primary CTA, eyebrow labels, key accents |
| `--saffron` | `#F2B33D` | highlights behind words, marquee stars, tiles |
| `--forest` | `#1F4D3A` | Zephra panel, marquee band, stickers |
| `--forest-ink` | `#F3EDE3` | text on forest |

Contrast rule: vermilion is never used for body text on paper. White text on vermilion is allowed only at ≥ 16px bold or on buttons (≥ 4.5:1 is checked in the accessibility pass; darken to `#D63A22` if it fails).

### Typography (via `next/font/google`, self-hosted, `display: swap`)
- **Display:** Fraunces (variable, optical sizing, weights 300–600, with italic). Headlines use weight ~350, and italic emphasis carries meaning ("*quietly love*").
- **Body/UI:** Inter 400/500/600.
- Sora and JetBrains Mono are removed.
- Type scale uses `clamp()`: hero at 44–104px, section titles at 34–64px, body text at 16–18px with a 1.7 line height.

### Texture and shape
- A subtle SVG film-grain overlay on paper sections (`mix-blend-mode: multiply`, ~15% opacity, `pointer-events: none`).
- Images use an asymmetric radius (`18px 18px 90px 18px`) for the portrait, and 12–16px elsewhere.
- Stickers are circular badges with rotating text.

## 4. Motion

Libraries: **Framer Motion** (already installed) plus **Lenis** (smooth scroll, the one new dependency).

| Pattern | Where | Spec |
|---|---|---|
| Word rise | hero headline, section titles | each word goes from translateY 40% and opacity 0 to rest, 0.9s, ease `[0.22,1,0.36,1]`, 0.08s stagger |
| Soft-zoom reveal | photos, case-study hero images | scale 1.08 → 1 with a clip-path inset reveal, triggered on view once |
| Spring hover | buttons, cards, tiles | translateY −3 to −6px, slight rotate (−1 to −1.5°), spring `cubic-bezier(.34,1.56,.64,1)` |
| Rotating sticker | hero, Zephra panel | 14s linear infinite rotation |
| Marquee | below hero (industries), Zephra (services) | CSS keyframes, pauses on hover |
| Float | hero portrait | ±8px over 6s |
| Shared-element transition | work card → case-study page | Framer `layoutId` on the card image. It falls back to a fade if the browser can't support it. |

**Reduced motion:** under `prefers-reduced-motion: reduce`, all of the above are disabled or collapse to opacity fades, and Lenis is not started. A single `useReducedMotion`-aware `motion` helper (a `Reveal` component) enforces this, so individual sections don't re-implement it.

## 5. Information architecture

### Routes
- `/`: homepage
- `/work/[slug]`: case-study page, statically generated with `generateStaticParams`
- `sitemap.xml`, `robots.txt`, `opengraph-image` (from the App Router file conventions)

### Homepage sections (in order)
1. **Header:** name wordmark, links to Work, Zephra, Story, Contact, and a vermilion "Let's talk" pill. It turns solid and compact on scroll, with a full-screen menu on mobile.
2. **Hero:** eyebrow "Full-stack engineer · Founder, Zephra"; a word-rise headline (working copy: "I build software people *quietly love* using."); a one-line sub; CTAs **Start a project →** (vermilion, primary) and **Hiring? Résumé** (outline, secondary, opens the PDF); a floating portrait; an "Open for projects ✺ 2026" sticker; social icons; the existing stats row (5+ years, 25+ projects, 10+ clients, 99.9% uptime), restyled.
3. **Marquee band** (forest background, saffron stars): Fintech, SaaS platforms, AI products, Payments, Education, Real estate.
4. **Selected Work:** 4 large featured cards (Hedgeon, PayZeph, FlowAnalytics, ReginaNostra), each linking to `/work/[slug]`, followed by a compact "More work" row for the other 4 (MintVerse, 1010 Realty, MediBook, Savvio), which also link to their pages.
5. **Story:** a personal section with candid photos in an offset collage: why Ifeanyi builds, the path so far, and what matters to them. The copy is drawn from the current About section and rewritten warmer, in the first person.
6. **Zephra:** a full-bleed forest panel. Headline "Need a whole team?"; 3 offerings (Product builds, AI integration, Platform engineering); a services marquee; a rotating sticker; CTA "Visit Zephra.dev ↗".
7. **How I work:** 4 numbered steps (Discover → Design → Build → Launch & support) with short copy.
8. **Experience & stack:** a compact timeline (from the existing Experience data) beside a grouped stack list (from the existing Skills data). Existing icons are reused.
9. **Testimonials:** existing content, restyled as large pull quotes with a saffron highlight. Photos are shown when provided.
10. **Contact:** a warm sign-off headline, the existing EmailJS form restyled, and direct links (email, WhatsApp, LinkedIn).
11. **Footer:** a big Fraunces sign-off line, nav, socials and ©.

### Case-study page (`/work/[slug]`)
Hero image (shared-element transition) → title, category, year, role → **Overview** → **Challenge** → **What I built** → **Stack** (chips) → **Results** → screenshot gallery → Live / GitHub links → a "Next project" card.

**No invented facts.** Case-study fields are filled only from what's already in the repo (title, category, description, technologies, image, links). `challenge`, `built`, `results`, `year`, `role` and `gallery` are optional. A section whose field is empty is not rendered. Ifeanyi fills them in over time in the data file.

## 6. Code architecture

```
src/
  app/
    layout.tsx            fonts, root metadata, JSON-LD (Person + Organization), SmoothScroll provider
    page.tsx              composes homepage sections (server component)
    work/[slug]/page.tsx  case study (server), generateStaticParams + generateMetadata
    work/[slug]/opengraph-image.tsx
    opengraph-image.tsx
    sitemap.ts
    robots.ts
    globals.css           tokens, base styles, grain, keyframes
  content/
    site.ts               name, role, SITE_URL, socials (single source), résumé path, stats
    projects.ts           typed Project[] (slug, featured flag, all case-study fields)
    experience.ts, skills.ts, testimonials.ts   (data moved out of components)
  components/
    motion/  Reveal.tsx, WordRise.tsx, Marquee.tsx, Sticker.tsx, SmoothScroll.tsx   (client)
    ui/      Button.tsx, Chip.tsx, SectionHeading.tsx, Grain.tsx
    sections/ Header, Hero, Work, Story, Zephra, Process, Experience, Testimonials, Contact, Footer
    work/    ProjectCard.tsx, CaseStudy.tsx
```

Rules:
- **Sections are server components by default.** Only the interactive pieces (motion wrappers, Header scroll state, the Contact form, Lenis) are `"use client"`, so all text ships in the HTML.
- **Styling is Tailwind utilities plus tokens.** The current large inline `style={}` objects and `<style>` tag injections are removed.
- **Content lives in `src/content/`.** Components only render it. There's one source of truth for socials: the repo currently has two LinkedIn URLs and two X handles, and the handles currently in `Hero.tsx` win.
- `SITE_URL` = `process.env.NEXT_PUBLIC_SITE_URL`, falling back to `http://localhost:3000` in development. It's used for `metadataBase`, canonicals, the sitemap and JSON-LD. Production deploys must set it.
- Unused dependencies are removed: `emailjs-com` (duplicate of `@emailjs/browser`), `react-simple-typewriter`, `geist`, and `embla-carousel-react` plus `components/ui/carousel.tsx` if the testimonials no longer need a carousel.

## 7. SEO

- `metadataBase`, title template `%s · Ifeanyi Onyekwelu`, a description, keywords, canonical URL, and Open Graph and Twitter card data in the root layout. Every case study gets its own `generateMetadata`.
- **Open Graph images** are generated with `next/og` in the brand style (paper background, Fraunces title, vermilion accent): one for the site and one per case study.
- **JSON-LD structured data:** `Person` (name, jobTitle, sameAs socials, worksFor → Zephra), `Organization` (Zephra, url https://zephra.dev), and `CreativeWork` per case study. It's rendered with `<script type="application/ld+json">` in server components.
- `sitemap.ts` covers `/` plus every `/work/[slug]`. `robots.ts` allows everything and points to the sitemap.
- Semantic HTML: one `<h1>` per page, ordered headings, `<nav>`, `<main>`, `<footer>`, and descriptive `alt` text taken from the content data.
- **Images:** all go through `next/image` with explicit sizes, `priority` on the hero portrait only, and AVIF/WebP (enabled in `next.config.ts`).
- **Fonts:** self-hosted through `next/font`, with no layout shift.

## 8. Photography

Until the shoot, the build uses `public/ifeanyi.jpeg` and `public/profile.jpg`. The image paths live in `content/site.ts`, so swapping photos is a data change.

**Shot list** (phone on portrait mode is fine; warm natural light, late afternoon or by a window):
1. **Hero portrait:** chest-up, looking at the camera, relaxed half-smile, plain warm background. Vertical 4:5.
2. **Candid working:** at a laptop, looking at the screen rather than the camera, hands visible. Vertical and horizontal.
3. **Thinking or whiteboard:** sketching or explaining something to someone.
4. **Workspace detail:** desk, notebook, coffee, keyboard. Close-up, shallow focus.
5. **City/environment:** you in your city (a street, rooftop or café). Wide, with you small in the frame.
6. **Team moment (for Zephra):** you with collaborators or on a video call. Optional.

Deliver at ≥ 2000px on the long edge. They get compressed at build time.

## 9. Error handling and edge cases

- An unknown `/work/[slug]` calls `notFound()`, which shows a styled `not-found.tsx` with a link back to Work.
- The contact form keeps its existing EmailJS behaviour: inline validation, a disabled button while sending, and a success or error toast with a retry option. Missing EmailJS env vars produce a clear message instead of a silent failure.
- A missing optional case-study field means that section is omitted, never an empty heading.
- JS disabled: all content is still readable, because the text is server-rendered and animations only enhance it.

## 10. Verification

- `npm run lint` and `npm run build` pass with zero errors.
- A Lighthouse run on `/` and one case study (mobile) meets the targets in §1.
- Visual check at 375px, 768px and 1440px, and in the reduced-motion setting.
- Keyboard-only walkthrough: visible focus rings (a vermilion outline), a skip-to-content link, and a mobile menu that traps focus and closes on Esc.
- Structured data validates in Google's Rich Results Test. The sitemap lists every case study.

## 11. Open inputs from Ifeanyi (non-blocking)
- Production domain (to set as `NEXT_PUBLIC_SITE_URL`).
- Photos from the shoot.
- Case-study details (challenge, results, year, role) over time.
