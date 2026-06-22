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
    agentHeading: "Intake Assistant",
    agentSubtext:
      "A quick interview so Jacky has everything he needs before he calls you back.",
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
      "This assistant only collects information — it won't quote prices or give advice. Jacky will follow up personally.",
    agentInputPlaceholder: "Type your reply…",
    agentSendBtn: "Send",
    agentSending: "Sending…",
    agentTyping: "Assistant is typing…",
    agentSeedMessage:
      "Hi! I'm Jacky's intake assistant. I'll ask you a few quick questions so Jacky has everything he needs when he follows up with you. Ready to start? Could you tell me what type of business you run and what industry you're in?",
    agentSendToJacky: "Send my info to Jacky",
    agentSendSuccess: "Your info has been sent to Jacky — he'll reach out soon!",
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
    agentHeading: "入驻助手",
    agentSubtext: "通过简短问答，让薛先生回电前就掌握您的全部情况。",
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
      "此助手仅用于收集信息 — 不提供报价或商业建议。薛先生会亲自跟进。",
    agentInputPlaceholder: "请输入您的回复……",
    agentSendBtn: "发送",
    agentSending: "发送中……",
    agentTyping: "助手正在输入……",
    agentSeedMessage:
      "您好！我是薛先生的入驻助手。我会向您提几个简短的问题，以便薛先生联系您时已掌握所有必要信息。准备好了吗？能告诉我您经营的是什么类型的业务，属于哪个行业吗？",
    agentSendToJacky: "将我的信息发送给薛先生",
    agentSendSuccess: "您的信息已发送给薛先生 — 他会尽快与您联系！",
    agentSendError: "发送失败，请使用表单或直接发送邮件。",
    agentErrorFallback:
      "助手暂时不可用，请使用联系表单或直接发邮件给薛先生。",

    // Direct email card
    emailCardCta: "发邮件给薛先生",
    emailCardNote: "工作时间（太平洋时间）内通常数小时内回复。",
  },
} as const;
