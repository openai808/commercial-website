import {
  ALLOWED_LISTING_PROPERTY_TYPES,
  PUBLIC_LISTING_STATUSES,
  type ListingPropertyTypeCount,
} from "@/lib/properties/types";
import { fixUtf8Mojibake } from "@/lib/text/fixUtf8Mojibake";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const PAGE_SIZE = 1000;

function normalizePropertyType(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const propertyType = fixUtf8Mojibake(value.trim());
  return propertyType.length > 0 ? propertyType : null;
}

export async function getListingPropertyTypeCounts(): Promise<
  ListingPropertyTypeCount[]
> {
  const supabase = createSupabaseServerClient();
  const counts = new Map<string, number>();
  let from = 0;

  while (true) {
    const to = from + PAGE_SIZE - 1;

    const { data, error } = await supabase
      .from("listings_secure")
      .select("property_type")
      .in("status", [...PUBLIC_LISTING_STATUSES])
      .in("property_type", [...ALLOWED_LISTING_PROPERTY_TYPES])
      .not("property_type", "is", null)
      .order("property_type", { ascending: true })
      .range(from, to);

    if (error) throw error;

    const rows = data ?? [];
    for (const row of rows) {
      const propertyType = normalizePropertyType(row.property_type);
      if (!propertyType) continue;
      counts.set(propertyType, (counts.get(propertyType) ?? 0) + 1);
    }

    if (rows.length < PAGE_SIZE) break;
    from += PAGE_SIZE;
  }

  return [...counts.entries()]
    .map(([propertyType, count]) => ({ propertyType, count }))
    .sort((a, b) => a.propertyType.localeCompare(b.propertyType));
}
