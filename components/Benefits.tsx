"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function Benefits() {
  const { t } = useLanguage();
  const items = t.benefits.items;

  const Card = ({
    item,
    accent,
  }: {
    item: (typeof items)[number];
    accent?: boolean;
  }) => (
    <article
      className={`flex flex-col rounded-2xl p-7 shadow-card ${
        accent ? "bg-brand-600 text-white" : "bg-white"
      }`}
    >
      <span
        className={`text-5xl font-black tracking-tight ${
          accent ? "text-white" : "text-brand-500"
        }`}
      >
        {item.stat}
      </span>
      <h3
        className={`mt-4 text-base font-bold ${
          accent ? "text-white" : "text-ink-900"
        }`}
      >
        {item.label}
      </h3>
      <p
        className={`mt-2 text-sm leading-relaxed ${
          accent ? "text-brand-100" : "text-ink-600"
        }`}
      >
        {item.description}
      </p>
    </article>
  );

  return (
    <section id="benefits" className="scroll-mt-20 bg-brand-50 py-20 sm:py-28">
      <div className="container-content">
        {/* Header */}
        <div className="max-w-2xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            {t.benefits.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-600 sm:text-lg">
            {t.benefits.subtitle}
          </p>
        </div>

        {/* Mobile / tablet — horizontal scroll rail */}
        <div
          className="mt-10 -mx-5 flex gap-4 overflow-x-auto pb-4 pl-5 pr-5 snap-x snap-mandatory sm:-mx-8 sm:pl-8 sm:pr-8 lg:hidden"
          role="list"
        >
          {items.map((item, i) => (
            <div
              key={item.label}
              role="listitem"
              className="w-72 flex-none snap-start"
            >
              <Card item={item} accent={i === 0} />
            </div>
          ))}
        </div>

        {/* Desktop — bento grid */}
        <div className="mt-10 hidden lg:grid lg:grid-cols-3 lg:grid-rows-2 lg:gap-4">
          {/* Card 0 — 1% fee: spans 2 cols, accent */}
          <div className="col-span-2 row-span-1">
            <Card item={items[0]} accent />
          </div>
          {/* Card 1 — 2B+ users */}
          <div className="col-span-1 row-span-1">
            <Card item={items[1]} />
          </div>
          {/* Cards 2-4 — one per column, row 2 */}
          <div className="col-span-1">
            <Card item={items[2]} />
          </div>
          <div className="col-span-1">
            <Card item={items[3]} />
          </div>
          <div className="col-span-1">
            <Card item={items[4]} />
          </div>
        </div>
      </div>
    </section>
  );
}
