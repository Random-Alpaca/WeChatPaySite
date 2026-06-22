// Server-only — do NOT import from client components.
// Resend email helper for WeChat Pay Vancouver site.

import { Resend } from "resend";

export class MissingResendKeyError extends Error {
  constructor() {
    super("RESEND_API_KEY environment variable is not set.");
    this.name = "MissingResendKeyError";
  }
}

export interface SendInquiryEmailOptions {
  subject: string;
  /** Prospect's name (optional) */
  fromName?: string;
  /** Prospect's email — used as reply-to when present */
  replyTo?: string;
  /** Array of { label, value } pairs that make up the email body */
  lines: Array<{ label: string; value: string }>;
}

export async function sendInquiryEmail(
  opts: SendInquiryEmailOptions,
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new MissingResendKeyError();
  }

  const resend = new Resend(apiKey);

  const toEmail =
    process.env.CONTACT_EMAIL || "j.xue0816@gmail.com";
  const fromEmail =
    process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

  // Build a simple HTML body from the lines array.
  const rowsHtml = opts.lines
    .map(
      ({ label, value }) => `
      <tr>
        <td style="padding:8px 12px;background:#f6f7f8;font-weight:600;white-space:nowrap;vertical-align:top;border-bottom:1px solid #eceef1;">${escapeHtml(label)}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eceef1;">${escapeHtml(value).replace(/\n/g, "<br>")}</td>
      </tr>`,
    )
    .join("");

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>${escapeHtml(opts.subject)}</title></head>
<body style="font-family:system-ui,sans-serif;color:#13161b;background:#fff;margin:0;padding:0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:40px auto;border:1px solid #eceef1;border-radius:12px;overflow:hidden;">
    <tr>
      <td style="background:#07c160;padding:20px 24px;">
        <span style="color:#fff;font-size:18px;font-weight:700;">WeChat Pay Vancouver — New Inquiry</span>
      </td>
    </tr>
    <tr>
      <td style="padding:0;">
        <table width="100%" cellpadding="0" cellspacing="0">
          ${rowsHtml}
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:16px 24px;color:#838d9c;font-size:12px;">
        This message was submitted via the WeChatPay Vancouver website.
      </td>
    </tr>
  </table>
</body>
</html>`;

  // Plain-text fallback
  const text = opts.lines
    .map(({ label, value }) => `${label}:\n${value}`)
    .join("\n\n");

  const sendOptions: Parameters<typeof resend.emails.send>[0] = {
    from: opts.fromName
      ? `${opts.fromName} via WeChatPay Site <${fromEmail}>`
      : `WeChatPay Vancouver <${fromEmail}>`,
    to: [toEmail],
    subject: opts.subject,
    html,
    text,
  };

  if (opts.replyTo) {
    sendOptions.replyTo = opts.replyTo;
  }

  const { error } = await resend.emails.send(sendOptions);
  if (error) {
    throw new Error(`Resend error: ${error.message ?? JSON.stringify(error)}`);
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
