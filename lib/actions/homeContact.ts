"use server";

import { redirect } from "next/navigation";

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

export async function submitHomeContactModal(formData: FormData) {
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

  if (String(formData.get("website") ?? "").trim()) {
    redirect("/");
  }

  if (!firstName || !lastName || !email || !locationOfInterest || !message || !consentRequired) {
    redirect("/?contact=missing");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    redirect("/?contact=invalid-email");
  }

  void phone;
  void company;
  void assetClass;

  redirect("/contact?src=home");
}
