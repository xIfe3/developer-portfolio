"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { navLinks, site } from "@/content/site";
import { LocalTime } from "@/components/ui/LocalTime";
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
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5">
      <div
        className={cn(
          "mx-auto flex max-w-[72rem] items-center justify-between rounded-full border py-2 pr-2 pl-2.5 backdrop-blur-xl transition-all duration-500 ease-soft",
          scrolled
            ? "border-text/10 bg-surface/80 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.9)]"
            : "border-text/[0.08] bg-surface/50",
        )}
      >
        <Link href="/" className="group flex items-center gap-2.5 text-sm font-medium">
          <span className="grid size-9 place-items-center rounded-full bg-ember font-display text-[0.8rem] font-semibold text-bg transition-transform duration-500 ease-spring group-hover:-rotate-12">
            IO
          </span>
          <span className="hidden sm:inline">{site.name}</span>
          <span className="sm:hidden">{site.shortName}</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-text"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <span className="flex items-center gap-2 font-mono text-xs text-muted">
            <span aria-hidden className="size-1.5 rounded-full bg-[#4cd97b]" />
            <LocalTime />
          </span>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-full bg-text px-5 py-2.5 text-sm font-medium text-bg transition-[transform,background-color] duration-500 ease-spring hover:-translate-y-0.5 hover:bg-saffron"
          >
            Start a project <span aria-hidden>↗</span>
          </Link>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="rounded-full border border-line bg-surface-2 px-4 py-2 text-sm font-medium md:hidden"
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
          className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-bg px-6 pt-6 pb-10 text-text md:hidden"
        >
          <div aria-hidden className="ember-glow pointer-events-none absolute -top-48 -right-40 size-[34rem] opacity-60" />
          <div className="relative flex items-center justify-between">
            <span className="font-display text-lg font-medium">{site.shortName}</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full border border-line px-4 py-2 text-sm font-medium"
            >
              Close
            </button>
          </div>
          <nav aria-label="Mobile" className="relative mt-16 flex flex-col gap-4">
            {navLinks.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 font-display text-5xl font-medium tracking-[-0.03em]"
              >
                <span className="font-mono text-xs text-ember">0{i + 1}</span>
                {l.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/#contact"
            onClick={() => setOpen(false)}
            className="relative mt-auto rounded-full bg-text px-6 py-4 text-center font-medium text-bg"
          >
            Start a project ↗
          </Link>
        </div>
      ) : null}
    </header>
  );
}
