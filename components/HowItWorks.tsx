"use client";

// STUB — owned by Marketing Sections agent (B1). Replace with the real implementation.
// Keep the wrapping <section id="how-it-works"> so navbar anchors keep working.
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function HowItWorks() {
  const { t } = useLanguage();
  return (
    <section id="how-it-works" className="scroll-mt-20 py-20">
      <div className="container-content">
        <h2 className="text-3xl font-bold text-ink-900">{t.howitworks.title}</h2>
        <p className="mt-3 text-ink-600">{t.howitworks.subtitle}</p>
      </div>
    </section>
  );
}
