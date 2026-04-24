"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const menuItems = [
  { name: "Home", link: "#home" },
  { name: "About", link: "#about" },
  { name: "Expertise", link: "#skills" },
  { name: "Work", link: "#projects" },
  { name: "Experience", link: "#experience" },
  { name: "Clients", link: "#testimonials" },
  { name: "Contact", link: "#contact" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    const onResize = () => setIsMobile(window.innerWidth < 900);
    onScroll();
    onResize();
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <motion.header
        className="io-header"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          ...styles.header,
          background: scrolled ? "rgba(7,8,10,0.85)" : "transparent",
          borderBottom: scrolled
            ? "1px solid var(--line)"
            : "1px solid transparent",
          backdropFilter: scrolled ? "blur(16px) saturate(140%)" : "none",
          WebkitBackdropFilter: scrolled
            ? "blur(16px) saturate(140%)"
            : "none",
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link href="#home" style={styles.logo} aria-label="Home">
            <span style={styles.logoMark}>IO</span>
            <span style={styles.logoName}>
              Ifeanyi <span style={styles.logoSurname}>Onyekwelu</span>
            </span>
          </Link>
        </motion.div>

        {!isMobile && (
          <nav>
            <motion.ul
              style={styles.navList}
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: {
                  transition: { staggerChildren: 0.07, delayChildren: 0.35 },
                },
              }}
            >
              {menuItems.map((item) => (
                <motion.li
                  key={item.name}
                  variants={{
                    hidden: { opacity: 0, y: -10 },
                    show: { opacity: 1, y: 0 },
                  }}
                >
                  <NavLink item={item} />
                </motion.li>
              ))}
            </motion.ul>
          </nav>
        )}

        {!isMobile && (
          <motion.a
            href="#contact"
            style={styles.cta}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <span style={styles.ctaDot} />
            Hire me
          </motion.a>
        )}

        {isMobile && (
          <button
            onClick={() => setMobileMenuOpen((o) => !o)}
            style={styles.burger}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <BurgerIcon open={mobileMenuOpen} />
          </button>
        )}
      </motion.header>

      <style>{`
        @media (max-width: 900px) {
          .io-header { padding: 16px 20px !important; }
        }
      `}</style>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={styles.mobileDrawer}
          >
            <ul style={styles.mobileList}>
              {menuItems.map((item, i) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.1 }}
                  style={styles.mobileItem}
                >
                  <Link
                    href={item.link}
                    style={styles.mobileLink}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span style={styles.mobileLinkNum}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span style={styles.mobileLinkText}>{item.name}</span>
                    <span style={styles.mobileLinkArrow}>→</span>
                  </Link>
                </motion.li>
              ))}
            </ul>

            <div style={styles.drawerFoot}>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                style={styles.drawerCta}
              >
                <span style={styles.ctaDot} />
                Hire me
              </a>
              <p style={styles.drawerFooterText}>
                Enugu, NG · Available for remote work
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const NavLink = ({ item }: { item: { name: string; link: string } }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={item.link}
      style={{
        ...styles.navLink,
        color: hovered ? "var(--cream)" : "var(--cream-soft)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {item.name}
      <motion.span
        style={styles.navUnderline}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      />
    </Link>
  );
};

const BurgerIcon = ({ open }: { open: boolean }) => (
  <svg width="26" height="16" viewBox="0 0 26 16" fill="none">
    <motion.line
      x1="0"
      y1="2"
      x2="26"
      y2="2"
      stroke="var(--cream)"
      strokeWidth="1.5"
      animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
      style={{ originX: "13px", originY: "2px" }}
    />
    <motion.line
      x1="0"
      y1="14"
      x2="26"
      y2="14"
      stroke="var(--accent)"
      strokeWidth="1.5"
      animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
      style={{ originX: "13px", originY: "14px" }}
    />
  </svg>
);

const styles: Record<string, React.CSSProperties> = {
  header: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "18px 56px",
    transition: "background 0.4s, border-color 0.4s",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    textDecoration: "none",
  },
  logoMark: {
    width: 36,
    height: 36,
    borderRadius: 10,
    background: "linear-gradient(135deg, var(--accent), var(--accent-deep))",
    color: "var(--ink-950)",
    fontFamily: "var(--font-display)",
    fontSize: "0.95rem",
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    letterSpacing: "-0.02em",
    boxShadow: "0 4px 16px rgba(224, 164, 88, 0.25)",
  },
  logoName: {
    fontFamily: "var(--font-sans)",
    fontSize: "0.95rem",
    fontWeight: 600,
    color: "var(--cream)",
    letterSpacing: "-0.01em",
  },
  logoSurname: { color: "var(--muted)", fontWeight: 500 },
  navList: {
    display: "flex",
    listStyle: "none",
    margin: 0,
    padding: 0,
    gap: 34,
    alignItems: "center",
  },
  navLink: {
    position: "relative",
    fontFamily: "var(--font-sans)",
    fontSize: "0.88rem",
    fontWeight: 500,
    textDecoration: "none",
    paddingBottom: 4,
    letterSpacing: "-0.01em",
    transition: "color 0.2s",
  },
  navUnderline: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    background: "var(--accent)",
    transformOrigin: "left",
    transform: "scaleX(0)",
  },
  cta: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    fontFamily: "var(--font-sans)",
    fontSize: "0.85rem",
    fontWeight: 600,
    color: "var(--cream)",
    textDecoration: "none",
    padding: "10px 18px",
    border: "1px solid var(--line)",
    borderRadius: 999,
    background: "rgba(255,255,255,0.02)",
    transition: "all 0.25s",
    letterSpacing: "-0.01em",
  },
  ctaDot: {
    display: "inline-block",
    width: 7,
    height: 7,
    background: "var(--accent)",
    borderRadius: "50%",
    boxShadow: "0 0 10px var(--accent)",
  },
  burger: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: 6,
    display: "flex",
    alignItems: "center",
  },
  mobileDrawer: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 90,
    background: "var(--ink-950)",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "space-between",
    padding: "100px 32px 40px",
    borderTop: "1px solid var(--line)",
  },
  mobileList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column" as const,
  },
  mobileItem: { borderBottom: "1px solid var(--line)" },
  mobileLink: {
    display: "flex",
    alignItems: "center",
    gap: 18,
    padding: "20px 0",
    textDecoration: "none",
  },
  mobileLinkNum: {
    fontFamily: "var(--font-mono)",
    fontSize: "0.7rem",
    color: "var(--accent)",
    letterSpacing: "0.08em",
    minWidth: 24,
  },
  mobileLinkText: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(2rem, 7vw, 2.8rem)",
    color: "var(--cream)",
    letterSpacing: "-0.02em",
    fontWeight: 400,
  },
  mobileLinkArrow: {
    marginLeft: "auto",
    fontSize: "1.1rem",
    color: "var(--muted-3)",
  },
  drawerFoot: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 16,
  },
  drawerCta: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    fontFamily: "var(--font-sans)",
    fontSize: "0.9rem",
    fontWeight: 600,
    color: "var(--ink-950)",
    background: "var(--accent)",
    textDecoration: "none",
    padding: "14px 24px",
    borderRadius: 999,
  },
  drawerFooterText: {
    fontFamily: "var(--font-mono)",
    fontSize: "0.68rem",
    color: "var(--muted-2)",
    letterSpacing: "0.12em",
    textAlign: "center" as const,
    margin: 0,
  },
};

export default Header;
