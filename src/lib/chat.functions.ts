import { z } from "zod";

import { resolveRetailAssistantReply, type MessageAction } from "./chat-assistant";
import { buildSystemPrompt } from "./chat-knowledge";

/** AI chat completions endpoint. */
const GATEWAY_URL = "https://api.openai.com/v1/chat/completions";
const DEFAULT_MODEL = "gpt-4o-mini";
/** Only the latest turns are sent, which keeps each request small. */
const HISTORY_LIMIT = 12;

export type ChatResult =
  | { ok: true; reply: string; actions?: MessageAction[] }
  | { ok: false; error: "busy" | "unavailable" };

export const chatInput = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().trim().min(1).max(2000),
      }),
    )
    .min(1)
    .max(60)
    .refine(
      (messages) => messages.at(-1)?.role === "user",
      "The last message must be the customer's.",
    ),
});

export async function sendChatMessage({
  data,
}: {
  data: {
    messages: Array<{ role: "user" | "assistant"; content: string }>;
  };
}): Promise<ChatResult> {
  const parsed = chatInput.safeParse(data);
  if (!parsed.success) {
    return { ok: false, error: "unavailable" };
  }

  const latestQuery = parsed.data.messages.at(-1)?.content ?? "";

  const apiKey =
    (typeof import.meta !== "undefined" && import.meta.env?.["VITE_AI_API_KEY"]) ||
    (typeof process !== "undefined" && process.env?.["AI_API_KEY"]) ||
    "";

  // If no AI key is configured, use the verified local retail knowledge assistant
  if (!apiKey) {
    const local = resolveRetailAssistantReply(latestQuery, parsed.data.messages);
    return { ok: true, reply: local.content, actions: local.actions };
  }

  try {
    const gateway =
      (typeof import.meta !== "undefined" && import.meta.env?.["VITE_AI_GATEWAY_URL"]) ||
      GATEWAY_URL;
    const model =
      (typeof import.meta !== "undefined" && import.meta.env?.["VITE_AI_MODEL"]) || DEFAULT_MODEL;

    const response = await fetch(gateway, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        temperature: 0.3,
        messages: [
          { role: "system", content: buildSystemPrompt() },
          ...parsed.data.messages.slice(-HISTORY_LIMIT),
        ],
      }),
      signal: AbortSignal.timeout(15_000),
    });

    if (response.status === 429) {
      // High volume: fallback gracefully to local verified knowledge base
      const local = resolveRetailAssistantReply(latestQuery, parsed.data.messages);
      return { ok: true, reply: local.content, actions: local.actions };
    }

    if (!response.ok) {
      console.warn(`Chat: AI gateway status ${response.status}, using verified local knowledge base`);
      const local = resolveRetailAssistantReply(latestQuery, parsed.data.messages);
      return { ok: true, reply: local.content, actions: local.actions };
    }

    const payload = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const reply = payload.choices?.[0]?.message?.content?.trim();
    if (reply) {
      // Attach contextual actions if relevant
      const local = resolveRetailAssistantReply(latestQuery, parsed.data.messages);
      return { ok: true, reply, actions: local.actions };
    }

    const local = resolveRetailAssistantReply(latestQuery, parsed.data.messages);
    return { ok: true, reply: local.content, actions: local.actions };
  } catch (error) {
    console.warn("Chat: AI request fallback to verified local knowledge base", error);
    const local = resolveRetailAssistantReply(latestQuery, parsed.data.messages);
    return { ok: true, reply: local.content, actions: local.actions };
  }
}
