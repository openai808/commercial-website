"use client";

import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import type { ListingCoordinates } from "@/lib/properties/listingDisplay";

type PropertyDetailMapProps = {
  coordinates: ListingCoordinates | null;
  mapQuery: string;
  googleMapLink: string | null;
};

export default function PropertyDetailMap({
  coordinates,
  mapQuery,
  googleMapLink,
}: PropertyDetailMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const openMapHref =
    googleMapLink ??
    (mapQuery
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`
      : null);

  return (
    <div className="mt-3">
      {openMapHref ? (
        <a
          href={openMapHref}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-[#23408e] underline underline-offset-2 hover:text-[#1d3575]"
        >
          Open map
        </a>
      ) : null}

      <div className="relative mt-3 aspect-[16/10] w-full overflow-hidden border border-[#d9dce5] bg-[#eef2f8]">
        {coordinates && apiKey ? (
          <APIProvider apiKey={apiKey}>
            <Map
              defaultCenter={coordinates}
              defaultZoom={15}
              gestureHandling="greedy"
              disableDefaultUI={false}
              mapTypeControl
              fullscreenControl={false}
              streetViewControl={false}
              className="h-full w-full"
            >
              <Marker position={coordinates} />
            </Map>
          </APIProvider>
        ) : apiKey && mapQuery ? (
          <iframe
            title={`Map showing ${mapQuery}`}
            src={`https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(apiKey)}&q=${encodeURIComponent(mapQuery)}`}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : (
          <div className="flex h-full min-h-[280px] w-full items-center justify-center px-6 text-center text-sm text-[#4a5f9a]">
            <p>
              {apiKey
                ? "Map location is not available for this listing."
                : "Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to enable the map."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
