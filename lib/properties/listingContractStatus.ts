import type { ListingWithAgent } from "@/lib/properties/types";

export type ListingContractStatus = "lease" | "sale";

function asString(value: unknown): string | null {
  if (typeof value === "string" && value.trim()) {
    return value.trim();
  }
  return null;
}

function asNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value.trim().replace(/,/g, ""));
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function normalizeLabel(value: string | null): string {
  return (value ?? "").toLowerCase();
}

function labelIndicatesLease(value: string): boolean {
  return value.includes("lease") || value.includes("rent");
}

function labelIndicatesSale(value: string): boolean {
  return value.includes("sale");
}

/**
 * Resolves whether a listing is for lease or for sale using the same signals
 * as the properties search filters (`listing_type`, `contract_type`, prices).
 */
export function getListingContractStatus(
  listing: ListingWithAgent,
): ListingContractStatus {
  const listingType = normalizeLabel(asString(listing.listing_type));
  const contractType = normalizeLabel(asString(listing.contract_type));

  if (labelIndicatesLease(listingType) || labelIndicatesLease(contractType)) {
    return "lease";
  }

  if (labelIndicatesSale(listingType) || labelIndicatesSale(contractType)) {
    return "sale";
  }

  const monthlyRent = asNumber(listing.monthly_rental_price);
  const sellingPrice = asNumber(listing.selling_price);

  if (monthlyRent != null && monthlyRent > 0) {
    if (sellingPrice == null || sellingPrice <= 0) {
      return "lease";
    }
  }

  if (sellingPrice != null && sellingPrice > 0) {
    return "sale";
  }

  return "sale";
}
