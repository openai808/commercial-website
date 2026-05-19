export type SortField = "relevance" | "date" | "price" | "size";

export type SortDirection = "asc" | "desc";

export type PropertiesSort = {
  field: SortField;
  direction: SortDirection;
};

export const DEFAULT_PROPERTIES_SORT: PropertiesSort = {
  field: "relevance",
  direction: "desc",
};

const SORT_FIELDS = new Set<SortField>(["relevance", "date", "price", "size"]);
const SORT_DIRECTIONS = new Set<SortDirection>(["asc", "desc"]);

type SearchParamRecord = Record<string, string | string[] | undefined>;

function firstString(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

export function parsePropertiesSortParams(
  params: SearchParamRecord,
): PropertiesSort {
  const rawField = firstString(params.sort);
  const field = SORT_FIELDS.has(rawField as SortField)
    ? (rawField as SortField)
    : DEFAULT_PROPERTIES_SORT.field;

  const rawDir = firstString(params.dir);
  const direction = SORT_DIRECTIONS.has(rawDir as SortDirection)
    ? (rawDir as SortDirection)
    : DEFAULT_PROPERTIES_SORT.direction;

  return { field, direction };
}

/** Only price and size expose ascending/descending in the UI. */
export function sortFieldHasDirection(field: SortField): boolean {
  return field === "price" || field === "size";
}

export function appendPropertiesSortParams(
  params: URLSearchParams,
  sort: PropertiesSort,
): void {
  const isDefault =
    sort.field === DEFAULT_PROPERTIES_SORT.field &&
    sort.direction === DEFAULT_PROPERTIES_SORT.direction;

  if (isDefault) return;

  params.set("sort", sort.field);

  if (sortFieldHasDirection(sort.field)) {
    params.set("dir", sort.direction);
  }
}
