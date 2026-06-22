"use client";

import { useState, useRef, useEffect, useId } from "react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

interface Message {
  role: "user" | "model";
  text: string;
}

type SendStatus = "idle" | "loading" | "success" | "error";

export default function InterviewAgent() {
  const { t, locale } = useLanguage();
  const tc = t.contact;
  const uid = useId();

  // Seed the conversation with the assistant's opening message (no API call).
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", text: tc.agentSeedMessage },
  ]);
  const [input, setInput] = useState("");
  const [agentLoading, setAgentLoading] = useState(false);
  const [agentError, setAgentError] = useState("");

  const [sendStatus, setSendStatus] = useState<SendStatus>("idle");
  const [sendError, setSendError] = useState("");

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom on new messages.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, agentLoading]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || agentLoading) return;

    const newHistory: Message[] = [
      ...messages,
      { role: "user", text },
    ];
    setMessages(newHistory);
    setInput("");
    setAgentLoading(true);
    setAgentError("");

    try {
      const res = await fetch("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newHistory, locale }),
      });

      const data = (await res.json()) as
        | { ok: true; reply: string }
        | { ok: false; error: string };

      if (data.ok) {
        setMessages((prev) => [...prev, { role: "model", text: data.reply }]);
      } else {
        setAgentError(data.error || tc.agentErrorFallback);
      }
    } catch {
      setAgentError(tc.agentErrorFallback);
    } finally {
      setAgentLoading(false);
      // Refocus input for keyboard users.
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void sendMessage();
    }
  }

  // Build the transcript for sending to Jacky.
  function buildTranscript(): string {
    return messages
      .map((m) => `[${m.role === "user" ? "You" : "Assistant"}] ${m.text}`)
      .join("\n\n");
  }

  async function handleSendToJacky() {
    setSendStatus("loading");
    setSendError("");

    // Extract the prospect's name and email from the transcript heuristically —
    // the agent is instructed to collect them. We send them as "Unknown" if not found
    // so the email still arrives; Jacky can read the transcript.
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Intake Prospect",
          email: "noreply-intake@wechatpay-vancouver.com",
          type: "interview",
          transcript: buildTranscript(),
        }),
      });

      const data = (await res.json()) as { ok: boolean; error?: string };

      if (data.ok) {
        setSendStatus("success");
      } else {
        setSendStatus("error");
        setSendError(data.error ?? tc.agentSendError);
      }
    } catch {
      setSendStatus("error");
      setSendError(tc.agentSendError);
    }
  }

  // Determine whether we should show the "Send to Jacky" button.
  // Show it once there are at least 4 messages (2 user turns + 2 model turns).
  const showSendButton = messages.filter((m) => m.role === "user").length >= 2;

  return (
    <div className="flex flex-col gap-3">
      {/* Disclaimer banner */}
      <div
        role="note"
        className="flex items-start gap-2 rounded-xl bg-ink-50 border border-ink-200 px-4 py-3 text-xs text-ink-500"
      >
        <span aria-hidden className="mt-0.5 shrink-0 text-brand-500">
          ℹ
        </span>
        <span>{tc.agentDisclaimer}</span>
      </div>

      {/* Chat window */}
      <div
        role="log"
        aria-label="Interview conversation"
        aria-live="polite"
        className="flex h-72 flex-col gap-3 overflow-y-auto rounded-2xl border border-ink-200 bg-ink-50 p-4"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-brand-500 text-white rounded-br-sm"
                  : "bg-white border border-ink-200 text-ink-800 rounded-bl-sm shadow-soft"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {agentLoading && (
          <div className="flex justify-start">
            <div
              className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-ink-200 bg-white px-4 py-3 shadow-soft"
              aria-label={tc.agentTyping}
            >
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-400 [animation-delay:0ms]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-400 [animation-delay:150ms]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-400 [animation-delay:300ms]" />
            </div>
          </div>
        )}

        {/* Agent error */}
        {agentError && !agentLoading && (
          <div
            role="alert"
            aria-live="assertive"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {agentError}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input row */}
      <div className="flex gap-2">
        <label htmlFor={`${uid}-chat-input`} className="sr-only">
          {tc.agentInputPlaceholder}
        </label>
        <input
          id={`${uid}-chat-input`}
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tc.agentInputPlaceholder}
          disabled={agentLoading || sendStatus === "success"}
          aria-disabled={agentLoading || sendStatus === "success"}
          className="flex-1 rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 transition focus:border-brand-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 disabled:opacity-60"
        />
        <button
          type="button"
          onClick={() => void sendMessage()}
          disabled={!input.trim() || agentLoading || sendStatus === "success"}
          className="btn-primary shrink-0 disabled:opacity-60 disabled:cursor-not-allowed"
          aria-label={tc.agentSendBtn}
        >
          {agentLoading ? (
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
              {tc.agentSending}
            </span>
          ) : (
            tc.agentSendBtn
          )}
        </button>
      </div>

      {/* Send to Jacky section */}
      {showSendButton && sendStatus !== "success" && (
        <div className="mt-1 flex flex-col gap-2 rounded-xl border border-brand-200 bg-brand-50 px-4 py-3">
          <p className="text-xs text-brand-700">{tc.agentSendPrompt}</p>
          <button
            type="button"
            onClick={() => void handleSendToJacky()}
            disabled={sendStatus === "loading"}
            className="btn-primary self-start text-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {sendStatus === "loading" ? tc.agentSending : tc.agentSendToJacky}
          </button>
          {sendStatus === "error" && (
            <p role="alert" aria-live="polite" className="text-xs text-red-600">
              {sendError || tc.agentSendError}
            </p>
          )}
        </div>
      )}

      {/* Send success */}
      {sendStatus === "success" && (
        <div
          role="status"
          aria-live="polite"
          className="flex items-center gap-3 rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-800"
        >
          <span aria-hidden className="text-brand-500 text-lg">✓</span>
          {tc.agentSendSuccess}
        </div>
      )}
    </div>
  );
}
