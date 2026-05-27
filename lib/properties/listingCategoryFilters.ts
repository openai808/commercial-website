import type { ListingCategory } from "@/lib/properties/searchParams";

/**
 * PostgREST `or` filters for listing category — aligned with `getListingContractStatus`.
 */
export const LEASE_LISTINGS_OR_FILTER =
  "listing_type.ilike.%lease%,listing_type.ilike.%rent%,contract_type.ilike.%lease%,contract_type.ilike.%rent%,contract_type.eq.Lease,monthly_rental_price.gt.0";

/** Explicit sale labels or listings with a selling price. */
export const SALE_LISTINGS_OR_FILTER =
  "listing_type.ilike.%sale%,contract_type.ilike.%sale%,contract_type.eq.Sale,selling_price.gt.0";

export function listingCategoryOrFilter(
  category: Exclude<ListingCategory, "" | "investment">,
): string {
  return category === "for-lease"
    ? LEASE_LISTINGS_OR_FILTER
    : SALE_LISTINGS_OR_FILTER;
}
