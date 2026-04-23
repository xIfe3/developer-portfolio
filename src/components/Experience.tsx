"use client";

import { motion } from "framer-motion";
import React from "react";

const experiences = [
  {
    role: "Software Engineer · Full-Stack",
    company: "Babelos",
    location: "Remote",
    period: "Sep 2025 — Present",
    description:
      "Building a production SaaS on Next.js + NestJS with Dockerised microservices. Designing PostgreSQL schemas, Redis caching, REST/GraphQL surfaces, and integrating LLM-powered features into the product.",
    achievements: [
      "Wired LangChain-based assistant into the product UX",
      "Owned GraphQL schema design for a multi-tenant surface",
    ],
    technologies: [
      "Next.js",
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "Redis",
      "LangChain",
      "Docker",
    ],
  },
  {
    role: "Software Engineer · Full-Stack",
    company: "Kedusoft",
    location: "Remote",
    period: "Sep 2024 — Jul 2025",
    description:
      "Built SaaS and fintech platforms with Stripe and Paystack payment integrations. Optimised PostgreSQL queries, added Redis caching, and deployed via Docker + GitHub Actions CI/CD.",
    achievements: [
      "Rebuilt payment layer eliminating silent failures",
      "Cut API response times via targeted query and cache optimisation",
    ],
    technologies: [
      "React",
      "TypeScript",
      "PostgreSQL",
      "Redis",
      "Docker",
      "Stripe",
      "Paystack",
    ],
  },
  {
    role: "Software Engineer · Full-Stack",
    company: "World Brain Technology",
    location: "Enugu, NG",
    period: "Feb 2024 — Aug 2024",
    description:
      "Built a SaaS platform for SMEs using React, Node.js, GraphQL, and PostgreSQL. Designed dashboards for data visualisation and deployed to AWS + GCP.",
    achievements: [
      "Proposed services split cutting API latency by ~45%",
      "Stood up observability stack for early incident detection",
    ],
    technologies: [
      "React",
      "Node.js",
      "GraphQL",
      "PostgreSQL",
      "AWS",
      "GCP",
      "Docker",
    ],
  },
  {
    role: "Junior Developer Intern",
    company: "CV2 Career Internship",
    location: "Remote",
    period: "Aug 2023 — Jan 2024",
    description:
      "Contributed to a SaaS platform built with Python and Firebase. Shipped features, fixed bugs, and participated in code reviews — hands-on exposure to agile workflows and CI/CD.",
    achievements: [],
    technologies: ["Python", "Firebase", "Agile", "CI/CD"],
  },
  {
    role: "Lecturer · Software Development",
    company: "Aptech Computer Education",
    location: "Enugu, NG",
    period: "Sep 2022 — Dec 2023",
    description:
      "Taught full-stack web development — JavaScript, React, Node.js, and databases. Mentored students through hands-on projects and designed structured curriculum materials.",
    achievements: [
      "Designed curriculum graduates still reference on the job",
      "Mentored dozens of students into junior dev roles",
    ],
    technologies: ["JavaScript", "React", "Node.js", "MongoDB", "MySQL"],
  },
  {
    role: "Freelance Contract Developer",
    company: "BeeTec",
    location: "Remote",
    period: "Apr 2022 — Aug 2022",
    description:
      "Delivered client projects end-to-end — built and deployed responsive web applications, integrated third-party APIs, and optimised performance against tight deadlines while collaborating with remote teams.",
    achievements: [
      "Shipped multiple production sites inside a 4-month sprint",
      "Built recurring client relationships from one-off gigs",
    ],
    technologies: ["React", "Next.js", "Node.js", "TailwindCSS"],
  },
];

const Experience = () => (
  <section id="experience" style={s.section}>
    <div style={s.inner} className="exp-inner">
      <div style={s.labelRow}>
        <span style={s.labelLine} />
        <span style={s.labelText}>04 / Career</span>
      </div>

      <div style={s.headRow} className="exp-head">
        <motion.h2
          style={s.heading}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Five years of <em style={s.em}>production</em> receipts.
        </motion.h2>
        <motion.p
          style={s.sub}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          The teams I&apos;ve shipped with, the codebases I&apos;ve owned,
          and the products I&apos;ve taken from messy first commit to
          production load.
        </motion.p>
      </div>

      <div style={s.timeline} className="exp-timeline">
        <div style={s.rail} className="exp-rail" />

        {experiences.map((exp, i) => (
          <motion.div
            key={exp.company + exp.period}
            style={s.entry}
            className="exp-entry"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.6,
              delay: i * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div style={s.marker} className="exp-marker">
              <div style={s.markerDot} />
            </div>

            <div style={s.periodCol} className="exp-period-col">
              {exp.period}
            </div>

            <div style={s.card}>
              <div style={s.cardTop}>
                <div>
                  <h3 style={s.role}>{exp.role}</h3>
                  <p style={s.company}>
                    <span style={s.companyName}>{exp.company}</span>
                    <span style={s.dot}>·</span>
                    <span style={s.location}>{exp.location}</span>
                  </p>
                  <p style={s.periodMobile} className="exp-period-mobile">
                    {exp.period}
                  </p>
                </div>
                <span style={s.idx}>{String(i + 1).padStart(2, "0")}</span>
              </div>

              <p style={s.desc}>{exp.description}</p>

              {exp.achievements.length > 0 && (
                <ul style={s.achievements}>
                  {exp.achievements.map((a) => (
                    <li key={a} style={s.achItem}>
                      <span style={s.achCheck}>✓</span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div style={s.techRow}>
                {exp.technologies.map((t) => (
                  <span key={t} style={s.techTag}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>

    <style>{`
      .exp-period-mobile { display: none; }
      @media (max-width: 1024px) {
        .exp-head { grid-template-columns: 1fr !important; gap: 16px !important; }
      }
      @media (max-width: 880px) {
        .exp-timeline { padding-left: 0 !important; }
        .exp-rail { display: none !important; }
        .exp-marker { display: none !important; }
        .exp-period-col { display: none !important; }
        .exp-period-mobile { display: block !important; }
      }
      @media (max-width: 640px) {
        .exp-inner { padding: 96px 20px !important; }
      }
    `}</style>
  </section>
);

const s: Record<string, React.CSSProperties> = {
  section: {
    background: "var(--ink-950)",
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
  headRow: {
    display: "grid",
    gridTemplateColumns: "1.3fr 1fr",
    gap: 64,
    alignItems: "end",
    paddingBottom: 48,
    borderBottom: "1px solid var(--line)",
    marginBottom: 72,
  },
  heading: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(32px, 4.5vw, 60px)",
    fontWeight: 400,
    lineHeight: 1.05,
    letterSpacing: "-0.025em",
    color: "var(--cream)",
    margin: 0,
    maxWidth: "16ch",
  },
  em: { color: "var(--accent)", fontStyle: "italic", fontWeight: 400 },
  sub: {
    color: "var(--cream-soft)",
    fontSize: "0.98rem",
    lineHeight: 1.7,
    margin: 0,
    maxWidth: 460,
  },
  timeline: {
    position: "relative",
    paddingLeft: 220,
  },
  rail: {
    position: "absolute",
    left: 160,
    top: 28,
    bottom: 28,
    width: 1,
    background:
      "linear-gradient(180deg, transparent, var(--line) 10%, var(--line) 90%, transparent)",
  },
  entry: {
    position: "relative",
    paddingBottom: 40,
    marginBottom: 40,
    borderBottom: "1px solid var(--line-soft)",
  },
  marker: {
    position: "absolute",
    left: -68,
    top: 30,
    width: 14,
    height: 14,
    borderRadius: "50%",
    border: "2px solid var(--accent)",
    background: "var(--ink-950)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  markerDot: {
    width: 5,
    height: 5,
    borderRadius: "50%",
    background: "var(--accent)",
  },
  periodCol: {
    position: "absolute",
    left: -220,
    top: 28,
    width: 140,
    textAlign: "right" as const,
    fontFamily: "var(--font-mono)",
    fontSize: "0.7rem",
    color: "var(--accent)",
    letterSpacing: "0.05em",
    lineHeight: 1.5,
    fontWeight: 600,
  },
  card: {
    padding: "28px 32px 32px",
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.005))",
    border: "1px solid var(--line)",
    borderRadius: 16,
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
    marginBottom: 16,
  },
  role: {
    fontFamily: "var(--font-display)",
    fontSize: "1.35rem",
    color: "var(--cream)",
    letterSpacing: "-0.02em",
    fontWeight: 400,
    margin: "0 0 6px",
    lineHeight: 1.2,
  },
  company: {
    fontFamily: "var(--font-sans)",
    fontSize: "0.88rem",
    color: "var(--cream-soft)",
    fontWeight: 500,
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap" as const,
  },
  companyName: { color: "var(--accent)", fontWeight: 600 },
  dot: { color: "var(--muted-2)" },
  location: { color: "var(--muted)", fontSize: "0.82rem" },
  periodMobile: {
    fontFamily: "var(--font-mono)",
    fontSize: "0.65rem",
    color: "var(--muted)",
    letterSpacing: "0.08em",
    margin: "10px 0 0",
  },
  idx: {
    fontFamily: "var(--font-display)",
    fontSize: "2.2rem",
    color: "var(--line)",
    lineHeight: 1,
    flexShrink: 0,
    fontStyle: "italic",
  },
  desc: {
    color: "var(--cream-soft)",
    fontSize: "0.92rem",
    lineHeight: 1.75,
    margin: "0 0 18px",
  },
  achievements: {
    listStyle: "none",
    padding: 0,
    margin: "0 0 20px",
    display: "flex",
    flexDirection: "column" as const,
    gap: 8,
  },
  achItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
    fontSize: "0.85rem",
    color: "var(--muted)",
    lineHeight: 1.6,
  },
  achCheck: {
    color: "var(--accent)",
    fontWeight: 700,
    flexShrink: 0,
    marginTop: 1,
  },
  techRow: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: 6,
  },
  techTag: {
    fontFamily: "var(--font-mono)",
    fontSize: "0.6rem",
    letterSpacing: "0.04em",
    color: "var(--cream-soft)",
    border: "1px solid var(--line)",
    background: "rgba(255,255,255,0.02)",
    padding: "4px 10px",
    borderRadius: 999,
    fontWeight: 500,
  },
};

export default Experience;
