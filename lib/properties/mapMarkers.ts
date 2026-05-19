import {
  getListingCoordinates,
  getListingIdentifier,
  getListingMapQuery,
  getListingTitle,
} from "@/lib/properties/listingDisplay";
import type { ListingWithAgent } from "@/lib/properties/types";

export type ListingMapMarker = {
  id: string;
  lat: number;
  lng: number;
  title: string;
};

/** Marker passed to the map before optional client-side geocoding. */
export type ListingMapMarkerSource = {
  id: string;
  title: string;
  lat?: number;
  lng?: number;
  geocodeQuery?: string;
};

export function buildListingMapMarkers(
  listings: ListingWithAgent[],
): ListingMapMarkerSource[] {
  const markers: ListingMapMarkerSource[] = [];

  for (const listing of listings) {
    const id = getListingIdentifier(listing);
    if (!id) continue;

    const title = getListingTitle(listing);
    const coordinates = getListingCoordinates(listing);
    if (coordinates) {
      markers.push({
        id,
        title,
        lat: coordinates.lat,
        lng: coordinates.lng,
      });
      continue;
    }

    const geocodeQuery = getListingMapQuery(listing);
    if (!geocodeQuery || geocodeQuery === "Philippines") continue;

    markers.push({ id, title, geocodeQuery });
  }

  return markers;
}
