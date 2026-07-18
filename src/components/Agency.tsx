"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

const Agency = () => (
  <section id="agency" style={s.section}>
    <div style={s.inner} className="agency-inner">
      <div style={s.labelRow}>
        <span style={s.labelLine} />
        <span style={s.labelText}>Zephra Studio</span>
      </div>

      <div style={s.grid} className="agency-grid">
        <motion.div
          style={s.copyCol}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 style={s.heading}>
            Need a team? <em style={s.em}>Hire us</em>.
          </h2>
          <p style={s.body}>
            I founded Zephra to help founders and product teams ship
            production-ready SaaS, AI-enabled workflows, and platform-grade
            experiences without losing time to contractor churn.
          </p>
          <p style={s.body}>
            If your project needs a senior engineering team with strong product
            judgment, cross-functional delivery, and ownership from idea to
            launch, Zephra is built for that.
          </p>
        </motion.div>

        <motion.div
          style={s.ctaCol}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div style={s.ctaCard}>
            <p style={s.cardLabel}>Agency partner</p>
            <p style={s.cardHeading}>Zephra.dev</p>
            <p style={s.cardBody}>
              Senior-led engineering for early-stage startups, growth teams, and
              founders who need a reliable development partner.
            </p>
            <div style={s.ctaRow}>
              <a
                href="https://zephra.dev"
                target="_blank"
                rel="noopener noreferrer"
                style={s.ctaPrimary}
              >
                Visit Zephra.dev
              </a>
              <Link href="#about" style={s.ctaSecondary}>
                Founder profile
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>

    <style>{`
      @media (max-width: 900px) {
        .agency-inner { padding: 96px 20px !important; }
        .agency-grid { grid-template-columns: 1fr !important; gap: 42px !important; }
      }
    `}</style>
  </section>
);

const s: Record<string, React.CSSProperties> = {
  section: {
    background: "var(--ink-900)",
    borderTop: "1px solid var(--line)",
    fontFamily: "var(--font-sans)",
  },
  inner: {
    maxWidth: 1280,
    margin: "0 auto",
    padding: "140px 56px",
  },
  labelRow: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    marginBottom: 40,
  },
  labelLine: {
    display: "block",
    width: 48,
    height: 1,
    background: "var(--accent)",
  },
  labelText: {
    fontFamily: "var(--font-mono)",
    fontSize: "0.72rem",
    color: "var(--muted)",
    letterSpacing: "0.15em",
    textTransform: "uppercase" as const,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1.2fr 0.8fr",
    gap: 80,
    alignItems: "center",
  },
  copyCol: {
    maxWidth: 640,
  },
  heading: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(34px, 5vw, 62px)",
    fontWeight: 400,
    lineHeight: 1.05,
    letterSpacing: "-0.03em",
    color: "var(--cream)",
    margin: 0,
    maxWidth: "13ch",
  },
  em: {
    color: "var(--accent)",
    fontStyle: "italic",
    fontWeight: 400,
  },
  body: {
    color: "var(--cream-soft)",
    fontSize: "1rem",
    lineHeight: 1.8,
    marginTop: 26,
    maxWidth: "42ch",
  },
  ctaCol: {
    display: "flex",
    justifyContent: "flex-end",
  },
  ctaCard: {
    border: "1px solid var(--line)",
    background: "rgba(255,255,255,0.02)",
    borderRadius: 24,
    padding: 40,
    display: "flex",
    flexDirection: "column" as const,
    gap: 24,
  },
  cardLabel: {
    color: "var(--muted)",
    fontFamily: "var(--font-mono)",
    letterSpacing: "0.15em",
    textTransform: "uppercase" as const,
    fontSize: "0.72rem",
  },
  cardHeading: {
    color: "var(--cream)",
    fontSize: "clamp(26px, 3vw, 38px)",
    lineHeight: 1.1,
    margin: 0,
  },
  cardBody: {
    color: "var(--cream-soft)",
    lineHeight: 1.8,
    fontSize: "0.98rem",
    margin: 0,
  },
  ctaRow: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: 16,
    marginTop: 8,
  },
  ctaPrimary: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    background: "var(--accent)",
    color: "var(--ink-950)",
    borderRadius: 9999,
    padding: "14px 24px",
    textDecoration: "none",
    fontWeight: 600,
    transition: "transform 0.2s ease",
  },
  ctaSecondary: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--cream)",
    border: "1px solid var(--line)",
    borderRadius: 9999,
    padding: "14px 24px",
    textDecoration: "none",
    fontWeight: 600,
    transition: "background 0.2s ease, color 0.2s ease",
  },
};

export default Agency;
