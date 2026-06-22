"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const LINKS = [
  { href: "#benefits", key: "benefits" },
  { href: "#pricing", key: "pricing" },
  { href: "#calculator", key: "calculator" },
  { href: "#comparison", key: "comparison" },
  { href: "#how-it-works", key: "howItWorks" },
  { href: "#faq", key: "faq" },
  { href: "#contact", key: "contact" },
] as const;

export default function Navbar() {
  const { t, toggleLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-colors ${
        scrolled
          ? "border-ink-100 bg-white/90 backdrop-blur"
          : "border-transparent bg-white/0"
      }`}
    >
      <nav className="container-content flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2 font-bold text-ink-900">
          <span
            aria-hidden
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white"
          >
            微
          </span>
          <span className="text-sm sm:text-base">{t.nav.brand}</span>
        </a>

        <div className="hidden items-center gap-6 lg:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-600 transition hover:text-ink-900"
            >
              {t.nav[link.key]}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleLocale}
            className="rounded-lg border border-ink-200 px-3 py-1.5 text-sm font-semibold text-ink-700 transition hover:bg-ink-50"
            aria-label="Switch language"
          >
            {t.nav.switchTo}
          </button>
          <a href="#contact" className="btn-primary hidden sm:inline-flex">
            {t.nav.cta}
          </a>
          <button
            type="button"
            className="lg:hidden rounded-lg border border-ink-200 p-2 text-ink-700"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className="block h-0.5 w-5 bg-current" />
            <span className="mt-1 block h-0.5 w-5 bg-current" />
            <span className="mt-1 block h-0.5 w-5 bg-current" />
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-ink-100 bg-white lg:hidden">
          <div className="container-content flex flex-col py-3">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-2 text-sm font-medium text-ink-700"
              >
                {t.nav[link.key]}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2"
            >
              {t.nav.cta}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
