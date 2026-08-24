function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function wordBoundaryRegex(phrase: string): RegExp {
  return new RegExp(`\\b${escapeRegExp(phrase)}\\b`, "i");
}

/** Finds known city names mentioned inside a free-text search query (e.g. "condos in Makati" -> ["Makati"]). */
export function matchCitiesInKeywords(
  keywords: string,
  knownCities: string[],
): string[] {
  const trimmed = keywords.trim();
  if (!trimmed) return [];

  const matched = new Set<string>();
  for (const city of knownCities) {
    const name = city.trim();
    if (name && wordBoundaryRegex(name).test(trimmed)) {
      matched.add(city);
    }
  }

  return [...matched];
}
