"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function FAQ() {
  const { t } = useLanguage();
  const items = t.faq.items;

  return (
    <section id="faq" className="scroll-mt-20 bg-ink-50 py-20">
      {/* Header */}
      <div className="container-content text-center">
        <h2 className="text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
          {t.faq.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-ink-600">
          {t.faq.subtitle}
        </p>
      </div>

      {/* Accordion */}
      <div className="container-content mt-12">
        <div className="mx-auto max-w-3xl">
          {/*
            CSS trick: rotate the chevron SVG when <details> is open.
            We use an inline <style> block scoped to this component so no
            external stylesheet changes are needed.
          */}
          <style>{`
            details[open] summary .faq-chevron {
              transform: rotate(180deg);
            }
            .faq-chevron {
              transition: transform 0.2s ease;
            }
          `}</style>

          <div className="overflow-hidden rounded-2xl bg-white shadow-card">
            {items.map((item, index) => (
              <details
                key={index}
                className="group border-b border-ink-200 last:border-b-0"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-sm font-semibold text-ink-900 hover:text-brand-600 [&::-webkit-details-marker]:hidden">
                  <span>{item.q}</span>
                  {/* Chevron icon */}
                  <span className="flex-shrink-0 text-ink-400">
                    <svg
                      className="faq-chevron"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 7.5L10 12.5L15 7.5"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-5 text-sm leading-relaxed text-ink-600">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="container-content mt-12 flex justify-center">
        <a href="#contact" className="btn-secondary">
          {t.faq.ctaLabel}
        </a>
      </div>
    </section>
  );
}
