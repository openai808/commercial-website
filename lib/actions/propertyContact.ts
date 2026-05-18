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
  const message = String(formData.get("message") ?? "")
    .trim()
    .slice(0, MAX.message);
  const consentRequired = formData.get("consentRequired") === "on";

  if (!firstName || !lastName || !email || !message || !consentRequired) {
    return { ok: false, error: "Please complete all required fields." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  void String(formData.get("phone") ?? "").trim().slice(0, MAX.phone);
  void String(formData.get("company") ?? "").trim().slice(0, MAX.company);
  void String(formData.get("listingCode") ?? "").trim().slice(0, MAX.listingCode);
  void String(formData.get("listingTitle") ?? "").trim().slice(0, MAX.listingTitle);
  void String(formData.get("agentId") ?? "").trim();

  return { ok: true, error: null };
}
