"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";

const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "j.xue0816@gmail.com";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-100 bg-ink-50">
      <div className="container-content grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-bold text-ink-900">
            <span
              aria-hidden
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white"
            >
              微
            </span>
            <span>{t.nav.brand}</span>
          </div>
          <p className="max-w-xs text-sm text-ink-600">{t.footer.tagline}</p>
          <p className="text-xs font-medium text-brand-700">
            {t.footer.poweredBy}
          </p>
          <p className="text-xs text-ink-500">{t.footer.serviceArea}</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-ink-900">
            {t.footer.sections}
          </h3>
          <ul className="space-y-1 text-sm text-ink-600">
            <li>
              <a href="#pricing" className="hover:text-ink-900">
                {t.nav.pricing}
              </a>
            </li>
            <li>
              <a href="#calculator" className="hover:text-ink-900">
                {t.nav.calculator}
              </a>
            </li>
            <li>
              <a href="#how-it-works" className="hover:text-ink-900">
                {t.nav.howItWorks}
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-ink-900">
                {t.nav.contact}
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-ink-900">
            {t.footer.contactLabel}
          </h3>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-sm font-medium text-brand-700 hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>

      <div className="container-content border-t border-ink-200 py-6">
        <p className="text-xs text-ink-500">
          © {year} {t.nav.brand}. {t.footer.rights}
        </p>
        <p className="mt-2 max-w-3xl text-xs text-ink-400">
          {t.footer.disclaimer}
        </p>
      </div>
    </footer>
  );
}
