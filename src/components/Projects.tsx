"use client";

import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import Image from "next/image";
import React from "react";

const projects = [
  {
    title: "Investment Analytics Platform",
    description:
      "Full-stack investment analytics platform with real-time data visualization and user authentication.",
    technologies: ["Next.js", "Node.js", "MongoDB", "Chart.js"],
    image: "/projects/hedgeon-finance.png",
    githubUrl: "https://github.com/xIfe3/hedgeon-finance",
    liveUrl: "https://hedgeon-finance-ifekels-projects.vercel.app/",
    featured: true,
    index: "01",
  },
  {
    title: "ReginaNostra School Management",
    description:
      "Comprehensive school management system with real-time tracking and reporting for staff and students.",
    technologies: ["Next.js", "Node.js", "Tailwind CSS"],
    image: "/projects/reginanostra.png",
    githubUrl: "https://github.com/xIfe3/regina-nostras-schools",
    liveUrl: "https://www.reginanostraschools.com/",
    featured: false,
    index: "02",
  },
  {
    title: "1010 Realty Group",
    description:
      "Modern real estate platform with property listings, advanced search, filtering and detailed property views.",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    image: "/projects/1010.png",
    githubUrl: "https://github.com/xIfe3/10-10-realty-group",
    liveUrl: "https://1010-realty-group.vercel.app/",
    featured: false,
    index: "03",
  },
  {
    title: "MintVerse NFT Marketplace",
    description:
      "NFT marketplace with full minting, buying and selling functionality powered by IPFS storage.",
    technologies: ["Python", "Flask", "MySQL", "IPFS"],
    image: "/projects/mintverse.png",
    githubUrl: "https://github.com/xIfe3/mintverse",
    liveUrl: "https://mintverse.art/",
    featured: true,
    index: "04",
  },
];

const Projects = () => (
  <section id="projects" style={s.section}>
    <div style={s.sectionLabel}>
      <span style={s.labelLine} />
      <span style={s.labelText}>04 — SELECTED WORK</span>
    </div>

    <div style={s.inner}>
      {/* Heading row */}
      <motion.div
        style={s.headingRow}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
      >
        <h2 style={s.heading}>
          RECENT
          <br />
          <span style={s.accent}>PROJECTS</span>
        </h2>
        <p style={s.sub}>
          A curated selection of things I&apos;ve built — from fintech
          dashboards to on-chain marketplaces.
        </p>
      </motion.div>

      {/* Featured row (2 large) */}
      <div style={s.featuredRow}>
        {projects
          .filter((p) => p.featured)
          .map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              large
              delay={i * 0.15}
            />
          ))}
      </div>

      {/* Regular row */}
      <div style={s.regularRow}>
        {projects
          .filter((p) => !p.featured)
          .map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              large={false}
              delay={i * 0.12}
            />
          ))}
      </div>
    </div>
  </section>
);

const ProjectCard = ({
  project,
  large,
  delay,
}: {
  project: (typeof projects)[0];
  large: boolean;
  delay: number;
}) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <motion.article
      style={{ ...s.card, ...(large ? s.cardLarge : s.cardSmall) }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div style={{ ...s.imgWrap, height: large ? 280 : 200 }}>
        <Image
          src={project.image}
          alt={project.title}
          fill
          style={{
            objectFit: "cover",
            filter: hovered ? "grayscale(0%)" : "grayscale(30%) contrast(1.05)",
            transition: "filter 0.5s, transform 0.5s",
            transform: hovered ? "scale(1.04)" : "scale(1)",
          }}
        />
        {/* Overlay links */}
        <motion.div
          style={{
            ...s.imgOverlay,
            opacity: hovered ? 1 : 0,
          }}
        >
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={s.overlayBtn}
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={s.overlayBtn}
            aria-label="Live"
          >
            <FaExternalLinkAlt />
          </a>
        </motion.div>

        {/* Featured chip */}
        {project.featured && <div style={s.featuredChip}>FEATURED ✦</div>}
      </div>

      {/* Body */}
      <div style={s.cardBody}>
        <div style={s.cardTop}>
          <span style={s.projectNum}>{project.index}</span>
          <div style={s.cardLinks}>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={s.linkIcon}
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={s.linkIcon}
              aria-label="Live"
            >
              <FaExternalLinkAlt />
            </a>
          </div>
        </div>

        <h3 style={s.projectTitle}>{project.title}</h3>
        <p style={s.projectDesc}>{project.description}</p>

        <div style={s.techRow}>
          {project.technologies.map((t) => (
            <span key={t} style={s.techTag}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
};

const s: Record<string, React.CSSProperties> = {
  section: {
    background: "#0d0d0d",
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
    marginBottom: 56,
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
  featuredRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(440px, 1fr))",
    gap: 2,
    marginBottom: 2,
  },
  regularRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: 2,
  },
  card: {
    background: "#0a0a0a",
    border: "1px solid #1a1a1a",
    overflow: "hidden",
    cursor: "pointer",
    transition: "border-color 0.3s",
  },
  cardLarge: {},
  cardSmall: {},
  imgWrap: {
    position: "relative" as const,
    overflow: "hidden",
    background: "#111",
  },
  imgOverlay: {
    position: "absolute" as const,
    inset: 0,
    background: "rgba(10,10,10,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    transition: "opacity 0.3s",
  },
  overlayBtn: {
    width: 44,
    height: 44,
    background: "#b5f60a",
    color: "#0a0a0a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1rem",
    textDecoration: "none",
    transition: "transform 0.2s",
  },
  featuredChip: {
    position: "absolute" as const,
    top: 16,
    left: 16,
    background: "#b5f60a",
    color: "#0a0a0a",
    fontFamily: "'Space Mono', monospace",
    fontSize: "0.58rem",
    fontWeight: 700,
    letterSpacing: "0.12em",
    padding: "5px 10px",
  },
  cardBody: { padding: "24px 24px 28px" },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  projectNum: {
    fontFamily: "'Space Mono', monospace",
    fontSize: "0.6rem",
    color: "#b5f60a",
    fontWeight: 700,
    letterSpacing: "0.1em",
  },
  cardLinks: { display: "flex", gap: 12 },
  linkIcon: {
    color: "#fefae0",
    fontSize: "0.85rem",
    textDecoration: "none",
    transition: "color 0.2s",
  },
  projectTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "1.7rem",
    color: "#f0ede6",
    letterSpacing: "0.04em",
    margin: "0 0 8px",
  },
  projectDesc: {
    color: "#777",
    fontSize: "0.85rem",
    lineHeight: 1.65,
    margin: "0 0 16px",
  },
  techRow: { display: "flex", flexWrap: "wrap" as const, gap: 6 },
  techTag: {
    fontFamily: "'Space Mono', monospace",
    fontSize: "0.58rem",
    letterSpacing: "0.08em",
    color: "#b5f60a",
    border: "1px solid #b5f60a33",
    padding: "4px 10px",
    fontWeight: 700,
  },
};

export default Projects;
