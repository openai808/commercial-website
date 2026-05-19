"use client";

import {
  APIProvider,
  Map,
  Marker,
  useMap,
} from "@vis.gl/react-google-maps";
import { useEffect, useMemo } from "react";
import { usePropertiesListingHighlight } from "@/features/properties/PropertiesListingHighlightContext";
import { useGeocodedListingMarkers } from "@/features/properties/useGeocodedListingMarkers";
import { getListingMarkerIcon } from "@/lib/properties/mapMarkerIcon";
import type {
  ListingMapMarker,
  ListingMapMarkerSource,
} from "@/lib/properties/mapMarkers";

const PHILIPPINES_CENTER = { lat: 12.8797, lng: 121.774 };

type PropertiesMapProps = {
  markerSources: ListingMapMarkerSource[];
};

export default function PropertiesMap({ markerSources }: PropertiesMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <PropertiesMapPlaceholder message="Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to enable the map." />
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      <div className="flex h-full min-h-0 w-full flex-col">
        <PropertiesMapInner markerSources={markerSources} />
      </div>
    </APIProvider>
  );
}

function PropertiesMapInner({ markerSources }: PropertiesMapProps) {
  const markers = useGeocodedListingMarkers(markerSources);

  const center = useMemo(() => {
    if (markers.length === 0) return PHILIPPINES_CENTER;
    const lat =
      markers.reduce((sum, marker) => sum + marker.lat, 0) / markers.length;
    const lng =
      markers.reduce((sum, marker) => sum + marker.lng, 0) / markers.length;
    return { lat, lng };
  }, [markers]);

  const zoom = markers.length === 1 ? 12 : markers.length > 0 ? 7 : 6;

  return (
    <Map
      defaultCenter={center}
      defaultZoom={zoom}
      gestureHandling="greedy"
      disableDefaultUI={false}
      mapTypeControl
      fullscreenControl={false}
      streetViewControl={false}
      className="h-full min-h-0 w-full flex-1"
    >
      <MapMarkerLayer markers={markers} />
    </Map>
  );
}

function MapMarkerLayer({ markers }: { markers: ListingMapMarker[] }) {
  const map = useMap();
  const highlight = usePropertiesListingHighlight();
  const markersKey = markers.map((marker) => marker.id).join("|");

  useEffect(() => {
    if (!map || markers.length === 0) return;

    const bounds = new google.maps.LatLngBounds();
    for (const marker of markers) {
      bounds.extend({ lat: marker.lat, lng: marker.lng });
    }

    if (markers.length === 1) {
      map.setCenter({ lat: markers[0].lat, lng: markers[0].lng });
      map.setZoom(12);
      return;
    }

    map.fitBounds(bounds, { top: 48, right: 48, bottom: 48, left: 48 });
  }, [map, markersKey, markers]);

  return (
    <>
      {markers.map((marker) => {
        const isHighlighted =
          highlight?.isListingHighlighted(marker.id) ?? false;

        return (
          <Marker
            key={marker.id}
            position={{ lat: marker.lat, lng: marker.lng }}
            title={marker.title}
            zIndex={isHighlighted ? 1000 : 1}
            icon={getListingMarkerIcon(isHighlighted)}
            onClick={() => highlight?.focusListing(marker.id)}
          />
        );
      })}
    </>
  );
}

function PropertiesMapPlaceholder({ message }: { message: string }) {
  return (
    <div
      className="flex h-full min-h-[320px] w-full flex-1 flex-col items-center justify-center bg-[#eef2f8] px-6 text-center text-sm text-[#4a5f9a]"
      role="img"
      aria-label="Property map placeholder"
    >
      <p>{message}</p>
    </div>
  );
}
