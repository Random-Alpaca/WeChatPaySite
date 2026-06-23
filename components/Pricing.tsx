"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function Pricing() {
  const { t } = useLanguage();
  const p = t.pricing;

  const noFeeChips = [p.noSetupFee, p.noMonthlyFee, p.noHiddenFees] as const;

  return (
    <section
      id="pricing"
      className="scroll-mt-20 bg-brand-50 py-20 sm:py-28"
    >
      <div className="container-content">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
            {p.title}
          </h2>
          <p className="mt-4 text-lg text-ink-600">{p.subtitle}</p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 md:items-stretch">
          {/* LEFT — Rate card */}
          <div className="flex flex-col rounded-2xl border-2 border-brand-500 bg-white p-8 shadow-card sm:p-10">
            {/* Giant stat */}
            <p className="mt-6 text-8xl font-extrabold leading-none tracking-tight text-brand-500">
              1%
            </p>

            {/* Title */}
            <h3 className="mt-3 text-xl font-bold text-ink-900">
              {p.rateCardTitle}
            </h3>

            {/* Description */}
            <p className="mt-3 flex-1 text-base leading-relaxed text-ink-600">
              {p.rateCardDesc}
            </p>

            {/* Note */}
            <p className="mt-4 text-sm text-ink-400">{p.rateCardNote}</p>

            {/* No-fee chips */}
            <ul className="mt-6 flex flex-wrap gap-2">
              {noFeeChips.map((label) => (
                <li
                  key={label}
                  className="rounded-full bg-brand-50 px-3 py-1.5 text-sm font-medium text-brand-700"
                >
                  {label}
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT — Rebate card */}
          <div className="flex flex-col rounded-2xl border border-ink-100 bg-white p-8 shadow-card sm:p-10">
            {/* Large stat */}
            <p className="mt-6 text-7xl font-extrabold leading-none tracking-tight text-brand-500">
              $2K
            </p>

            {/* Title */}
            <h3 className="mt-3 text-xl font-bold text-ink-900">
              {p.rebateCardTitle}
            </h3>

            {/* Description */}
            <p className="mt-3 flex-1 text-base leading-relaxed text-ink-600">
              {p.rebateCardDesc}
            </p>

            {/* Note */}
            <p className="mt-4 text-sm text-ink-400">{p.rebateCardNote}</p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col items-center gap-3">
          <a href="#contact" className="btn-primary px-8 py-4 text-base">
            {p.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
