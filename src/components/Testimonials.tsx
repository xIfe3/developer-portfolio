"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Adaeze Okafor",
    role: "Co-Founder & CEO",
    company: "Kedusoft",
    avatar: "AO",
    quote:
      "Ifeanyi joined us mid-sprint and hit the ground running — no hand-holding needed. He rebuilt our payment integration with Stripe and Paystack in under two weeks, fixing edge cases that had been causing silent failures for months. If you need someone who understands fintech complexity and still ships fast, he's your guy.",
    tags: ["Fintech", "Payment APIs", "Next.js"],
  },
  {
    name: "Chukwuemeka Eze",
    role: "Lead Engineer",
    company: "World Brain Technology",
    avatar: "CE",
    quote:
      "What stood out about Ifeanyi wasn't just the code quality — it was the thinking behind it. He proposed the microservices split that cut our API response times by nearly half, and he documented everything properly. Rare combination of speed and precision.",
    tags: ["Microservices", "GraphQL", "AWS"],
  },
  {
    name: "Blessing Nwosu",
    role: "Product Manager",
    company: "ReginaNostra Schools",
    avatar: "BN",
    quote:
      "We came to Ifeanyi with a very specific problem — our school management system was a mess of spreadsheets and WhatsApp groups. He built us a proper platform from scratch, trained the staff, and was still reachable for questions weeks after delivery. Genuinely impressed.",
    tags: ["SaaS", "Full-Stack", "Stakeholder Mgmt"],
  },
  {
    name: "Samuel Achebe",
    role: "Blockchain Developer",
    company: "MintVerse",
    avatar: "SA",
    quote:
      "Ifeanyi handled our IPFS integration and NFT contract interactions on the backend — stuff most devs avoid because it's messy. He not only got it working, he made it stable under load. The marketplace ran a successful launch with zero critical incidents.",
    tags: ["Solidity", "IPFS", "Web3"],
  },
];

const Testimonials = () => {
  const [active, setActive] = useState(0);

  return (
    <section id="testimonials" style={s.section}>
      <div style={s.sectionLabel}>
        <span style={s.labelLine} />
        <span style={s.labelText}>06 – TESTIMONIALS</span>
      </div>

      <div style={s.inner}>
        {/* Heading */}
        <motion.div
          style={s.headingRow}
          className="testi-heading-row"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 style={s.heading}>
            WHAT CLIENTS
            <br />
            <span style={s.accent}>ARE SAYING</span>
          </h2>
          <p style={s.sub}>
            Words from the founders, leads, and teams I&apos;ve shipped with.
          </p>
        </motion.div>

        {/* Main testimonial display */}
        <div style={s.layout} className="testi-layout">
          {/* Left — selector list */}
          <div style={s.selectorCol} className="testi-selector">
            {testimonials.map((t, i) => (
              <motion.button
                key={i}
                style={{
                  ...s.selectorItem,
                  ...(active === i ? s.selectorItemActive : {}),
                }}
                onClick={() => setActive(i)}
                whileHover={{ x: active === i ? 0 : 4 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  style={{
                    ...s.selectorAvatar,
                    ...(active === i ? s.selectorAvatarActive : {}),
                  }}
                >
                  {t.avatar}
                </div>
                <div style={s.selectorInfo}>
                  <span
                    style={{
                      ...s.selectorName,
                      ...(active === i ? { color: "#f0ede6" } : {}),
                    }}
                  >
                    {t.name}
                  </span>
                  <span style={s.selectorRole}>
                    {t.role} · {t.company}
                  </span>
                </div>
                {active === i && <div style={s.activeDot} />}
              </motion.button>
            ))}
          </div>

          {/* Right — quote card */}
          <motion.div
            key={active}
            style={s.quoteCard}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Quote icon */}
            <div style={s.quoteIcon}>
              <FaQuoteLeft />
            </div>

            <p style={s.quoteText}>
              &ldquo;{testimonials[active].quote}&rdquo;
            </p>

            <div style={s.quoteFooter}>
              <div style={s.quoteAvatar}>{testimonials[active].avatar}</div>
              <div>
                <p style={s.quoteName}>{testimonials[active].name}</p>
                <p style={s.quoteRole}>
                  {testimonials[active].role} · {testimonials[active].company}
                </p>
              </div>
            </div>

            <div style={s.tagRow}>
              {testimonials[active].tags.map((tag) => (
                <span key={tag} style={s.tag}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Pagination dots */}
            <div style={s.dots}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  style={{ ...s.dot, ...(i === active ? s.dotActive : {}) }}
                  onClick={() => setActive(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .testi-heading-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 64px;
          border-bottom: 1px solid #1a1a1a;
          padding-bottom: 40px;
          gap: 40px;
          flex-wrap: wrap;
        }

        @media (max-width: 768px) {
          #testimonials { padding: 80px 20px !important; }
          .testi-heading-row { flex-direction: column !important; align-items: flex-start !important; }
          .testi-layout { grid-template-columns: 1fr !important; gap: 32px !important; }
          .testi-selector { flex-direction: row !important; flex-wrap: wrap !important; gap: 8px !important; border-right: none !important; border-bottom: 1px solid #1a1a1a !important; padding-right: 0 !important; padding-bottom: 24px !important; }
        }

        @media (max-width: 480px) {
          .testi-selector button { flex: 1 1 calc(50% - 4px) !important; }
        }
      `}</style>
    </section>
  );
};

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
  layout: {
    display: "grid",
    gridTemplateColumns: "280px 1fr",
    gap: 48,
    alignItems: "start",
  },
  selectorCol: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 4,
    borderRight: "1px solid #1a1a1a",
    paddingRight: 32,
  },
  selectorItem: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: "16px 12px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    textAlign: "left" as const,
    position: "relative" as const,
    borderBottom: "1px solid #111",
  },
  selectorItemActive: {
    background: "#111",
  },
  selectorAvatar: {
    width: 40,
    height: 40,
    background: "#1a1a1a",
    border: "1px solid #2a2a2a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Space Mono', monospace",
    fontSize: "0.65rem",
    color: "#666",
    fontWeight: 700,
    flexShrink: 0,
    letterSpacing: "0.05em",
  },
  selectorAvatarActive: {
    background: "#b5f60a",
    border: "1px solid #b5f60a",
    color: "#0a0a0a",
  },
  selectorInfo: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 3,
    flex: 1,
  },
  selectorName: {
    fontSize: "0.82rem",
    color: "#888",
    fontWeight: 600,
  },
  selectorRole: {
    fontFamily: "'Space Mono', monospace",
    fontSize: "0.55rem",
    color: "#444",
    letterSpacing: "0.05em",
  },
  activeDot: {
    width: 6,
    height: 6,
    background: "#b5f60a",
    borderRadius: "50%",
    flexShrink: 0,
  },
  quoteCard: {
    background: "#0d0d0d",
    border: "1px solid #1a1a1a",
    padding: "48px",
    position: "relative" as const,
    clipPath:
      "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))",
  },
  quoteIcon: {
    fontSize: "1.8rem",
    color: "#b5f60a",
    marginBottom: 24,
    opacity: 0.6,
  },
  quoteText: {
    fontSize: "1.05rem",
    color: "#ccc",
    lineHeight: 1.8,
    margin: "0 0 36px",
    fontStyle: "italic",
  },
  quoteFooter: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    marginBottom: 24,
    paddingTop: 24,
    borderTop: "1px solid #1a1a1a",
  },
  quoteAvatar: {
    width: 48,
    height: 48,
    background: "#b5f60a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Space Mono', monospace",
    fontSize: "0.7rem",
    color: "#0a0a0a",
    fontWeight: 700,
    flexShrink: 0,
    letterSpacing: "0.05em",
  },
  quoteName: {
    fontSize: "0.95rem",
    color: "#f0ede6",
    fontWeight: 600,
    margin: "0 0 3px",
  },
  quoteRole: {
    fontFamily: "'Space Mono', monospace",
    fontSize: "0.58rem",
    color: "#555",
    letterSpacing: "0.08em",
    margin: 0,
  },
  tagRow: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: 8,
    marginBottom: 32,
  },
  tag: {
    fontFamily: "'Space Mono', monospace",
    fontSize: "0.55rem",
    letterSpacing: "0.08em",
    color: "#b5f60a",
    border: "1px solid #b5f60a33",
    padding: "4px 10px",
    fontWeight: 700,
  },
  dots: {
    display: "flex",
    gap: 8,
  },
  dot: {
    width: 6,
    height: 6,
    background: "#222",
    border: "none",
    cursor: "pointer",
    padding: 0,
    transition: "background 0.2s, width 0.2s",
  },
  dotActive: {
    background: "#b5f60a",
    width: 20,
  },
};

export default Testimonials;
