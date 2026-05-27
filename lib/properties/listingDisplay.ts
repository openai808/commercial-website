import { getListingContractStatus } from "@/lib/properties/listingContractStatus";
import type { ListingWithAgent } from "@/lib/properties/types";
import { fixUtf8Mojibake } from "@/lib/text/fixUtf8Mojibake";

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80";

const INVALID_PATH_SEGMENTS = new Set(["null", "undefined", "none"]);

function asString(value: unknown): string | null {
  if (typeof value === "string" && value.trim()) {
    return fixUtf8Mojibake(value.trim());
  }
  return null;
}

function isValidPathSegment(value: string | null): value is string {
  if (!value) return false;
  return !INVALID_PATH_SEGMENTS.has(value.toLowerCase());
}

/** Stable public identifier for URLs and React keys (`listings_secure` often has null `id`). */
export function getListingIdentifier(listing: ListingWithAgent): string | null {
  const candidates = [
    asString(listing.slug),
    asString(listing.listing_code),
    asString(listing.id),
  ];

  return candidates.find(isValidPathSegment) ?? null;
}

function asNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const normalized = value.trim().replace(/,/g, "");
    if (!normalized) return null;
    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

const LOT_PRIMARY_PROPERTY_TYPES = new Set([
  "Commercial Lot",
  "Industrial Lot",
]);

const WAREHOUSE_PROPERTY_TYPES = new Set([
  "Warehouse or Storage Facility",
]);

function isWarehouseType(propertyType: string | null): boolean {
  return propertyType != null && WAREHOUSE_PROPERTY_TYPES.has(propertyType);
}

export function getFloorAreaLabel(listing: ListingWithAgent): string {
  return isWarehouseType(asString(listing.property_type))
    ? "Covered Area"
    : "Floor Area";
}

export function getLotAreaLabel(listing: ListingWithAgent): string {
  return isWarehouseType(asString(listing.property_type))
    ? "Open Area"
    : "Lot Area";
}

function formatSqm(sqm: number): string {
  return `${sqm.toLocaleString("en-US")} m²`;
}

export function getListingTitle(listing: ListingWithAgent): string {
  return (
    asString(listing.property_title) ??
    asString(listing.title) ??
    asString(listing.name) ??
    "Untitled property"
  );
}

export function getListingCity(listing: ListingWithAgent): string | null {
  return asString(listing.city) ?? asString(listing.municipality);
}

export function getListingLocation(listing: ListingWithAgent): string {
  const municipality = asString(listing.municipality);
  const city = asString(listing.city);
  const address = asString(listing.address);
  const location = asString(listing.location);

  const parts = [address, municipality, city, location].filter(Boolean);
  const unique = [...new Set(parts)];

  return unique.join(", ") || "Philippines";
}

export function getListingLotAreaDisplay(
  listing: ListingWithAgent,
): string | null {
  const lotSqm = asNumber(listing.lot_area);
  if (lotSqm == null || lotSqm <= 0) return null;
  return formatSqm(lotSqm);
}

export function getListingFloorAreaDisplay(
  listing: ListingWithAgent,
): string | null {
  const floorSqm =
    asNumber(listing.floor_area_sqm) ?? asNumber(listing.floor_area);
  if (floorSqm != null && floorSqm > 0) return formatSqm(floorSqm);

  const sqft =
    asNumber(listing.floor_area_sqft) ?? asNumber(listing.building_size);
  if (sqft != null && sqft > 0) {
    return `${sqft.toLocaleString("en-US")} sq ft`;
  }

  return null;
}

function photosFromList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .filter(
        (item): item is string =>
          typeof item === "string" && item.trim().length > 0,
      )
      .map((item) => item.trim());
  }

  const csv = asString(value);
  if (!csv) return [];

  return csv
    .split(",")
    .map((url) => url.trim())
    .filter(Boolean);
}

function firstPhotoFromList(value: unknown): string | null {
  return photosFromList(value)[0] ?? null;
}

export function getListingPhotos(listing: ListingWithAgent): string[] {
  const ordered = [
    asString(listing.cover_photo_url),
    ...photosFromList(listing.listing_photos_urls),
    ...photosFromList(listing.images),
    asString(listing.primary_image_url),
    asString(listing.thumbnail_url),
    asString(listing.image_url),
    asString(listing.cover_image),
  ].filter((url): url is string => Boolean(url));

  const unique = [...new Set(ordered)];
  return unique.length > 0 ? unique : [PLACEHOLDER_IMAGE];
}

export function getListingImage(listing: ListingWithAgent): string {
  return (
    asString(listing.cover_photo_url) ??
    firstPhotoFromList(listing.listing_photos_urls) ??
    asString(listing.primary_image_url) ??
    asString(listing.thumbnail_url) ??
    asString(listing.image_url) ??
    asString(listing.cover_image) ??
    firstPhotoFromList(listing.images) ??
    PLACEHOLDER_IMAGE
  );
}

export function getListingHref(listing: ListingWithAgent): string {
  const identifier = getListingIdentifier(listing);
  return identifier
    ? `/properties/${encodeURIComponent(identifier)}`
    : "/properties";
}

export function getListingStatus(
  listing: ListingWithAgent,
): "sale" | "lease" {
  return getListingContractStatus(listing);
}

export function getListingTag(listing: ListingWithAgent): string {
  const tag =
    asString(listing.property_type) ??
    asString(listing.asset_class) ??
    (Array.isArray(listing.tags) ? asString(listing.tags[0]) : null);

  return tag?.toUpperCase() ?? "PROPERTY";
}

export function getListingExtraTagsCount(listing: ListingWithAgent): number {
  if (!Array.isArray(listing.tags)) return 0;

  const uniqueTags = [
    ...new Set(
      listing.tags
        .map((tag) => (typeof tag === "string" ? tag.trim().toUpperCase() : ""))
        .filter(Boolean),
    ),
  ];

  return uniqueTags.length > 1 ? uniqueTags.length - 1 : 0;
}

export function getListingSize(listing: ListingWithAgent): string {
  const lotSqm = asNumber(listing.lot_area);
  const floorSqm =
    asNumber(listing.floor_area_sqm) ?? asNumber(listing.floor_area);
  const sqft =
    asNumber(listing.floor_area_sqft) ?? asNumber(listing.building_size);

  const propertyType = asString(listing.property_type);
  const lotFirst =
    propertyType != null && LOT_PRIMARY_PROPERTY_TYPES.has(propertyType);

  const sqmCandidates = lotFirst
    ? [lotSqm, floorSqm]
    : [floorSqm, lotSqm];

  for (const sqm of sqmCandidates) {
    if (sqm != null && sqm > 0) return formatSqm(sqm);
  }

  if (sqft != null && sqft > 0) {
    return `${sqft.toLocaleString("en-US")} sq ft`;
  }

  return "Size on request";
}

export type ListingCoordinates = {
  lat: number;
  lng: number;
};

function parseCoordinatePair(
  latRaw: string,
  lngRaw: string,
): ListingCoordinates | null {
  const lat = Number(latRaw);
  const lng = Number(lngRaw);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) return null;
  return { lat, lng };
}

/** Extract lat/lng embedded in Google Maps share URLs when DB columns are empty. */
export function parseCoordinatesFromGoogleMapLink(
  link: string,
): ListingCoordinates | null {
  const trimmed = link.trim();
  if (!trimmed) return null;

  const d3d4 = trimmed.match(/!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/i);
  if (d3d4) {
    const parsed = parseCoordinatePair(d3d4[1], d3d4[2]);
    if (parsed) return parsed;
  }

  const at = trimmed.match(/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/);
  if (at) {
    const parsed = parseCoordinatePair(at[1], at[2]);
    if (parsed) return parsed;
  }

  try {
    const url = new URL(trimmed);
    const q = url.searchParams.get("q") ?? url.searchParams.get("query");
    if (q) {
      const comma = q.match(/^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/);
      if (comma) {
        const parsed = parseCoordinatePair(comma[1], comma[2]);
        if (parsed) return parsed;
      }
    }
  } catch {
    // Not a valid URL; ignore.
  }

  return null;
}

export function getListingCoordinates(
  listing: ListingWithAgent,
): ListingCoordinates | null {
  const lat =
    asNumber(listing.latitude) ??
    asNumber(listing.lat) ??
    asNumber(listing.geo_lat);
  const lng =
    asNumber(listing.longitude) ??
    asNumber(listing.lng) ??
    asNumber(listing.geo_lng) ??
    asNumber(listing.long);

  if (lat != null && lng != null) {
    const parsed = parseCoordinatePair(String(lat), String(lng));
    if (parsed) return parsed;
  }

  const googleMapLink = getListingGoogleMapLink(listing);
  if (googleMapLink) {
    const fromLink = parseCoordinatesFromGoogleMapLink(googleMapLink);
    if (fromLink) return fromLink;
  }

  return null;
}

export function getListingImageLabel(listing: ListingWithAgent): string | null {
  const label =
    asString(listing.municipality) ??
    asString(listing.city) ??
    asString(listing.location);

  return label?.toUpperCase() ?? null;
}

/** Building or project name shown above the main title on the detail page. */
export function getListingProjectName(listing: ListingWithAgent): string | null {
  const name = asString(listing.name);
  const title = getListingTitle(listing);

  if (name && name.toLowerCase() !== title.toLowerCase()) {
    return name;
  }

  return (
    asString(listing.municipality) ??
    asString(listing.location) ??
    asString(listing.city)
  );
}

export function getListingDetailSpecs(listing: ListingWithAgent): string {
  const propertyType =
    asString(listing.property_type) ??
    asString(listing.asset_class) ??
    "Property";

  const lotSqm = asNumber(listing.lot_area);
  const floorSqm =
    asNumber(listing.floor_area_sqm) ?? asNumber(listing.floor_area);
  const sqft =
    asNumber(listing.floor_area_sqft) ?? asNumber(listing.building_size);

  const lotFirst =
    propertyType != null && LOT_PRIMARY_PROPERTY_TYPES.has(propertyType);
  const warehouse = isWarehouseType(propertyType);
  const floorLabel = warehouse ? "Covered Area" : "Floor Area";
  const lotLabel = warehouse ? "Open Area" : "Land Area";

  if (lotFirst && lotSqm != null && lotSqm > 0) {
    return `${propertyType} | ${lotLabel}: ${formatSqm(lotSqm)}`;
  }

  if (floorSqm != null && floorSqm > 0) {
    return `${propertyType} | ${floorLabel}: ${formatSqm(floorSqm)}`;
  }

  if (lotSqm != null && lotSqm > 0) {
    return `${propertyType} | ${lotLabel}: ${formatSqm(lotSqm)}`;
  }

  if (sqft != null && sqft > 0) {
    return `${propertyType} | ${sqft.toLocaleString("en-US")} sq ft`;
  }

  return propertyType;
}

export function getAgentName(listing: ListingWithAgent): string | null {
  const agent = listing.agent;
  if (!agent) return null;

  const name = [agent.first_name, agent.last_name]
    .filter(Boolean)
    .join(" ")
    .trim();

  return name || null;
}

export function getAgentAvatarUrl(listing: ListingWithAgent): string | null {
  const agent = listing.agent;
  if (!agent) return null;

  return (
    asString(agent.avatar_url) ?? asString(agent.profile_picture_url) ?? null
  );
}

export function getAgentPhone(listing: ListingWithAgent): string | null {
  return asString(listing.agent?.mobile_number);
}

export function getAgentEmail(listing: ListingWithAgent): string | null {
  return asString(listing.agent?.email);
}

function formatLabel(value: string): string {
  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function getAgentDepartment(listing: ListingWithAgent): string | null {
  const department = asString(listing.agent?.department);
  return department ? formatLabel(department) : null;
}

export function getAgentPosition(listing: ListingWithAgent): string | null {
  return asString(listing.agent?.position);
}

export function getListingPropertyType(listing: ListingWithAgent): string {
  return (
    asString(listing.property_type) ??
    asString(listing.asset_class) ??
    "Property"
  );
}

export function getListingGoogleMapLink(
  listing: ListingWithAgent,
): string | null {
  return asString(listing.google_map_link);
}

export function getListingMapQuery(listing: ListingWithAgent): string {
  const parts = [
    asString(listing.address),
    asString(listing.street),
    asString(listing.barangay),
    asString(listing.submunicipality),
    asString(listing.municipality),
    asString(listing.city),
    asString(listing.province),
    asString(listing.location),
    "Philippines",
  ].filter(Boolean);

  const unique = [...new Set(parts)];
  return unique.join(", ");
}

const MIN_DESCRIPTION_LENGTH = 20;

function splitDescriptionParagraphs(text: string): string[] {
  return text
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function getRawListingDescriptionText(listing: ListingWithAgent): string {
  const additional = asString(listing.additional_description);
  if (additional) return additional;

  const seo = asString(listing.seo_description);
  if (!seo) return "";

  return seo.split("|")[0]?.trim() ?? "";
}

export type ListingDetailItem = {
  label: string;
  value: string;
};

function addListingDetailItem(
  items: ListingDetailItem[],
  label: string,
  value: unknown,
  transform: (text: string) => string = (text) => text,
) {
  const text = asString(value);
  if (!text) return;

  items.push({ label, value: transform(text) });
}

function addListingNumericDetail(
  items: ListingDetailItem[],
  label: string,
  value: unknown,
  format: (amount: number) => string,
) {
  const amount = asNumber(value);
  if (amount == null || amount <= 0) return;

  items.push({ label, value: format(amount) });
}

function getListingPricePerSqmFloor(listing: ListingWithAgent): string | null {
  const direct =
    asNumber(listing.price_per_sqm_floor_area) ??
    asNumber(listing.price_per_sqm) ??
    asNumber(listing.floor_area_price_per_sqm);

  if (direct != null && direct > 0) {
    return `PHP ${direct.toLocaleString("en-US")}`;
  }

  const display = asString(listing.price_per_sqm_floor_area_display);
  if (display) return display;

  const price =
    asNumber(listing.selling_price) ?? asNumber(listing.monthly_rental_price);
  const floorSqm =
    asNumber(listing.floor_area_sqm) ?? asNumber(listing.floor_area);

  if (price != null && price > 0 && floorSqm != null && floorSqm > 0) {
    const perSqm = price / floorSqm;
    return `PHP ${perSqm.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
  }

  return null;
}

function getListingListingType(listing: ListingWithAgent): string | null {
  return (
    asString(listing.listing_type) ??
    asString(listing.contract_type) ??
    null
  );
}

function getListingOccupancy(listing: ListingWithAgent): string | null {
  return (
    asString(listing.occupancy) ??
    asString(listing.occupancy_status) ??
    null
  );
}

function getListingTurnover(listing: ListingWithAgent): string | null {
  return (
    asString(listing.turnover) ??
    asString(listing.turnover_date) ??
    asString(listing.turnover_status) ??
    null
  );
}

function getListingShowingNotes(listing: ListingWithAgent): string | null {
  return (
    asString(listing.showing_notes) ??
    asString(listing.showing_note) ??
    asString(listing.notes_for_showing) ??
    null
  );
}

export function getListingPropertyDetails(
  listing: ListingWithAgent,
): ListingDetailItem[] {
  const items: ListingDetailItem[] = [];

  const warehouse = isWarehouseType(asString(listing.property_type));
  const lotAreaLabel = warehouse ? "Open Area (sqm)" : "Lot Area (sqm)";
  const floorAreaLabel = warehouse ? "Covered Area (sqm)" : "Floor Area (sqm)";
  const pricePerSqmLabel = warehouse
    ? "Price/sqm (Covered Area)"
    : "Price/sqm (Floor Area)";

  addListingDetailItem(
    items,
    "Property Type",
    listing.property_type ?? listing.asset_class,
  );
  addListingNumericDetail(items, lotAreaLabel, listing.lot_area, (sqm) =>
    sqm.toLocaleString("en-US"),
  );
  addListingNumericDetail(
    items,
    floorAreaLabel,
    listing.floor_area_sqm ?? listing.floor_area,
    (sqm) => sqm.toLocaleString("en-US"),
  );
  addListingDetailItem(
    items,
    pricePerSqmLabel,
    getListingPricePerSqmFloor(listing),
  );
  addListingNumericDetail(items, "Stories", listing.stories, (value) =>
    String(value),
  );
  addListingNumericDetail(items, "Bedroom", listing.bedrooms, (value) =>
    String(value),
  );
  addListingNumericDetail(items, "Bathroom", listing.bathrooms, (value) =>
    String(value),
  );
  addListingDetailItem(items, "Parking", listing.parking);
  addListingDetailItem(items, "Turnover", getListingTurnover(listing));
  addListingDetailItem(items, "Listing Type", getListingListingType(listing));
  addListingDetailItem(items, "Occupancy", getListingOccupancy(listing));
  addListingDetailItem(items, "Showing Notes", getListingShowingNotes(listing));

  return items;
}

function getListingCompleteAddressForMap(
  listing: ListingWithAgent,
): string | null {
  const locationSearch = asString(listing.location_search);
  if (locationSearch) return locationSearch;

  const address = asString(listing.address);
  if (address) return address;

  const mapQuery = getListingMapQuery(listing);
  if (mapQuery && mapQuery !== "Philippines") return mapQuery;

  return null;
}

function getListingStreetFloor(listing: ListingWithAgent): string | null {
  const street = asString(listing.street);
  const floor =
    asString(listing.floor) ??
    asString(listing.floor_number) ??
    asString(listing.floor_no) ??
    asString(listing.street_floor);

  if (street && floor) return `${street}, ${floor}`;
  return street ?? floor;
}

function getListingCondominiumSubdivision(
  listing: ListingWithAgent,
): string | null {
  const condominium = asString(listing.condominium_name);
  const subdivision =
    asString(listing.subdivision_name) ?? asString(listing.subdivision);

  if (condominium && subdivision) {
    return `${condominium} / ${subdivision}`;
  }

  return condominium ?? subdivision;
}

export function getListingAddressDetails(
  listing: ListingWithAgent,
): ListingDetailItem[] {
  const items: ListingDetailItem[] = [];

  addListingDetailItem(items, "Region", listing.region);
  addListingDetailItem(items, "Province", listing.province);
  addListingDetailItem(items, "City", listing.city ?? listing.municipality);
  addListingDetailItem(items, "Barangay", listing.barangay);
  addListingDetailItem(items, "Street/Floor", getListingStreetFloor(listing));
  addListingDetailItem(
    items,
    "Condominium/Subdivision",
    getListingCondominiumSubdivision(listing),
  );

  return items;
}

export function getListingRemarksParagraphs(
  listing: ListingWithAgent,
): string[] {
  const remarks = asString(listing.remarks);
  if (!remarks) return [];

  return splitDescriptionParagraphs(remarks);
}

export function getListingCode(listing: ListingWithAgent): string | null {
  return asString(listing.listing_code);
}

export function getListingPrice(listing: ListingWithAgent): string | null {
  const displayPrice = asString(listing.display_price);
  if (displayPrice) return displayPrice;

  const sellingPrice = asNumber(listing.selling_price);
  if (sellingPrice != null && sellingPrice > 0) {
    return `PHP ${sellingPrice.toLocaleString("en-US")}`;
  }

  const monthlyRent = asNumber(listing.monthly_rental_price);
  if (monthlyRent != null && monthlyRent > 0) {
    return `PHP ${monthlyRent.toLocaleString("en-US")} per month`;
  }

  return null;
}

function composeListingDescriptionParagraphs(
  listing: ListingWithAgent,
  existingText: string,
): string[] {
  const title = getListingTitle(listing);
  const location = getListingLocation(listing);
  const propertyType = getListingPropertyType(listing);
  const specs = getListingDetailSpecs(listing);
  const size = getListingSize(listing);
  const price = getListingPrice(listing);
  const statusPhrase =
    getListingStatus(listing) === "lease" ? "for lease" : "for sale";

  const detailParts = [`Property type: ${propertyType}`];

  if (size !== "Size on request") {
    detailParts.push(`Size: ${size}`);
  } else if (specs !== propertyType) {
    detailParts.push(specs);
  }

  if (price) {
    detailParts.push(`Price: ${price}`);
  }

  const generated = [
    `${title} is a ${propertyType} available ${statusPhrase} in ${location}.`,
    detailParts.join(". ") + ".",
  ];

  const trimmedExisting = existingText.trim();
  if (!trimmedExisting) {
    return generated;
  }

  const normalizedExisting = /[.!?]$/.test(trimmedExisting)
    ? trimmedExisting
    : `${trimmedExisting}.`;

  return [normalizedExisting, ...generated];
}

export function getListingDescriptionParagraphs(
  listing: ListingWithAgent,
): string[] {
  const rawText = getRawListingDescriptionText(listing);
  const paragraphs = splitDescriptionParagraphs(rawText);
  const combinedLength = (paragraphs.join(" ") || rawText).trim().length;

  if (combinedLength >= MIN_DESCRIPTION_LENGTH) {
    return paragraphs.length > 0 ? paragraphs : [rawText.trim()];
  }

  return composeListingDescriptionParagraphs(
    listing,
    paragraphs.join(" ") || rawText,
  );
}

