import {
  getListingCoordinates,
  getListingIdentifier,
  getListingTitle,
} from "@/lib/properties/listingDisplay";
import type { ListingWithAgent } from "@/lib/properties/types";

export type ListingMapMarker = {
  id: string;
  lat: number;
  lng: number;
  title: string;
};

export function buildListingMapMarkers(
  listings: ListingWithAgent[],
): ListingMapMarker[] {
  return listings.flatMap((listing) => {
    const coordinates = getListingCoordinates(listing);
    if (!coordinates) return [];

    const id = getListingIdentifier(listing);
    if (!id) return [];

    return [
      {
        id,
        lat: coordinates.lat,
        lng: coordinates.lng,
        title: getListingTitle(listing),
      },
    ];
  });
}
