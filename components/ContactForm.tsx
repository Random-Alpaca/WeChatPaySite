"use client";

import { useState, useId } from "react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

interface FormState {
  name: string;
  business: string;
  email: string;
  message: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function ContactForm() {
  const { t } = useLanguage();
  const tc = t.contact;
  const uid = useId();

  const [form, setForm] = useState<FormState>({
    name: "",
    business: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");

  function validate(): FieldErrors {
    const errs: FieldErrors = {};
    if (!form.name.trim()) errs.name = tc.validationName;
    if (!form.email.trim() || !isValidEmail(form.email.trim()))
      errs.email = tc.validationEmail;
    if (!form.message.trim()) errs.message = tc.validationMessage;
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("loading");
    setServerError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          business: form.business.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          type: "form",
        }),
      });

      const data = (await res.json()) as { ok: boolean; error?: string };

      if (data.ok) {
        setStatus("success");
        setForm({ name: "", business: "", email: "", message: "" });
      } else {
        setStatus("error");
        setServerError(data.error ?? tc.errorMsg);
      }
    } catch {
      setStatus("error");
      setServerError(tc.errorMsg);
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FieldErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  const inputBase =
    "mt-1 w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 transition focus:border-brand-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2";
  const errorInput = "border-red-400 focus:border-red-400 focus-visible:ring-red-300";

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center gap-4 rounded-2xl bg-brand-50 border border-brand-200 px-6 py-10 text-center"
      >
        <span
          aria-hidden
          className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-brand-600 text-2xl"
        >
          ✓
        </span>
        <p className="font-semibold text-brand-800">{tc.successMsg}</p>
        <button
          type="button"
          className="btn-secondary text-xs"
          onClick={() => setStatus("idle")}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Name */}
      <div>
        <label
          htmlFor={`${uid}-name`}
          className="text-sm font-medium text-ink-700"
        >
          {tc.nameLabel} <span aria-hidden className="text-red-500">*</span>
        </label>
        <input
          id={`${uid}-name`}
          name="name"
          type="text"
          autoComplete="name"
          placeholder={tc.namePlaceholder}
          value={form.name}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? `${uid}-name-err` : undefined}
          className={`${inputBase} ${errors.name ? errorInput : ""}`}
        />
        {errors.name && (
          <p
            id={`${uid}-name-err`}
            role="alert"
            className="mt-1 text-xs text-red-600"
          >
            {errors.name}
          </p>
        )}
      </div>

      {/* Business */}
      <div>
        <label
          htmlFor={`${uid}-business`}
          className="text-sm font-medium text-ink-700"
        >
          {tc.businessLabel}
        </label>
        <input
          id={`${uid}-business`}
          name="business"
          type="text"
          autoComplete="organization"
          placeholder={tc.businessPlaceholder}
          value={form.business}
          onChange={handleChange}
          className={inputBase}
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor={`${uid}-email`}
          className="text-sm font-medium text-ink-700"
        >
          {tc.emailLabel} <span aria-hidden className="text-red-500">*</span>
        </label>
        <input
          id={`${uid}-email`}
          name="email"
          type="email"
          autoComplete="email"
          placeholder={tc.emailPlaceholder}
          value={form.email}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? `${uid}-email-err` : undefined}
          className={`${inputBase} ${errors.email ? errorInput : ""}`}
        />
        {errors.email && (
          <p
            id={`${uid}-email-err`}
            role="alert"
            className="mt-1 text-xs text-red-600"
          >
            {errors.email}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor={`${uid}-message`}
          className="text-sm font-medium text-ink-700"
        >
          {tc.messageLabel} <span aria-hidden className="text-red-500">*</span>
        </label>
        <textarea
          id={`${uid}-message`}
          name="message"
          rows={4}
          placeholder={tc.messagePlaceholder}
          value={form.message}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? `${uid}-message-err` : undefined}
          className={`${inputBase} resize-none ${errors.message ? errorInput : ""}`}
        />
        {errors.message && (
          <p
            id={`${uid}-message-err`}
            role="alert"
            className="mt-1 text-xs text-red-600"
          >
            {errors.message}
          </p>
        )}
      </div>

      {/* Server error */}
      {status === "error" && (
        <p role="alert" aria-live="polite" className="text-sm text-red-600">
          {serverError || tc.errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? tc.submitting : tc.submitBtn}
      </button>
    </form>
  );
}
