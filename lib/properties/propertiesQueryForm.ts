import type { PropertiesQuery } from "@/lib/properties/searchParams";

/** Form state used by the properties search UI (strings for numeric inputs). */
export type PropertiesQueryFormState = {
  listing: PropertiesQuery["listing"];
  cities: string[];
  propertyTypes: string[];
  keywords: string;
  areaMin: string;
  areaMax: string;
  areaUnit: PropertiesQuery["areaUnit"];
  agentIds: string[];
};

export function propertiesQueryToFormState(
  query: PropertiesQuery,
): PropertiesQueryFormState {
  return {
    listing: query.listing,
    cities: query.cities,
    propertyTypes: query.propertyTypes,
    keywords: query.keywords,
    areaMin: query.areaMin != null ? String(query.areaMin) : "",
    areaMax: query.areaMax != null ? String(query.areaMax) : "",
    areaUnit: query.areaUnit,
    agentIds: query.agentIds,
  };
}

export function formStateToPropertiesQuery(
  form: PropertiesQueryFormState,
): PropertiesQuery {
  const parseArea = (value: string): number | null => {
    const trimmed = value.trim();
    if (!trimmed) return null;
    const parsed = Number(trimmed);
    if (!Number.isFinite(parsed) || parsed < 0) return null;
    return parsed;
  };

  return {
    listing: form.listing,
    cities: form.cities,
    propertyTypes: form.propertyTypes,
    keywords: form.keywords.trim(),
    areaMin: parseArea(form.areaMin),
    areaMax: parseArea(form.areaMax),
    areaUnit: form.areaUnit,
    agentIds: form.agentIds,
  };
}
