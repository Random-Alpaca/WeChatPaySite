"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function HowItWorks() {
  const { t } = useLanguage();
  const steps = t.howitworks.steps;

  return (
    <section id="how-it-works" className="scroll-mt-20 bg-brand-50 py-20">
      {/* Header */}
      <div className="container-content text-center">
          <h2 className="text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
          {t.howitworks.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-ink-600">
          {t.howitworks.subtitle}
        </p>
      </div>

      {/* Steps grid */}
      <div className="container-content mt-14">
        {/* Connector line — desktop only, sits behind the cards */}
        <div className="relative">
          {/* Horizontal rule that spans the top of the cards on lg */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-7 hidden border-t-2 border-dashed border-brand-200 lg:block"
            style={{ zIndex: 0 }}
          />

          <div className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4" style={{ zIndex: 1 }}>
            {steps.map((step) => (
              <div
                key={step.number}
                className="flex flex-col rounded-2xl bg-white p-6 shadow-card"
              >
                {/* Step number badge */}
                <div className="mb-5 flex">
                  <span className="inline-flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-brand-500 text-xl font-bold text-white">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-base font-semibold text-ink-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="container-content mt-12 flex justify-center">
        <a href="#contact" className="btn-primary">
          {t.howitworks.cta}
        </a>
      </div>
    </section>
  );
}
