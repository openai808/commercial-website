"use client";

import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useMemo, useState } from "react";
import type {
  ListingMapMarker,
  ListingMapMarkerSource,
} from "@/lib/properties/mapMarkers";

const geocodeCache = new Map<string, ListingMapMarker>();

function sourceToResolved(source: ListingMapMarkerSource): ListingMapMarker | null {
  if (source.lat == null || source.lng == null) return null;
  return {
    id: source.id,
    title: source.title,
    lat: source.lat,
    lng: source.lng,
  };
}

export function useGeocodedListingMarkers(
  sources: ListingMapMarkerSource[],
): ListingMapMarker[] {
  const geocodingLib = useMapsLibrary("geocoding");
  const geocoder = useMemo(
    () => (geocodingLib ? new geocodingLib.Geocoder() : null),
    [geocodingLib],
  );
  const [geocodedById, setGeocodedById] = useState<
    Record<string, ListingMapMarker>
  >({});

  const resolvedImmediately = useMemo(
    () =>
      sources.flatMap((source) => {
        const marker = sourceToResolved(source);
        return marker ? [marker] : [];
      }),
    [sources],
  );

  const pendingSources = useMemo(
    () => sources.filter((source) => source.geocodeQuery && source.lat == null),
    [sources],
  );

  const pendingKey = useMemo(
    () =>
      pendingSources
        .map((source) => `${source.id}:${source.geocodeQuery ?? ""}`)
        .join("|"),
    [pendingSources],
  );

  useEffect(() => {
    if (!geocoder || pendingSources.length === 0) return;

    let cancelled = false;

    const geocodePending = async () => {
      const next: Record<string, ListingMapMarker> = {};

      for (const source of pendingSources) {
        if (cancelled) return;

        const query = source.geocodeQuery;
        if (!query) continue;

        const cached = geocodeCache.get(query);
        if (cached) {
          next[source.id] = { ...cached, id: source.id, title: source.title };
          continue;
        }

        try {
          const response = await geocoder.geocode({
            address: query,
            region: "ph",
          });
          if (cancelled) return;

          const location = response.results[0]?.geometry?.location;
          if (!location) continue;

          const marker: ListingMapMarker = {
            id: source.id,
            title: source.title,
            lat: location.lat(),
            lng: location.lng(),
          };
          geocodeCache.set(query, marker);
          next[source.id] = marker;
        } catch {
          // Skip listings Google cannot resolve; others still render.
        }
      }

      if (!cancelled && Object.keys(next).length > 0) {
        setGeocodedById((prev) => ({ ...prev, ...next }));
      }
    };

    void geocodePending();

    return () => {
      cancelled = true;
    };
  }, [geocoder, pendingKey, pendingSources]);

  return useMemo(() => {
    const currentIds = new Set(sources.map((source) => source.id));
    const byId = new Map<string, ListingMapMarker>();

    for (const marker of resolvedImmediately) {
      byId.set(marker.id, marker);
    }

    for (const source of sources) {
      const query = source.geocodeQuery;
      if (query) {
        const cached = geocodeCache.get(query);
        if (cached) {
          byId.set(source.id, {
            ...cached,
            id: source.id,
            title: source.title,
          });
        }
      }
    }

    for (const [id, marker] of Object.entries(geocodedById)) {
      if (currentIds.has(id)) {
        byId.set(id, marker);
      }
    }

    return [...byId.values()];
  }, [geocodedById, resolvedImmediately, sources]);
}
