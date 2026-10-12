"use client";

import emailjs from "@emailjs/browser";
import Script from "next/script";
import { useState, type ChangeEvent, type FormEvent } from "react";
import toast, { Toaster } from "react-hot-toast";
import { site } from "@/content/site";
import type { EmailConfig } from "@/lib/email";
import { cn } from "@/lib/utils";

const budgets = ["Under $2k", "$2k–$5k", "$5k–$15k", "$15k+", "Not sure yet"];

const empty = { from_name: "", reply_to: "", budget: "", message: "" };

const fieldCls =
  "w-full rounded-xl border border-line bg-surface px-4 py-3.5 text-text placeholder:text-faint transition-colors focus:border-text/40 focus:outline-none focus-visible:outline-2 focus-visible:outline-ember";

export function ContactForm({ config }: { config: EmailConfig | null }) {
  const [form, setForm] = useState(empty);
  const [sending, setSending] = useState(false);

  if (!config) {
    return (
      <div role="status" className="rounded-3xl border border-text/[0.08] bg-bg p-8">
        <p className="font-display text-2xl font-medium">The form is resting today.</p>
        <p className="mt-3 text-muted">
          Email me directly at{" "}
          <a href={`mailto:${site.email}`} className="font-medium text-text underline decoration-ember underline-offset-4">
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
      // Same template variables as before: the subject is derived, the budget rides along in it and the message.
      const params: Record<string, string> = {
        from_name: form.from_name,
        reply_to: form.reply_to,
        subject: `Project enquiry from ${form.from_name}${form.budget ? ` · ${form.budget}` : ""}`,
        message: form.budget ? `${form.message}\n\nBudget: ${form.budget}` : form.message,
      };
      if (config.recaptchaKey && window.grecaptcha) {
        params["g-recaptcha-response"] = await window.grecaptcha.enterprise.execute(config.recaptchaKey, {
          action: "submit",
        });
      }
      await emailjs.send(config.serviceId, config.templateId, params, { publicKey: config.publicKey });
      toast.success("Message sent — I'll get back to you within a business day.", { id, duration: 5000 });
      setForm(empty);
    } catch (err) {
      // EmailJS rejects with { status, text } (e.g. 412 "Gmail_API: Invalid grant…"); keep the real reason visible in the console.
      const { status, text } = (err ?? {}) as { status?: number; text?: string };
      console.error("[contact] send failed:", status ?? "", text ?? err);
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
        toastOptions={{ style: { background: "#1e1916", color: "#f3ede3", border: "1px solid #2b2420", borderRadius: "999px" } }}
      />
      <form onSubmit={onSubmit} className="grid gap-6 rounded-3xl border border-text/[0.08] bg-bg p-6 md:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="grid gap-2 text-sm text-muted">
            Your name
            <input name="from_name" required autoComplete="name" value={form.from_name} onChange={onChange} className={fieldCls} placeholder="What should I call you?" />
          </label>
          <label className="grid gap-2 text-sm text-muted">
            Email address
            <input name="reply_to" type="email" required autoComplete="email" value={form.reply_to} onChange={onChange} className={fieldCls} placeholder="you@company.com" />
          </label>
        </div>
        <fieldset>
          <legend className="text-sm text-muted">
            Rough budget <span className="text-faint">(optional)</span>
          </legend>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {budgets.map((b) => (
              <label key={b} className="cursor-pointer">
                <input type="radio" name="budget" value={b} checked={form.budget === b} onChange={onChange} className="peer sr-only" />
                <span
                  className={cn(
                    "inline-flex rounded-full border border-line bg-surface-2 px-3.5 py-1.5 text-xs font-medium text-muted transition-colors",
                    "peer-checked:border-ember peer-checked:bg-ember/15 peer-checked:text-text peer-focus-visible:outline-2 peer-focus-visible:outline-ember",
                  )}
                >
                  {b}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <label className="grid gap-2 text-sm text-muted">
          About the project
          <textarea name="message" required rows={6} value={form.message} onChange={onChange} className={fieldCls} placeholder="What are we building, and where does it stand today?" />
        </label>
        <button
          type="submit"
          disabled={sending}
          className="inline-flex items-center gap-2 justify-self-start rounded-full bg-ember px-7 py-3.5 text-sm font-medium text-text transition-transform duration-500 ease-spring hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60"
        >
          {sending ? "Sending…" : "Send the message"} <span aria-hidden>↗</span>
        </button>
      </form>
    </>
  );
}
