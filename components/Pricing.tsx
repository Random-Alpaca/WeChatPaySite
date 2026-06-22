"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

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
          <p className="section-eyebrow">{p.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
            {p.title}
          </h2>
          <p className="mt-4 text-lg text-ink-600">{p.subtitle}</p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 md:items-stretch">
          {/* LEFT — Rate card */}
          <div className="flex flex-col rounded-2xl border-2 border-brand-500 bg-white p-8 shadow-card sm:p-10">
            {/* Eyebrow pill */}
            <span className="self-start rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
              {p.rateCardEyebrow}
            </span>

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
                  className="flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-sm font-medium text-brand-700"
                >
                  <span className="text-brand-500">
                    <CheckIcon />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT — Rebate card */}
          <div className="flex flex-col rounded-2xl border border-ink-100 bg-white p-8 shadow-card sm:p-10">
            {/* Eyebrow pill */}
            <span className="self-start rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
              {p.rebateCardEyebrow}
            </span>

            {/* Large stat */}
            <p className="mt-6 text-7xl font-extrabold leading-none tracking-tight text-brand-500">
              $2,000
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
