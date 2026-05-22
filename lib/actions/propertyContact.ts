"use server";

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
  const agentId = String(formData.get("agentId") ?? "").trim();
  const price = String(formData.get("price") ?? "").trim();
  const propertyType = String(formData.get("propertyType") ?? "").trim();
  const contractType = String(formData.get("contractType") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
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

  const endpoint = process.env.SUPABASE_LEADENPOINT;
  const apiKey = process.env.SUPABASE_LEAD_INGEST_API_KEY;

  if (!endpoint || !apiKey) {
    return { ok: false, error: "Service configuration error. Please try again later." };
  }

  const today = new Date().toISOString().split("T")[0];

  const body: Record<string, string | undefined> = {
    user_id: agentId || undefined,
    lead_name: `${firstName} ${lastName}`,
    lead_source: "Website",
    budget: price ? Number(price.replace(/,/g, "")).toLocaleString("en-US") : undefined,
    email,
    mobile: phone || undefined,
    notes: message || undefined,
    listing_code: listingCode,
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
