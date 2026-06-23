"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";

/**
 * Renders the hero headline with the literal "1%" (or "1%") in brand-500 colour.
 * Works for both EN and ZH because both titles contain "1%".
 */
function HeadlineWithAccent({ text }: { text: string }) {
  const parts = text.split(/(1%)/);
  return (
    <>
      {parts.map((part, i) =>
        part === "1%" ? (
          <span key={i} className="text-brand-500">
            1%
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

export default function Hero() {
  const { t } = useLanguage();

  const chips = [
    t.hero.chip1,
    t.hero.chip2,
    t.hero.chip3,
    t.hero.chip4,
  ] as const;

  return (
    <section
      id="top"
      className="scroll-mt-20 overflow-hidden bg-brand-50 pt-16 pb-20 sm:pt-20 sm:pb-28"
    >
      <div className="container-content">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
          {/* ── Left column: copy ── */}
          <div className="flex-1 space-y-6">
            {/* Headline */}
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-5xl lg:text-6xl">
              <HeadlineWithAccent text={t.hero.title} />
            </h1>

            {/* Subtitle */}
            <p className="max-w-xl text-base leading-relaxed text-ink-600 sm:text-lg">
              {t.hero.subtitle}
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="#contact" className="btn-primary text-base px-7 py-3.5">
                {t.hero.ctaPrimary}
              </a>
              <a href="#contact" className="btn-secondary text-base px-7 py-3.5">
                {t.hero.ctaSecondary}
              </a>
            </div>

            {/* Trust chips */}
            <div className="flex flex-wrap gap-2 pt-1">
              {chips.map((chip) => (
                <span
                  key={chip}
                  className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 ring-1 ring-brand-100"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          {/* ── Right column: decorative panel (desktop only) ── */}
          <div
            aria-hidden="true"
            className="hidden lg:block lg:w-80 xl:w-96 flex-shrink-0"
          >
            <div className="relative rounded-2xl bg-brand-600 p-8 shadow-card">
              {/* Abstract QR-style grid */}
              <div className="grid grid-cols-7 grid-rows-7 gap-1.5">
                {Array.from({ length: 49 }).map((_, i) => {
                  const col = i % 7;
                  const row = Math.floor(i / 7);
                  // Corner finder pattern squares (top-left, top-right, bottom-left)
                  const inTopLeft =
                    (col <= 2 && row <= 2) ||
                    (col === 0 && row === 3) ||
                    (col === 3 && row === 0);
                  const inTopRight =
                    (col >= 4 && row <= 2) ||
                    (col === 6 && row === 3) ||
                    (col === 3 && row === 0);
                  const inBottomLeft =
                    (col <= 2 && row >= 4) ||
                    (col === 0 && row === 3) ||
                    (col === 3 && row === 6);
                  const isFinderDot =
                    (col === 1 && row === 1) ||
                    (col === 5 && row === 1) ||
                    (col === 1 && row === 5);
                  const isFilled =
                    inTopLeft || inTopRight || inBottomLeft || isFinderDot
                      ? true
                      : // Pseudo-random fill for the data area
                        [
                          3, 5, 11, 17, 19, 24, 26, 29, 31, 33, 36, 40, 43, 45,
                          47,
                        ].includes(i);
                  return (
                    <div
                      key={i}
                      className={`h-6 w-6 rounded-sm transition-opacity ${
                        isFilled
                          ? "bg-white opacity-90"
                          : "bg-white opacity-15"
                      }`}
                    />
                  );
                })}
              </div>

              {/* WeChat Pay & Alipay label */}
              <div className="mt-6 flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-100">
                    WeChat Pay · Alipay
                  </p>
                  <p className="text-lg font-bold text-white">微信支付 · 支付宝</p>
                </div>
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-2xl font-black text-white">
                  微
                </span>
              </div>

              {/* 1% badge */}
              <div className="mt-4 inline-flex items-baseline gap-1 rounded-xl bg-white/15 px-4 py-2">
                <span className="text-3xl font-black text-white">1%</span>
                <span className="text-sm font-semibold text-brand-100">
                  flat fee
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
