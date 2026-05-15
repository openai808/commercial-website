"use client";

import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { useMemo } from "react";
import type { ListingMapMarker } from "@/lib/properties/mapMarkers";

const PHILIPPINES_CENTER = { lat: 12.8797, lng: 121.774 };

type PropertiesMapProps = {
  markers: ListingMapMarker[];
};

export default function PropertiesMap({ markers }: PropertiesMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <PropertiesMapPlaceholder message="Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to enable the map." />
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      <div className="flex h-full min-h-0 w-full flex-col">
        <PropertiesMapInner markers={markers} />
      </div>
    </APIProvider>
  );
}

function PropertiesMapInner({ markers }: PropertiesMapProps) {
  const center = useMemo(() => {
    if (markers.length === 0) return PHILIPPINES_CENTER;
    const lat = markers.reduce((sum, marker) => sum + marker.lat, 0) / markers.length;
    const lng = markers.reduce((sum, marker) => sum + marker.lng, 0) / markers.length;
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
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={{ lat: marker.lat, lng: marker.lng }}
          title={marker.title}
        />
      ))}
    </Map>
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
