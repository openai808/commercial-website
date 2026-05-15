import type { ListingWithAgent } from "@/lib/properties/types";

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80";

function asString(value: unknown): string | null {
  if (typeof value === "string" && value.trim()) return value.trim();
  return null;
}

function asNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

export function getListingTitle(listing: ListingWithAgent): string {
  return (
    asString(listing.property_title) ??
    asString(listing.title) ??
    asString(listing.name) ??
    "Untitled property"
  );
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

function firstPhotoFromList(value: unknown): string | null {
  if (Array.isArray(value)) {
    return value.find((item) => typeof item === "string" && item.trim()) ?? null;
  }

  const csv = asString(value);
  if (!csv) return null;

  return csv.split(",").map((url) => url.trim()).find(Boolean) ?? null;
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
  const slug = asString(listing.slug);
  return slug ? `/properties/${slug}` : `/properties/${listing.id}`;
}

export function getListingStatus(
  listing: ListingWithAgent,
): "sale" | "lease" {
  const listingType = (
    asString(listing.listing_type) ?? ""
  ).toLowerCase();

  if (listingType.includes("lease") || listingType.includes("rent")) {
    return "lease";
  }

  return "sale";
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
  const sqm = asNumber(listing.floor_area_sqm) ?? asNumber(listing.floor_area);
  if (sqm != null) {
    return `${sqm.toLocaleString("en-US")} m²`;
  }

  const sqft = asNumber(listing.floor_area_sqft) ?? asNumber(listing.building_size);
  if (sqft != null) {
    return `${sqft.toLocaleString("en-US")} sq ft`;
  }

  const displayPrice = asString(listing.display_price);
  if (displayPrice) return displayPrice;

  const price = asNumber(listing.price);
  if (price != null) {
    return `PHP ${price.toLocaleString("en-US")}`;
  }

  return "Size on request";
}

export type ListingCoordinates = {
  lat: number;
  lng: number;
};

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

  if (lat == null || lng == null) return null;
  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) return null;

  return { lat, lng };
}

export function getListingImageLabel(listing: ListingWithAgent): string | null {
  const label =
    asString(listing.municipality) ??
    asString(listing.city) ??
    asString(listing.location);

  return label?.toUpperCase() ?? null;
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
