// Server-only — do NOT import from client components.
// Gemini client helper for the Interviewer intake agent.

import {
  GoogleGenerativeAI,
  type Content,
  type Part,
} from "@google/generative-ai";

export class MissingGeminiKeyError extends Error {
  constructor() {
    super("GEMINI_API_KEY environment variable is not set.");
    this.name = "MissingGeminiKeyError";
  }
}

export interface ChatMessage {
  role: "user" | "model";
  text: string;
}

const SYSTEM_INSTRUCTION = `You are Jacky Xue's intake assistant for his WeChat Pay merchant onboarding service in Greater Vancouver, BC, Canada.

YOUR SOLE PURPOSE is to interview the prospect to gather the information Jacky needs before he follows up. You do NOT give advice, quotes, pricing estimates, recommendations, or answer general questions about WeChat Pay, payments, fees, or any other topic.

BEHAVIOR RULES:
1. Introduce yourself briefly (one sentence) only if this is the very first message in the conversation. Otherwise skip the introduction.
2. Ask EXACTLY ONE concise question at a time. Never ask multiple questions in a single turn.
3. Be warm, professional, and concise.
4. If the user asks for pricing, quotes, advice, or anything outside your scope, politely decline with one sentence (e.g. "That's a great question for Jacky — he'll cover it when he follows up!") and immediately pivot back to the next interview question.
5. Do NOT volunteer any information about fees, rates, timelines, requirements, or WeChat Pay policies.
6. Respond in the language indicated by the locale field the route passes to you. If locale is "zh", reply in Simplified Chinese. If "en", reply in English.
7. Keep each response under 80 words.

INFORMATION TO COLLECT (in roughly this order — adapt naturally):
a) Business type and industry
b) City / area within Greater Vancouver
c) Approximate monthly card / payment transaction volume (in CAD)
d) Current payment processor and rough fee rate they pay
e) Main pain points with their current setup
f) Whether they currently serve Chinese-speaking customers, or specifically want WeChat Pay
g) Desired timeline to switch / get started
h) Prospect's name and preferred contact (email or phone)

COMPLETION:
Once you have gathered all of the above (or the user has declined to answer some items), output a short summary paragraph of what you captured, then say: "That's everything I need! Please click the 'Send my info to Jacky' button below and he'll be in touch with you directly."

Do not say anything else after the completion message. The user will use the button to send the transcript.`;

export async function runInterviewTurn(
  messages: ChatMessage[],
  locale: string,
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new MissingGeminiKeyError();
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: SYSTEM_INSTRUCTION,
  });

  // Map our message format to Gemini's Content[] format.
  // Gemini requires alternating user/model turns and the array must start with "user".
  // We pass history (all messages except the last) as the chat history, and
  // the last user message as the current send.
  const contents: Content[] = messages.map((msg) => ({
    role: msg.role,
    parts: [{ text: `[locale:${locale}]\n${msg.text}` } as Part],
  }));

  // Inject locale into the last user message (which is already in contents).
  // Nothing extra needed since we embed locale in each part's text prefix.

  const result = await model.generateContent({
    contents,
    generationConfig: {
      maxOutputTokens: 300,
      temperature: 0.4,
    },
  });

  const candidate = result.response.candidates?.[0];
  if (!candidate) {
    throw new Error("Gemini returned no candidates.");
  }

  const replyText =
    candidate.content.parts.map((p: Part) => ("text" in p ? p.text : "")).join("").trim();

  if (!replyText) {
    throw new Error("Gemini returned an empty response.");
  }

  return replyText;
}
