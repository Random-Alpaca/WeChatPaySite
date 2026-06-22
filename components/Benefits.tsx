"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function Benefits() {
  const { t } = useLanguage();

  return (
    <section
      id="benefits"
      className="scroll-mt-20 bg-brand-50 py-20 sm:py-28"
    >
      <div className="container-content">
        {/* ── Header ── */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow">{t.benefits.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            {t.benefits.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-600 sm:text-lg">
            {t.benefits.subtitle}
          </p>
        </div>

        {/* ── Stat cards grid ── */}
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.benefits.items.map((item) => (
            <li
              key={item.label}
              className="flex flex-col rounded-2xl bg-white p-7 shadow-card"
            >
              {/* Large stat */}
              <span
                className="text-4xl font-black tracking-tight text-brand-500 sm:text-5xl"
                aria-label={item.stat}
              >
                {item.stat}
              </span>

              {/* Label */}
              <h3 className="mt-3 text-base font-bold text-ink-900">
                {item.label}
              </h3>

              {/* Description */}
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
