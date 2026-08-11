import "server-only";

import { createAnthropic } from "@ai-sdk/anthropic";

export function getAnthropicProvider() {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error("Missing ANTHROPIC_API_KEY");
  }

  return createAnthropic({ apiKey });
}
