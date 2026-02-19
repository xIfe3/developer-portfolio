"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import React from "react";
import Link from "next/link";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Testimonials", href: "#testimonials" },
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
    <div style={s.topRule} />

    <div style={s.inner} className="footer-inner">
      {/* Brand col */}
      <div style={s.brandCol}>
        <p style={s.logo}>
          <span style={s.bracket}>[</span>xIfe3<span style={s.bracket}>]</span>
          <span style={s.dot} />
        </p>
        <p style={s.tagline}>
          Full-Stack & Blockchain Developer
          <br />
          based in Enugu, Nigeria.
        </p>
        <p style={s.avail}>
          <span style={s.availDot} />
          Open to Work – Remote Friendly
        </p>
      </div>

      {/* Nav col */}
      <div style={s.navCol}>
        <p style={s.colHeading}>NAVIGATION</p>
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

      {/* Contact col */}
      <div style={s.navCol}>
        <p style={s.colHeading}>CONTACT</p>
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
              whileHover={{ color: "#b5f60a", borderColor: "#b5f60a33" }}
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
          © {new Date().getFullYear()} Ifeanyi Onyekwelu. All rights reserved.
        </span>
        <div style={s.bottomRight} className="footer-bottom-right">
          <span style={s.bottomTag}>DESIGNED & BUILT BY xIfe3</span>
          <span style={s.bottomTag}>ENUGU, NG</span>
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

      @media (max-width: 768px) {
        .footer-inner {
          grid-template-columns: 1fr !important;
          gap: 36px !important;
          padding: 48px 24px 36px !important;
        }
        .footer-bottom-inner {
          flex-direction: column !important;
          align-items: flex-start !important;
          gap: 8px !important;
        }
        .footer-bottom-right {
          flex-direction: column !important;
          gap: 4px !important;
        }
      }
    `}</style>
  </footer>
);

const s: Record<string, React.CSSProperties> = {
  footer: {
    background: "#080808",
    fontFamily: "'Space Grotesk', sans-serif",
  },
  topRule: {
    height: 1,
    background: "linear-gradient(90deg, #b5f60a, transparent)",
  },
  inner: {
    maxWidth: 1300,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1.6fr 1fr 1fr",
    gap: 60,
    padding: "72px 48px 56px",
  },
  brandCol: { display: "flex", flexDirection: "column" as const, gap: 16 },
  logo: {
    fontFamily: "'Space Mono', monospace",
    fontSize: "1.2rem",
    fontWeight: 700,
    color: "#f0ede6",
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: 3,
  },
  bracket: { color: "#b5f60a", fontWeight: 400 },
  dot: {
    display: "inline-block",
    width: 6,
    height: 6,
    background: "#b5f60a",
    borderRadius: "50%",
    marginLeft: 6,
  },
  tagline: { color: "#FFF", fontSize: "0.85rem", lineHeight: 1.7, margin: 0 },
  avail: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontFamily: "'Space Mono', monospace",
    fontSize: "0.58rem",
    letterSpacing: "0.12em",
    color: "#b5f60a",
    fontWeight: 700,
    margin: 0,
  },
  availDot: {
    width: 6,
    height: 6,
    background: "#b5f60a",
    borderRadius: "50%",
    flexShrink: 0,
    boxShadow: "0 0 6px #b5f60a",
  },
  navCol: { display: "flex", flexDirection: "column" as const, gap: 20 },
  colHeading: {
    fontFamily: "'Space Mono', monospace",
    fontSize: "0.6rem",
    letterSpacing: "0.2em",
    color: "#FFF",
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
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: "0.88rem",
    color: "#888",
    textDecoration: "none",
    transition: "color 0.2s",
  },
  socialRow: { display: "flex", gap: 10, marginTop: 8 },
  socialIcon: {
    width: 34,
    height: 34,
    background: "#0f0f0f",
    border: "1px solid #1a1a1a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#FFF",
    fontSize: "0.85rem",
    textDecoration: "none",
    transition: "color 0.2s, border-color 0.2s",
  },
  bottomBar: {
    borderTop: "1px solid #111",
    padding: "16px 48px",
  },
  bottomInner: {
    maxWidth: 1300,
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap" as const,
    gap: 12,
  },
  copy: {
    fontFamily: "'Space Mono', monospace",
    fontSize: "0.58rem",
    color: "#fefae0",
    letterSpacing: "0.08em",
  },
  bottomRight: { display: "flex", gap: 24 },
  bottomTag: {
    fontFamily: "'Space Mono', monospace",
    fontSize: "0.55rem",
    color: "#fefae0",
    letterSpacing: "0.15em",
    fontWeight: 700,
  },
};

export default Footer;
