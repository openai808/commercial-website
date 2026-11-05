import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { headers } from "next/headers";

// Vercel's Upstash Marketplace integration provisions KV_REST_API_URL/TOKEN
// (legacy @vercel/kv naming); a direct Upstash console setup uses
// UPSTASH_REDIS_REST_URL/TOKEN instead. Support both.
const redisUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

const redis = redisUrl && redisToken ? new Redis({ url: redisUrl, token: redisToken }) : null;

const ratelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "10 m"),
      prefix: "contact-form",
    })
  : null;

export async function checkRateLimit(formName: string): Promise<boolean> {
  if (!ratelimit) {
    console.warn(
      "Rate limiting is not configured (KV_REST_API_URL/UPSTASH_REDIS_REST_URL missing) — allowing submission.",
    );
    return true;
  }

  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  const { success } = await ratelimit.limit(`${formName}:${ip}`);
  return success;
}
