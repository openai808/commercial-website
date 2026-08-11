import {
  streamText,
  stepCountIs,
  convertToModelMessages,
  toUIMessageStream,
  createUIMessageStreamResponse,
  type UIMessage,
} from "ai";
import { getAnthropicProvider } from "@/lib/chatbot/anthropicClient";
import { chatbotTools } from "@/lib/chatbot/tools";
import { CHATBOT_SYSTEM_PROMPT } from "@/lib/chatbot/systemPrompt";

export const runtime = "nodejs";
export const maxDuration = 30;

const MODEL_ID = "claude-haiku-4-5";
const MAX_MESSAGES = 20;
const MAX_MESSAGE_CHARS = 2000;
const MAX_TOOL_STEPS = 6;

function textLength(message: UIMessage): number {
  return (message.parts ?? [])
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .reduce((sum, p) => sum + p.text.length, 0);
}

export async function POST(req: Request) {
  let body: { messages?: UIMessage[] };
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON body", { status: 400 });
  }

  const messages = body.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response("messages is required", { status: 400 });
  }
  if (messages.length > MAX_MESSAGES) {
    return new Response("Conversation too long", { status: 400 });
  }
  // Only cap visitor input — assistant replies already in history (e.g. a long
  // agent roster with bios) must never retroactively fail future requests.
  if (messages.some((m) => m.role === "user" && textLength(m) > MAX_MESSAGE_CHARS)) {
    return new Response("Message too long", { status: 400 });
  }

  const anthropic = getAnthropicProvider();

  const result = streamText({
    model: anthropic(MODEL_ID),
    system: CHATBOT_SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
    tools: chatbotTools,
    stopWhen: stepCountIs(MAX_TOOL_STEPS),
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream, tools: chatbotTools }),
  });
}
