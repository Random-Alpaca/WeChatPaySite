export const comparison = {
  en: {
    title: "How 1% compares",
    subtitle:
      "Canadian merchants typically pay 2.5–3.5% on card transactions. See how our flat 1% WeChat Pay rate stacks up.",
    highlightLabel: "WeChat Pay (via us)",
    colMethod: "Payment method",
    colRate: "Typical rate",
    colMonthly: "On $10,000/mo",
    colSaving: "vs. our 1%",
    disclaimer:
      "Competitor rates are typical industry figures for Canadian merchants and may vary by provider, volume, and contract terms. WeChat Pay rate is the flat 1% offered through this service.",
    rows: [
      {
        method: "WeChat Pay (via us)",
        rate: "1%",
        monthly: "$100",
        saving: "—",
        highlight: true,
      },
      {
        method: "Visa / Mastercard (credit)",
        rate: "~2.5–3.0%",
        monthly: "~$250–300",
        saving: "Save ~$150–200",
        highlight: false,
      },
      {
        method: "American Express",
        rate: "~3.5%",
        monthly: "~$350",
        saving: "Save ~$250",
        highlight: false,
      },
      {
        method: "Interac Debit",
        rate: "~0.5–1.5% + fees",
        monthly: "~$50–150+",
        saving: "Similar / varies",
        highlight: false,
      },
      {
        method: "Typical processor bundle",
        rate: "~2.5–3.5%",
        monthly: "~$250–350",
        saving: "Save ~$150–250",
        highlight: false,
      },
      {
        method: "Square / Stripe (online)",
        rate: "~2.9% + $0.30",
        monthly: "~$290+",
        saving: "Save ~$190+",
        highlight: false,
      },
    ],
  },
  zh: {
    title: "1% 费率对比",
    subtitle:
      "加拿大商家通常为刷卡交易支付 2.5–3.5% 的手续费。来看看我们 1% 统一费率的微信支付如何脱颖而出。",
    highlightLabel: "微信支付（经我们）",
    colMethod: "支付方式",
    colRate: "典型费率",
    colMonthly: "$10,000/月费用",
    colSaving: "对比我们 1%",
    disclaimer:
      "竞争对手费率为加拿大商家的典型行业数据，实际费率可能因服务商、交易量及合同条款而有所不同。微信支付费率为本服务提供的 1% 统一费率。",
    rows: [
      {
        method: "微信支付（经我们）",
        rate: "1%",
        monthly: "$100",
        saving: "—",
        highlight: true,
      },
      {
        method: "Visa / Mastercard（信用卡）",
        rate: "~2.5–3.0%",
        monthly: "~$250–300",
        saving: "节省约 $150–200",
        highlight: false,
      },
      {
        method: "American Express",
        rate: "~3.5%",
        monthly: "~$350",
        saving: "节省约 $250",
        highlight: false,
      },
      {
        method: "Interac 借记卡",
        rate: "~0.5–1.5% + 手续费",
        monthly: "~$50–150+",
        saving: "相近 / 浮动",
        highlight: false,
      },
      {
        method: "典型综合处理方案",
        rate: "~2.5–3.5%",
        monthly: "~$250–350",
        saving: "节省约 $150–250",
        highlight: false,
      },
      {
        method: "Square / Stripe（线上）",
        rate: "~2.9% + $0.30",
        monthly: "~$290+",
        saving: "节省约 $190+",
        highlight: false,
      },
    ],
  },
} as const;
