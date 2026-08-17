import { tool } from "ai";
import { z } from "zod";

const MAX = {
  name: 160,
  email: 254,
  phone: 40,
  message: 4000,
  listingCode: 40,
  agentId: 64,
  budget: 120,
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const captureLead = tool({
  description:
    "Submit a visitor's contact details to RE/MAX Commercial 8 so an agent can follow up. " +
    "The CRM requires every lead to be tied to a specific agent and to include a budget, so only call this " +
    "after: (1) you've already looked up one specific listing with getPropertyDetails in this conversation, " +
    "and (2) the visitor has given a name and at least an email or phone number. Do not ask the visitor for a " +
    "budget — pass the listing's own \"price\" value from that getPropertyDetails result as budget " +
    "(use \"Not specified\" if that listing has no price). Never fabricate or guess the name, email, or phone.",
  inputSchema: z.object({
    name: z.string().min(1).max(MAX.name),
    email: z.string().max(MAX.email).optional(),
    phone: z.string().max(MAX.phone).optional(),
    budget: z
      .string()
      .min(1)
      .max(MAX.budget)
      .describe(
        "The listing's own price, copied from the \"price\" field of a prior getPropertyDetails result — never ask the visitor for this. Use \"Not specified\" if that listing has no price.",
      ),
    message: z
      .string()
      .max(MAX.message)
      .optional()
      .describe("What the visitor is looking for, in their own words."),
    listingCode: z
      .string()
      .max(MAX.listingCode)
      .optional()
      .describe("The listing this lead is about, from a prior getPropertyDetails call."),
    agentId: z
      .string()
      .min(1)
      .max(MAX.agentId)
      .describe("The agent.id value from a prior getPropertyDetails call for the same listing. Required."),
  }),
  execute: async ({ name, email, phone, budget, message, listingCode, agentId }) => {
    const trimmedName = name.trim().slice(0, MAX.name);
    const trimmedEmail = (email ?? "").trim().slice(0, MAX.email);
    const trimmedPhone = (phone ?? "").trim().slice(0, MAX.phone);
    const trimmedBudget = budget.trim().slice(0, MAX.budget);
    const trimmedAgentId = agentId.trim().slice(0, MAX.agentId);

    if (!trimmedName || (!trimmedEmail && !trimmedPhone)) {
      return { success: false, error: "Need a name and at least an email or phone number." };
    }
    if (trimmedEmail && !EMAIL_RE.test(trimmedEmail)) {
      return { success: false, error: "That email address doesn't look valid." };
    }
    if (!trimmedBudget) {
      return { success: false, error: "Need a budget or price range to submit this lead." };
    }
    if (!trimmedAgentId) {
      return { success: false, error: "This lead needs to be tied to a specific listing before it can be submitted." };
    }

    const endpoint = process.env.SUPABASE_LEADENPOINT;
    const apiKey = process.env.SUPABASE_LEAD_INGEST_API_KEY;
    if (!endpoint || !apiKey) {
      return { success: false, error: "Lead service is not configured." };
    }

    const today = new Date().toISOString().split("T")[0];
    const body: Record<string, string | undefined> = {
      user_id: trimmedAgentId,
      lead_name: trimmedName,
      lead_source: "Chatbot",
      budget: trimmedBudget,
      email: trimmedEmail || undefined,
      mobile: trimmedPhone || undefined,
      notes: message?.trim().slice(0, MAX.message) || undefined,
      listing_code: listingCode?.trim().slice(0, MAX.listingCode) || undefined,
      date_inquired: today,
    };
    Object.keys(body).forEach((key) => {
      if (body[key] === undefined) delete body[key];
    });

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": apiKey },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("captureLead: webhook returned", response.status, errorData);
        return { success: false, error: errorData?.error ?? "Failed to submit your details." };
      }
      const result = await response.json();
      if (!result.success) {
        console.error("captureLead: webhook responded ok but success=false", result);
        return { success: false, error: result.error ?? "Failed to submit your details." };
      }
      return { success: true as const };
    } catch (err) {
      console.error("captureLead: fetch threw", err);
      return { success: false, error: "Network error — please try again later." };
    }
  },
});
