"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const facts = [
  { label: "Name", value: "Ifeanyi Onyekwelu" },
  { label: "Role", value: "Full-Stack Engineer" },
  { label: "Experience", value: "5+ years in production" },
  { label: "Based in", value: "Enugu, Nigeria (UTC+1)" },
  { label: "Focus", value: "Full-stack · AI integration" },
  { label: "Availability", value: "Remote · worldwide" },
];

const highlights = [
  {
    title: "Backend architecture",
    body: "REST & GraphQL APIs, microservices, payment integrations, and databases that scale past MVP without a rewrite.",
  },
  {
    title: "AI integration",
    body: "LLM-powered features with LangChain, RAG pipelines, embeddings, and agentic workflows wired into real product UX.",
  },
  {
    title: "Frontend craft",
    body: "Typed React and Next.js apps, design systems, and interfaces that stay performant under real-world data loads.",
  },
];

const About = () => (
  <section id="about" style={s.section}>
    <div style={s.inner} className="about-inner">
      {/* Label */}
      <div style={s.labelRow}>
        <span style={s.labelLine} />
        <span style={s.labelText}>01 / About</span>
      </div>

      <div style={s.grid} className="about-grid">
        {/* Left: portrait */}
        <motion.div
          style={s.leftCol}
          className="about-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div style={s.photoWrap}>
            <Image
              src="/ifeanyi.png"
              alt="Ifeanyi Onyekwelu"
              width={520}
              height={640}
              style={s.photo}
              priority
            />
            <div style={s.photoBadge}>
              <div style={s.photoBadgeNum}>5+</div>
              <div style={s.photoBadgeLabel}>
                years
                <br />
                shipping
              </div>
            </div>
          </div>

          {/* Signature / credentials block */}
          <div style={s.credBlock}>
            <p style={s.credTitle}>Current focus</p>
            <p style={s.credBody}>
              Shipping full-stack web platforms and integrating LLM-powered
              features — LangChain workflows, RAG over product data, and
              assistants that feel like part of the UX, not a gimmick.
            </p>
          </div>
        </motion.div>

        {/* Right: content */}
        <motion.div
          style={s.rightCol}
          className="about-right"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <h2 style={s.heading}>
            I build software that <em style={s.em}>outlives</em> the sprint that
            shipped it.
          </h2>

          <div style={s.body}>
            <p>
              Over <strong>five years</strong> as a full-stack engineer, I&apos;ve
              shipped products across fintech, SaaS, and education — the kind of
              codebases where a 2am pager rotation is the real design review.
              Lately, I&apos;m deep in AI integration: LangChain pipelines, RAG,
              and LLM features wired into real product flows.
            </p>
            <p>
              My edge is judgement. I don&apos;t just close tickets; I reshape
              the parts of the system that keep failing, document the why, and
              leave the codebase in a better state than I found it. I&apos;ve
              shipped light Web3 work too — on-chain minting, IPFS — but that&apos;s
              past work, not my day-to-day focus.
            </p>
          </div>

          {/* Highlights */}
          <div style={s.highlights}>
            {highlights.map((h, i) => (
              <motion.div
                key={h.title}
                style={s.hCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}
              >
                <div style={s.hBar} />
                <p style={s.hTitle}>{h.title}</p>
                <p style={s.hBody}>{h.body}</p>
              </motion.div>
            ))}
          </div>

          {/* Facts table */}
          <div style={s.facts} className="about-facts">
            {facts.map((f) => (
              <div key={f.label} style={s.fact}>
                <span style={s.factLabel}>{f.label}</span>
                <span style={s.factValue}>{f.value}</span>
              </div>
            ))}
          </div>

          <div style={s.ctaRow}>
            <a href="#contact" style={s.ctaPrimary}>
              Work with me
              <span style={s.arrow}>→</span>
            </a>
            <a href="#projects" style={s.ctaLink}>
              See recent work
            </a>
          </div>
        </motion.div>
      </div>
    </div>

    <style>{`
      @media (max-width: 1024px) {
        .about-grid { grid-template-columns: 1fr !important; gap: 56px !important; }
        .about-left { max-width: 480px !important; margin: 0 auto !important; }
      }
      @media (max-width: 640px) {
        .about-inner { padding: 96px 20px !important; }
        .about-facts { grid-template-columns: 1fr !important; }
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
    marginBottom: 56,
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
    gridTemplateColumns: "0.9fr 1.2fr",
    gap: 80,
    alignItems: "start",
  },
  leftCol: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 32,
    position: "sticky" as const,
    top: 100,
  },
  photoWrap: {
    position: "relative",
    borderRadius: 20,
    overflow: "hidden",
    border: "1px solid var(--line)",
    background: "var(--ink-850)",
  },
  photo: {
    width: "100%",
    height: "auto",
    display: "block",
    filter: "contrast(1.03) saturate(0.9)",
  },
  photoBadge: {
    position: "absolute",
    right: -14,
    bottom: -14,
    background: "var(--accent)",
    color: "var(--ink-950)",
    padding: "16px 20px",
    display: "flex",
    alignItems: "center",
    gap: 14,
    borderRadius: 12,
    boxShadow: "0 12px 30px rgba(224, 164, 88, 0.25)",
  },
  photoBadgeNum: {
    fontFamily: "var(--font-display)",
    fontSize: "2.6rem",
    fontWeight: 400,
    lineHeight: 1,
    letterSpacing: "-0.03em",
  },
  photoBadgeLabel: {
    fontFamily: "var(--font-mono)",
    fontSize: "0.6rem",
    fontWeight: 700,
    lineHeight: 1.4,
    letterSpacing: "0.06em",
    textTransform: "uppercase" as const,
  },
  credBlock: {
    padding: "24px 24px",
    border: "1px solid var(--line)",
    borderRadius: 14,
    background: "rgba(255,255,255,0.02)",
  },
  credTitle: {
    fontFamily: "var(--font-mono)",
    fontSize: "0.65rem",
    letterSpacing: "0.14em",
    color: "var(--accent)",
    textTransform: "uppercase" as const,
    margin: "0 0 10px",
    fontWeight: 700,
  },
  credBody: {
    color: "var(--cream-soft)",
    fontSize: "0.9rem",
    lineHeight: 1.7,
    margin: 0,
  },
  rightCol: { display: "flex", flexDirection: "column" as const, gap: 40 },
  heading: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(30px, 4vw, 56px)",
    fontWeight: 400,
    lineHeight: 1.1,
    letterSpacing: "-0.025em",
    color: "var(--cream)",
    margin: 0,
    maxWidth: "18ch",
  },
  em: { color: "var(--accent)", fontStyle: "italic", fontWeight: 400 },
  body: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 16,
    color: "var(--cream-soft)",
    fontSize: "1rem",
    lineHeight: 1.75,
    maxWidth: "58ch",
  },
  highlights: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 16,
  },
  hCard: {
    padding: "20px 20px 22px",
    border: "1px solid var(--line)",
    borderRadius: 12,
    background: "rgba(255,255,255,0.015)",
    position: "relative",
  },
  hBar: {
    width: 24,
    height: 2,
    background: "var(--accent)",
    marginBottom: 12,
  },
  hTitle: {
    fontFamily: "var(--font-sans)",
    fontSize: "0.92rem",
    fontWeight: 600,
    color: "var(--cream)",
    margin: "0 0 8px",
    letterSpacing: "-0.01em",
  },
  hBody: {
    fontSize: "0.82rem",
    color: "var(--muted)",
    lineHeight: 1.6,
    margin: 0,
  },
  facts: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    border: "1px solid var(--line)",
    borderRadius: 12,
    overflow: "hidden",
  },
  fact: {
    padding: "16px 20px",
    borderBottom: "1px solid var(--line-soft)",
    borderRight: "1px solid var(--line-soft)",
    display: "flex",
    flexDirection: "column" as const,
    gap: 4,
  },
  factLabel: {
    fontFamily: "var(--font-mono)",
    fontSize: "0.6rem",
    letterSpacing: "0.14em",
    color: "var(--accent)",
    textTransform: "uppercase" as const,
    fontWeight: 700,
  },
  factValue: {
    fontSize: "0.9rem",
    color: "var(--cream)",
    fontWeight: 500,
  },
  ctaRow: {
    display: "flex",
    alignItems: "center",
    gap: 24,
    flexWrap: "wrap" as const,
  },
  ctaPrimary: {
    display: "inline-flex",
    alignItems: "center",
    gap: 12,
    fontSize: "0.92rem",
    fontWeight: 600,
    padding: "14px 24px",
    color: "var(--ink-950)",
    background: "var(--accent)",
    textDecoration: "none",
    borderRadius: 999,
    letterSpacing: "-0.01em",
    boxShadow: "0 10px 30px rgba(224, 164, 88, 0.22)",
  },
  ctaLink: {
    fontSize: "0.9rem",
    color: "var(--cream-soft)",
    textDecoration: "none",
    borderBottom: "1px solid var(--line)",
    paddingBottom: 2,
    transition: "color 0.2s, border-color 0.2s",
  },
  arrow: { fontSize: "1rem" },
};

export default About;
