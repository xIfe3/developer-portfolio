"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const menuItems = [
  { name: "Home", link: "#home" },
  { name: "About", link: "#about" },
  { name: "Skills", link: "#skills" },
  { name: "Projects", link: "#projects" },
  { name: "Experience", link: "#experience" },
  { name: "Contact", link: "#contact" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    const onResize = () => setIsMobile(window.innerWidth < 768);

    // Set initial values
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
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          ...styles.header,
          background: scrolled ? "rgba(10,10,10,0.92)" : "transparent",
          borderBottom: scrolled
            ? "1px solid #1a1a1a"
            : "1px solid transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        {/* ── LOGO ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
        >
          <Link href="#home" style={styles.logo} aria-label="Home">
            <span style={styles.logoBracket}>[</span>
            xIfe3
            <span style={styles.logoBracket}>]</span>
            <span style={styles.logoDot} />
          </Link>
        </motion.div>

        {/* ── DESKTOP NAV — hidden on mobile via JS, shown on desktop ── */}
        {!isMobile && (
          <nav>
            <motion.ul
              style={styles.navList}
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: {
                  transition: { staggerChildren: 0.1, delayChildren: 0.4 },
                },
              }}
            >
              {menuItems.map((item, i) => (
                <motion.li
                  key={item.name}
                  variants={{
                    hidden: { opacity: 0, y: -12 },
                    show: { opacity: 1, y: 0 },
                  }}
                >
                  <NavLink item={item} index={i} />
                </motion.li>
              ))}
            </motion.ul>
          </nav>
        )}

        {/* ── MOBILE BURGER — hidden on desktop ── */}
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

      {/* ── MOBILE DRAWER ── */}
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
            <span style={styles.drawerCorner} />

            <ul style={styles.mobileList}>
              {menuItems.map((item, i) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 + 0.1 }}
                  style={styles.mobileItem}
                >
                  <Link
                    href={item.link}
                    style={styles.mobileLink}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span style={styles.mobileLinkNum}>0{i + 1}</span>
                    {item.name}
                    <span style={styles.mobileLinkArrow}>→</span>
                  </Link>
                </motion.li>
              ))}
            </ul>

            <p style={styles.drawerFooter}>ENUGU, NG — OPEN TO REMOTE</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/* ─── Desktop nav link ─────────────────────────────────────────────── */
const NavLink = ({
  item,
  index,
}: {
  item: { name: string; link: string };
  index: number;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={item.link}
      style={{
        ...styles.navLink,
        color: hovered ? "#f0ede6" : "#888",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span style={styles.navLinkNum}>0{index + 1}.</span>
      {item.name}
      <motion.span
        style={styles.navUnderline}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
      />
    </Link>
  );
};

/* ─── Burger icon ──────────────────────────────────────────────────── */
const BurgerIcon = ({ open }: { open: boolean }) => (
  <svg width="28" height="18" viewBox="0 0 28 18" fill="none">
    <motion.line
      x1="0"
      y1="2"
      x2="28"
      y2="2"
      stroke="#f0ede6"
      strokeWidth="1.5"
      animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
      style={{ originX: "14px", originY: "2px" }}
    />
    <motion.line
      x1="0"
      y1="9"
      x2="28"
      y2="9"
      stroke="#b5f60a"
      strokeWidth="1.5"
      animate={open ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
    />
    <motion.line
      x1="0"
      y1="16"
      x2="28"
      y2="16"
      stroke="#f0ede6"
      strokeWidth="1.5"
      animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
      style={{ originX: "14px", originY: "16px" }}
    />
  </svg>
);

/* ─── Styles ───────────────────────────────────────────────────────── */
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
    padding: "18px 48px",
    transition: "background 0.4s, border-color 0.4s",
    /* header is exactly 64px tall (18px top + ~28px content + 18px bottom)
       matching the paddingTop: "64px" offset on the Hero section         */
  },
  logo: {
    fontFamily: "'Space Mono', monospace",
    fontSize: "1.15rem",
    fontWeight: 700,
    color: "#f0ede6",
    textDecoration: "none",
    letterSpacing: "0.05em",
    display: "flex",
    alignItems: "center",
    gap: "2px",
  },
  logoBracket: { color: "#b5f60a", fontWeight: 400 },
  logoDot: {
    display: "inline-block",
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#b5f60a",
    marginLeft: "6px",
    marginBottom: "2px",
  },
  navList: {
    display: "flex",
    listStyle: "none",
    margin: 0,
    padding: 0,
    gap: "36px",
    alignItems: "center",
  },
  navLink: {
    position: "relative",
    fontFamily: "'Space Mono', monospace",
    fontSize: "0.72rem",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    paddingBottom: "2px",
    transition: "color 0.2s",
  },
  navLinkNum: { color: "#b5f60a", fontSize: "0.6rem", fontWeight: 700 },
  navUnderline: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "1px",
    background: "#b5f60a",
    transformOrigin: "left",
    transform: "scaleX(0)",
  },
  burger: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "4px",
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
    background: "#0a0a0a",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
    padding: "100px 48px 48px",
    borderTop: "1px solid #1a1a1a",
  },
  drawerCorner: {
    position: "absolute",
    top: "80px",
    right: "48px",
    width: "40px",
    height: "40px",
    borderTop: "1.5px solid #b5f60a",
    borderRight: "1.5px solid #b5f60a",
  },
  mobileList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column" as const,
    gap: "0",
  },
  mobileItem: { borderBottom: "1px solid #1a1a1a" },
  mobileLink: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "22px 0",
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "clamp(2rem, 8vw, 3.5rem)",
    color: "#f0ede6",
    textDecoration: "none",
    letterSpacing: "0.06em",
    transition: "color 0.2s",
  },
  mobileLinkNum: {
    fontFamily: "'Space Mono', monospace",
    fontSize: "0.65rem",
    color: "#b5f60a",
    letterSpacing: "0.1em",
    fontWeight: 700,
    marginTop: "6px",
    minWidth: "24px",
  },
  mobileLinkArrow: {
    marginLeft: "auto",
    fontSize: "1.2rem",
    color: "#444",
    fontFamily: "'Space Mono', monospace",
  },
  drawerFooter: {
    marginTop: "auto",
    fontFamily: "'Space Mono', monospace",
    fontSize: "0.6rem",
    color: "#444",
    letterSpacing: "0.18em",
  },
};

export default Header;
