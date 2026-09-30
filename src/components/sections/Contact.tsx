import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaWhatsapp } from "react-icons/fa";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { site, socials } from "@/content/site";
import { getEmailConfig } from "@/lib/email";
import { ContactForm } from "./ContactForm";

const channels = [
  { label: "Email", value: site.email, hint: "Best for detailed briefs", href: `mailto:${site.email}`, icon: <FaEnvelope aria-hidden /> },
  { label: "WhatsApp", value: site.phone.display, hint: "Fastest reply", href: site.whatsapp, icon: <FaWhatsapp aria-hidden /> },
  { label: "Phone", value: site.phone.display, hint: "Scheduled calls only", href: site.phone.href, icon: <FaPhone aria-hidden /> },
];

export function Contact() {
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
            <div className="mb-4 rounded-2xl bg-forest p-6 text-paper">
              <p className="flex items-center gap-2 font-semibold">
                <span aria-hidden className="relative flex size-2.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-saffron opacity-75" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-saffron" />
                </span>
                Available for new work
              </p>
              <p className="mt-2 text-sm text-paper/85">
                Open to full-time roles and select freelance or studio engagements.
              </p>
            </div>
            <ul className="grid gap-4">
              {channels.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-4 rounded-2xl border border-line bg-paper p-5 transition-transform duration-500 ease-spring hover:-translate-y-1 hover:-rotate-1"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-saffron text-ink">{c.icon}</span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">{c.label}</span>
                      <span className="block truncate font-semibold">{c.value}</span>
                      <span className="block text-sm text-ink-soft">{c.hint}</span>
                    </span>
                    <span aria-hidden className="ml-auto transition-transform duration-500 ease-spring group-hover:rotate-45">↗</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 flex items-center gap-2 text-ink-soft">
              <FaMapMarkerAlt aria-hidden className="text-vermilion-ink" />
              {site.location.city}, {site.location.country} ({site.location.timezone}) · working remotely worldwide
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">Or connect on</span>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid size-11 place-items-center rounded-full border border-line bg-paper transition-colors hover:bg-ink hover:text-paper"
                >
                  <SocialIcon label={s.label} />
                </a>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ContactForm config={getEmailConfig()} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
