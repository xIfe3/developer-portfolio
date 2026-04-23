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
    hint: "UTC+1 · working remote worldwide",
    href: null,
  },
  {
    icon: <FaEnvelope />,
    label: "Email",
    value: "ifeanyi@xife3.space",
    hint: "Best for detailed briefs",
    href: "mailto:ifeanyi@xife3.space",
  },
  {
    icon: <FaPhone />,
    label: "Phone",
    value: "+234 811 320 8256",
    hint: "Scheduled calls only",
    href: "tel:+2348113208256",
  },
  {
    icon: <FaWhatsapp />,
    label: "WhatsApp",
    value: "+234 811 320 8256",
    hint: "Fastest async reply",
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
      toast.success("Message sent — I'll get back to you within 24 hours.", {
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
            background: "var(--ink-850)",
            color: "var(--cream)",
            border: "1px solid var(--line)",
          },
          success: {
            iconTheme: { primary: "var(--accent)", secondary: "var(--ink-950)" },
          },
          error: { iconTheme: { primary: "#ef4444", secondary: "#fff" } },
        }}
      />

      <section id="contact" style={s.section}>
        <div style={s.inner} className="contact-inner">
          <div style={s.labelRow}>
            <span style={s.labelLine} />
            <span style={s.labelText}>06 / Contact</span>
          </div>

          <div style={s.headRow} className="contact-head">
            <motion.h2
              style={s.heading}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              Have a project that&apos;s <em style={s.em}>overdue</em> for a
              senior engineer?
            </motion.h2>
            <motion.p
              style={s.sub}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Currently open to full-time roles and select freelance
              engagements. Tell me what you&apos;re building, where it&apos;s
              stuck, and I&apos;ll reply within 24 hours with a next step.
            </motion.p>
          </div>

          <div style={s.layout} className="contact-layout">
            {/* LEFT: info / channels */}
            <motion.div
              style={s.leftCol}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
            >
              <div style={s.availCard}>
                <div style={s.availHeader}>
                  <div style={s.availDot} />
                  <span style={s.availTitle}>Available for new work</span>
                </div>
                <p style={s.availBody}>
                  Booking engagements for Q2 and Q3. Typical response under a
                  business day.
                </p>
              </div>

              <div style={s.channels}>
                {contactInfo.map(({ icon, label, value, hint, href }) => (
                  <a
                    key={label}
                    href={href || undefined}
                    target={href?.startsWith("http") ? "_blank" : undefined}
                    rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
                    style={{
                      ...s.channel,
                      pointerEvents: href ? "auto" : "none",
                    }}
                  >
                    <div style={s.channelIcon}>{icon}</div>
                    <div style={s.channelBody}>
                      <p style={s.channelLabel}>{label}</p>
                      <p style={s.channelValue}>{value}</p>
                      <p style={s.channelHint}>{hint}</p>
                    </div>
                    <span style={s.channelArrow}>↗</span>
                  </a>
                ))}
              </div>

              <div style={s.socialRow}>
                <span style={s.socialLabel}>Or connect on</span>
                <div style={s.socialIcons}>
                  {socials.map((x) => (
                    <a
                      key={x.label}
                      href={x.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={s.socialIcon}
                      aria-label={x.label}
                    >
                      {x.icon}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* RIGHT: form */}
            <motion.div
              style={s.rightCol}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <form ref={formRef} onSubmit={sendEmail} style={s.form}>
                <div style={s.formHead}>
                  <p style={s.formEyebrow}>Send a message</p>
                  <h3 style={s.formTitle}>Let&apos;s talk about your project</h3>
                </div>

                <div style={s.inputRow} className="contact-input-row">
                  <Field
                    label="Your Name"
                    id="from_name"
                    name="from_name"
                    type="text"
                    placeholder="Jane Doe"
                    value={formData.from_name}
                    onChange={handleChange}
                    required
                  />
                  <Field
                    label="Email Address"
                    id="reply_to"
                    name="reply_to"
                    type="email"
                    placeholder="jane@company.com"
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
                  placeholder="Platform rebuild / Web3 engagement / …"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
                <TextareaField
                  label="Message"
                  id="message"
                  name="message"
                  placeholder="Tell me about the product, the stack, and where it's stuck. Budget and timeline are helpful but not required."
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
                    <span>Sending…</span>
                  ) : (
                    <>
                      <FaPaperPlane style={{ fontSize: 13 }} />
                      Send message
                      <span style={s.btnArrow}>→</span>
                    </>
                  )}
                </motion.button>

                <p style={s.formFoot}>
                  Protected by reCAPTCHA · your message goes directly to my
                  inbox.
                </p>
              </form>
            </motion.div>
          </div>
        </div>

        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.15); }
          }
          @media (max-width: 1024px) {
            .contact-layout { grid-template-columns: 1fr !important; gap: 40px !important; }
            .contact-head { grid-template-columns: 1fr !important; gap: 16px !important; }
          }
          @media (max-width: 640px) {
            .contact-inner { padding: 96px 20px !important; }
            .contact-input-row { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>
    </>
  );
};

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
      onFocus={(e) => {
        e.target.style.borderColor = "var(--accent)";
        e.target.style.background = "rgba(255,255,255,0.03)";
      }}
      onBlur={(e) => {
        e.target.style.borderColor = "var(--line)";
        e.target.style.background = "rgba(255,255,255,0.015)";
      }}
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
      style={{ ...fs.input, resize: "vertical" as const, minHeight: 140 }}
      onFocus={(e) => {
        e.target.style.borderColor = "var(--accent)";
        e.target.style.background = "rgba(255,255,255,0.03)";
      }}
      onBlur={(e) => {
        e.target.style.borderColor = "var(--line)";
        e.target.style.background = "rgba(255,255,255,0.015)";
      }}
    />
  </div>
);

const fs: Record<string, React.CSSProperties> = {
  wrap: { display: "flex", flexDirection: "column" as const, gap: 8 },
  label: {
    fontFamily: "var(--font-mono)",
    fontSize: "0.64rem",
    letterSpacing: "0.12em",
    color: "var(--cream-soft)",
    textTransform: "uppercase" as const,
    fontWeight: 600,
  },
  input: {
    background: "rgba(255,255,255,0.015)",
    border: "1px solid var(--line)",
    color: "var(--cream)",
    fontFamily: "var(--font-sans)",
    fontSize: "0.92rem",
    padding: "14px 16px",
    outline: "none",
    transition: "border-color 0.2s, background 0.2s",
    width: "100%",
    boxSizing: "border-box" as const,
    borderRadius: 10,
  },
};

const s: Record<string, React.CSSProperties> = {
  section: {
    background: "var(--ink-950)",
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
    maxWidth: 460,
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "1fr 1.4fr",
    gap: 56,
    alignItems: "start",
  },
  leftCol: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 24,
  },
  availCard: {
    padding: "20px 20px",
    border: "1px solid rgba(224, 164, 88, 0.25)",
    background:
      "linear-gradient(180deg, rgba(224, 164, 88, 0.08), rgba(224, 164, 88, 0.02))",
    borderRadius: 14,
  },
  availHeader: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 6,
  },
  availDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "var(--accent)",
    boxShadow: "0 0 12px var(--accent)",
    animation: "pulse 2s ease-in-out infinite",
  },
  availTitle: {
    fontFamily: "var(--font-mono)",
    fontSize: "0.68rem",
    letterSpacing: "0.12em",
    color: "var(--accent)",
    textTransform: "uppercase" as const,
    fontWeight: 700,
  },
  availBody: {
    margin: 0,
    fontSize: "0.86rem",
    color: "var(--cream-soft)",
    lineHeight: 1.6,
  },
  channels: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 2,
    border: "1px solid var(--line)",
    borderRadius: 14,
    overflow: "hidden",
    background: "rgba(255,255,255,0.015)",
  },
  channel: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    padding: "18px 20px",
    borderBottom: "1px solid var(--line-soft)",
    textDecoration: "none",
    color: "inherit",
    transition: "background 0.2s",
  },
  channelIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    background: "var(--ink-800)",
    border: "1px solid var(--line)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--accent)",
    fontSize: "0.95rem",
    flexShrink: 0,
  },
  channelBody: { flex: 1 },
  channelLabel: {
    fontFamily: "var(--font-mono)",
    fontSize: "0.6rem",
    letterSpacing: "0.12em",
    color: "var(--muted)",
    textTransform: "uppercase" as const,
    margin: "0 0 2px",
    fontWeight: 600,
  },
  channelValue: {
    fontSize: "0.92rem",
    color: "var(--cream)",
    margin: "0 0 2px",
    fontWeight: 500,
  },
  channelHint: {
    fontSize: "0.76rem",
    color: "var(--muted-2)",
    margin: 0,
  },
  channelArrow: {
    color: "var(--muted-3)",
    fontSize: "1rem",
  },
  socialRow: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    padding: "18px 20px",
    border: "1px solid var(--line)",
    borderRadius: 14,
    justifyContent: "space-between",
  },
  socialLabel: {
    fontFamily: "var(--font-mono)",
    fontSize: "0.66rem",
    letterSpacing: "0.12em",
    color: "var(--muted)",
    textTransform: "uppercase" as const,
    fontWeight: 600,
  },
  socialIcons: {
    display: "flex",
    gap: 10,
  },
  socialIcon: {
    width: 38,
    height: 38,
    borderRadius: "50%",
    background: "var(--ink-800)",
    border: "1px solid var(--line)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--cream-soft)",
    fontSize: "0.9rem",
    textDecoration: "none",
    transition: "color 0.2s, border-color 0.2s",
  },
  rightCol: {},
  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 20,
    padding: "36px 36px 32px",
    border: "1px solid var(--line)",
    borderRadius: 20,
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0.005))",
  },
  formHead: {
    paddingBottom: 20,
    borderBottom: "1px solid var(--line)",
    marginBottom: 4,
  },
  formEyebrow: {
    fontFamily: "var(--font-mono)",
    fontSize: "0.62rem",
    letterSpacing: "0.14em",
    color: "var(--accent)",
    textTransform: "uppercase" as const,
    fontWeight: 700,
    margin: "0 0 6px",
  },
  formTitle: {
    fontFamily: "var(--font-display)",
    fontSize: "1.6rem",
    color: "var(--cream)",
    letterSpacing: "-0.02em",
    fontWeight: 400,
    margin: 0,
  },
  inputRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
  },
  submitBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    fontFamily: "var(--font-sans)",
    fontSize: "0.92rem",
    fontWeight: 600,
    padding: "16px 24px",
    color: "var(--ink-950)",
    background: "var(--accent)",
    border: "none",
    borderRadius: 999,
    cursor: "pointer",
    letterSpacing: "-0.01em",
    boxShadow: "0 12px 30px rgba(224, 164, 88, 0.25)",
    transition: "all 0.2s",
    marginTop: 8,
  },
  submitDisabled: { opacity: 0.5, cursor: "not-allowed" },
  btnArrow: { fontSize: "1rem" },
  formFoot: {
    fontFamily: "var(--font-mono)",
    fontSize: "0.64rem",
    color: "var(--muted-2)",
    textAlign: "center" as const,
    margin: 0,
    letterSpacing: "0.03em",
  },
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
