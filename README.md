# WeChat Pay for Vancouver Merchants

Marketing website for **Jacky Xue's** WeChat Pay acceptance service in Vancouver, BC —
powered by **IOTPay** in Canada. It highlights a flat **1% transaction fee**, a **rebate on the
first $2,000 in transaction fees**, quantifies the savings of switching, and lets prospects get in
touch three ways.

Built with **Next.js (App Router) + TypeScript + Tailwind CSS**, fully bilingual (**English / 中文**),
and deployable to **Vercel**.

## Features

- **Hero / Benefits / Pricing** — value proposition, 1% flat fee, and the first‑$2,000 rebate.
- **Savings Calculator** — enter monthly volume + current rate to see annual savings, including the
  first‑year $2,000 rebate.
- **Comparison Table** — 1% vs typical Visa/Mastercard, Amex, and bundled processor rates.
- **How It Works / FAQ** — onboarding steps with IOTPay and common merchant questions.
- **Three ways to make contact:**
  1. **Contact form** → emails Jacky via [Resend](https://resend.com).
  2. **Interviewer assistant** → a Google **Gemini**‑powered chat that *only gathers a prospect's
     needs* (it never quotes prices or gives advice), then forwards the summary to Jacky.
  3. **Direct email** → `mailto:` link to j.xue0816@gmail.com.
- **Language toggle** (EN / 中文) with preference persisted in `localStorage`.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values below
npm run dev                  # http://localhost:3000
```

`npm run build` produces the production build; `npm run start` serves it.

## Environment variables

Set these in `.env.local` for local dev and in **Vercel → Project Settings → Environment Variables**
for deployment. The site builds and runs without them — the contact form and assistant simply
return a friendly "not configured" message until the keys are present.

| Variable | Required for | Notes |
|---|---|---|
| `RESEND_API_KEY` | Contact form + interview summary emails | Create at https://resend.com/api-keys |
| `CONTACT_EMAIL` | Recipient of inquiries | Defaults to `j.xue0816@gmail.com` |
| `RESEND_FROM_EMAIL` | "From" address for Resend | Defaults to `onboarding@resend.dev`; use a verified domain in production |
| `GEMINI_API_KEY` | Interviewer assistant | Create at https://aistudio.google.com/app/apikey |
| `NEXT_PUBLIC_CONTACT_EMAIL` | (optional) Footer display email | Defaults to `j.xue0816@gmail.com` |

## Deploying to Vercel

1. Import this repository in Vercel (framework auto-detects as Next.js).
2. Add the environment variables above.
3. Deploy. The two API routes (`/api/contact`, `/api/interview`) run as Node.js serverless functions.

## Project structure

```
app/
  layout.tsx            Root layout + LanguageProvider + fonts/metadata
  page.tsx              Single-page composition of all sections
  api/contact/route.ts  POST — validates + emails via Resend
  api/interview/route.ts POST — Gemini interview turn
components/             Navbar, Footer, Hero, Benefits, Pricing,
                        SavingsCalculator, ComparisonTable, HowItWorks,
                        FAQ, Contact, ContactForm, InterviewAgent
lib/
  email.ts              Resend wrapper
  gemini.ts             Gemini client + interviewer system prompt
  i18n/                 LanguageProvider, dictionaries aggregator, per-section
                        EN/ZH dictionary files under sections/
```

### Editing copy / translations

All user-facing text lives in `lib/i18n/sections/*.ts`. Each file exports
`{ en, zh } as const` with structurally identical keys. Add/edit a string in both `en` and `zh`,
and reference it in a component via `const { t } = useLanguage(); t.<section>.<key>`.
