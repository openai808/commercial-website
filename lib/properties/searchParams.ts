export type ListingCategory = "" | "for-lease" | "for-sale" | "investment";

export type AreaUnit = "sqft" | "sqm";

import {
  appendPropertiesSortParams,
  DEFAULT_PROPERTIES_SORT,
  type PropertiesSort,
} from "@/lib/properties/sortParams";

export type { PropertiesSort, SortDirection, SortField } from "@/lib/properties/sortParams";
export {
  DEFAULT_PROPERTIES_SORT,
  parsePropertiesSortParams,
  sortFieldHasDirection,
} from "@/lib/properties/sortParams";

export type PropertiesQuery = {
  listing: ListingCategory;
  cities: string[];
  propertyTypes: string[];
  keywords: string;
  areaMin: number | null;
  areaMax: number | null;
  areaUnit: AreaUnit;
  agentIds: string[];
};

export const EMPTY_PROPERTIES_QUERY: PropertiesQuery = {
  listing: "",
  cities: [],
  propertyTypes: [],
  keywords: "",
  areaMin: null,
  areaMax: null,
  areaUnit: "sqft",
  agentIds: [],
};

const LISTING_CATEGORIES = new Set<ListingCategory>([
  "",
  "for-lease",
  "for-sale",
  "investment",
]);

const AREA_UNITS = new Set<AreaUnit>(["sqft", "sqm"]);

type SearchParamRecord = Record<string, string | string[] | undefined>;

function firstString(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

function splitCsv(value: string | undefined): string[] {
  if (!value?.trim()) return [];
  return [
    ...new Set(
      value
        .split(",")
        .map((part) => part.trim())
        .filter(Boolean),
    ),
  ];
}

function parsePositiveNumber(value: string | undefined): number | null {
  if (!value?.trim()) return null;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) return null;
  return parsed;
}

function parseListingCategory(value: string | undefined): ListingCategory {
  if (!value) return "";
  return LISTING_CATEGORIES.has(value as ListingCategory)
    ? (value as ListingCategory)
    : "";
}

function parseAreaUnit(value: string | undefined): AreaUnit {
  if (value && AREA_UNITS.has(value as AreaUnit)) {
    return value as AreaUnit;
  }
  return "sqft";
}

export function parsePropertiesSearchParams(
  params: SearchParamRecord,
): PropertiesQuery {
  return {
    listing: parseListingCategory(firstString(params.listing)),
    cities: splitCsv(firstString(params.city)),
    propertyTypes: splitCsv(firstString(params.type)),
    keywords: (firstString(params.q) ?? "").trim(),
    areaMin: parsePositiveNumber(firstString(params.areaMin)),
    areaMax: parsePositiveNumber(firstString(params.areaMax)),
    areaUnit: parseAreaUnit(firstString(params.areaUnit)),
    agentIds: splitCsv(firstString(params.agent)),
  };
}

export function hasActivePropertiesQuery(query: PropertiesQuery): boolean {
  return (
    query.listing !== "" ||
    query.cities.length > 0 ||
    query.propertyTypes.length > 0 ||
    query.keywords.length > 0 ||
    query.areaMin != null ||
    query.areaMax != null ||
    query.agentIds.length > 0
  );
}

export function buildPropertiesSearchParams(
  query: PropertiesQuery,
  options?: { page?: number; sort?: PropertiesSort },
): URLSearchParams {
  const params = new URLSearchParams();

  if (query.listing) params.set("listing", query.listing);
  if (query.cities.length > 0) params.set("city", query.cities.join(","));
  if (query.propertyTypes.length > 0) {
    params.set("type", query.propertyTypes.join(","));
  }
  if (query.keywords) params.set("q", query.keywords);
  if (query.areaMin != null) params.set("areaMin", String(query.areaMin));
  if (query.areaMax != null) params.set("areaMax", String(query.areaMax));
  if (query.areaUnit !== "sqft") params.set("areaUnit", query.areaUnit);
  if (query.agentIds.length > 0) params.set("agent", query.agentIds.join(","));

  appendPropertiesSortParams(
    params,
    options?.sort ?? DEFAULT_PROPERTIES_SORT,
  );

  const page = options?.page;
  if (page != null && page > 1) params.set("page", String(page));

  return params;
}

export function propertiesQueryToSearchString(
  query: PropertiesQuery,
  options?: { page?: number; sort?: PropertiesSort },
): string {
  const params = buildPropertiesSearchParams(query, options);
  const qs = params.toString();
  return qs.length > 0 ? `?${qs}` : "";
}
