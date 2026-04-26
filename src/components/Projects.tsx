"use client";

import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaPaintBrush } from "react-icons/fa";
import Image from "next/image";
import React from "react";

type Project = {
  index: string;
  title: string;
  client: string;
  year: string;
  category: string;
  description: string;
  impact?: string;
  technologies: string[];
  image: string;
  githubUrl: string;
  liveUrl: string;
  featured?: boolean;
  concept?: boolean;
};

const projects: Project[] = [
  {
    index: "01",
    title: "Hedgeon Investment Analytics",
    client: "Hedgeon Finance",
    year: "2025",
    category: "Fintech · Dashboard",
    description:
      "Full-stack investment dashboard delivering real-time portfolio analytics to professional traders. Aggregation pipelines feed chart renderers sub-second on 10M+ rows.",
    impact: "60% latency reduction on core analytics queries",
    technologies: ["Next.js", "Node.js", "MongoDB", "Chart.js"],
    image: "/projects/hedgeon-finance.png",
    githubUrl: "https://github.com/xIfe3/hedgeon-finance",
    liveUrl: "https://hedgeon-finance-ifekels-projects.vercel.app/",
    featured: true,
  },
  {
    index: "02",
    title: "MintVerse NFT Marketplace",
    client: "MintVerse",
    year: "2024",
    category: "Frontend · Light Web3",
    description:
      "Frontend and supporting backend for an NFT marketplace — wallet UX, listings, and minting flows. My scope was the product surface and API integration; on-chain contracts were owned by the blockchain team.",
    impact: "Shipped launch with 0 sev-1 incidents",
    technologies: ["Next.js", "Python", "Flask", "IPFS", "MySQL"],
    image: "/projects/mintverse.png",
    githubUrl: "https://github.com/xIfe3/mintverse",
    liveUrl: "https://mintverse.art/",
    featured: true,
  },
  {
    index: "03",
    title: "ReginaNostra Schools",
    client: "ReginaNostra",
    year: "2025",
    category: "SaaS · Education",
    description:
      "End-to-end school management platform in production use by staff and students — replaced a paper-based workflow with attendance, reporting, and role-based access.",
    impact: "Adopted across entire institution",
    technologies: ["Next.js", "Node.js", "Tailwind"],
    image: "/projects/reginanostra.png",
    githubUrl: "https://github.com/xIfe3/regina-nostras-schools",
    liveUrl: "https://www.reginanostraschools.com/",
  },
  {
    index: "04",
    title: "1010 Realty Group",
    client: "1010 Realty",
    year: "2024",
    category: "Real Estate · Platform",
    description:
      "Production real estate platform with live property listings, advanced search, and a fully typed Prisma + PostgreSQL data layer with SSR for solid SEO.",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    image: "/projects/1010.png",
    githubUrl: "https://github.com/xIfe3/10-10-realty-group",
    liveUrl: "https://1010-realty-group.vercel.app/",
  },
  {
    index: "05",
    title: "PayZeph",
    client: "Zephra Studios",
    year: "2026",
    category: "Fintech · Platform",
    description:
      "A fullstack monorepo bill payment app with shared UI components, automated testing with Jest & Playwright, and Docker-based deployment.",
    impact: "Shipped in 14 Days",
    technologies: ["Next.js", "NestJS", "TypeScript", "Turborepo", "Docker"],
    image: "/projects/payzeph.png",
    githubUrl: "https://github.com/zephradev/payzeph",
    liveUrl: "https://payzeph-zephra.vercel.app/",
  },
  {
    index: "06",
    title: "FlowAnalytics",
    client: "Zephra Studios",
    year: "2026",
    category: "SaaS · Analytics",
    description:
      "A production-ready SaaS dashboard with tiered subscriptions, revenue analytics, CSV exports, Stripe billing, and Google OAuth.",
    impact: "Ready for Production in 2 Weeks",
    technologies: ["Next.js 16", "Prisma", "Stripe", "Recharts", "NextAuth"],
    image: "/projects/flowanalytics.png",
    githubUrl: "https://github.com/zephradev/flowanalytics",
    liveUrl: "https://flowanalytics-zephra.vercel.app/",
  },
  {
    index: "07",
    title: "MediBook",
    client: "Zephra Studios",
    year: "2026",
    category: "SaaS · Health",
    description:
      "A doctor appointment platform with specialty search, real-time slot availability, JWT auth, and separate dashboards for patients and doctors.",
    impact: "2x Faster Than Industry Average",
    technologies: ["Next.js 14", "NestJS", "Prisma", "PostgreSQL", "Tailwind"],
    image: "/projects/medibook.png",
    githubUrl: "https://github.com/zephradev/medibook",
    liveUrl: "https://medibook-zephra.vercel.app/",
  },
  {
    index: "08",
    title: "Savvio",
    client: "Personal Project",
    year: "2026",
    category: "SaaS · Finance",
    description:
      "A budget management app with expense tracking, income monitoring, savings goals, recurring payments, budget alerts, and interactive analytics charts.",
    impact: "Built Without Scope Creep",
    technologies: ["Next.js 15", "NestJS", "Prisma", "PostgreSQL", "Recharts", "JWT"],
    image: "/projects/savvio.png",
    githubUrl: "https://github.com/xIfe3/savvio",
    liveUrl: "https://savvio-budgetting.vercel.app/",
  },
];

const Projects = () => (
  <section id="projects" style={s.section}>
    <div style={s.inner} className="projects-inner">
      <div style={s.labelRow}>
        <span style={s.labelLine} />
        <span style={s.labelText}>03 / Selected Work</span>
      </div>

      <div style={s.headRow} className="projects-head">
        <motion.h2
          style={s.heading}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Work that&apos;s <em style={s.em}>live</em>, not polished for a
          portfolio shelf.
        </motion.h2>
        <motion.p
          style={s.sub}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          A curated slice of platforms serving real users in production —
          fintech, Web3, SaaS, and education. Every one of these shipped, and
          most are still running today.
        </motion.p>
      </div>

      {/* Featured row */}
      <div style={s.featured} className="projects-featured">
        {projects
          .filter((p) => p.featured)
          .map((p, i) => (
            <ProjectCard key={p.title} project={p} large delay={i * 0.12} />
          ))}
      </div>

      {/* Grid */}
      <div style={s.regular} className="projects-regular">
        {projects
          .filter((p) => !p.featured)
          .map((p, i) => (
            <ProjectCard key={p.title} project={p} delay={i * 0.1} />
          ))}
      </div>
    </div>

    <style>{`
      @media (max-width: 1024px) {
        .projects-featured { grid-template-columns: 1fr !important; }
        .projects-regular { grid-template-columns: repeat(2, 1fr) !important; }
        .projects-head { grid-template-columns: 1fr !important; gap: 16px !important; }
      }
      @media (max-width: 720px) {
        .projects-inner { padding: 96px 20px !important; }
        .projects-regular { grid-template-columns: 1fr !important; }
      }
    `}</style>
  </section>
);

const ProjectCard = ({
  project,
  large,
  delay,
}: {
  project: Project;
  large?: boolean;
  delay: number;
}) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <motion.article
      style={s.card}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          ...s.imgWrap,
          height: large ? 340 : 240,
        }}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          style={{
            objectFit: "cover",
            filter: hovered
              ? "contrast(1) saturate(1)"
              : "contrast(1.02) saturate(0.85)",
            transition: "filter 0.5s, transform 0.6s",
            transform: hovered ? "scale(1.04)" : "scale(1)",
          }}
        />

        {/* Gradient scrim */}
        <div style={s.scrim} />

        {/* Top meta chip */}
        <div style={s.topMeta}>
          <span style={project.concept ? s.conceptChip : s.prodChip}>
            {project.concept ? (
              <>
                <FaPaintBrush /> Concept
              </>
            ) : project.featured ? (
              "Featured case"
            ) : (
              "In production"
            )}
          </span>
          <span style={s.yearChip}>{project.year}</span>
        </div>

        {/* Hover overlay */}
        <div style={{ ...s.hoverOverlay, opacity: hovered ? 1 : 0 }}>
          {project.concept ? (
            <span style={s.conceptOverlay}>Case Study — UI/UX</span>
          ) : (
            <div style={s.hoverLinks}>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={s.hoverBtn}
                  aria-label="GitHub"
                >
                  <FaGithub />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={s.hoverBtnPrimary}
                >
                  Visit live <FaExternalLinkAlt style={{ fontSize: 11 }} />
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      <div style={s.body}>
        <div style={s.metaRow}>
          <span style={s.projectIdx}>{project.index}</span>
          <span style={s.category}>{project.category}</span>
          <span style={s.client}>— {project.client}</span>
        </div>

        <h3 style={s.title}>{project.title}</h3>
        <p style={s.desc}>{project.description}</p>

        {project.impact && (
          <div style={s.impactRow}>
            <span style={s.impactDot} />
            <span style={s.impactText}>{project.impact}</span>
          </div>
        )}

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
    fontSize: "clamp(32px, 4.5vw, 60px)",
    fontWeight: 400,
    lineHeight: 1.05,
    letterSpacing: "-0.025em",
    color: "var(--cream)",
    margin: 0,
    maxWidth: "17ch",
  },
  em: { color: "var(--accent)", fontStyle: "italic", fontWeight: 400 },
  sub: {
    color: "var(--cream-soft)",
    fontSize: "0.98rem",
    lineHeight: 1.7,
    margin: 0,
    maxWidth: 460,
  },
  featured: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 24,
    marginBottom: 24,
  },
  regular: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 24,
  },
  card: {
    borderRadius: 16,
    background: "var(--ink-850)",
    border: "1px solid var(--line)",
    overflow: "hidden",
    transition: "border-color 0.3s, transform 0.3s",
    display: "flex",
    flexDirection: "column" as const,
  },
  imgWrap: {
    position: "relative",
    overflow: "hidden",
    background: "var(--ink-800)",
  },
  scrim: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(180deg, rgba(7,8,10,0.3) 0%, transparent 40%, transparent 60%, rgba(7,8,10,0.6) 100%)",
    pointerEvents: "none",
  },
  topMeta: {
    position: "absolute",
    top: 16,
    left: 16,
    right: 16,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 2,
  },
  prodChip: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "5px 12px",
    background: "rgba(7,8,10,0.7)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    border: "1px solid var(--line)",
    borderRadius: 999,
    fontFamily: "var(--font-mono)",
    fontSize: "0.6rem",
    color: "var(--accent)",
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    fontWeight: 700,
  },
  conceptChip: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "5px 12px",
    background: "rgba(7,8,10,0.7)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    border: "1px solid var(--line)",
    borderRadius: 999,
    fontFamily: "var(--font-mono)",
    fontSize: "0.6rem",
    color: "var(--teal)",
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    fontWeight: 700,
  },
  yearChip: {
    fontFamily: "var(--font-mono)",
    fontSize: "0.62rem",
    color: "var(--cream-soft)",
    letterSpacing: "0.08em",
    padding: "5px 10px",
    background: "rgba(7,8,10,0.65)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    border: "1px solid var(--line)",
    borderRadius: 999,
  },
  hoverOverlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(7,8,10,0.6)",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    transition: "opacity 0.35s",
    zIndex: 3,
  },
  hoverLinks: { display: "flex", gap: 12, alignItems: "center" },
  hoverBtn: {
    width: 48,
    height: 48,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid var(--line)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--cream)",
    fontSize: "1.1rem",
    textDecoration: "none",
  },
  hoverBtnPrimary: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "12px 20px",
    background: "var(--accent)",
    color: "var(--ink-950)",
    borderRadius: 999,
    fontSize: "0.85rem",
    fontWeight: 600,
    textDecoration: "none",
    letterSpacing: "-0.01em",
  },
  conceptOverlay: {
    fontFamily: "var(--font-mono)",
    fontSize: "0.78rem",
    color: "var(--teal)",
    letterSpacing: "0.14em",
    textTransform: "uppercase" as const,
    fontWeight: 700,
  },
  body: {
    padding: "24px 24px 28px",
    display: "flex",
    flexDirection: "column" as const,
    gap: 10,
    flex: 1,
  },
  metaRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 4,
    flexWrap: "wrap" as const,
  },
  projectIdx: {
    fontFamily: "var(--font-mono)",
    fontSize: "0.62rem",
    color: "var(--accent)",
    letterSpacing: "0.1em",
    fontWeight: 700,
  },
  category: {
    fontFamily: "var(--font-mono)",
    fontSize: "0.62rem",
    color: "var(--muted)",
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
  },
  client: {
    fontFamily: "var(--font-mono)",
    fontSize: "0.62rem",
    color: "var(--muted-2)",
    letterSpacing: "0.05em",
  },
  title: {
    fontFamily: "var(--font-display)",
    fontSize: "1.5rem",
    color: "var(--cream)",
    letterSpacing: "-0.02em",
    fontWeight: 400,
    margin: 0,
    lineHeight: 1.15,
  },
  desc: {
    color: "var(--muted)",
    fontSize: "0.86rem",
    lineHeight: 1.65,
    margin: 0,
    flex: 1,
  },
  impactRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 14px",
    background: "var(--accent-glow)",
    border: "1px solid rgba(224, 164, 88, 0.2)",
    borderRadius: 8,
    marginTop: 4,
  },
  impactDot: {
    width: 6,
    height: 6,
    background: "var(--accent)",
    borderRadius: "50%",
    flexShrink: 0,
  },
  impactText: {
    fontSize: "0.76rem",
    color: "var(--accent-soft)",
    fontWeight: 500,
    letterSpacing: "-0.005em",
  },
  techRow: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: 6,
    marginTop: 4,
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

export default Projects;
