import { ALLOWED_LISTING_PROPERTY_TYPES } from "@/lib/properties/types";

type PropertyType = (typeof ALLOWED_LISTING_PROPERTY_TYPES)[number];

const PROPERTY_TYPE_SYNONYMS: { terms: string[]; types: PropertyType[] }[] = [
  {
    terms: ["land", "lot", "vacant lot"],
    types: ["Residential Lot", "Commercial Lot", "Industrial Lot"],
  },
  {
    terms: ["condo", "condominium", "apartment", "flat"],
    types: ["Condominium or Apartment"],
  },
  {
    terms: ["house", "home"],
    types: ["House and Lot", "Townhouse"],
  },
  {
    terms: ["townhouse", "town house"],
    types: ["Townhouse"],
  },
  {
    terms: ["office"],
    types: ["Office Space"],
  },
  {
    terms: ["warehouse", "storage"],
    types: ["Warehouse or Storage Facility"],
  },
  {
    terms: ["commercial"],
    types: [
      "Commercial Lot",
      "Commercial Space",
      "Commercial or Residential Building",
    ],
  },
  {
    terms: ["industrial", "factory"],
    types: ["Industrial Lot"],
  },
  {
    terms: ["building"],
    types: ["Commercial or Residential Building"],
  },
];

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function wordBoundaryRegex(term: string): RegExp {
  return new RegExp(`\\b${escapeRegExp(term)}\\b`, "i");
}

/** Maps free-text search terms to related canonical property types (e.g. "land" -> lot types). */
export function matchPropertyTypeSynonyms(keywords: string): string[] {
  const trimmed = keywords.trim();
  if (!trimmed) return [];

  const matched = new Set<PropertyType>();
  for (const { terms, types } of PROPERTY_TYPE_SYNONYMS) {
    if (terms.some((term) => wordBoundaryRegex(term).test(trimmed))) {
      types.forEach((type) => matched.add(type));
    }
  }

  return [...matched];
}
