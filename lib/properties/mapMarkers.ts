import {
  getListingCoordinates,
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

    return [
      {
        id: listing.id,
        lat: coordinates.lat,
        lng: coordinates.lng,
        title: getListingTitle(listing),
      },
    ];
  });
}
