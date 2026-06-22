"use client";

// STUB — owned by Marketing Sections agent (B1). Replace with the real implementation.
// Keep the wrapping <section id="pricing"> so navbar anchors keep working.
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function Pricing() {
  const { t } = useLanguage();
  return (
    <section id="pricing" className="scroll-mt-20 py-20">
      <div className="container-content">
        <h2 className="text-3xl font-bold text-ink-900">{t.pricing.title}</h2>
        <p className="mt-3 text-ink-600">{t.pricing.subtitle}</p>
      </div>
    </section>
  );
}
