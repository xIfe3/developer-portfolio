"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaWhatsapp,
  FaPaperPlane,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";
import Script from "next/script";

emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);

const contactInfo = [
  {
    icon: <FaMapMarkerAlt />,
    label: "Location",
    value: "Enugu, Nigeria",
    href: null,
  },
  {
    icon: <FaEnvelope />,
    label: "Email",
    value: "me@xife3.space",
    href: "mailto:me@xife3.space",
  },
  {
    icon: <FaPhone />,
    label: "Phone",
    value: "+234 811 320 8256",
    href: "tel:+2348113208256",
  },
  {
    icon: <FaWhatsapp />,
    label: "WhatsApp",
    value: "+234 811 320 8256",
    href: "https://wa.link/rlr1e3",
  },
];

const socials = [
  { icon: <FaGithub />, url: "https://github.com/xIfe3", label: "GitHub" },
  {
    icon: <FaLinkedin />,
    url: "https://www.linkedin.com/in/ifeanyichukwu-onyekwelu",
    label: "LinkedIn",
  },
  { icon: <FaXTwitter />, url: "https://x.com/_xIfe3", label: "Twitter" },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    from_name: "",
    reply_to: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const id = toast.loading("Sending your message…");
    try {
      const token = await window.grecaptcha.enterprise.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,
        { action: "submit" },
      );
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        { ...formData, "g-recaptcha-response": token },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      );
      toast.success("Message sent! I'll get back to you soon.", {
        id,
        duration: 5000,
      });
      setFormData({ from_name: "", reply_to: "", subject: "", message: "" });
    } catch {
      toast.error("Something went wrong. Please try again.", {
        id,
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Script
        src={`https://www.google.com/recaptcha/enterprise.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        strategy="afterInteractive"
      />

      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#141414",
            color: "#f0ede6",
            border: "1px solid #1e1e1e",
          },
          success: { iconTheme: { primary: "#b5f60a", secondary: "#0a0a0a" } },
          error: { iconTheme: { primary: "#ff4d4d", secondary: "#fff" } },
        }}
      />

      <section id="contact" style={s.section}>
        <div style={s.sectionLabel}>
          <span style={s.labelLine} />
          <span style={s.labelText}>06 — CONTACT</span>
        </div>

        <div style={s.inner}>
          {/* Big heading */}
          <motion.div
            style={s.headingRow}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <h2 style={s.heading}>
              LET&apos;S
              <br />
              <span style={s.accent}>CONNECT</span>
            </h2>
            <p style={s.sub}>
              Have a project in mind or want to collaborate? I&apos;m currently
              available for freelance work and open to new opportunities.
            </p>
          </motion.div>

          <div style={s.cols}>
            {/* ── LEFT: info ── */}
            <motion.div
              style={s.leftCol}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7 }}
            >
              {contactInfo.map(({ icon, label, value, href }) => (
                <div key={label} style={s.infoRow}>
                  <div style={s.iconBox}>{icon}</div>
                  <div>
                    <p style={s.infoLabel}>{label}</p>
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={s.infoVal}
                      >
                        {value}
                      </a>
                    ) : (
                      <p style={s.infoVal}>{value}</p>
                    )}
                  </div>
                </div>
              ))}

              <div style={s.socialRow}>
                {socials.map((s2) => (
                  <a
                    key={s2.label}
                    href={s2.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={s.socialIcon}
                    aria-label={s2.label}
                  >
                    {s2.icon}
                  </a>
                ))}
              </div>

              {/* Availability card */}
              <div style={s.availCard}>
                <div style={s.availDot} />
                <div>
                  <p style={s.availTitle}>AVAILABLE FOR WORK</p>
                  <p style={s.availSub}>
                    Open to freelance & full-time remote roles
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ── RIGHT: form ── */}
            <motion.div
              style={s.rightCol}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <form ref={formRef} onSubmit={sendEmail} style={s.form}>
                <div style={s.inputRow}>
                  <Field
                    label="Your Name"
                    id="from_name"
                    name="from_name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.from_name}
                    onChange={handleChange}
                    required
                  />
                  <Field
                    label="Your Email"
                    id="reply_to"
                    name="reply_to"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.reply_to}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Field
                  label="Subject"
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Project Discussion"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
                <TextareaField
                  label="Message"
                  id="message"
                  name="message"
                  placeholder="Hello, I would like to discuss…"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  required
                />

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    ...s.submitBtn,
                    ...(isSubmitting ? s.submitDisabled : {}),
                  }}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <span>SENDING…</span>
                  ) : (
                    <>
                      <FaPaperPlane style={{ fontSize: 14 }} />
                      SEND MESSAGE
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

/* ── Sub-components ── */
type FieldProps = {
  label: string;
  id: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};
const Field = ({
  label,
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
  required,
}: FieldProps) => (
  <div style={fs.wrap}>
    <label htmlFor={id} style={fs.label}>
      {label}
    </label>
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      style={fs.input}
      onFocus={(e) => (e.target.style.borderColor = "#b5f60a")}
      onBlur={(e) => (e.target.style.borderColor = "#1e1e1e")}
    />
  </div>
);

type TextareaFieldProps = {
  label: string;
  id: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  required?: boolean;
};
const TextareaField = ({
  label,
  id,
  name,
  placeholder,
  value,
  onChange,
  rows,
  required,
}: TextareaFieldProps) => (
  <div style={fs.wrap}>
    <label htmlFor={id} style={fs.label}>
      {label}
    </label>
    <textarea
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      required={required}
      style={{ ...fs.input, resize: "vertical" as const }}
      onFocus={(e) => (e.target.style.borderColor = "#b5f60a")}
      onBlur={(e) => (e.target.style.borderColor = "#1e1e1e")}
    />
  </div>
);

const fs: Record<string, React.CSSProperties> = {
  wrap: { display: "flex", flexDirection: "column" as const, gap: 8, flex: 1 },
  label: {
    fontFamily: "'Space Mono', monospace",
    fontSize: "0.6rem",
    letterSpacing: "0.15em",
    color: "#FFF",
    fontWeight: 700,
  },
  input: {
    background: "#0f0f0f",
    border: "1px solid #1e1e1e",
    color: "#f0ede6",
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: "0.9rem",
    padding: "14px 16px",
    outline: "none",
    transition: "border-color 0.2s",
    width: "100%",
    boxSizing: "border-box" as const,
  },
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
  cols: {
    display: "grid",
    gridTemplateColumns: "1fr 1.4fr",
    gap: 80,
    alignItems: "start",
  },
  leftCol: { display: "flex", flexDirection: "column" as const, gap: 0 },
  infoRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: 16,
    padding: "20px 0",
    borderBottom: "1px solid #1a1a1a",
  },
  iconBox: {
    width: 36,
    height: 36,
    background: "#111",
    border: "1px solid #1e1e1e",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#b5f60a",
    fontSize: "0.9rem",
    flexShrink: 0,
  },
  infoLabel: {
    fontFamily: "'Space Mono', monospace",
    fontSize: "0.58rem",
    letterSpacing: "0.15em",
    color: "#FFF",
    fontWeight: 700,
    margin: "0 0 4px",
  },
  infoVal: {
    fontSize: "0.88rem",
    color: "#ccc",
    margin: 0,
    textDecoration: "none",
  },
  socialRow: {
    display: "flex",
    gap: 12,
    padding: "24px 0",
    borderBottom: "1px solid #1a1a1a",
  },
  socialIcon: {
    width: 36,
    height: 36,
    background: "#111",
    border: "1px solid #1e1e1e",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#FFF",
    fontSize: "0.9rem",
    textDecoration: "none",
    transition: "color 0.2s, border-color 0.2s",
  },
  availCard: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    background: "#0f0f0f",
    border: "1px solid #1e1e1e",
    padding: "20px",
    marginTop: 32,
  },
  availDot: {
    width: 10,
    height: 10,
    background: "#b5f60a",
    borderRadius: "50%",
    flexShrink: 0,
    boxShadow: "0 0 8px #b5f60a",
    animation: "pulse 2s ease-in-out infinite",
  },
  availTitle: {
    fontFamily: "'Space Mono', monospace",
    fontSize: "0.62rem",
    letterSpacing: "0.15em",
    color: "#b5f60a",
    fontWeight: 700,
    margin: "0 0 4px",
  },
  availSub: { fontSize: "0.8rem", color: "#FFF", margin: 0 },
  rightCol: {},
  form: { display: "flex", flexDirection: "column" as const, gap: 20 },
  inputRow: { display: "flex", gap: 16 },
  submitBtn: {
    fontFamily: "'Space Mono', monospace",
    fontSize: "0.72rem",
    fontWeight: 700,
    letterSpacing: "0.12em",
    background: "#b5f60a",
    color: "#0a0a0a",
    border: "none",
    padding: "16px 32px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    clipPath:
      "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
    transition: "opacity 0.2s",
    width: "100%",
  },
  submitDisabled: { opacity: 0.5, cursor: "not-allowed" },
};

declare global {
  interface Window {
    grecaptcha: {
      enterprise: {
        execute: (
          siteKey: string,
          options: { action: string },
        ) => Promise<string>;
      };
    };
  }
}

export default Contact;
