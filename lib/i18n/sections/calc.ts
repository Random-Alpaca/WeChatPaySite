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
    firstYearLabel: "Annual savings at 1%",
    firstYearSubLabel: "New merchant bonus: first $2,000 in volume is fee-free",
    rebateNoteFullyRebated:
      "New merchant bonus: first $2,000 in volume is fee-free",
    perYear: "/ year",
    perMonth: "/ month",

    // Edge case when current rate ≤ 1%
    lowRateNote:
      "Your current rate is already at or below 1%. You won't save on rate, but your first $2,000 in volume is still processed fee-free.",

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
    firstYearLabel: "按 1% 年节省额",
    firstYearSubLabel: "新商家福利：首 $2,000 交易额免手续费",
    rebateNoteFullyRebated:
      "新商家福利：首 $2,000 交易额免手续费",
    perYear: "/ 年",
    perMonth: "/ 月",

    // Edge case when current rate ≤ 1%
    lowRateNote:
      "您当前费率已低于或等于 1%。虽然费率节省有限，但首 $2,000 交易额仍享免手续费优惠。",

    // Disclaimer & CTA
    disclaimer:
      "以上数据仅供估算参考，实际节省金额取决于您的交易类型、退款情况及其他因素。",
    cta: "获取此费率——联系 Jacky",
  },
} as const;
