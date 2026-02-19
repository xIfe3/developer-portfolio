"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const skillsData = [
  {
    category: "Frontend",
    index: "01",
    description:
      "Build pixel-perfect, responsive UIs with smooth interactions — from component systems to full web apps users actually enjoy using.",
    skills: [
      { name: "HTML / CSS", level: "Expert", icon: "/icons/html5.svg" },
      { name: "JavaScript", level: "Expert", icon: "/icons/javascript.svg" },
      { name: "React", level: "Advanced", icon: "/icons/react.svg" },
      { name: "Next.js", level: "Advanced", icon: "/icons/nextjs.svg" },
      {
        name: "TypeScript",
        level: "Intermediate",
        icon: "/icons/typescript.svg",
      },
    ],
  },
  {
    category: "Backend",
    index: "02",
    description:
      "Architect robust REST & GraphQL APIs, handle auth flows, integrate payment gateways, and build services that hold up at scale.",
    skills: [
      { name: "Node.js", level: "Advanced", icon: "/icons/nodejs.svg" },
      { name: "Go", level: "Intermediate", icon: "/icons/go.svg" },
      { name: "Python", level: "Intermediate", icon: "/icons/python.svg" },
      { name: "FastAPI", level: "Intermediate", icon: "/icons/fastapi.png" },
      {
        name: "MySQL / Postgres",
        level: "Intermediate",
        icon: "/icons/postgres.svg",
      },
    ],
  },
  {
    category: "DevOps & Web3",
    index: "03",
    description:
      "Deploy containerised services, manage CI/CD pipelines, and ship on-chain products — from smart contracts to full dApp integrations.",
    skills: [
      { name: "Git / GitHub", level: "Advanced", icon: "/icons/github.svg" },
      { name: "Docker", level: "Intermediate", icon: "/icons/docker.svg" },
      { name: "Solidity", level: "Intermediate", icon: "/icons/solidity.svg" },
      { name: "AWS", level: "Intermediate", icon: "/icons/aws.svg" },
      { name: "Tailwind CSS", level: "Advanced", icon: "/icons/tailwind.svg" },
    ],
  },
];

const levelMap: Record<string, { color: string; width: string }> = {
  Expert: { color: "#b5f60a", width: "95%" },
  Advanced: { color: "#b5f60a", width: "78%" },
  Intermediate: { color: "#b5f60acc", width: "58%" },
  Beginner: { color: "#b5f60a55", width: "35%" },
};

const Skills = () => (
  <section id="skills" style={s.section}>
    <div style={s.sectionLabel}>
      <span style={s.labelLine} />
      <span style={s.labelText}>03 – SKILLS & TECHNOLOGIES</span>
    </div>

    <div style={s.inner}>
      <motion.div
        style={s.headingWrap}
        className="skills-heading-wrap"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
      >
        <h2 style={s.heading}>
          MY TECH
          <br />
          <span style={s.accent}>STACK</span>
        </h2>
        <p style={s.sub}>
          Not just a list of logos — here&apos;s what I actually do with each
          set of tools.
        </p>
      </motion.div>

      <div style={s.grid} className="skills-grid">
        {skillsData.map((cat, ci) => (
          <motion.div
            key={cat.category}
            style={s.col}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: ci * 0.12 }}
          >
            {/* Category header */}
            <div style={s.catHeader}>
              <span style={s.catNum}>{cat.index}</span>
              <span style={s.catName}>{cat.category.toUpperCase()}</span>
            </div>

            {/* Category description */}
            <p style={s.catDesc}>{cat.description}</p>

            <div style={s.skillList}>
              {cat.skills.map((skill, si) => (
                <motion.div
                  key={skill.name}
                  style={s.skillRow}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: si * 0.07 }}
                >
                  <div style={s.skillLeft}>
                    <div style={s.iconBox}>
                      <Image
                        src={skill.icon}
                        alt={skill.name}
                        width={20}
                        height={20}
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                    <span style={s.skillName}>{skill.name}</span>
                  </div>

                  <div style={s.barTrack}>
                    <motion.div
                      style={{
                        ...s.barFill,
                        background: levelMap[skill.level].color,
                      }}
                      initial={{ width: 0 }}
                      whileInView={{ width: levelMap[skill.level].width }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.9,
                        delay: 0.2 + si * 0.07,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  </div>

                  <span style={s.levelTag}>{skill.level}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>

    <style>{`
      @media (max-width: 768px) {
        #skills { padding: 80px 20px !important; }
        .skills-grid { grid-template-columns: 1fr !important; }
        .skills-heading-wrap { flex-direction: column !important; align-items: flex-start !important; }
      }
    `}</style>
  </section>
);

const s: Record<string, React.CSSProperties> = {
  section: {
    background: "#0a0a0a",
    padding: "120px 48px",
    fontFamily: "'Space Grotesk', sans-serif",
  },
  sectionLabel: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    maxWidth: 1300,
    margin: "0 auto 64px",
  },
  labelLine: { display: "block", width: 40, height: 1, background: "#b5f60a" },
  labelText: {
    fontFamily: "'Space Mono', monospace",
    fontSize: "0.65rem",
    letterSpacing: "0.2em",
    color: "#FFF",
  },
  inner: { maxWidth: 1300, margin: "0 auto" },
  headingWrap: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 64,
    borderBottom: "1px solid #1a1a1a",
    paddingBottom: 40,
    gap: 40,
    flexWrap: "wrap" as const,
  },
  heading: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "clamp(56px, 7vw, 96px)",
    color: "#f0ede6",
    lineHeight: 0.9,
    letterSpacing: "0.03em",
    margin: 0,
  },
  accent: { color: "#b5f60a" },
  sub: {
    color: "#666",
    fontSize: "0.9rem",
    lineHeight: 1.7,
    maxWidth: 340,
    margin: 0,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: 2,
    background: "#1a1a1a",
    border: "1px solid #1a1a1a",
  },
  col: { background: "#0a0a0a", padding: "36px 32px" },
  catHeader: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    paddingBottom: 16,
    marginBottom: 12,
    borderBottom: "1px solid #1a1a1a",
  },
  catNum: {
    fontFamily: "'Space Mono', monospace",
    fontSize: "0.6rem",
    color: "#b5f60a",
    fontWeight: 700,
    letterSpacing: "0.1em",
  },
  catName: {
    fontFamily: "'Space Mono', monospace",
    fontSize: "0.65rem",
    letterSpacing: "0.18em",
    color: "#f0ede6",
    fontWeight: 700,
  },
  catDesc: {
    fontSize: "0.8rem",
    color: "#555",
    lineHeight: 1.65,
    margin: "0 0 24px",
    fontStyle: "italic",
  },
  skillList: { display: "flex", flexDirection: "column" as const, gap: 20 },
  skillRow: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    rowGap: 8,
    columnGap: 12,
    alignItems: "center",
  },
  skillLeft: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    gridColumn: "1 / 2",
  },
  iconBox: {
    width: 32,
    height: 32,
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
    flexShrink: 0,
  },
  skillName: { fontSize: "0.85rem", color: "#ccc", fontWeight: 500 },
  barTrack: {
    gridColumn: "1 / 2",
    height: 2,
    background: "#1e1e1e",
    position: "relative" as const,
    overflow: "hidden",
  },
  barFill: { position: "absolute" as const, top: 0, left: 0, height: "100%" },
  levelTag: {
    gridRow: "1 / 2",
    gridColumn: "2 / 3",
    fontFamily: "'Space Mono', monospace",
    fontSize: "0.55rem",
    letterSpacing: "0.1em",
    color: "#fefae0",
    fontWeight: 700,
    whiteSpace: "nowrap" as const,
    alignSelf: "center",
  },
};

export default Skills;
