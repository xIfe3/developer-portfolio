"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const infoItems = [
  { label: "Name", value: "Ifeanyi Onyekwelu" },
  { label: "Email", value: "me@xife3.space" },
  { label: "Experience", value: "4+ Years" },
  { label: "Based In", value: "Enugu, Nigeria" },
  { label: "Focus", value: "Web3 & Full-Stack" },
  { label: "Availability", value: "Open to Work ✦" },
];

const About = () => (
  <section id="about" style={s.section}>
    {/* Section label */}
    <div style={s.sectionLabel}>
      <span style={s.labelLine} />
      <span style={s.labelText}>02 — ABOUT</span>
    </div>

    <div style={s.inner}>
      {/* ── LEFT: photo ── */}
      <motion.div
        style={s.photoCol}
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div style={s.photoWrap}>
          <Image
            src="/ifeanyi.jpg"
            alt="Ifeanyi Onyekwelu"
            width={500}
            height={600}
            style={s.photo}
            priority
          />
          {/* Corner accents */}
          <span
            style={{
              ...s.corner,
              top: -10,
              left: -10,
              borderTopWidth: 2,
              borderLeftWidth: 2,
            }}
          />
          <span
            style={{
              ...s.corner,
              bottom: -10,
              right: -10,
              borderBottomWidth: 2,
              borderRightWidth: 2,
            }}
          />
        </div>

        {/* Floating badge */}
        <motion.div
          style={s.badge}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <span style={s.badgeNum}>4+</span>
          <span style={s.badgeLabel}>
            Years of
            <br />
            Experience
          </span>
        </motion.div>
      </motion.div>

      {/* ── RIGHT: content ── */}
      <motion.div
        style={s.contentCol}
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 style={s.heading}>
          CRAFTING
          <br />
          <span style={s.headingAccent}>DIGITAL</span>
          <br />
          EXPERIENCES
        </h2>

        <div style={s.divider} />

        <p style={s.body}>
          I&apos;m a passionate software developer with expertise in building
          exceptional digital experiences. With a focus on modern web
          technologies, I specialize in creating responsive, user-friendly
          applications that solve real-world problems.
        </p>
        <p style={{ ...s.body, marginTop: 16 }}>
          My journey started 4 years ago — since then I&apos;ve worked across
          React, Next.js, Node.js and blockchain development. I&apos;m
          constantly expanding my skill set to stay at the forefront of web and
          mobile development.
        </p>

        {/* Info grid */}
        <div style={s.infoGrid}>
          {infoItems.map(({ label, value }) => (
            <div key={label} style={s.infoItem}>
              <span style={s.infoLabel}>{label}</span>
              <span style={s.infoValue}>{value}</span>
            </div>
          ))}
        </div>

        <motion.a
          href="#contact"
          style={s.cta}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          LET&apos;S WORK TOGETHER →
        </motion.a>
      </motion.div>
    </div>
  </section>
);

const s: Record<string, React.CSSProperties> = {
  section: {
    background: "#0d0d0d",
    padding: "120px 48px",
    position: "relative",
    fontFamily: "'Space Grotesk', sans-serif",
  },
  sectionLabel: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 64,
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
  inner: {
    maxWidth: 1300,
    margin: "0 auto",
    display: "flex",
    gap: 80,
    alignItems: "flex-start",
  },
  photoCol: { flex: "0 0 420px", position: "relative" },
  photoWrap: {
    position: "relative",
    clipPath:
      "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))",
    overflow: "hidden",
    background: "#141414",
  },
  photo: {
    width: "100%",
    height: "auto",
    display: "block",
    filter: "grayscale(15%) contrast(1.05)",
  },
  corner: {
    position: "absolute",
    width: 28,
    height: 28,
    borderColor: "#b5f60a",
    borderStyle: "solid",
    borderWidth: 0,
  } as React.CSSProperties,
  badge: {
    position: "absolute",
    bottom: -20,
    right: -20,
    background: "#b5f60a",
    padding: "16px 20px",
    display: "flex",
    gap: 12,
    alignItems: "center",
  },
  badgeNum: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "2.8rem",
    color: "#0a0a0a",
    lineHeight: 1,
  },
  badgeLabel: {
    fontFamily: "'Space Mono', monospace",
    fontSize: "0.6rem",
    fontWeight: 700,
    color: "#0a0a0a",
    lineHeight: 1.5,
    letterSpacing: "0.05em",
  },
  contentCol: { flex: 1, paddingTop: 16 },
  heading: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "clamp(52px, 6vw, 88px)",
    color: "#f0ede6",
    lineHeight: 0.9,
    letterSpacing: "0.03em",
    margin: 0,
  },
  headingAccent: { color: "#b5f60a" },
  divider: {
    width: "100%",
    height: 1,
    background: "#1e1e1e",
    margin: "32px 0",
  },
  body: { color: "#888", fontSize: "0.95rem", lineHeight: 1.8, margin: 0 },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "0",
    margin: "36px 0",
    border: "1px solid #1a1a1a",
  },
  infoItem: {
    padding: "16px 20px",
    borderBottom: "1px solid #1a1a1a",
    borderRight: "1px solid #1a1a1a",
    display: "flex",
    flexDirection: "column" as const,
    gap: 4,
  },
  infoLabel: {
    fontFamily: "'Space Mono', monospace",
    fontSize: "0.58rem",
    letterSpacing: "0.15em",
    color: "#b5f60a",
    fontWeight: 700,
  },
  infoValue: { fontSize: "0.9rem", color: "#f0ede6", fontWeight: 500 },
  cta: {
    display: "inline-block",
    fontFamily: "'Space Mono', monospace",
    fontSize: "0.72rem",
    fontWeight: 700,
    letterSpacing: "0.12em",
    color: "#0a0a0a",
    background: "#b5f60a",
    padding: "14px 28px",
    textDecoration: "none",
    clipPath:
      "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
    transition: "opacity 0.2s",
  },
};

export default About;
