"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { navLinks, site } from "@/content/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) {
      if (wasOpen.current) toggleRef.current?.focus();
      wasOpen.current = false;
      return;
    }
    wasOpen.current = true;
    const focusables = () =>
      Array.from(menuRef.current?.querySelectorAll<HTMLElement>("a[href], button") ?? []);
    focusables()[0]?.focus();
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4">
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-full border px-4 transition-all duration-500 ease-soft md:px-6",
          scrolled
            ? "border-line bg-paper/85 py-2.5 shadow-[0_18px_40px_-20px_rgba(31,26,23,0.35)] backdrop-blur-md"
            : "border-line/70 bg-paper/80 py-3.5 backdrop-blur-md",
        )}
      >
        <Link href="/" className="group flex items-center gap-2.5 font-display text-xl font-semibold tracking-tight">
          <span className="relative grid size-9 place-items-center rounded-full bg-forest text-sm text-saffron transition-transform duration-500 ease-spring group-hover:-rotate-12">
            IO
            <span
              aria-hidden
              className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full border-2 border-paper bg-vermilion-bright"
            />
          </span>
          {site.shortName}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-paper-2 hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="ml-3 rounded-full bg-vermilion px-5 py-2.5 text-sm font-semibold text-white transition-transform duration-500 ease-spring hover:-translate-y-0.5 hover:-rotate-2"
          >
            Let&apos;s talk ✺
          </Link>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          Menu
        </button>
      </div>

      {open ? (
        <div
          ref={menuRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="grain fixed inset-0 z-50 flex flex-col bg-forest px-6 pt-6 pb-10 text-paper md:hidden"
        >
          <div className="flex items-center justify-between">
            <span className="font-display text-xl font-semibold">{site.shortName}</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full border border-paper/40 px-4 py-2 text-sm font-semibold"
            >
              Close
            </button>
          </div>
          <nav aria-label="Mobile" className="mt-16 flex flex-col gap-4">
            {navLinks.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 font-display text-5xl font-[350] tracking-tight"
              >
                <span className="font-sans text-sm text-saffron">0{i + 1}</span>
                {l.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/#contact"
            onClick={() => setOpen(false)}
            className="mt-auto rounded-full bg-saffron px-6 py-4 text-center font-semibold text-ink"
          >
            Start a project →
          </Link>
        </div>
      ) : null}
    </header>
  );
}
