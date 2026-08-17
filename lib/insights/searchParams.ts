import {
  appendInsightsSortParams,
  DEFAULT_INSIGHTS_SORT,
  type InsightsSort,
} from "@/lib/insights/sortParams";

export type InsightsQuery = {
  keywords: string;
  category: string;
  location: string;
  propertyType: string;
};

export const EMPTY_INSIGHTS_QUERY: InsightsQuery = {
  keywords: "",
  category: "",
  location: "",
  propertyType: "",
};

type SearchParamRecord = Record<string, string | string[] | undefined>;

function firstString(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

export function parseInsightsSearchParams(
  params: SearchParamRecord,
): InsightsQuery {
  return {
    keywords: (firstString(params.q) ?? "").trim(),
    category: (firstString(params.category) ?? "").trim(),
    location: (firstString(params.location) ?? "").trim(),
    propertyType: (firstString(params.type) ?? "").trim(),
  };
}

export function hasActiveInsightsQuery(query: InsightsQuery): boolean {
  return (
    query.keywords.length > 0 ||
    query.category.length > 0 ||
    query.location.length > 0 ||
    query.propertyType.length > 0
  );
}

export function buildInsightsSearchParams(
  query: InsightsQuery,
  options?: { page?: number; sort?: InsightsSort },
): URLSearchParams {
  const params = new URLSearchParams();

  if (query.keywords) params.set("q", query.keywords);
  if (query.category) params.set("category", query.category);
  if (query.location) params.set("location", query.location);
  if (query.propertyType) params.set("type", query.propertyType);

  appendInsightsSortParams(params, options?.sort ?? DEFAULT_INSIGHTS_SORT);

  const page = options?.page;
  if (page != null && page > 1) params.set("page", String(page));

  return params;
}
