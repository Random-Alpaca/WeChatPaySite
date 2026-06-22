"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function ComparisonTable() {
  const { t } = useLanguage();
  const c = t.comparison;

  return (
    <section
      id="comparison"
      className="scroll-mt-20 bg-white py-20 sm:py-28"
    >
      <div className="container-content">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow">Comparison</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
            {c.title}
          </h2>
          <p className="mt-4 text-lg text-ink-600">{c.subtitle}</p>
        </div>

        {/* Table */}
        <div className="mt-12 overflow-x-auto rounded-2xl shadow-card">
          <table className="min-w-full divide-y divide-ink-100">
            <thead className="bg-ink-50">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-6 pr-3 text-left text-xs font-semibold uppercase tracking-wide text-ink-600"
                >
                  {c.colMethod}
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-600"
                >
                  {c.colRate}
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-600"
                >
                  {c.colMonthly}
                </th>
                <th
                  scope="col"
                  className="py-3.5 pl-3 pr-6 text-left text-xs font-semibold uppercase tracking-wide text-ink-600"
                >
                  {c.colSaving}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100 bg-white">
              {c.rows.map((row, idx) =>
                row.highlight ? (
                  <tr key={idx} className="bg-brand-50">
                    <td className="py-4 pl-6 pr-3">
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-brand-500 px-2 py-0.5 text-xs font-semibold text-white">
                          {c.highlightLabel}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-4 text-sm font-semibold text-brand-800">
                      {row.rate}
                    </td>
                    <td className="px-3 py-4 text-sm font-semibold text-brand-800">
                      {row.monthly}
                    </td>
                    <td className="py-4 pl-3 pr-6 text-sm font-semibold text-brand-800">
                      {row.saving}
                    </td>
                  </tr>
                ) : (
                  <tr
                    key={idx}
                    className="border-b border-ink-100 last:border-0 transition-colors hover:bg-ink-50/50"
                  >
                    <td className="py-4 pl-6 pr-3 text-sm text-ink-700">
                      {row.method}
                    </td>
                    <td className="px-3 py-4 text-sm text-ink-700">
                      {row.rate}
                    </td>
                    <td className="px-3 py-4 text-sm text-ink-700">
                      {row.monthly}
                    </td>
                    <td className="py-4 pl-3 pr-6 text-sm text-ink-500">
                      {row.saving}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        {/* Disclaimer */}
        <p className="mt-5 text-xs italic text-ink-400">{c.disclaimer}</p>
      </div>
    </section>
  );
}
