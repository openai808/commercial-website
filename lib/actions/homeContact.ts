"use server";

import { checkRateLimit } from "@/lib/security/rateLimit";
import { verifyTurnstileToken } from "@/lib/security/verifyTurnstile";

export type HomeContactState = {
  ok: boolean;
  error: string | null;
};

const MAX = {
  firstName: 80,
  lastName: 80,
  phone: 40,
  email: 254,
  company: 120,
  location: 120,
  assetClass: 120,
  message: 4000,
} as const;

const initialState: HomeContactState = { ok: false, error: null };

// General inquiries aren't tied to a listing or agent, but the lead-ingest
// CRM requires both `user_id` and `budget` on every lead, so route them to
// this agent so they aren't dropped by the CRM's validation.
const DEFAULT_AGENT_ID = "b764efc7-051e-4650-9a2e-3904c8364a1a";

export async function submitHomeContactModal(
  _prev: HomeContactState,
  formData: FormData,
): Promise<HomeContactState> {
  if (String(formData.get("website") ?? "").trim()) {
    return initialState;
  }

  // Shared bucket with submitPropertyContact: both write to the same CRM
  // lead-ingest endpoint, so they must draw from one combined quota rather
  // than two independent ones.
  const allowed = await checkRateLimit("lead-ingest");
  if (!allowed) {
    return { ok: false, error: "Too many submissions. Please try again later." };
  }

  const firstName = String(formData.get("firstName") ?? "")
    .trim()
    .slice(0, MAX.firstName);
  const lastName = String(formData.get("lastName") ?? "")
    .trim()
    .slice(0, MAX.lastName);
  const phone = String(formData.get("phone") ?? "")
    .trim()
    .slice(0, MAX.phone);
  const email = String(formData.get("email") ?? "")
    .trim()
    .slice(0, MAX.email);
  const company = String(formData.get("company") ?? "")
    .trim()
    .slice(0, MAX.company);
  const locationOfInterest = String(formData.get("locationOfInterest") ?? "")
    .trim()
    .slice(0, MAX.location);
  const assetClass = String(formData.get("assetClass") ?? "")
    .trim()
    .slice(0, MAX.assetClass);
  const message = String(formData.get("message") ?? "")
    .trim()
    .slice(0, MAX.message);
  const consentRequired = formData.get("consentRequired") === "on";

  if (!firstName || !lastName || !email || !locationOfInterest || !message || !consentRequired) {
    return { ok: false, error: "Please complete all required fields." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  const turnstileToken = String(formData.get("cf-turnstile-response") ?? "");
  const verified = await verifyTurnstileToken(turnstileToken);
  if (!verified) {
    return { ok: false, error: "Verification failed. Please try again." };
  }

  const endpoint = process.env.SUPABASE_LEADENPOINT;
  const apiKey = process.env.SUPABASE_LEAD_INGEST_API_KEY;

  if (!endpoint || !apiKey) {
    return { ok: false, error: "Service configuration error. Please try again later." };
  }

  const today = new Date().toISOString().split("T")[0];

  const body: Record<string, string | undefined> = {
    user_id: DEFAULT_AGENT_ID,
    lead_name: `${firstName} ${lastName}`,
    lead_source: "Website - Contact Form",
    budget: "Not specified",
    email,
    mobile: phone || undefined,
    notes: message || undefined,
    company: company || undefined,
    city: locationOfInterest || undefined,
    property_type: assetClass || undefined,
    date_inquired: today,
  };

  Object.keys(body).forEach((key) => {
    if (body[key] === undefined) delete body[key];
  });

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData?.error ?? "Failed to submit. Please try again.";
      return { ok: false, error: errorMessage };
    }

    const result = await response.json();

    if (!result.success) {
      return { ok: false, error: result.error ?? "Failed to submit. Please try again." };
    }

    return { ok: true, error: null };
  } catch {
    return { ok: false, error: "Network error. Please try again later." };
  }
}
