import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaWhatsapp } from "react-icons/fa";
import { Reveal } from "@/components/motion/Reveal";
import { WordRise } from "@/components/motion/WordRise";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { accent } from "@/components/ui/SectionHeading";
import { site } from "@/content/site";
import { getEmailConfig } from "@/lib/email";
import { ContactForm } from "./ContactForm";

const channels = [
  { label: "Email", value: site.email, href: `mailto:${site.email}`, icon: <FaEnvelope aria-hidden /> },
  { label: "Phone", value: site.phone.display, href: site.phone.href, icon: <FaPhone aria-hidden /> },
  { label: "WhatsApp", value: "Chat directly — fastest reply", href: site.whatsapp, icon: <FaWhatsapp aria-hidden /> },
  {
    label: "Location",
    value: `${site.location.city}, ${site.location.country} · ${site.location.timezone}`,
    icon: <FaMapMarkerAlt aria-hidden />,
  },
];

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-line bg-surface py-24 md:py-32">
      <div className="container-page grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <Eyebrow className="mb-5">Contact</Eyebrow>
          <WordRise
            id="contact-title"
            segments={[{ text: "Have something in mind? Let's" }, { text: "talk it through.", className: accent }]}
            className="max-w-[14ch] font-display text-[clamp(2.1rem,4.6vw,3.4rem)] leading-[1.04] font-medium tracking-[-0.03em]"
          />
          <p className="mt-6 max-w-[42ch] leading-[1.65] text-muted">
            Tell me about the project: what it is, where it stands and where it needs to go. I reply within one
            working day.
          </p>
          <ul className="mt-10 grid gap-5">
            {channels.map((c) => {
              const body = (
                <>
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-surface-2 text-ember">
                    {c.icon}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[0.7rem] text-faint">{c.label}</span>
                    <span className="block truncate font-medium">{c.value}</span>
                  </span>
                </>
              );
              return (
                <li key={c.label}>
                  {c.href ? (
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-4 transition-colors hover:text-saffron"
                    >
                      {body}
                    </a>
                  ) : (
                    <span className="flex items-center gap-4">{body}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        <Reveal delay={0.1}>
          <ContactForm config={getEmailConfig()} />
        </Reveal>
      </div>
    </section>
  );
}
