import {
  ALLOWED_LISTING_PROPERTY_TYPES,
  type ListingCityCount,
} from "@/lib/properties/types";
import { fixUtf8Mojibake } from "@/lib/text/fixUtf8Mojibake";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const PAGE_SIZE = 1000;

function normalizeCity(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const city = fixUtf8Mojibake(value.trim());
  return city.length > 0 ? city : null;
}

export async function getListingCityCounts(): Promise<ListingCityCount[]> {
  const supabase = createSupabaseServerClient();
  const counts = new Map<string, number>();
  let from = 0;

  while (true) {
    const to = from + PAGE_SIZE - 1;

    const { data, error } = await supabase
      .from("listings_secure")
      .select("city")
      .eq("status", "Available")
      .in("property_type", [...ALLOWED_LISTING_PROPERTY_TYPES])
      .not("city", "is", null)
      .order("city", { ascending: true })
      .range(from, to);

    if (error) throw error;

    const rows = data ?? [];
    for (const row of rows) {
      const city = normalizeCity(row.city);
      if (!city) continue;
      counts.set(city, (counts.get(city) ?? 0) + 1);
    }

    if (rows.length < PAGE_SIZE) break;
    from += PAGE_SIZE;
  }

  return [...counts.entries()]
    .map(([city, count]) => ({ city, count }))
    .sort((a, b) => a.city.localeCompare(b.city));
}
