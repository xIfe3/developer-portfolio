"use client";

import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaPaintBrush } from "react-icons/fa";
import Image from "next/image";
import React from "react";

const projects = [
  {
    title: "Investment Analytics Platform",
    description:
      "Full-stack investment dashboard delivering real-time portfolio analytics to traders. Reduced data-load latency by 60% through optimised MongoDB aggregation pipelines and Chart.js rendering — turning complex financial data into fast, actionable insights.",
    technologies: ["Next.js", "Node.js", "MongoDB", "Chart.js"],
    image: "/projects/hedgeon-finance.png",
    githubUrl: "https://github.com/xIfe3/hedgeon-finance",
    liveUrl: "https://hedgeon-finance-ifekels-projects.vercel.app/",
    featured: true,
    concept: false,
    index: "01",
  },
  {
    title: "ReginaNostra School Management",
    description:
      "End-to-end school management system adopted by live staff and students. Replaced manual paper-based workflows with real-time attendance tracking, report generation, and role-based access — cutting admin workload significantly.",
    technologies: ["Next.js", "Node.js", "Tailwind CSS"],
    image: "/projects/reginanostra.png",
    githubUrl: "https://github.com/xIfe3/regina-nostras-schools",
    liveUrl: "https://www.reginanostraschools.com/",
    featured: false,
    concept: false,
    index: "02",
  },
  {
    title: "1010 Realty Group",
    description:
      "Production real estate platform handling live property listings with advanced search and filtering. Built with a fully typed Prisma + PostgreSQL data layer and server-side rendering to ensure fast page loads and solid SEO.",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    image: "/projects/1010.png",
    githubUrl: "https://github.com/xIfe3/10-10-realty-group",
    liveUrl: "https://1010-realty-group.vercel.app/",
    featured: false,
    concept: false,
    index: "03",
  },
  {
    title: "MintVerse NFT Marketplace",
    description:
      "Live NFT marketplace with on-chain minting, buying, and selling — backed by IPFS for decentralised asset storage. Designed to handle concurrent transactions without downtime, with a Python/Flask API managing metadata and user state.",
    technologies: ["Python", "Flask", "MySQL", "IPFS"],
    image: "/projects/mintverse.png",
    githubUrl: "https://github.com/xIfe3/mintverse",
    liveUrl: "https://mintverse.art/",
    featured: true,
    concept: false,
    index: "04",
  },
  {
    title: "Wanderlust Smart City",
    description:
      "UI/UX case study for a smart city dashboard delivering real-time environmental data — weather, air quality, noise, and traffic — through a clean, widget-based mobile interface. Designed for clarity, glanceability, and offline resilience.",
    technologies: ["Swift", "SwiftUI", "CoreData", "UI/UX"],
    image: "/projects/wanderlust.png",
    githubUrl: "",
    liveUrl: "",
    featured: false,
    concept: true,
    index: "05",
  },
  {
    title: "Bookify Travel & Hotels",
    description:
      "UI/UX concept for a hotel and travel booking app. Designed a seamless search-to-booking flow with curated destination deals, interactive stay previews, and a clean card-based UI — focused on reducing decision fatigue and driving conversions.",
    technologies: ["React Native", "TypeScript", "Mapbox", "UI/UX"],
    image: "/projects/bookify.png",
    githubUrl: "",
    liveUrl: "",
    featured: false,
    concept: true,
    index: "06",
  },
];

const Projects = () => (
  <section id="projects" style={s.section}>
    <div style={s.sectionLabel}>
      <span style={s.labelLine} />
      <span style={s.labelText}>04 – SELECTED WORK</span>
    </div>

    <div style={s.inner}>
      <motion.div
        style={s.headingRow}
        className="projects-heading-row"
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
          Real products. Real users. Shipped and running in production.
        </p>
      </motion.div>

      <div style={s.featuredRow} className="projects-featured-row">
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

      <div style={s.regularRow} className="projects-regular-row">
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

    <style>{`
      @media (max-width: 768px) {
        #projects { padding: 80px 20px !important; }
        .projects-heading-row { flex-direction: column !important; align-items: flex-start !important; }
        .projects-featured-row { grid-template-columns: 1fr !important; }
        .projects-regular-row { grid-template-columns: 1fr !important; }
      }
    `}</style>
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
        <motion.div style={{ ...s.imgOverlay, opacity: hovered ? 1 : 0 }}>
          {project.concept ? (
            <div style={s.conceptOverlayLabel}>
              <FaPaintBrush style={{ fontSize: "0.8rem" }} />
              <span>UI/UX CONCEPT</span>
            </div>
          ) : (
            <>
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
            </>
          )}
        </motion.div>
        {project.concept ? (
          <div style={s.conceptChip}>CONCEPT ✦</div>
        ) : (
          project.featured && <div style={s.featuredChip}>FEATURED ✦</div>
        )}
      </div>

      <div style={s.cardBody}>
        <div style={s.cardTop}>
          <span style={s.projectNum}>{project.index}</span>
          <div style={s.cardLinks}>
            {project.concept ? (
              <span style={s.conceptBadge}>
                <FaPaintBrush style={{ fontSize: "0.55rem" }} /> CONCEPT
              </span>
            ) : (
              <>
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
              </>
            )}
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
  conceptOverlayLabel: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    color: "#b5f60a",
    fontFamily: "'Space Mono', monospace",
    fontSize: "0.7rem",
    fontWeight: 700,
    letterSpacing: "0.12em",
  },
  conceptChip: {
    position: "absolute" as const,
    top: 16,
    left: 16,
    background: "rgba(181, 246, 10, 0.15)",
    color: "#b5f60a",
    fontFamily: "'Space Mono', monospace",
    fontSize: "0.58rem",
    fontWeight: 700,
    letterSpacing: "0.12em",
    padding: "5px 10px",
    border: "1px solid #b5f60a44",
    backdropFilter: "blur(4px)",
  },
  conceptBadge: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    fontFamily: "'Space Mono', monospace",
    fontSize: "0.55rem",
    letterSpacing: "0.1em",
    color: "#b5f60a",
    opacity: 0.7,
    fontWeight: 700,
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
