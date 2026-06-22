"use client";

// STUB — owned by Contact + Integrations agent (B3). Replace with the real implementation.
// Keep the wrapping <section id="contact"> so navbar anchors keep working.
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function Contact() {
  const { t } = useLanguage();
  return (
    <section id="contact" className="scroll-mt-20 py-20">
      <div className="container-content">
        <h2 className="text-3xl font-bold text-ink-900">{t.contact.title}</h2>
        <p className="mt-3 text-ink-600">{t.contact.subtitle}</p>
      </div>
    </section>
  );
}
