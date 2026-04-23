"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaArrowUp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import React from "react";
import Link from "next/link";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Expertise", href: "#skills" },
  { name: "Work", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Clients", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

const socials = [
  { icon: <FaGithub />, url: "https://github.com/xIfe3", label: "GitHub" },
  {
    icon: <FaLinkedin />,
    url: "https://www.linkedin.com/in/ifeanyichukwu-onyekwelu",
    label: "LinkedIn",
  },
  { icon: <FaXTwitter />, url: "https://x.com/_xIfe3", label: "Twitter" },
];

const Footer = () => (
  <footer style={s.footer}>
    {/* Giant name band */}
    <div style={s.nameBand}>
      <motion.h2
        style={s.nameText}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        Let&apos;s build something <em style={s.em}>that lasts</em>.
      </motion.h2>
      <motion.a
        href="#contact"
        style={s.bandCta}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        Start a conversation
        <span style={s.bandArrow}>↗</span>
      </motion.a>
    </div>

    <div style={s.inner} className="footer-inner">
      <div style={s.brandCol}>
        <div style={s.logo}>
          <span style={s.logoMark}>IO</span>
          <span style={s.logoName}>
            Ifeanyi <span style={s.logoSurname}>Onyekwelu</span>
          </span>
        </div>
        <p style={s.tagline}>
          Full-Stack Engineer · AI Integration —<br />
          based in Enugu, Nigeria · working remote worldwide.
        </p>
        <p style={s.avail}>
          <span style={s.availDot} />
          Available for new engagements
        </p>
      </div>

      <div style={s.navCol}>
        <p style={s.colHeading}>Sitemap</p>
        <ul style={s.navList}>
          {navLinks.map((l) => (
            <li key={l.name}>
              <Link href={l.href} style={s.navLink}>
                {l.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div style={s.navCol}>
        <p style={s.colHeading}>Contact</p>
        <ul style={s.navList}>
          <li>
            <a href="mailto:ifeanyi@xife3.space" style={s.navLink}>
              ifeanyi@xife3.space
            </a>
          </li>
          <li>
            <a href="tel:+2348113208256" style={s.navLink}>
              +234 811 320 8256
            </a>
          </li>
          <li>
            <a
              href="https://wa.link/rlr1e3"
              target="_blank"
              rel="noopener noreferrer"
              style={s.navLink}
            >
              WhatsApp
            </a>
          </li>
        </ul>

        <div style={s.socialRow}>
          {socials.map((sc) => (
            <motion.a
              key={sc.label}
              href={sc.url}
              target="_blank"
              rel="noopener noreferrer"
              style={s.socialIcon}
              aria-label={sc.label}
              whileHover={{
                y: -2,
                color: "var(--ink-950)",
                background: "var(--accent)",
                borderColor: "var(--accent)",
              }}
            >
              {sc.icon}
            </motion.a>
          ))}
        </div>
      </div>
    </div>

    <div style={s.bottomBar}>
      <div style={s.bottomInner} className="footer-bottom-inner">
        <span style={s.copy}>
          © {new Date().getFullYear()} Ifeanyi Onyekwelu — All rights reserved.
        </span>
        <div style={s.bottomRight} className="footer-bottom-right">
          <span style={s.bottomTag}>Designed &amp; built in Enugu</span>
          <a href="#home" style={s.toTop} aria-label="Back to top">
            <FaArrowUp />
          </a>
        </div>
      </div>
    </div>

    <style>{`
      @media (max-width: 1024px) {
        .footer-inner {
          grid-template-columns: 1fr 1fr !important;
          gap: 40px !important;
          padding: 56px 32px 44px !important;
        }
        .footer-inner > div:first-child {
          grid-column: 1 / -1 !important;
        }
      }
      @media (max-width: 640px) {
        .footer-inner {
          grid-template-columns: 1fr !important;
          gap: 36px !important;
          padding: 48px 20px 32px !important;
        }
        .footer-bottom-inner {
          flex-direction: column !important;
          align-items: flex-start !important;
          gap: 12px !important;
        }
      }
    `}</style>
  </footer>
);

const s: Record<string, React.CSSProperties> = {
  footer: {
    background: "var(--ink-950)",
    borderTop: "1px solid var(--line)",
    fontFamily: "var(--font-sans)",
  },
  nameBand: {
    maxWidth: 1280,
    margin: "0 auto",
    padding: "80px 56px 64px",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 40,
    flexWrap: "wrap" as const,
    borderBottom: "1px solid var(--line)",
  },
  nameText: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(40px, 6vw, 80px)",
    fontWeight: 400,
    letterSpacing: "-0.03em",
    color: "var(--cream)",
    lineHeight: 1.05,
    margin: 0,
    maxWidth: "14ch",
  },
  em: { color: "var(--accent)", fontStyle: "italic", fontWeight: 400 },
  bandCta: {
    display: "inline-flex",
    alignItems: "center",
    gap: 12,
    padding: "16px 28px",
    background: "var(--accent)",
    color: "var(--ink-950)",
    fontSize: "0.95rem",
    fontWeight: 600,
    textDecoration: "none",
    borderRadius: 999,
    letterSpacing: "-0.01em",
    boxShadow: "0 12px 30px rgba(224, 164, 88, 0.25)",
  },
  bandArrow: { fontSize: "1.05rem" },
  inner: {
    maxWidth: 1280,
    margin: "0 auto",
    padding: "56px 56px 48px",
    display: "grid",
    gridTemplateColumns: "1.6fr 1fr 1fr",
    gap: 64,
  },
  brandCol: { display: "flex", flexDirection: "column" as const, gap: 20 },
  logo: { display: "flex", alignItems: "center", gap: 12 },
  logoMark: {
    width: 36,
    height: 36,
    borderRadius: 10,
    background: "linear-gradient(135deg, var(--accent), var(--accent-deep))",
    color: "var(--ink-950)",
    fontFamily: "var(--font-display)",
    fontSize: "0.95rem",
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    letterSpacing: "-0.02em",
  },
  logoName: {
    fontFamily: "var(--font-sans)",
    fontSize: "0.95rem",
    fontWeight: 600,
    color: "var(--cream)",
    letterSpacing: "-0.01em",
  },
  logoSurname: { color: "var(--muted)", fontWeight: 500 },
  tagline: {
    color: "var(--cream-soft)",
    fontSize: "0.9rem",
    lineHeight: 1.7,
    margin: 0,
    maxWidth: 340,
  },
  avail: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontFamily: "var(--font-mono)",
    fontSize: "0.65rem",
    letterSpacing: "0.12em",
    color: "var(--accent)",
    fontWeight: 700,
    textTransform: "uppercase" as const,
    margin: 0,
  },
  availDot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: "var(--accent)",
    boxShadow: "0 0 10px var(--accent)",
  },
  navCol: { display: "flex", flexDirection: "column" as const, gap: 20 },
  colHeading: {
    fontFamily: "var(--font-mono)",
    fontSize: "0.66rem",
    letterSpacing: "0.14em",
    color: "var(--muted)",
    textTransform: "uppercase" as const,
    fontWeight: 700,
    margin: 0,
  },
  navList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column" as const,
    gap: 12,
  },
  navLink: {
    fontFamily: "var(--font-sans)",
    fontSize: "0.88rem",
    color: "var(--cream-soft)",
    textDecoration: "none",
    transition: "color 0.2s",
  },
  socialRow: { display: "flex", gap: 10, marginTop: 12 },
  socialIcon: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    background: "var(--ink-850)",
    border: "1px solid var(--line)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--cream-soft)",
    fontSize: "0.85rem",
    textDecoration: "none",
    transition: "all 0.2s",
  },
  bottomBar: {
    borderTop: "1px solid var(--line)",
    padding: "20px 56px",
  },
  bottomInner: {
    maxWidth: 1280,
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap" as const,
    gap: 12,
  },
  copy: {
    fontFamily: "var(--font-mono)",
    fontSize: "0.66rem",
    color: "var(--muted-2)",
    letterSpacing: "0.04em",
  },
  bottomRight: {
    display: "flex",
    alignItems: "center",
    gap: 20,
  },
  bottomTag: {
    fontFamily: "var(--font-mono)",
    fontSize: "0.62rem",
    color: "var(--muted-2)",
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    fontWeight: 600,
  },
  toTop: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    background: "transparent",
    border: "1px solid var(--line)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--cream-soft)",
    fontSize: "0.8rem",
    textDecoration: "none",
    transition: "all 0.25s",
  },
};

export default Footer;
