import Link from "next/link";
import type { CSSProperties } from "react";
import { navLinks, site, socials } from "@/content/site";
import { SocialIcon } from "@/components/ui/SocialIcon";

function BookACall() {
  const item = (hidden: boolean) =>
    Array.from({ length: 4 }, (_, i) => (
      <span key={i} aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-9 pr-9">
        <span className={i % 2 ? "text-faint" : undefined}>Book a call</span>
        <span className="grid size-[0.75em] place-items-center rounded-full bg-ember text-[0.32em] text-text transition-transform duration-500 ease-spring group-hover:rotate-45">
          ↗
        </span>
      </span>
    ));
  return (
    <Link
      href="/#contact"
      aria-label="Book a call"
      className="group flex overflow-hidden border-y border-line py-6 font-display text-[clamp(3rem,7vw,5.5rem)] leading-none font-medium tracking-[-0.04em]"
    >
      <span
        className="flex w-max animate-marquee group-hover:[animation-play-state:paused]"
        style={{ "--marquee-duration": "36s" } as CSSProperties}
      >
        {item(false)}
        {item(true)}
      </span>
    </Link>
  );
}

const elsewhere = [
  { label: "Résumé", href: site.resume },
  { label: "zephra.dev", href: site.zephra.url },
  ...socials.map((s) => ({ label: s.label, href: s.href })),
];

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden">
      <BookACall />
      <div aria-hidden className="ember-glow absolute -bottom-[28rem] left-1/2 -z-10 h-[44rem] w-[90rem] -translate-x-1/2 opacity-50" />
      <div className="container-page pt-20">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          <div className="max-w-sm">
            <p className="font-serif text-3xl font-light italic">Made with care in {site.location.city}.</p>
            <p className="mt-3 text-sm leading-[1.6] text-muted">
              If you&apos;ve read this far, we should probably talk. The kettle is on and the terminal is open.
            </p>
            <div className="mt-6 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid size-10 place-items-center rounded-full border border-line bg-surface-2 text-muted transition-colors hover:border-text/40 hover:text-text"
                >
                  <SocialIcon label={s.label} />
                </a>
              ))}
            </div>
          </div>
          <div className="flex gap-16">
            <nav aria-label="Footer" className="flex flex-col gap-2.5 text-sm">
              <span className="label-mono mb-1 text-faint">Site</span>
              {navLinks.map((l) => (
                <Link key={l.href} href={l.href} className="text-muted hover:text-text">
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-2.5 text-sm">
              <span className="label-mono mb-1 text-faint">Elsewhere</span>
              {elsewhere.map((l) => (
                <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-text">
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <p
          aria-hidden
          className="text-outline mt-12 mb-6 text-center font-display text-[clamp(5rem,19vw,17rem)] leading-[1.1] font-semibold tracking-[-0.05em] whitespace-nowrap select-none [--outline-alpha:14%]"
        >
          Ifeanyi O.
        </p>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line py-6 text-xs text-faint">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <a href="#main" className="rounded-full border border-line px-3.5 py-2 text-muted hover:text-text">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
