// Contact section dictionary — owned by Contact + Integrations agent (B3).
// Both `en` and `zh` must be structurally identical (same keys, different values).
export const contact = {
  en: {
    // Section header
    title: "Get in Touch",
    subtitle:
      "Three ways to connect with Jacky — choose whatever works best for you.",
    eyebrow: "Contact",

    // Tab / panel headings
    tab1: "Send a Message",
    tab2: "Chat with Intake Assistant",
    tab3: "Email Directly",

    // Option labels (used in cards/headings within each panel)
    formHeading: "Contact Form",
    formSubtext: "We'll reply within one business day.",
    agentHeading: "Business Needs Interview",
    agentSubtext:
      "Chat with our assistant — it'll learn about your business so Jacky can give you a fully personalized follow-up.",
    emailHeading: "Personal Email",
    emailSubtext:
      "Prefer to write directly? Send Jacky a message at his personal address.",

    // Contact form fields & actions
    nameLabel: "Your Name",
    namePlaceholder: "Jane Smith",
    businessLabel: "Business Name",
    businessPlaceholder: "My Business Inc.",
    emailLabel: "Email Address",
    emailPlaceholder: "jane@example.com",
    messageLabel: "Message",
    messagePlaceholder: "Tell us a little about your business and what you're looking for…",
    submitBtn: "Send Message",
    submitting: "Sending…",
    successMsg: "Message sent! Jacky will be in touch shortly.",
    errorMsg: "Something went wrong. Please try again or email directly.",
    validationName: "Name is required.",
    validationEmail: "A valid email address is required.",
    validationMessage: "Message is required.",

    // Interview agent UI
    agentDisclaimer:
      "Disclaimer: this assistant gathers information about your business only. It cannot provide pricing quotes, rate negotiations, fee estimates, timelines, or any specific commitments. Jacky will follow up personally with details tailored to your situation.",
    agentInputPlaceholder: "Type your reply…",
    agentSendBtn: "Send",
    agentSending: "Sending…",
    agentTyping: "Assistant is typing…",
    agentSeedMessage:
      "Hi! I’m Maya, Jacky’s assistant. I’d love to learn a bit about your business so Jacky can give you a really useful, personalized follow-up — rather than a generic pitch. To start: what kind of business do you run, and where are you located in Greater Vancouver?",
    agentSendPrompt:
      "Ready to send your info to Jacky? He’ll reach out personally — no sales scripts, just a real conversation about whether WeChat Pay & Alipay make sense for you.",
    agentSendToJacky: "Send my info to Jacky",
    agentSendSuccess: "Sent! Jacky will be in touch soon with a personalized follow-up.",
    agentSendError: "Couldn't send. Please try the form or email directly.",
    agentErrorFallback:
      "The assistant is temporarily unavailable. Please use the contact form or email Jacky directly.",

    // Direct email card
    emailCardCta: "Email Jacky",
    emailCardNote:
      "Replies usually within a few hours during business hours (Pacific Time).",
  },

  zh: {
    // Section header
    title: "联系我们",
    subtitle: "三种方式与薛先生取得联系 — 选择最适合您的方式。",
    eyebrow: "联系",

    // Tab / panel headings
    tab1: "发送消息",
    tab2: "与助手对话",
    tab3: "直接发邮件",

    // Option labels
    formHeading: "联系表单",
    formSubtext: "我们将在一个工作日内回复。",
    agentHeading: "业务需求访谈",
    agentSubtext: "与我们的助手交流——了解您的业务后，薛先生可为您提供真正个性化的跟进服务。",
    emailHeading: "个人邮箱",
    emailSubtext: "更喜欢直接写信？请发邮件至薛先生的个人邮箱。",

    // Contact form fields & actions
    nameLabel: "您的姓名",
    namePlaceholder: "张三",
    businessLabel: "公司名称",
    businessPlaceholder: "我的公司有限公司",
    emailLabel: "电子邮箱",
    emailPlaceholder: "zhang@example.com",
    messageLabel: "留言",
    messagePlaceholder: "请简要介绍您的业务及需求……",
    submitBtn: "发送消息",
    submitting: "发送中……",
    successMsg: "消息已发送！薛先生将尽快与您联系。",
    errorMsg: "发送失败，请重试或直接发送邮件。",
    validationName: "请输入您的姓名。",
    validationEmail: "请输入有效的电子邮箱地址。",
    validationMessage: "请输入留言内容。",

    // Interview agent UI
    agentDisclaimer:
      "免责声明：此助手仅用于收集您的业务信息，无法提供报价、费率谈判、费用估算、时间表或任何具体承诺。薛先生将亲自联系您，根据您的实际情况提供专属方案。",
    agentInputPlaceholder: "请输入您的回复……",
    agentSendBtn: "发送",
    agentSending: "发送中……",
    agentTyping: "助手正在输入……",
    agentSeedMessage:
      "您好！我是薛先生的助手 Maya。我希望先多了解一些您的业务情况，这样薛先生可以为您提供真正有价值的个性化跟进——而非千篇一律的介绍。首先请问：您经营的是什么类型的业务，店铺位于大温哥华的哪个区域？",
    agentSendPrompt: "准备好将您的信息发送给薛先生了吗？他会亲自与您联系——不是套路式推销，而是认真聊聊微信支付与支付宝是否适合您的业务。",
    agentSendToJacky: "将我的信息发送给薛先生",
    agentSendSuccess: "已发送！薛先生将尽快与您联系，为您提供专属跟进服务。",
    agentSendError: "发送失败，请使用表单或直接发送邮件。",
    agentErrorFallback:
      "助手暂时不可用，请使用联系表单或直接发邮件给薛先生。",

    // Direct email card
    emailCardCta: "发邮件给薛先生",
    emailCardNote: "工作时间（太平洋时间）内通常数小时内回复。",
  },
} as const;
