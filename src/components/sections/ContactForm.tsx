"use client";

import emailjs from "@emailjs/browser";
import Script from "next/script";
import { useState, type ChangeEvent, type FormEvent } from "react";
import toast, { Toaster } from "react-hot-toast";
import { site } from "@/content/site";
import type { EmailConfig } from "@/lib/email";

const empty = { from_name: "", reply_to: "", subject: "", message: "" };

const fieldCls =
  "w-full rounded-xl border border-line bg-paper px-4 py-3.5 text-ink placeholder:text-ink-soft/60 transition-colors focus:border-ink focus:outline-none focus-visible:outline-2 focus-visible:outline-vermilion";

export function ContactForm({ config }: { config: EmailConfig | null }) {
  const [form, setForm] = useState(empty);
  const [sending, setSending] = useState(false);

  if (!config) {
    return (
      <div role="status" className="rounded-2xl border border-line bg-paper p-8">
        <p className="font-display text-2xl">The form is resting today.</p>
        <p className="mt-3 text-ink-soft">
          Email me directly at{" "}
          <a href={`mailto:${site.email}`} className="font-semibold text-ink underline decoration-vermilion-bright underline-offset-4">
            {site.email}
          </a>{" "}
          and I&apos;ll reply within one business day.
        </p>
      </div>
    );
  }

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const id = toast.loading("Sending your message…");
    try {
      const params: Record<string, string> = { ...form };
      if (config.recaptchaKey && window.grecaptcha) {
        params["g-recaptcha-response"] = await window.grecaptcha.enterprise.execute(config.recaptchaKey, {
          action: "submit",
        });
      }
      await emailjs.send(config.serviceId, config.templateId, params, { publicKey: config.publicKey });
      toast.success("Message sent — I'll get back to you within a business day.", { id, duration: 5000 });
      setForm(empty);
    } catch {
      toast.error(`Couldn't send. Please try again, or email ${site.email}.`, { id, duration: 6000 });
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {config.recaptchaKey ? (
        <Script
          src={`https://www.google.com/recaptcha/enterprise.js?render=${config.recaptchaKey}`}
          strategy="afterInteractive"
        />
      ) : null}
      <Toaster
        position="top-center"
        toastOptions={{ style: { background: "#1f1a17", color: "#f3ede3", borderRadius: "999px" } }}
      />
      <form onSubmit={onSubmit} className="grid gap-5 rounded-2xl border border-line bg-paper p-6 md:p-10">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold">
            Your name
            <input name="from_name" required autoComplete="name" value={form.from_name} onChange={onChange} className={fieldCls} placeholder="Jane Doe" />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Email address
            <input name="reply_to" type="email" required autoComplete="email" value={form.reply_to} onChange={onChange} className={fieldCls} placeholder="jane@company.com" />
          </label>
        </div>
        <label className="grid gap-2 text-sm font-semibold">
          Subject
          <input name="subject" required value={form.subject} onChange={onChange} className={fieldCls} placeholder="A product, a role, an idea…" />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Message
          <textarea name="message" required rows={6} value={form.message} onChange={onChange} className={fieldCls} placeholder="What are you building, and where is it stuck?" />
        </label>
        <button
          type="submit"
          disabled={sending}
          className="justify-self-start rounded-full bg-vermilion px-7 py-4 font-semibold text-white transition-transform duration-500 ease-spring hover:-translate-y-[3px] hover:-rotate-[1.5deg] disabled:cursor-wait disabled:opacity-60"
        >
          {sending ? "Sending…" : "Send message →"}
        </button>
      </form>
    </>
  );
}
