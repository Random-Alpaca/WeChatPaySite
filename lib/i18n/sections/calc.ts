// Savings Calculator section — owned by Savings Calculator agent (B2).
// Both `en` and `zh` MUST have structurally identical keys.
export const calc = {
  en: {
    eyebrow: "Savings Calculator",
    title: "See how much you could save",
    subtitle:
      "Adjust the sliders to match your business and watch your savings update in real time.",

    // Inputs
    monthlyVolumeLabel: "Monthly payment volume (CAD)",
    monthlyVolumePlaceholder: "10,000",
    currentRateLabel: "Your current processing rate",
    presetVisaMc: "Visa / MC ~2.7%",
    presetAmex: "Amex ~3.5%",
    presetCustom: "Custom",

    // Results
    resultsHeading: "Your estimated savings",
    feesTodayLabel: "Your fees today",
    feesWithUsLabel: "Fees with us at 1%",
    grossSavingsLabel: "Annual savings (ongoing)",
    monthlySavingsLabel: "Monthly savings",
    firstYearLabel: "First-year savings",
    firstYearSubLabel: "Includes $2,000 rebate on your first year's fees",
    rebateNoteFullyRebated:
      "Your first year's fees are fully rebated — you pay nothing in processing fees year one.",
    perYear: "/ year",
    perMonth: "/ month",

    // Edge case when current rate ≤ 1%
    lowRateNote:
      "Your current rate is already at or below 1%. You won't save on rate, but you still receive the $2,000 first-year rebate.",

    // Disclaimer & CTA
    disclaimer:
      "Figures are estimates only. Actual savings depend on your transaction mix, chargebacks, and other factors.",
    cta: "Get this rate — talk to Jacky",
  },
  zh: {
    eyebrow: "节省计算器",
    title: "看看您能节省多少",
    subtitle: "调整滑块以匹配您的业务，实时查看节省金额。",

    // Inputs
    monthlyVolumeLabel: "每月支付金额（加元）",
    monthlyVolumePlaceholder: "10,000",
    currentRateLabel: "您当前的手续费率",
    presetVisaMc: "Visa / MC ~2.7%",
    presetAmex: "Amex ~3.5%",
    presetCustom: "自定义",

    // Results
    resultsHeading: "您的预估节省",
    feesTodayLabel: "当前年度手续费",
    feesWithUsLabel: "使用我们1%费率",
    grossSavingsLabel: "年节省金额（持续）",
    monthlySavingsLabel: "月节省金额",
    firstYearLabel: "第一年节省总额",
    firstYearSubLabel: "含首年手续费前 $2,000 返现",
    rebateNoteFullyRebated:
      "您第一年的手续费将全额返还——第一年处理费为零。",
    perYear: "/ 年",
    perMonth: "/ 月",

    // Edge case when current rate ≤ 1%
    lowRateNote:
      "您当前费率已低于或等于1%。虽然费率节省有限，但您仍可享受第一年 $2,000 手续费返现。",

    // Disclaimer & CTA
    disclaimer:
      "以上数据仅供估算参考，实际节省金额取决于您的交易类型、退款情况及其他因素。",
    cta: "获取此费率——联系 Jacky",
  },
} as const;
