export type InsightsSortField = "relevance" | "date";

export type InsightsSortDirection = "asc" | "desc";

export type InsightsSort = {
  field: InsightsSortField;
  direction: InsightsSortDirection;
};

export const DEFAULT_INSIGHTS_SORT: InsightsSort = {
  field: "date",
  direction: "desc",
};

const SORT_FIELDS = new Set<InsightsSortField>(["relevance", "date"]);
const SORT_DIRECTIONS = new Set<InsightsSortDirection>(["asc", "desc"]);

type SearchParamRecord = Record<string, string | string[] | undefined>;

function firstString(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

export function parseInsightsSortParams(
  params: SearchParamRecord,
): InsightsSort {
  const rawField = firstString(params.sort);
  const field = SORT_FIELDS.has(rawField as InsightsSortField)
    ? (rawField as InsightsSortField)
    : DEFAULT_INSIGHTS_SORT.field;

  const rawDir = firstString(params.dir);
  const direction = SORT_DIRECTIONS.has(rawDir as InsightsSortDirection)
    ? (rawDir as InsightsSortDirection)
    : DEFAULT_INSIGHTS_SORT.direction;

  return { field, direction };
}

/** Only "date" exposes ascending/descending in the UI. */
export function insightsSortFieldHasDirection(
  field: InsightsSortField,
): boolean {
  return field === "date";
}

export function appendInsightsSortParams(
  params: URLSearchParams,
  sort: InsightsSort,
): void {
  const isDefault =
    sort.field === DEFAULT_INSIGHTS_SORT.field &&
    sort.direction === DEFAULT_INSIGHTS_SORT.direction;

  if (isDefault) return;

  params.set("sort", sort.field);

  if (insightsSortFieldHasDirection(sort.field)) {
    params.set("dir", sort.direction);
  }
}
