export const runtime = "nodejs";

import { runInterviewTurn, MissingGeminiKeyError, type ChatMessage } from "@/lib/gemini";

export interface InterviewRequestBody {
  messages: ChatMessage[];
  locale?: string;
}

interface SuccessResponse {
  ok: true;
  reply: string;
}

interface ErrorResponse {
  ok: false;
  error: string;
}

export type InterviewResponse = SuccessResponse | ErrorResponse;

export async function POST(req: Request): Promise<Response> {
  let body: InterviewRequestBody;

  try {
    body = (await req.json()) as InterviewRequestBody;
  } catch {
    return jsonResponse({ ok: false, error: "Invalid JSON body." }, 400);
  }

  const messages = body.messages;
  const locale = (body.locale ?? "en").trim() || "en";

  if (!Array.isArray(messages) || messages.length === 0) {
    return jsonResponse(
      { ok: false, error: "messages must be a non-empty array." },
      422,
    );
  }

  // Ensure the last message is from the user.
  const last = messages[messages.length - 1];
  if (!last || last.role !== "user") {
    return jsonResponse(
      { ok: false, error: "Last message must have role 'user'." },
      422,
    );
  }

  try {
    const reply = await runInterviewTurn(messages, locale);
    return jsonResponse({ ok: true, reply }, 200);
  } catch (err) {
    if (err instanceof MissingGeminiKeyError) {
      return jsonResponse(
        {
          ok: false,
          error:
            "AI assistant is not configured. Please use the contact form or email j.xue0816@gmail.com directly.",
        },
        500,
      );
    }

    const msg =
      err instanceof Error ? err.message : "An unexpected error occurred.";

    return jsonResponse({ ok: false, error: msg }, 500);
  }
}

function jsonResponse(
  data: InterviewResponse,
  status: number,
): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
