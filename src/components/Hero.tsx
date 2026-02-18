"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedin, FaPaperPlane, FaDownload } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import React from "react";

/* ─── Marquee strip ─────────────────────────────────────────────────── */
const roles = [
  "SOFTWARE DEV",
  "FULL-STACK",
  "FRONTEND",
  "BLOCKCHAIN",
  "SMART CONTRACT",
];
const strip = [...roles, ...roles];

const MarqueeStrip = () => (
  <div style={marqueeStyles.wrap}>
    <div style={marqueeStyles.inner}>
      {strip.map((r, i) => (
        <span key={i} style={marqueeStyles.item}>
          {r} <span style={{ color: "#0a0a0a" }}>✦</span>
        </span>
      ))}
    </div>
    <style>{`
      @keyframes marquee {
        from { transform: translateX(0); }
        to   { transform: translateX(-50%); }
      }
      .marquee-inner-anim {
        animation: marquee 22s linear infinite;
      }
    `}</style>
  </div>
);

const marqueeStyles: Record<string, React.CSSProperties> = {
  wrap: {
    overflow: "hidden",
    background: "#b5f60a",
    color: "#0a0a0a",
    padding: "10px 0",
    width: "100%",
  },
  inner: {
    display: "flex",
    whiteSpace: "nowrap" as const,
    animation: "marquee 22s linear infinite",
    fontFamily: "'Space Mono', monospace",
    fontSize: "0.75rem",
    fontWeight: 700,
    letterSpacing: "0.15em",
  },
  item: {
    display: "inline-flex",
    alignItems: "center",
    gap: 16,
    padding: "0 24px",
  },
};

/* ─── Noise overlay ─────────────────────────────────────────────────── */
const NoiseOverlay = () => (
  <div
    style={{
      position: "fixed",
      inset: 0,
      pointerEvents: "none",
      zIndex: 999,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
      opacity: 0.03,
    }}
  />
);

/* ─── Social links ─────────────────────────────────────────────────── */
const socials = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/ifeanyichukwu-onyekwelu",
    icon: <FaLinkedin />,
  },
  { name: "GitHub", url: "https://github.com/xIfe3", icon: <FaGithub /> },
  { name: "Twitter", url: "https://x.com/_xIfe3", icon: <FaXTwitter /> },
];

/* ─── Hero ─────────────────────────────────────────────────────────── */
const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const rect = heroRef.current?.getBoundingClientRect();
      if (!rect) return;
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <NoiseOverlay />

      {/*
        paddingTop: "64px" pushes the entire section content (including the
        marquee) below the fixed header, so the header floats over the dark
        #0a0a0a background — keeping the logo fully visible.
      */}
      <section id="home" ref={heroRef} style={styles.section}>
        {/* ── MARQUEE — sits just below the header ── */}
        <MarqueeStrip />

        {/* ── MAIN GRID ── */}
        <div style={styles.grid}>
          {/* LEFT */}
          <div style={styles.leftCol}>
            <motion.p
              style={styles.eyebrow}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span style={styles.eyebrowLine} /> DEVELOPER / NIGERIA
            </motion.p>

            <div style={styles.nameBlock}>
              <motion.div
                style={styles.nameFirst}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.35,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                IFEANYI
              </motion.div>
              <motion.div
                style={styles.nameLast}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.5,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                ONYEKWELU
              </motion.div>
            </div>

            <motion.p
              style={styles.tagline}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              I craft fast, beautiful, and functional digital products — from
              pixel-perfect UIs to on-chain smart contracts.
            </motion.p>

            <motion.div
              style={styles.ctaRow}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <a href="#contact" style={styles.ctaPrimary}>
                <FaPaperPlane style={{ fontSize: 14 }} /> Got a project?
              </a>
              <a
                href="/IFEANYI ONYEKWELU.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.ctaSecondary}
              >
                <FaDownload style={{ fontSize: 14 }} /> Resume
              </a>
            </motion.div>

            <motion.div
              style={styles.socialRow}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              {socials.map((s) => (
                <Link
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.socialIcon}
                  aria-label={s.name}
                >
                  {s.icon}
                </Link>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — photo */}
          <motion.div
            style={styles.rightCol}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <motion.div
              style={styles.accentBox}
              animate={{
                rotate: [2, -2, 2],
                transition: {
                  repeat: Infinity,
                  duration: 6,
                  ease: "easeInOut",
                },
              }}
            />

            <motion.div
              style={{
                ...styles.photoFrame,
                transform: `rotateX(${-mousePos.y * 0.3}deg) rotateY(${mousePos.x * 0.3}deg)`,
              }}
            >
              <Image
                src="/profile.jpg"
                alt="Ifeanyi Onyekwelu"
                width={420}
                height={520}
                style={styles.photo}
                priority
              />
              <div style={styles.chip}>Available for work ✦</div>
            </motion.div>

            <motion.div
              style={{ ...styles.statCard, top: "12%", right: "-12%" }}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 }}
              whileHover={{ scale: 1.05 }}
            >
              <span style={styles.statNum}>4+</span>
              <span style={styles.statLabel}>Years Exp.</span>
            </motion.div>

            <motion.div
              style={{ ...styles.statCard, bottom: "18%", left: "-14%" }}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <span style={styles.statNum}>20+</span>
              <span style={styles.statLabel}>Projects</span>
            </motion.div>
          </motion.div>
        </div>

        {/* ── BOTTOM STRIP ── */}
        <motion.div
          style={styles.bottomStrip}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          <span style={styles.stripText}>ENUGU, NIGERIA — OPEN TO REMOTE</span>
          <span style={styles.stripText}>© {new Date().getFullYear()}</span>
        </motion.div>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Space+Mono:wght@700&family=Bebas+Neue&display=swap');
          #home * { box-sizing: border-box; }
        `}</style>
      </section>
    </>
  );
};

/* ─── Styles ─────────────────────────────────────────────────────────── */
const styles: Record<string, React.CSSProperties> = {
  section: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column" as const,
    background: "#0a0a0a",
    color: "#f0ede6",
    fontFamily: "'Space Grotesk', sans-serif",
    position: "relative" as const,
    overflow: "hidden",
    /* ↓ KEY FIX: pushes all content (incl. marquee) below the 64px fixed header */
    paddingTop: "64px",
  },
  grid: {
    display: "flex",
    flex: 1,
    maxWidth: "1400px",
    margin: "0 auto",
    width: "100%",
    padding: "60px 48px 40px",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 0,
  },
  leftCol: {
    flex: "1 1 55%",
    display: "flex",
    flexDirection: "column" as const,
    gap: "28px",
    paddingRight: "32px",
  },
  rightCol: {
    flex: "1 1 42%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative" as const,
    minHeight: "520px",
  },
  eyebrow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontFamily: "'Space Mono', monospace",
    fontSize: "0.7rem",
    letterSpacing: "0.2em",
    color: "#888",
    margin: 0,
  },
  eyebrowLine: {
    display: "inline-block",
    width: "32px",
    height: "1px",
    background: "#b5f60a",
  },
  nameBlock: { lineHeight: 0.88, margin: "8px 0" },
  nameFirst: {
    display: "block",
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "clamp(80px, 10vw, 148px)",
    color: "#f0ede6",
    letterSpacing: "0.02em",
  },
  nameLast: {
    display: "block",
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "clamp(80px, 10vw, 148px)",
    color: "#b5f60a",
    letterSpacing: "0.02em",
  },
  tagline: {
    fontSize: "1rem",
    color: "#999",
    lineHeight: 1.7,
    maxWidth: "440px",
    margin: 0,
    fontWeight: 400,
  },
  ctaRow: { display: "flex", gap: "14px", flexWrap: "wrap" as const },
  ctaPrimary: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    background: "#b5f60a",
    color: "#0a0a0a",
    fontWeight: 700,
    fontSize: "0.85rem",
    padding: "14px 28px",
    textDecoration: "none",
    letterSpacing: "0.05em",
    transition: "all 0.2s",
    fontFamily: "'Space Mono', monospace",
    clipPath:
      "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
  },
  ctaSecondary: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    background: "transparent",
    color: "#f0ede6",
    fontWeight: 700,
    fontSize: "0.85rem",
    padding: "13px 28px",
    textDecoration: "none",
    letterSpacing: "0.05em",
    border: "1px solid #444",
    transition: "all 0.2s",
    fontFamily: "'Space Mono', monospace",
    clipPath:
      "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
  },
  socialRow: { display: "flex", gap: "20px", marginTop: "4px" },
  socialIcon: {
    color: "#aaa",
    fontSize: "1.3rem",
    textDecoration: "none",
    transition: "color 0.2s",
  },
  accentBox: {
    position: "absolute" as const,
    inset: "24px",
    border: "1.5px solid #b5f60a22",
    pointerEvents: "none" as const,
    zIndex: 0,
  },
  photoFrame: {
    position: "relative" as const,
    width: "340px",
    height: "440px",
    zIndex: 1,
    transition: "transform 0.1s ease-out",
    clipPath:
      "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))",
    overflow: "hidden",
    background: "#141414",
  },
  photo: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
    objectPosition: "top",
    filter: "grayscale(15%) contrast(1.05)",
  },
  chip: {
    position: "absolute" as const,
    bottom: "16px",
    left: "16px",
    background: "#b5f60a",
    color: "#0a0a0a",
    fontSize: "0.65rem",
    fontFamily: "'Space Mono', monospace",
    fontWeight: 700,
    letterSpacing: "0.12em",
    padding: "6px 12px",
  },
  statCard: {
    position: "absolute" as const,
    background: "#111",
    border: "1px solid #222",
    padding: "14px 20px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "2px",
    zIndex: 2,
    cursor: "default",
  },
  statNum: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "2.2rem",
    color: "#b5f60a",
    lineHeight: 1,
  },
  statLabel: {
    fontFamily: "'Space Mono', monospace",
    fontSize: "0.6rem",
    color: "#666",
    letterSpacing: "0.1em",
  },
  bottomStrip: {
    borderTop: "1px solid #1a1a1a",
    padding: "12px 48px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stripText: {
    fontFamily: "'Space Mono', monospace",
    fontSize: "0.62rem",
    color: "#444",
    letterSpacing: "0.15em",
  },
};

export default Hero;
