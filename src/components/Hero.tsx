"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaPaperPlane, FaDownload } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import React from "react";

const socials = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/ifeanyichukwu-onyekwelu",
    icon: <FaLinkedin />,
  },
  { name: "GitHub", url: "https://github.com/xIfe3", icon: <FaGithub /> },
  { name: "Twitter", url: "https://x.com/_xIfe3", icon: <FaXTwitter /> },
];

const marks = [
  "Babelos",
  "Kedusoft",
  "World Brain Tech",
  "ReginaNostra",
  "1010 Realty",
  "Hedgeon Finance",
];

const Hero = () => {
  return (
    <section id="home" style={s.section} className="hero">
      {/* Ambient grid + glow */}
      <div style={s.grid} aria-hidden />
      <div style={s.glow} aria-hidden />

      <div style={s.container} className="hero-container">
        {/* Eyebrow */}
        <motion.div
          style={s.eyebrow}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span style={s.ePulse} />
          <span style={s.eText}>
            Available for senior roles · freelance engagements
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          style={s.headline}
          className="hero-headline"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          Engineering{" "}
          <span style={s.italic}>
            <em>reliable</em>
          </span>{" "}
          software
          <br />
          for teams that{" "}
          <span style={s.underline}>ship at scale</span>.
        </motion.h1>

        {/* Sub */}
        <motion.p
          style={s.sub}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
        >
          I&apos;m <strong style={s.strong}>Ifeanyi Onyekwelu</strong> — a
          full-stack engineer with{" "}
          <strong style={s.strong}>5+ years</strong> building production web
          platforms for fintech, SaaS, and education teams. Currently focused
          on{" "}
          <strong style={s.strong}>
            AI-integrated products
          </strong>{" "}
          — LLMs, LangChain, and workflows that ship.
        </motion.p>

        {/* CTA row */}
        <motion.div
          style={s.ctaRow}
          className="hero-cta-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          <a href="#contact" style={s.ctaPrimary}>
            <FaPaperPlane style={{ fontSize: 13 }} />
            Start a project
          </a>
          <a
            href="/IFEANYI ONYEKWELU.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={s.ctaSecondary}
          >
            <FaDownload style={{ fontSize: 13 }} />
            Download resume
          </a>
          <div style={s.socials}>
            {socials.map((x) => (
              <Link
                key={x.name}
                href={x.url}
                target="_blank"
                rel="noopener noreferrer"
                style={s.socialIcon}
                aria-label={x.name}
              >
                {x.icon}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          style={s.statsCol}
          className="hero-stats"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          <StatCell num="5+" label="Years engineering" />
          <StatCell num="25+" label="Shipped projects" />
          <StatCell num="10+" label="Production clients" />
          <StatCell num="99.9%" label="Uptime delivered" last />
        </motion.div>

        {/* Trust strip */}
        <motion.div
          style={s.trust}
          className="hero-trust"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <span style={s.trustLabel}>Trusted by teams at</span>
          <div style={s.trustMarks}>
            {marks.map((m) => (
              <span key={m} style={s.trustMark}>
                {m}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        .hero-headline em { font-style: italic; font-weight: 400; }
        @media (max-width: 720px) {
          .hero-container { padding: 120px 20px 72px !important; }
          .hero-cta-row { flex-wrap: wrap !important; gap: 14px !important; }
          .hero-stats { grid-template-columns: repeat(2, 1fr) !important; }
          .hero-trust { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
        }
      `}</style>
    </section>
  );
};

const StatCell = ({
  num,
  label,
  last,
}: {
  num: string;
  label: string;
  last?: boolean;
}) => (
  <div style={{ ...s.statCell, borderRight: last ? "none" : s.statCell.borderRight }}>
    <div style={s.statNum}>{num}</div>
    <div style={s.statLabel}>{label}</div>
  </div>
);

const s: Record<string, React.CSSProperties> = {
  section: {
    position: "relative",
    minHeight: "100vh",
    background: "var(--ink-950)",
    color: "var(--cream)",
    overflow: "hidden",
    fontFamily: "var(--font-sans)",
  },
  grid: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    backgroundImage:
      "linear-gradient(var(--line-soft) 1px, transparent 1px), linear-gradient(90deg, var(--line-soft) 1px, transparent 1px)",
    backgroundSize: "56px 56px",
    maskImage:
      "radial-gradient(ellipse at 50% 30%, black 20%, transparent 75%)",
    WebkitMaskImage:
      "radial-gradient(ellipse at 50% 30%, black 20%, transparent 75%)",
    opacity: 0.5,
  },
  glow: {
    position: "absolute",
    top: "-20%",
    right: "-10%",
    width: 720,
    height: 720,
    background:
      "radial-gradient(circle at center, var(--accent-glow), transparent 70%)",
    filter: "blur(40px)",
    pointerEvents: "none",
  },
  container: {
    position: "relative",
    maxWidth: 1280,
    margin: "0 auto",
    padding: "140px 56px 88px",
  },
  eyebrow: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    padding: "8px 16px",
    background: "rgba(255,255,255,0.02)",
    border: "1px solid var(--line)",
    borderRadius: 999,
    marginBottom: 36,
  },
  ePulse: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: "var(--accent)",
    boxShadow: "0 0 10px var(--accent)",
  },
  eText: {
    fontFamily: "var(--font-mono)",
    fontSize: "0.7rem",
    color: "var(--cream-soft)",
    letterSpacing: "0.05em",
  },
  headline: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(44px, 7.2vw, 100px)",
    lineHeight: 1.02,
    letterSpacing: "-0.035em",
    color: "var(--cream)",
    fontWeight: 400,
    margin: "0 0 24px",
    maxWidth: "14ch",
  },
  italic: {
    color: "var(--accent)",
    fontStyle: "italic",
    fontWeight: 400,
  },
  underline: {
    position: "relative",
    display: "inline-block",
    color: "var(--cream)",
    backgroundImage:
      "linear-gradient(transparent 85%, var(--accent-glow) 85%, var(--accent-glow) 95%, transparent 95%)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
  },
  sub: {
    fontSize: "1.05rem",
    lineHeight: 1.7,
    color: "var(--cream-soft)",
    maxWidth: 620,
    margin: "0 0 40px",
  },
  strong: { color: "var(--cream)", fontWeight: 600 },
  ctaRow: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    flexWrap: "wrap" as const,
    marginBottom: 56,
  },
  ctaPrimary: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    fontSize: "0.92rem",
    fontWeight: 600,
    padding: "14px 24px",
    color: "var(--ink-950)",
    background: "var(--accent)",
    textDecoration: "none",
    borderRadius: 999,
    letterSpacing: "-0.01em",
    boxShadow: "0 10px 30px rgba(224, 164, 88, 0.22)",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  ctaSecondary: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    fontSize: "0.92rem",
    fontWeight: 500,
    padding: "13px 22px",
    color: "var(--cream)",
    background: "transparent",
    border: "1px solid var(--line)",
    textDecoration: "none",
    borderRadius: 999,
    letterSpacing: "-0.01em",
    transition: "border-color 0.2s, color 0.2s",
  },
  socials: {
    display: "flex",
    gap: 14,
    marginLeft: 8,
    paddingLeft: 20,
    borderLeft: "1px solid var(--line)",
  },
  socialIcon: {
    width: 38,
    height: 38,
    borderRadius: "50%",
    border: "1px solid var(--line)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--cream-soft)",
    fontSize: "0.95rem",
    textDecoration: "none",
    transition: "all 0.2s",
  },
  statsCol: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    border: "1px solid var(--line)",
    borderRadius: 16,
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.02), transparent)",
    overflow: "hidden",
    marginBottom: 64,
  },
  statCell: {
    padding: "28px 24px",
    borderRight: "1px solid var(--line)",
    display: "flex",
    flexDirection: "column" as const,
    gap: 8,
  },
  statNum: {
    fontFamily: "var(--font-display)",
    fontSize: "2.4rem",
    fontWeight: 400,
    color: "var(--cream)",
    lineHeight: 1,
    letterSpacing: "-0.03em",
  },
  statLabel: {
    fontFamily: "var(--font-mono)",
    fontSize: "0.65rem",
    color: "var(--muted)",
    letterSpacing: "0.06em",
    textTransform: "uppercase" as const,
  },
  trust: {
    display: "flex",
    alignItems: "center",
    gap: 32,
    padding: "24px 0",
    borderTop: "1px solid var(--line)",
  },
  trustLabel: {
    fontFamily: "var(--font-mono)",
    fontSize: "0.66rem",
    color: "var(--muted-2)",
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    whiteSpace: "nowrap" as const,
  },
  trustMarks: {
    display: "flex",
    gap: 32,
    flexWrap: "wrap" as const,
    alignItems: "center",
  },
  trustMark: {
    fontFamily: "var(--font-display)",
    fontSize: "1.1rem",
    color: "var(--cream-soft)",
    letterSpacing: "-0.01em",
    opacity: 0.75,
  },
};

export default Hero;
