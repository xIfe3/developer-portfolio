"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { FaQuoteLeft, FaArrowLeft, FaArrowRight } from "react-icons/fa";

const testimonials = [
  {
    name: "Nnamdi",
    role: "Co-Founder & CEO",
    company: "Kedusoft",
    avatar: "Nn",
    quote:
      "Ifeanyi joined us mid-sprint and hit the ground running — no hand-holding needed. He rebuilt our payment integration with Stripe and Paystack in under two weeks, fixing edge cases that had been causing silent failures for months. If you need someone who understands fintech complexity and still ships fast, he's your guy.",
    tags: ["Fintech", "Payment APIs", "Next.js"],
    rating: 5,
  },
  {
    name: "Godson Pius",
    role: "Co-Founder & CEO",
    company: "World Brain Technology",
    avatar: "GP",
    quote:
      "What stood out about Ifeanyi wasn't just the code quality — it was the thinking behind it. He proposed the microservices split that cut our API response times by nearly half, and he documented everything properly. Rare combination of speed and precision.",
    tags: ["Microservices", "GraphQL", "AWS"],
    rating: 5,
  },
  {
    name: "Rev Fr Christopher",
    role: "Product Manager",
    company: "ReginaNostra Schools",
    avatar: "RC",
    quote:
      "When our school launched in mid-2025, we urgently needed a proper school management website. I reached out to Ifeanyi, and he delivered a complete platform from scratch. He didn't just build it — he also trained our staff and stayed available even after launch to make sure everything worked smoothly. We were very satisfied with the result.",
    tags: ["SaaS", "Full-Stack", "Stakeholder mgmt"],
    rating: 5,
  },
  {
    name: "Samuel",
    role: "Blockchain Developer",
    company: "MintVerse",
    avatar: "S",
    quote:
      "Ifeanyi owned the frontend and the API surface that talked to our contracts — including the messy IPFS pieces most devs avoid. He got it working and kept it stable under load. The marketplace launched with zero critical incidents.",
    tags: ["Next.js", "IPFS", "Frontend"],
    rating: 5,
  },
];

const Testimonials = () => {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  const next = () => setActive((i) => (i + 1) % testimonials.length);
  const prev = () =>
    setActive((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" style={s.section}>
      <div style={s.inner} className="testi-inner">
        <div style={s.labelRow}>
          <span style={s.labelLine} />
          <span style={s.labelText}>05 / Clients</span>
        </div>

        <div style={s.headRow} className="testi-head">
          <motion.h2
            style={s.heading}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            What the people who <em style={s.em}>paid the invoice</em> said.
          </motion.h2>
          <motion.p
            style={s.sub}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Founders, leads, and teams who have trusted me with production
            systems — in their own words.
          </motion.p>
        </div>

        <div style={s.layout} className="testi-layout">
          {/* Large quote card */}
          <motion.div
            style={s.quoteCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div style={s.quoteDecor}>
              <FaQuoteLeft />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <div style={s.ratingRow}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} style={s.star}>
                      ★
                    </span>
                  ))}
                </div>

                <p style={s.quoteText}>&ldquo;{t.quote}&rdquo;</p>

                <div style={s.footer}>
                  <div style={s.authorRow}>
                    <div style={s.avatar}>{t.avatar}</div>
                    <div>
                      <p style={s.authorName}>{t.name}</p>
                      <p style={s.authorRole}>
                        {t.role} · <span style={s.company}>{t.company}</span>
                      </p>
                    </div>
                  </div>

                  <div style={s.tags}>
                    {t.tags.map((tag) => (
                      <span key={tag} style={s.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div style={s.controls}>
              <div style={s.pager}>
                <span style={s.pagerNum}>
                  {String(active + 1).padStart(2, "0")}
                </span>
                <span style={s.pagerDiv}>/</span>
                <span style={s.pagerTotal}>
                  {String(testimonials.length).padStart(2, "0")}
                </span>
              </div>
              <div style={s.arrows}>
                <button style={s.arrowBtn} onClick={prev} aria-label="Previous">
                  <FaArrowLeft />
                </button>
                <button
                  style={{ ...s.arrowBtn, ...s.arrowBtnPrimary }}
                  onClick={next}
                  aria-label="Next"
                >
                  <FaArrowRight />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Selector rail */}
          <div style={s.selector} className="testi-selector">
            {testimonials.map((tt, i) => (
              <motion.button
                key={tt.name}
                style={{
                  ...s.selectorItem,
                  ...(i === active ? s.selectorItemActive : {}),
                }}
                onClick={() => setActive(i)}
                whileHover={{ x: i === active ? 0 : 3 }}
              >
                <div
                  style={{
                    ...s.selAvatar,
                    ...(i === active ? s.selAvatarActive : {}),
                  }}
                >
                  {tt.avatar}
                </div>
                <div style={s.selBody}>
                  <span
                    style={{
                      ...s.selName,
                      ...(i === active ? { color: "var(--cream)" } : {}),
                    }}
                  >
                    {tt.name}
                  </span>
                  <span style={s.selRole}>
                    {tt.role} · {tt.company}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .testi-layout { grid-template-columns: 1fr !important; gap: 32px !important; }
          .testi-selector { flex-direction: row !important; overflow-x: auto !important; }
          .testi-selector > button { min-width: 240px !important; }
          .testi-head { grid-template-columns: 1fr !important; gap: 16px !important; }
        }
        @media (max-width: 640px) {
          .testi-inner { padding: 96px 20px !important; }
        }
      `}</style>
    </section>
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
    marginBottom: 64,
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
    maxWidth: 440,
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "1.5fr 1fr",
    gap: 48,
    alignItems: "start",
  },
  quoteCard: {
    position: "relative",
    padding: "56px 56px 40px",
    border: "1px solid var(--line)",
    borderRadius: 20,
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0.005))",
    overflow: "hidden",
  },
  quoteDecor: {
    position: "absolute",
    top: 40,
    right: 48,
    fontSize: "5rem",
    color: "var(--accent-glow)",
    opacity: 0.9,
    pointerEvents: "none",
    transform: "rotate(180deg)",
  },
  ratingRow: {
    display: "flex",
    gap: 4,
    marginBottom: 20,
  },
  star: {
    color: "var(--accent)",
    fontSize: "1rem",
  },
  quoteText: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(1.15rem, 1.7vw, 1.45rem)",
    lineHeight: 1.55,
    color: "var(--cream)",
    letterSpacing: "-0.01em",
    fontWeight: 400,
    margin: "0 0 40px",
    fontStyle: "italic",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 24,
    paddingTop: 24,
    borderTop: "1px solid var(--line)",
    flexWrap: "wrap" as const,
  },
  authorRow: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: "50%",
    background: "linear-gradient(135deg, var(--accent), var(--accent-deep))",
    color: "var(--ink-950)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    fontSize: "1rem",
    letterSpacing: "-0.02em",
    boxShadow: "0 8px 20px rgba(224, 164, 88, 0.22)",
  },
  authorName: {
    fontSize: "1rem",
    color: "var(--cream)",
    fontWeight: 600,
    margin: "0 0 3px",
    letterSpacing: "-0.01em",
  },
  authorRole: {
    fontFamily: "var(--font-mono)",
    fontSize: "0.68rem",
    color: "var(--muted)",
    letterSpacing: "0.04em",
    margin: 0,
  },
  company: { color: "var(--accent)" },
  tags: {
    display: "flex",
    gap: 6,
    flexWrap: "wrap" as const,
  },
  tag: {
    fontFamily: "var(--font-mono)",
    fontSize: "0.6rem",
    letterSpacing: "0.05em",
    color: "var(--cream-soft)",
    border: "1px solid var(--line)",
    background: "rgba(255,255,255,0.03)",
    padding: "4px 10px",
    borderRadius: 999,
    fontWeight: 500,
  },
  controls: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 36,
    paddingTop: 24,
    borderTop: "1px solid var(--line-soft)",
  },
  pager: {
    display: "flex",
    alignItems: "baseline",
    gap: 8,
    fontFamily: "var(--font-mono)",
  },
  pagerNum: {
    fontSize: "1.6rem",
    color: "var(--cream)",
    fontWeight: 700,
  },
  pagerDiv: { color: "var(--muted-3)", fontSize: "1rem" },
  pagerTotal: { color: "var(--muted)", fontSize: "0.9rem" },
  arrows: { display: "flex", gap: 10 },
  arrowBtn: {
    width: 44,
    height: 44,
    borderRadius: "50%",
    background: "transparent",
    border: "1px solid var(--line)",
    color: "var(--cream-soft)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.85rem",
    transition: "all 0.2s",
  },
  arrowBtnPrimary: {
    background: "var(--accent)",
    borderColor: "var(--accent)",
    color: "var(--ink-950)",
  },
  selector: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 8,
    paddingLeft: 24,
    borderLeft: "1px solid var(--line)",
  },
  selectorItem: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: "14px 16px",
    background: "transparent",
    border: "1px solid transparent",
    borderRadius: 12,
    cursor: "pointer",
    textAlign: "left" as const,
    transition: "all 0.25s",
    fontFamily: "var(--font-sans)",
  },
  selectorItemActive: {
    background: "rgba(255,255,255,0.03)",
    borderColor: "var(--line)",
  },
  selAvatar: {
    width: 38,
    height: 38,
    borderRadius: "50%",
    background: "var(--ink-800)",
    border: "1px solid var(--line)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--muted)",
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    fontSize: "0.78rem",
    flexShrink: 0,
  },
  selAvatarActive: {
    background: "linear-gradient(135deg, var(--accent), var(--accent-deep))",
    borderColor: "var(--accent)",
    color: "var(--ink-950)",
  },
  selBody: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 2,
  },
  selName: {
    fontSize: "0.88rem",
    color: "var(--muted)",
    fontWeight: 500,
    letterSpacing: "-0.01em",
  },
  selRole: {
    fontFamily: "var(--font-mono)",
    fontSize: "0.62rem",
    color: "var(--muted-2)",
    letterSpacing: "0.04em",
  },
};

export default Testimonials;
