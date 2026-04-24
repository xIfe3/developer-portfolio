"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type Level = "Expert" | "Advanced" | "Proficient";
const levelPct: Record<Level, number> = {
  Expert: 95,
  Advanced: 80,
  Proficient: 65,
};

const categories: {
  idx: string;
  title: string;
  blurb: string;
  skills: { name: string; level: Level; icon: string }[];
}[] = [
  {
    idx: "01",
    title: "Frontend Engineering",
    blurb:
      "Typed React apps, design systems, and interfaces that stay performant under real-world data loads.",
    skills: [
      { name: "TypeScript", level: "Expert", icon: "/icons/typeScript.svg" },
      { name: "React / Next.js", level: "Expert", icon: "/icons/react.svg" },
      { name: "Tailwind CSS", level: "Advanced", icon: "/icons/tailwind.svg" },
      { name: "JavaScript (ES2024)", level: "Expert", icon: "/icons/JavaScript.svg" },
      { name: "HTML / CSS3", level: "Expert", icon: "/icons/html5.svg" },
    ],
  },
  {
    idx: "02",
    title: "Backend & APIs",
    blurb:
      "REST and GraphQL services, event-driven pipelines, queue workers, and payment integrations at scale.",
    skills: [
      { name: "Node.js / NestJS", level: "Expert", icon: "/icons/nodejs.svg" },
      { name: "PostgreSQL", level: "Advanced", icon: "/icons/postgres.svg" },
      { name: "Python / FastAPI", level: "Advanced", icon: "/icons/fastapi.png" },
      { name: "Go", level: "Proficient", icon: "/icons/go.svg" },
      { name: "Redis / Caching", level: "Advanced", icon: "/icons/postgres.svg" },
    ],
  },
  {
    idx: "03",
    title: "AI Integration & DevOps",
    blurb:
      "LLM-powered features, LangChain workflows, RAG pipelines, plus the containers and CI/CD that keep them shipping.",
    skills: [
      { name: "LangChain", level: "Advanced", icon: "/icons/python.svg" },
      { name: "OpenAI / Anthropic APIs", level: "Advanced", icon: "/icons/python.svg" },
      { name: "RAG · Embeddings", level: "Proficient", icon: "/icons/python.svg" },
      { name: "Docker · CI/CD", level: "Advanced", icon: "/icons/docker.svg" },
      { name: "AWS / GCP", level: "Advanced", icon: "/icons/aws.svg" },
    ],
  },
];

const Skills = () => (
  <section id="skills" style={s.section}>
    <div style={s.inner} className="skills-inner">
      <div style={s.labelRow}>
        <span style={s.labelLine} />
        <span style={s.labelText}>02 / Expertise</span>
      </div>

      <div style={s.headRow} className="skills-head">
        <motion.h2
          style={s.heading}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          A stack built for <em style={s.em}>depth</em>, not buzzwords.
        </motion.h2>
        <motion.p
          style={s.sub}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Five years of writing, shipping, and rewriting production code — these are the tools I reach for when reliability isn&apos;t optional.
        </motion.p>
      </div>

      <div style={s.grid} className="skills-grid">
        {categories.map((cat, ci) => (
          <motion.div
            key={cat.title}
            style={s.card}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: ci * 0.1 }}
          >
            <div style={s.cardHead}>
              <span style={s.catIdx}>{cat.idx}</span>
              <h3 style={s.catTitle}>{cat.title}</h3>
            </div>
            <p style={s.catBlurb}>{cat.blurb}</p>

            <div style={s.skillList}>
              {cat.skills.map((sk, si) => (
                <motion.div
                  key={sk.name}
                  style={s.skillRow}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + si * 0.05 }}
                >
                  <div style={s.skillLeft}>
                    <div style={s.iconBox}>
                      <Image
                        src={sk.icon}
                        alt={sk.name}
                        width={18}
                        height={18}
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                    <span style={s.skillName}>{sk.name}</span>
                  </div>

                  <div style={s.meterWrap}>
                    <div style={s.meter}>
                      <motion.div
                        style={s.meterFill}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${levelPct[sk.level]}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1,
                          delay: 0.2 + si * 0.05,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      />
                    </div>
                    <span style={s.skillLevel}>{sk.level}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>

    <style>{`
      @media (max-width: 1024px) {
        .skills-grid { grid-template-columns: 1fr !important; }
        .skills-head { grid-template-columns: 1fr !important; gap: 16px !important; }
      }
      @media (max-width: 640px) {
        .skills-inner { padding: 96px 20px !important; }
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
    marginBottom: 56,
  },
  heading: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(32px, 4.5vw, 64px)",
    fontWeight: 400,
    lineHeight: 1.05,
    letterSpacing: "-0.025em",
    color: "var(--cream)",
    margin: 0,
    maxWidth: "15ch",
  },
  em: { color: "var(--accent)", fontStyle: "italic", fontWeight: 400 },
  sub: {
    color: "var(--cream-soft)",
    fontSize: "0.98rem",
    lineHeight: 1.7,
    margin: 0,
    maxWidth: 460,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 24,
  },
  card: {
    padding: "32px 28px",
    border: "1px solid var(--line)",
    borderRadius: 16,
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.005))",
  },
  cardHead: {
    display: "flex",
    alignItems: "baseline",
    gap: 12,
    marginBottom: 12,
  },
  catIdx: {
    fontFamily: "var(--font-mono)",
    fontSize: "0.7rem",
    color: "var(--accent)",
    letterSpacing: "0.1em",
    fontWeight: 700,
  },
  catTitle: {
    fontFamily: "var(--font-sans)",
    fontSize: "1.15rem",
    fontWeight: 600,
    color: "var(--cream)",
    margin: 0,
    letterSpacing: "-0.01em",
  },
  catBlurb: {
    fontSize: "0.85rem",
    color: "var(--muted)",
    lineHeight: 1.65,
    margin: "0 0 28px",
    paddingBottom: 24,
    borderBottom: "1px solid var(--line-soft)",
  },
  skillList: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 18,
  },
  skillRow: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 8,
  },
  skillLeft: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  iconBox: {
    width: 28,
    height: 28,
    background: "rgba(255,255,255,0.9)",
    borderRadius: 6,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    flexShrink: 0,
  },
  skillName: {
    fontSize: "0.88rem",
    color: "var(--cream)",
    fontWeight: 500,
    flex: 1,
  },
  meterWrap: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  meter: {
    flex: 1,
    height: 3,
    background: "var(--ink-800)",
    borderRadius: 999,
    overflow: "hidden",
  },
  meterFill: {
    height: "100%",
    background:
      "linear-gradient(90deg, var(--accent-deep), var(--accent) 60%, var(--accent-soft))",
    borderRadius: 999,
  },
  skillLevel: {
    fontFamily: "var(--font-mono)",
    fontSize: "0.6rem",
    color: "var(--muted)",
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    minWidth: 60,
    textAlign: "right" as const,
  },
};

export default Skills;
