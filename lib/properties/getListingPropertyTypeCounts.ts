import {
  ALLOWED_LISTING_PROPERTY_TYPES,
  PUBLIC_LISTING_STATUSES,
  type ListingPropertyTypeCount,
} from "@/lib/properties/types";
import { canonicalizePropertyType } from "@/lib/properties/propertyTypeFilter";
import { fixUtf8Mojibake } from "@/lib/text/fixUtf8Mojibake";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const RPC_TIMEOUT_MS = 8000;

function normalizePropertyType(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const propertyType = fixUtf8Mojibake(value.trim());
  return propertyType.length > 0 ? propertyType : null;
}

type PropertyTypeCountRow = { property_type: string | null; count: number | null };

export async function getListingPropertyTypeCounts(): Promise<
  ListingPropertyTypeCount[]
> {
  const supabase = createSupabaseServerClient();

  let rows: PropertyTypeCountRow[];
  try {
    const { data, error } = await supabase
      .rpc("get_listing_property_type_counts", {
        p_statuses: [...PUBLIC_LISTING_STATUSES],
        p_property_types: [...ALLOWED_LISTING_PROPERTY_TYPES],
      })
      .abortSignal(AbortSignal.timeout(RPC_TIMEOUT_MS));

    if (error) throw error;
    rows = (data ?? []) as PropertyTypeCountRow[];
  } catch (error) {
    console.error(
      "getListingPropertyTypeCounts: RPC failed, returning empty list",
      error,
    );
    return [];
  }

  const counts = new Map<string, number>();

  for (const row of rows) {
    const propertyType = normalizePropertyType(row.property_type);
    if (!propertyType) continue;

    const canonical = canonicalizePropertyType(
      propertyType,
      ALLOWED_LISTING_PROPERTY_TYPES,
    );
    counts.set(canonical, (counts.get(canonical) ?? 0) + (row.count ?? 0));
  }

  return [...counts.entries()]
    .map(([propertyType, count]) => ({ propertyType, count }))
    .sort((a, b) => a.propertyType.localeCompare(b.propertyType));
}
