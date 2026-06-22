"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import ContactForm from "./ContactForm";
import InterviewAgent from "./InterviewAgent";

const CONTACT_EMAIL = "j.xue0816@gmail.com";

type TabId = "form" | "agent" | "email";

const TABS: { id: TabId; icon: string }[] = [
  { id: "form", icon: "✉" },
  { id: "agent", icon: "💬" },
  { id: "email", icon: "📧" },
];

export default function Contact() {
  const { t } = useLanguage();
  const tc = t.contact;

  const [activeTab, setActiveTab] = useState<TabId>("form");

  return (
    <section
      id="contact"
      className="scroll-mt-20 py-20 bg-white"
    >
      <div className="container-content">
        {/* Section header */}
        <div className="text-center">
          <p className="section-eyebrow">{tc.eyebrow}</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
            {tc.title}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-ink-600">{tc.subtitle}</p>
        </div>

        {/* Tab bar */}
        <div
          role="tablist"
          aria-label={tc.title}
          className="mt-10 flex gap-2 rounded-2xl border border-ink-200 bg-ink-50 p-1.5 sm:gap-3"
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const labelKey =
              tab.id === "form"
                ? "tab1"
                : tab.id === "agent"
                  ? "tab2"
                  : "tab3";
            return (
              <button
                key={tab.id}
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-xs font-semibold transition sm:text-sm ${
                  isActive
                    ? "bg-white shadow-soft text-ink-900 border border-ink-200"
                    : "text-ink-500 hover:text-ink-800"
                }`}
              >
                <span aria-hidden>{tab.icon}</span>
                <span className="hidden sm:inline">{tc[labelKey]}</span>
                <span className="sm:hidden">{tc[labelKey]}</span>
              </button>
            );
          })}
        </div>

        {/* Panels */}
        <div className="mt-6">
          {/* Contact Form Panel */}
          <div
            role="tabpanel"
            id="panel-form"
            aria-labelledby="tab-form"
            hidden={activeTab !== "form"}
          >
            <div className="mx-auto max-w-xl rounded-2xl border border-ink-200 bg-white p-6 shadow-card sm:p-8">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-ink-900">
                  {tc.formHeading}
                </h3>
                <p className="mt-1 text-sm text-ink-500">{tc.formSubtext}</p>
              </div>
              <ContactForm />
            </div>
          </div>

          {/* Interview Agent Panel */}
          <div
            role="tabpanel"
            id="panel-agent"
            aria-labelledby="tab-agent"
            hidden={activeTab !== "agent"}
          >
            <div className="mx-auto max-w-xl rounded-2xl border border-ink-200 bg-white p-6 shadow-card sm:p-8">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-ink-900">
                  {tc.agentHeading}
                </h3>
                <p className="mt-1 text-sm text-ink-500">{tc.agentSubtext}</p>
              </div>
              <InterviewAgent />
            </div>
          </div>

          {/* Direct Email Panel */}
          <div
            role="tabpanel"
            id="panel-email"
            aria-labelledby="tab-email"
            hidden={activeTab !== "email"}
          >
            <div className="mx-auto max-w-sm">
              <div className="rounded-2xl border border-ink-200 bg-white p-8 shadow-card text-center">
                {/* Avatar / icon */}
                <div
                  aria-hidden
                  className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-3xl"
                >
                  微
                </div>
                <h3 className="text-lg font-semibold text-ink-900">
                  {tc.emailHeading}
                </h3>
                <p className="mt-2 text-sm text-ink-500">{tc.emailSubtext}</p>

                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="btn-primary mt-6 w-full"
                >
                  {tc.emailCardCta}
                </a>

                <p className="mt-3 text-xs text-ink-400">{tc.emailCardNote}</p>

                {/* Displayed address */}
                <p className="mt-4 text-sm font-medium text-brand-700 break-all">
                  {CONTACT_EMAIL}
                </p>
              </div>

              {/* Quick-copy fallback */}
              <p className="mt-4 text-center text-xs text-ink-400">
                {/* Shown if mailto doesn't open automatically */}
                <span aria-hidden>↑ </span>
                <span className="font-medium text-ink-600">{CONTACT_EMAIL}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom strip: all three options at a glance (desktop) */}
        <div className="mt-14 hidden grid-cols-3 gap-6 lg:grid">
          {[
            {
              icon: "✉",
              heading: tc.formHeading,
              sub: tc.formSubtext,
              tab: "form" as TabId,
            },
            {
              icon: "💬",
              heading: tc.agentHeading,
              sub: tc.agentSubtext,
              tab: "agent" as TabId,
            },
            {
              icon: "📧",
              heading: tc.emailHeading,
              sub: tc.emailSubtext,
              tab: "email" as TabId,
            },
          ].map((item) => (
            <button
              key={item.tab}
              type="button"
              onClick={() => {
                setActiveTab(item.tab);
                // Scroll tabs into view smoothly.
                document
                  .getElementById(`tab-${item.tab}`)
                  ?.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
              className={`group rounded-2xl border p-5 text-left transition hover:shadow-card focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 ${
                activeTab === item.tab
                  ? "border-brand-300 bg-brand-50"
                  : "border-ink-200 bg-white hover:border-ink-300"
              }`}
            >
              <span
                aria-hidden
                className={`flex h-10 w-10 items-center justify-center rounded-xl text-xl transition ${
                  activeTab === item.tab
                    ? "bg-brand-500 text-white"
                    : "bg-ink-100 text-ink-600 group-hover:bg-brand-100 group-hover:text-brand-600"
                }`}
              >
                {item.icon}
              </span>
              <p className="mt-3 text-sm font-semibold text-ink-900">
                {item.heading}
              </p>
              <p className="mt-1 text-xs text-ink-500">{item.sub}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
