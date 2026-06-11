import { expandDbTextVariantsList } from "@/lib/text/fixUtf8Mojibake";

const CITY_SUFFIX = " City";

/** Groups spellings like "Taguig" and "Taguig City" under one key. */
export function canonicalCityGroupKey(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";

  const base = trimmed.endsWith(CITY_SUFFIX)
    ? trimmed.slice(0, -CITY_SUFFIX.length).trim()
    : trimmed;

  return base.toLowerCase();
}

/** Picks one label when multiple DB spellings exist for the same city. */
export function pickCanonicalCityLabel(
  labelCounts: Iterable<[string, number]>,
): string {
  let bestLabel = "";
  let bestCount = -1;

  for (const [label, count] of labelCounts) {
    if (count > bestCount) {
      bestCount = count;
      bestLabel = label;
      continue;
    }

    if (count < bestCount) continue;

    const bestHasCitySuffix = bestLabel.endsWith(CITY_SUFFIX);
    const labelHasCitySuffix = label.endsWith(CITY_SUFFIX);
    if (bestHasCitySuffix && !labelHasCitySuffix) {
      bestLabel = label;
    } else if (
      bestHasCitySuffix === labelHasCitySuffix &&
      label.localeCompare(bestLabel) < 0
    ) {
      bestLabel = label;
    }
  }

  return bestLabel;
}

/** Adds the with/without " City" spelling for a single location name. */
export function expandCityNameVariants(value: string): string[] {
  const trimmed = value.trim();
  if (!trimmed) return [];

  const variants = new Set<string>([trimmed]);

  if (trimmed.endsWith(CITY_SUFFIX)) {
    const withoutSuffix = trimmed.slice(0, -CITY_SUFFIX.length).trim();
    if (withoutSuffix) variants.add(withoutSuffix);
  } else {
    variants.add(`${trimmed}${CITY_SUFFIX}`);
  }

  return [...variants];
}

/** City filter values expanded for spelling variants and UTF-8 mojibake. */
export function expandCityFilterVariantsList(values: string[]): string[] {
  const cityVariants = values.flatMap(expandCityNameVariants);
  return expandDbTextVariantsList(cityVariants);
}
