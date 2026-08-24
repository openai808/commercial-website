import {
  ALLOWED_LISTING_PROPERTY_TYPES,
  PUBLIC_LISTING_STATUSES,
  type ListingCityCount,
} from "@/lib/properties/types";
import {
  canonicalCityGroupKey,
  pickCanonicalCityLabel,
} from "@/lib/text/expandCityFilterVariants";
import { fixUtf8Mojibake } from "@/lib/text/fixUtf8Mojibake";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const RPC_TIMEOUT_MS = 8000;

function normalizeCity(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const city = fixUtf8Mojibake(value.trim());
  return city.length > 0 ? city : null;
}

type CityCountRow = { city: string | null; count: number | null };

export async function getListingCityCounts(): Promise<ListingCityCount[]> {
  const supabase = createSupabaseServerClient();

  let rows: CityCountRow[];
  try {
    const { data, error } = await supabase
      .rpc("get_listing_city_counts", {
        p_statuses: [...PUBLIC_LISTING_STATUSES],
        p_property_types: [...ALLOWED_LISTING_PROPERTY_TYPES],
      })
      .abortSignal(AbortSignal.timeout(RPC_TIMEOUT_MS));

    if (error) throw error;
    rows = (data ?? []) as CityCountRow[];
  } catch (error) {
    console.error("getListingCityCounts: RPC failed, returning empty list", error);
    return [];
  }

  const groups = new Map<string, Map<string, number>>();

  for (const row of rows) {
    const city = normalizeCity(row.city);
    if (!city) continue;

    const groupKey = canonicalCityGroupKey(city);
    if (!groupKey) continue;

    let labelCounts = groups.get(groupKey);
    if (!labelCounts) {
      labelCounts = new Map();
      groups.set(groupKey, labelCounts);
    }

    labelCounts.set(city, (labelCounts.get(city) ?? 0) + (row.count ?? 0));
  }

  return [...groups.values()]
    .map((labelCounts) => ({
      city: pickCanonicalCityLabel(labelCounts),
      count: [...labelCounts.values()].reduce((sum, count) => sum + count, 0),
    }))
    .sort((a, b) => a.city.localeCompare(b.city));
}
