"use client";

import { useCallback, useMemo, useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const MONTHLY_MIN = 1_000;
const MONTHLY_MAX = 200_000;
const MONTHLY_DEFAULT = 10_000;
const MONTHLY_STEP = 500;

const RATE_MIN = 0.5;
const RATE_MAX = 5.0;
const RATE_DEFAULT = 2.7;
const RATE_STEP = 0.1;

const OUR_RATE = 0.01; // 1%
const REBATE_CAP = 20; // fees waived on first $2,000 of volume (1% × $2,000)

type Preset = "visamc" | "amex" | "custom";

// ---------------------------------------------------------------------------
// Pure savings helpers
// ---------------------------------------------------------------------------

interface SavingsResult {
  annualVolume: number;
  currentAnnualFees: number;
  annualFeesAt1pct: number;
  grossAnnualSavings: number;
  grossMonthlySavings: number;
  effectiveFirstYearFees: number;
  firstYearTotalSavings: number;
  firstYearFullyRebated: boolean;
  currentRateIsLow: boolean;
}

function computeSavings(
  monthlyVolume: number,
  currentRatePct: number
): SavingsResult {
  const safeVolume = Math.max(0, monthlyVolume || 0);
  const safeRate = Math.max(0, currentRatePct || 0) / 100;

  const annualVolume = safeVolume * 12;
  const currentAnnualFees = annualVolume * safeRate;
  const annualFeesAt1pct = annualVolume * OUR_RATE;
  const grossAnnualSavings = Math.max(0, currentAnnualFees - annualFeesAt1pct);
  const grossMonthlySavings = grossAnnualSavings / 12;

  const effectiveFirstYearFees = Math.max(0, annualFeesAt1pct - REBATE_CAP);
  const firstYearTotalSavings = Math.max(
    0,
    currentAnnualFees - effectiveFirstYearFees
  );
  const firstYearFullyRebated = annualFeesAt1pct <= REBATE_CAP;
  const currentRateIsLow = currentRatePct <= 1.0;

  return {
    annualVolume,
    currentAnnualFees,
    annualFeesAt1pct,
    grossAnnualSavings,
    grossMonthlySavings,
    effectiveFirstYearFees,
    firstYearTotalSavings,
    firstYearFullyRebated,
    currentRateIsLow,
  };
}

// ---------------------------------------------------------------------------
// Formatting helpers
// ---------------------------------------------------------------------------

function useCurrencyFormatter(locale: string) {
  return useCallback(
    (value: number) =>
      new Intl.NumberFormat(locale === "zh" ? "zh-CN" : "en-CA", {
        style: "currency",
        currency: "CAD",
        maximumFractionDigits: 0,
      }).format(value),
    [locale]
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
  large?: boolean;
}

function StatCard({ label, value, sub, highlight, large }: StatCardProps) {
  return (
    <div
      className={`rounded-2xl p-5 ${
        highlight
          ? "bg-brand-500 text-white shadow-card"
          : "bg-white shadow-card border border-ink-100"
      }`}
    >
      <p
        className={`text-xs font-semibold uppercase tracking-wide ${
          highlight ? "text-brand-100" : "text-ink-500"
        }`}
      >
        {label}
      </p>
      <p
        className={`mt-1 font-bold tabular-nums ${
          large ? "text-3xl sm:text-4xl" : "text-2xl"
        } ${highlight ? "text-white" : "text-ink-900"}`}
      >
        {value}
      </p>
      {sub && (
        <p
          className={`mt-1 text-xs ${
            highlight ? "text-brand-100" : "text-ink-500"
          }`}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function SavingsCalculator() {
  const { t, locale } = useLanguage();
  const c = t.calc;

  // Controlled state
  const [monthlyVolume, setMonthlyVolume] = useState<number>(MONTHLY_DEFAULT);
  const [monthlyVolumeText, setMonthlyVolumeText] = useState<string>(
    String(MONTHLY_DEFAULT)
  );
  const [currentRate, setCurrentRate] = useState<number>(RATE_DEFAULT);
  const [currentRateText, setCurrentRateText] = useState<string>(
    String(RATE_DEFAULT)
  );
  const [activePreset, setActivePreset] = useState<Preset>("visamc");

  const fmt = useCurrencyFormatter(locale);

  // ------------------------------------------------------------------
  // Handlers
  // ------------------------------------------------------------------

  const handleVolumeSlider = (v: number) => {
    setMonthlyVolume(v);
    setMonthlyVolumeText(String(v));
  };

  const handleVolumeText = (raw: string) => {
    setMonthlyVolumeText(raw);
    const parsed = parseFloat(raw.replace(/,/g, ""));
    if (!isNaN(parsed) && parsed >= MONTHLY_MIN && parsed <= MONTHLY_MAX) {
      setMonthlyVolume(parsed);
    }
  };

  const handleRateSlider = (v: number) => {
    setCurrentRate(v);
    setCurrentRateText(String(v));
    setActivePreset("custom");
  };

  const handleRateText = (raw: string) => {
    setCurrentRateText(raw);
    const parsed = parseFloat(raw);
    if (!isNaN(parsed) && parsed >= RATE_MIN && parsed <= RATE_MAX) {
      setCurrentRate(parsed);
      setActivePreset("custom");
    }
  };

  const applyPreset = (preset: Preset) => {
    setActivePreset(preset);
    if (preset === "visamc") {
      setCurrentRate(2.7);
      setCurrentRateText("2.7");
    } else if (preset === "amex") {
      setCurrentRate(3.5);
      setCurrentRateText("3.5");
    }
    // "custom" just keeps whatever is typed
  };

  // ------------------------------------------------------------------
  // Computed savings (recomputed only when inputs change)
  // ------------------------------------------------------------------

  const savings = useMemo(
    () => computeSavings(monthlyVolume, currentRate),
    [monthlyVolume, currentRate]
  );

  // ------------------------------------------------------------------
  // Render
  // ------------------------------------------------------------------

  const presetButtons: { id: Preset; label: string }[] = [
    { id: "visamc", label: c.presetVisaMc },
    { id: "amex", label: c.presetAmex },
    { id: "custom", label: c.presetCustom },
  ];

  return (
    <section
      id="calculator"
      className="scroll-mt-20 py-20 bg-ink-50"
    >
      <div className="container-content">
        {/* Section header */}
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
            {c.title}
          </h2>
          <p className="mt-3 text-lg text-ink-600">{c.subtitle}</p>
        </div>

        {/* Two-column layout: inputs left, results right */}
        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-start">
          {/* ---- INPUTS ---- */}
          <div className="rounded-2xl bg-white p-6 shadow-card border border-ink-100 space-y-8">
            {/* Monthly Volume */}
            <div className="space-y-3">
              <label
                htmlFor="monthly-volume-number"
                className="block text-sm font-semibold text-ink-800"
              >
                {c.monthlyVolumeLabel}
              </label>

              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-ink-500">
                  {fmt(MONTHLY_MIN)}
                </span>
                <input
                  id="monthly-volume-slider"
                  type="range"
                  min={MONTHLY_MIN}
                  max={MONTHLY_MAX}
                  step={MONTHLY_STEP}
                  value={monthlyVolume}
                  onChange={(e) => handleVolumeSlider(Number(e.target.value))}
                  aria-label={c.monthlyVolumeLabel}
                  aria-valuemin={MONTHLY_MIN}
                  aria-valuemax={MONTHLY_MAX}
                  aria-valuenow={monthlyVolume}
                  aria-valuetext={fmt(monthlyVolume)}
                  className="flex-1 h-2 appearance-none rounded-full bg-ink-200 accent-brand-500 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
                />
                <span className="text-sm font-medium text-ink-500">
                  {fmt(MONTHLY_MAX)}
                </span>
              </div>

              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-ink-500 pointer-events-none select-none">
                  CAD $
                </span>
                <input
                  id="monthly-volume-number"
                  type="text"
                  inputMode="numeric"
                  value={monthlyVolumeText}
                  onChange={(e) => handleVolumeText(e.target.value)}
                  placeholder={c.monthlyVolumePlaceholder}
                  className="w-full rounded-xl border border-ink-200 bg-ink-50 py-2.5 pl-14 pr-4 text-sm font-semibold text-ink-900 placeholder:text-ink-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/30"
                />
              </div>
            </div>

            {/* Current Rate */}
            <div className="space-y-3">
              <label
                htmlFor="current-rate-number"
                className="block text-sm font-semibold text-ink-800"
              >
                {c.currentRateLabel}
              </label>

              {/* Preset pills */}
              <div className="flex flex-wrap gap-2" role="group" aria-label={c.currentRateLabel}>
                {presetButtons.map((btn) => (
                  <button
                    key={btn.id}
                    type="button"
                    onClick={() => applyPreset(btn.id)}
                    aria-pressed={activePreset === btn.id}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-1 ${
                      activePreset === btn.id
                        ? "bg-brand-500 text-white"
                        : "border border-ink-200 bg-white text-ink-700 hover:bg-ink-50"
                    }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-ink-500">
                  {RATE_MIN}%
                </span>
                <input
                  id="current-rate-slider"
                  type="range"
                  min={RATE_MIN}
                  max={RATE_MAX}
                  step={RATE_STEP}
                  value={currentRate}
                  onChange={(e) => handleRateSlider(Number(e.target.value))}
                  aria-label={c.currentRateLabel}
                  aria-valuemin={RATE_MIN}
                  aria-valuemax={RATE_MAX}
                  aria-valuenow={currentRate}
                  aria-valuetext={`${currentRate}%`}
                  className="flex-1 h-2 appearance-none rounded-full bg-ink-200 accent-brand-500 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
                />
                <span className="text-sm font-medium text-ink-500">
                  {RATE_MAX}%
                </span>
              </div>

              <div className="relative">
                <input
                  id="current-rate-number"
                  type="text"
                  inputMode="decimal"
                  value={currentRateText}
                  onChange={(e) => handleRateText(e.target.value)}
                  className="w-full rounded-xl border border-ink-200 bg-ink-50 py-2.5 pl-4 pr-10 text-sm font-semibold text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/30"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-ink-500 pointer-events-none select-none">
                  %
                </span>
              </div>
            </div>

            {/* Low-rate edge-case notice */}
            {savings.currentRateIsLow && (
              <p className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-xs text-amber-800">
                {c.lowRateNote}
              </p>
            )}
          </div>

          {/* ---- RESULTS ---- */}
          <div
            className="space-y-4"
            aria-live="polite"
            aria-atomic="true"
            aria-label={c.resultsHeading}
          >
            <p className="text-sm font-semibold text-ink-500 uppercase tracking-wide">
              {c.resultsHeading}
            </p>

            {/* Row 1: fees comparison */}
            <div className="grid grid-cols-2 gap-4">
              <StatCard
                label={c.feesTodayLabel}
                value={fmt(savings.currentAnnualFees)}
                sub={c.perYear}
              />
              <StatCard
                label={c.feesWithUsLabel}
                value={fmt(savings.annualFeesAt1pct)}
                sub={c.perYear}
              />
            </div>

            {/* Row 2: ongoing savings */}
            <div className="grid grid-cols-2 gap-4">
              <StatCard
                label={c.grossSavingsLabel}
                value={fmt(savings.grossAnnualSavings)}
                sub={c.perYear}
              />
              <StatCard
                label={c.monthlySavingsLabel}
                value={fmt(savings.grossMonthlySavings)}
                sub={c.perMonth}
              />
            </div>

            {/* Annual savings hero card */}
            <div className="rounded-2xl bg-brand-500 p-6 shadow-card text-white">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-100">
                {c.firstYearLabel}
              </p>
              <p className="mt-1 text-4xl font-bold tabular-nums">
                {fmt(savings.grossAnnualSavings)}
              </p>
              <p className="mt-1 text-sm text-brand-100">
                {c.firstYearSubLabel}
              </p>
            </div>

            {/* Disclaimer */}
            <p className="text-xs text-ink-400 leading-relaxed">
              * {c.disclaimer}
            </p>

            {/* CTA */}
            <a
              href="#contact"
              className="btn-primary w-full justify-center"
            >
              {c.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
