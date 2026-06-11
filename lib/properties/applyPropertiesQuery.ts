import { listingCategoryOrFilter } from "@/lib/properties/listingCategoryFilters";
import type { AreaUnit, PropertiesQuery } from "@/lib/properties/searchParams";
import { expandCityFilterVariantsList } from "@/lib/text/expandCityFilterVariants";
import { expandDbTextVariantsList } from "@/lib/text/fixUtf8Mojibake";

type ListingsQuery = {
  eq: (column: string, value: string) => ListingsQuery;
  in: (column: string, values: string[]) => ListingsQuery;
  or: (filters: string) => ListingsQuery;
};

const SQFT_TO_SQM = 0.092903;

function escapeIlike(value: string): string {
  return value.replace(/[%_\\]/g, "\\$&");
}

function toSqm(value: number, unit: AreaUnit): number {
  return unit === "sqft" ? value * SQFT_TO_SQM : value;
}

function appendKeywordFilter(query: ListingsQuery, keywords: string): ListingsQuery {
  const term = escapeIlike(keywords.trim());
  if (!term) return query;

  const patterns = expandDbTextVariantsList([term]).map(
    (variant) => `%${escapeIlike(variant)}%`,
  );

  const clauses = [
    "property_title",
    "seo_description",
    "remarks",
    "listing_code",
    "city",
    "location_search",
  ].flatMap((column) =>
    patterns.map((pattern) => `${column}.ilike.${pattern}`),
  );

  return query.or(clauses.join(","));
}

function appendAreaFilter(query: ListingsQuery, filters: PropertiesQuery): ListingsQuery {
  const minSqm =
    filters.areaMin != null ? toSqm(filters.areaMin, filters.areaUnit) : null;
  const maxSqm =
    filters.areaMax != null ? toSqm(filters.areaMax, filters.areaUnit) : null;

  if (minSqm == null && maxSqm == null) return query;

  if (minSqm != null && maxSqm != null) {
    return query.or(
      `and(floor_area.gte.${minSqm},floor_area.lte.${maxSqm}),and(lot_area.gte.${minSqm},lot_area.lte.${maxSqm})`,
    );
  }

  if (minSqm != null) {
    return query.or(`floor_area.gte.${minSqm},lot_area.gte.${minSqm}`);
  }

  return query.or(`floor_area.lte.${maxSqm},lot_area.lte.${maxSqm}`);
}

export function applyPropertiesQuery(
  query: ListingsQuery,
  filters: PropertiesQuery,
): ListingsQuery {
  let next = query;

  switch (filters.listing) {
    case "for-lease":
    case "for-sale":
      next = next.or(listingCategoryOrFilter(filters.listing));
      break;
    case "investment":
      next = next.or(
        "seo_description.ilike.%invest%,property_title.ilike.%invest%,remarks.ilike.%invest%",
      );
      break;
    default:
      break;
  }

  if (filters.cities.length > 0) {
    next = next.in("city", expandCityFilterVariantsList(filters.cities));
  }

  if (filters.propertyTypes.length > 0) {
    next = next.in("property_type", filters.propertyTypes);
  }

  if (filters.agentIds.length > 0) {
    next = next.in("agent_id", filters.agentIds);
  }

  if (filters.keywords) {
    next = appendKeywordFilter(next, filters.keywords);
  }

  return appendAreaFilter(next, filters);
}
