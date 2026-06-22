"use client";

// STUB — owned by Savings Calculator agent (B2). Replace with the real implementation.
// Keep the wrapping <section id="calculator"> so navbar anchors keep working.
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function SavingsCalculator() {
  const { t } = useLanguage();
  return (
    <section id="calculator" className="scroll-mt-20 py-20">
      <div className="container-content">
        <h2 className="text-3xl font-bold text-ink-900">{t.calc.title}</h2>
        <p className="mt-3 text-ink-600">{t.calc.subtitle}</p>
      </div>
    </section>
  );
}
