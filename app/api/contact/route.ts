export const runtime = "nodejs";

import { sendInquiryEmail, MissingResendKeyError } from "@/lib/email";

export interface ContactRequestBody {
  name: string;
  business?: string;
  email: string;
  message?: string;
  /** "form" = direct contact form, "interview" = intake agent transcript */
  type?: "form" | "interview";
  /** Full interview transcript (used when type === "interview") */
  transcript?: string;
}

interface SuccessResponse {
  ok: true;
}

interface ErrorResponse {
  ok: false;
  error: string;
}

export type ContactResponse = SuccessResponse | ErrorResponse;

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request): Promise<Response> {
  let body: ContactRequestBody;

  try {
    body = (await req.json()) as ContactRequestBody;
  } catch {
    return jsonResponse({ ok: false, error: "Invalid JSON body." }, 400);
  }

  // --- Validation ---
  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const business = (body.business ?? "").trim();
  const message = (body.message ?? "").trim();
  const transcript = (body.transcript ?? "").trim();
  const type = body.type ?? "form";

  if (!name) {
    return jsonResponse({ ok: false, error: "Name is required." }, 422);
  }
  if (!email || !isValidEmail(email)) {
    return jsonResponse(
      { ok: false, error: "A valid email address is required." },
      422,
    );
  }

  // For "form" type we require a message; for "interview" we require a transcript.
  if (type === "form" && !message) {
    return jsonResponse({ ok: false, error: "Message is required." }, 422);
  }
  if (type === "interview" && !transcript) {
    return jsonResponse({ ok: false, error: "Transcript is required." }, 422);
  }

  // --- Build email ---
  const isInterview = type === "interview";
  const subject = isInterview
    ? `WeChat Pay Inquiry (Intake) — ${name}${business ? ` · ${business}` : ""}`
    : `WeChat Pay Inquiry — ${name}${business ? ` · ${business}` : ""}`;

  const lines: Array<{ label: string; value: string }> = [
    { label: "Name", value: name },
  ];
  if (business) lines.push({ label: "Business", value: business });
  lines.push({ label: "Email", value: email });

  if (isInterview && transcript) {
    lines.push({ label: "Intake Transcript", value: transcript });
  } else if (message) {
    lines.push({ label: "Message", value: message });
  }

  // --- Send ---
  try {
    await sendInquiryEmail({
      subject,
      fromName: name,
      replyTo: email,
      lines,
    });

    return jsonResponse({ ok: true }, 200);
  } catch (err) {
    if (err instanceof MissingResendKeyError) {
      return jsonResponse(
        {
          ok: false,
          error:
            "Email service is not configured. Please contact Jacky directly at j.xue0816@gmail.com.",
        },
        500,
      );
    }

    const message =
      err instanceof Error ? err.message : "An unexpected error occurred.";

    return jsonResponse({ ok: false, error: message }, 500);
  }
}

function jsonResponse(
  data: ContactResponse,
  status: number,
): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
