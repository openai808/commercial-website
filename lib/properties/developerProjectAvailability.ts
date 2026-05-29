import type { DeveloperBuildingAvailabilityRecord } from "@/lib/properties/getDeveloperBuildingAvailability";

export type DeveloperProjectAvailabilityRow = {
  id: string;
  floor: string;
  unit: string;
  floorAreaSqm: string;
  pricePerSqm: string;
  price: string;
  parkingRate: string;
  parkingAllocation: string;
  handoverCondition: string;
};

function asDisplayValue(value: unknown): string | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value.toLocaleString("en-US", { maximumFractionDigits: 2 });
  }
  if (typeof value === "string" && value.trim()) {
    return value.trim();
  }
  return null;
}

function pickDisplayValue(
  record: Record<string, unknown>,
  keys: string[],
): string | null {
  for (const key of keys) {
    const value = asDisplayValue(record[key]);
    if (value) return value;
  }
  return null;
}

function parseNumericValue(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const normalized = value.trim().replace(/,/g, "");
    if (!normalized) return null;
    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function pickNumericValue(
  record: Record<string, unknown>,
  keys: string[],
): number | null {
  for (const key of keys) {
    const value = parseNumericValue(record[key]);
    if (value != null) return value;
  }
  return null;
}

function formatCalculatedPrice(
  record: DeveloperBuildingAvailabilityRecord,
): string | null {
  const floorArea = pickNumericValue(record, [
    "floor_area",
    "size_sqm",
    "area_sqm",
  ]);
  const pricePerSqm = pickNumericValue(record, ["price_per_sqm", "rent_php"]);

  if (floorArea == null || pricePerSqm == null) return null;

  return (floorArea * pricePerSqm).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function mapDeveloperBuildingAvailabilityRows(
  records: DeveloperBuildingAvailabilityRecord[],
): DeveloperProjectAvailabilityRow[] {
  return records
    .filter((record) => record.is_hidden !== true)
    .map((record) => ({
      id: record.id,
      floor: pickDisplayValue(record, ["floor", "floor_unit"]) ?? "—",
      unit: pickDisplayValue(record, ["unit_number", "unit"]) ?? "—",
      floorAreaSqm:
        pickDisplayValue(record, ["floor_area", "size_sqm", "area_sqm"]) ?? "—",
      pricePerSqm:
        pickDisplayValue(record, ["price_per_sqm", "rent_php"]) ?? "—",
      price: formatCalculatedPrice(record) ?? "—",
      parkingRate:
        pickDisplayValue(record, [
          "parking_rate_allocation",
          "parking_rate",
          "parkingRate",
        ]) ?? "—",
      parkingAllocation:
        pickDisplayValue(record, [
          "parking_allocation",
          "parkingAllocation",
        ]) ?? "—",
      handoverCondition:
        pickDisplayValue(record, [
          "turnover_condition",
          "handover_condition",
          "handover",
        ]) ?? "—",
    }));
}
