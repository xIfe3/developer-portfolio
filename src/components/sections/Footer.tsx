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
