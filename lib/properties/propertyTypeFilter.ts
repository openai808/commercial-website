function escapeIlike(value: string): string {
  return value.replace(/[%_\\]/g, "\\$&");
}

/** PostgREST `.or()` clause matching `property_type` case-insensitively against any of `values`. */
export function propertyTypeOrFilter(values: readonly string[]): string {
  return values
    .map((value) => `property_type.ilike.${escapeIlike(value)}`)
    .join(",");
}

/** Maps a raw DB value back to its canonical whitelist spelling, case-insensitively. */
export function canonicalizePropertyType(
  raw: string,
  canonical: readonly string[],
): string {
  const match = canonical.find(
    (candidate) => candidate.toLowerCase() === raw.toLowerCase(),
  );
  return match ?? raw;
}
