"use server";

import { getListingBySlugOrId } from "@/lib/properties/getProperties";
import { getListingPropertyType, getListingStatus } from "@/lib/properties/listingDisplay";
import { checkRateLimit } from "@/lib/security/rateLimit";
import { verifyTurnstileToken } from "@/lib/security/verifyTurnstile";

export type PropertyContactState = {
  ok: boolean;
  error: string | null;
};

const MAX = {
  firstName: 80,
  lastName: 80,
  phone: 40,
  email: 254,
  company: 120,
  message: 4000,
  listingCode: 40,
  listingTitle: 200,
} as const;

const initialState: PropertyContactState = { ok: false, error: null };

export async function submitPropertyContact(
  _prev: PropertyContactState,
  formData: FormData,
): Promise<PropertyContactState> {
  if (String(formData.get("website") ?? "").trim()) {
    return initialState;
  }

  // Shared bucket with submitHomeContactModal: both write to the same CRM
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
  const email = String(formData.get("email") ?? "")
    .trim()
    .slice(0, MAX.email);
  const phone = String(formData.get("phone") ?? "")
    .trim()
    .slice(0, MAX.phone);
  const message = String(formData.get("message") ?? "")
    .trim()
    .slice(0, MAX.message);
  const listingCode = String(formData.get("listingCode") ?? "")
    .trim()
    .slice(0, MAX.listingCode);
  const consentRequired = formData.get("consentRequired") === "on";

  if (!firstName || !lastName || !email || !message || !consentRequired) {
    return { ok: false, error: "Please complete all required fields." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  if (!listingCode) {
    return { ok: false, error: "Listing information is missing." };
  }

  // Derive agent/price/property metadata from the real listing record rather
  // than trusting the client-submitted hidden-field copies of this data —
  // those fields are plain, unsigned <input type="hidden"> values and are
  // not used for CRM attribution below.
  const listing = await getListingBySlugOrId(listingCode).catch(() => null);
  if (!listing) {
    return { ok: false, error: "Listing information is missing." };
  }

  const agentId = listing.agent?.id ?? "";
  const priceRaw = String(
    listing.selling_price ?? listing.monthly_rental_price ?? listing.price ?? "",
  );
  const propertyType = getListingPropertyType(listing);
  const contractType = getListingStatus(listing) === "lease" ? "Lease" : "Sale";
  const city = listing.city ?? "";

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
  const numericPrice = Number(priceRaw.replace(/,/g, ""));

  const body: Record<string, string | undefined> = {
    user_id: agentId || undefined,
    lead_name: `${firstName} ${lastName}`,
    lead_source: "Website",
    budget:
      priceRaw && Number.isFinite(numericPrice)
        ? numericPrice.toLocaleString("en-US")
        : undefined,
    email,
    mobile: phone || undefined,
    notes: message || undefined,
    listing_code: listing.listing_code ?? listingCode,
    property_type: propertyType || undefined,
    contract_type: contractType || undefined,
    city: city || undefined,
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
      const errorMessage = errorData?.error ?? "Failed to submit inquiry.";
      return { ok: false, error: errorMessage };
    }

    const result = await response.json();

    if (!result.success) {
      return { ok: false, error: result.error ?? "Failed to submit inquiry." };
    }

    return { ok: true, error: null };
  } catch {
    return { ok: false, error: "Network error. Please try again later." };
  }
}
