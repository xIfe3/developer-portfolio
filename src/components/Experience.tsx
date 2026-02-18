"use client";

import { motion } from "framer-motion";
import React from "react";

const experiences = [
  {
    role: "Software Engineer — Full-Stack",
    company: "Babelos",
    location: "Remote",
    period: "Sep 2025 — Present",
    description:
      "Developing web applications using Next.js and NestJS with Docker-based microservices. Working with PostgreSQL and Redis for data management, implementing REST and GraphQL APIs. Contributing to UI/UX improvements and maintaining CI/CD pipelines with GitHub Actions.",
    technologies: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Redis",
      "Docker",
      "Nest.js",
    ],
  },
  {
    role: "Software Engineer — Full-Stack",
    company: "Kedusoft",
    location: "Remote",
    period: "Sep 2024 — Jul 2025",
    description:
      "Built SaaS and fintech platforms with payment integrations using Stripe and Paystack. Optimized database queries with PostgreSQL and implemented Redis caching. Deployed applications using Docker and GitHub Actions CI/CD.",
    technologies: [
      "React",
      "TypeScript",
      "PostgreSQL",
      "Redis",
      "Docker",
      "Kubernetes",
      "Stripe",
      "Paystack",
    ],
  },
  {
    role: "Software Developer",
    company: "World Brain Technology",
    location: "Enugu, NG",
    period: "Feb 2024 — Aug 2024",
    description:
      "Developed a SaaS platform for SMEs using React, Node.js, GraphQL, and PostgreSQL. Built dashboards for data visualization and insights. Worked with microservices architecture and deployed applications on AWS and GCP.",
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
    role: "Lecturer — Software Development",
    company: "Aptech Computer Education",
    location: "Enugu, NG",
    period: "Sep 2022 — Dec 2023",
    description:
      "Taught full-stack web development covering JavaScript, React, Node.js, and databases. Mentored students through hands-on projects and designed structured curriculum materials.",
    technologies: ["JavaScript", "React", "Node.js", "MongoDB", "MySQL"],
  },
  {
    role: "Junior Developer Intern",
    company: "CV2 Career Internship",
    location: "Remote",
    period: "Aug 2023 — Jan 2024",
    description:
      "Contributed to a SaaS platform built with Python and Firebase. Implemented features, fixed bugs, and participated in code reviews. Gained experience with agile practices and CI/CD workflows.",
    technologies: ["Python", "Firebase", "Agile", "CI/CD"],
  },
  {
    role: "Freelance Contract Developer",
    company: "BeeTec",
    location: "Remote",
    period: "Apr 2022 — Aug 2022",
    description:
      "Worked on multiple client projects — built and deployed responsive web applications, integrated APIs, and optimized performance. Delivered on time while collaborating closely with remote teams.",
    technologies: ["React", "Next.js", "Node.js", "TailwindCSS"],
  },
];

const Experience = () => (
  <section id="experience" style={s.section}>
    <div style={s.sectionLabel}>
      <span style={s.labelLine} />
      <span style={s.labelText}>05 — WORK EXPERIENCE</span>
    </div>

    <div style={s.inner}>
      {/* Heading */}
      <motion.div
        style={s.headingRow}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
      >
        <h2 style={s.heading}>
          PROFESSIONAL
          <br />
          <span style={s.accent}>JOURNEY</span>
        </h2>
        <p style={s.sub}>
          Companies I&apos;ve built for, teams I&apos;ve shipped with, and
          products I&apos;ve taken from 0 to production.
        </p>
      </motion.div>

      {/* Timeline entries */}
      <div style={s.timeline}>
        {/* Vertical rail */}
        <div style={s.rail} />

        {experiences.map((exp, i) => (
          <motion.div
            key={i}
            style={s.entry}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.6,
              delay: i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* Rail dot */}
            <div style={s.dot}>
              <div style={s.dotInner} />
            </div>

            {/* Period stamp */}
            <div style={s.period}>{exp.period}</div>

            {/* Card */}
            <div style={s.card}>
              <div style={s.cardHeader}>
                <div>
                  <h3 style={s.role}>{exp.role}</h3>
                  <p style={s.company}>
                    {exp.company}
                    <span style={s.locationDot}>·</span>
                    {exp.location}
                  </p>
                </div>
                <span style={s.indexChip}>0{i + 1}</span>
              </div>

              <div style={s.divider} />

              <p style={s.desc}>{exp.description}</p>

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
  headingRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 80,
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

  timeline: { position: "relative" as const, paddingLeft: 160 },
  rail: {
    position: "absolute" as const,
    left: 120,
    top: 0,
    bottom: 0,
    width: 1,
    background: "#1e1e1e",
  },
  entry: {
    position: "relative" as const,
    marginBottom: 0,
    paddingBottom: 0,
  },
  dot: {
    position: "absolute" as const,
    left: -44,
    top: 28,
    width: 12,
    height: 12,
    border: "1.5px solid #b5f60a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#0a0a0a",
  },
  dotInner: { width: 4, height: 4, background: "#b5f60a" },
  period: {
    position: "absolute" as const,
    left: -160,
    top: 28,
    width: 100,
    textAlign: "right" as const,
    fontFamily: "'Space Mono', monospace",
    fontSize: "0.55rem",
    letterSpacing: "0.08em",
    color: "#fefae0",
    lineHeight: 1.5,
  },
  card: {
    borderBottom: "1px solid #1a1a1a",
    padding: "28px 0 36px",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
    marginBottom: 16,
  },
  role: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "1.5rem",
    color: "#f0ede6",
    letterSpacing: "0.04em",
    margin: "0 0 4px",
  },
  company: {
    fontFamily: "'Space Mono', monospace",
    fontSize: "0.65rem",
    color: "#b5f60a",
    letterSpacing: "0.1em",
    fontWeight: 700,
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  locationDot: { color: "#fefae0" },
  indexChip: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "2.5rem",
    color: "#1a1a1a",
    lineHeight: 1,
    flexShrink: 0,
  },
  divider: { width: 40, height: 1, background: "#b5f60a", margin: "16px 0" },
  desc: {
    color: "#777",
    fontSize: "0.88rem",
    lineHeight: 1.75,
    margin: "0 0 20px",
  },
  techRow: { display: "flex", flexWrap: "wrap" as const, gap: 6 },
  techTag: {
    fontFamily: "'Space Mono', monospace",
    fontSize: "0.55rem",
    letterSpacing: "0.08em",
    color: "#b5f60a",
    border: "1px solid #b5f60a33",
    padding: "4px 10px",
    fontWeight: 700,
  },
};

export default Experience;
