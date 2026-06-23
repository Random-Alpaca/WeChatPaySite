// Aggregates every section dictionary into a single per-locale object.
//
// CONTRACT FOR FEATURE AGENTS:
// - Each section lives in its own file under ./sections/<name>.ts and exports
//   `{ en: {...}, zh: {...} } as const`.
// - Edit ONLY your assigned section file(s). Do not edit this aggregator.
// - Keep the `en` and `zh` objects structurally identical (same keys).
// - Access strings in components via: const { t } = useLanguage(); t.<section>.<key>

import { nav } from "./sections/nav";
import { footer } from "./sections/footer";
import { hero } from "./sections/hero";
import { benefits } from "./sections/benefits";
import { pricing } from "./sections/pricing";
import { calc } from "./sections/calc";
import { comparison } from "./sections/comparison";
import { howitworks } from "./sections/howitworks";
import { faq } from "./sections/faq";
import { contact } from "./sections/contact";

export const dictionaries = {
  en: {
    nav: nav.en,
    hero: hero.en,
    benefits: benefits.en,
    pricing: pricing.en,
    calc: calc.en,
    comparison: comparison.en,
    howitworks: howitworks.en,
    faq: faq.en,
    contact: contact.en,
    footer: footer.en,
  },
  zh: {
    nav: nav.zh,
    hero: hero.zh,
    benefits: benefits.zh,
    pricing: pricing.zh,
    calc: calc.zh,
    comparison: comparison.zh,
    howitworks: howitworks.zh,
    faq: faq.zh,
    contact: contact.zh,
    footer: footer.zh,
  },
} as const;

export type Locale = keyof typeof dictionaries;

// Widen literal string types so the `en` and `zh` trees share one structural
// type (their string *values* differ, but their *shape* is identical).
type Widen<T> = T extends string
  ? string
  : { [K in keyof T]: Widen<T[K]> };

export type Dictionary = Widen<(typeof dictionaries)["en"]>;
