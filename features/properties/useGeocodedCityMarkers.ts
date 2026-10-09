"use client";

import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useMemo, useState } from "react";
import type { CityMapMarker } from "@/lib/properties/cityMapMarkers";
import type { ListingCityCount } from "@/lib/properties/types";

const cityGeocodeCache = new Map<string, { lat: number; lng: number }>();

/** Resolves each city name to a point once (geocoding a handful of city names, not every listing). */
export function useGeocodedCityMarkers(
  cityOptions: ListingCityCount[],
): CityMapMarker[] {
  const geocodingLib = useMapsLibrary("geocoding");
  const geocoder = useMemo(
    () => (geocodingLib ? new geocodingLib.Geocoder() : null),
    [geocodingLib],
  );
  const [resolvedByCity, setResolvedByCity] = useState<
    Record<string, { lat: number; lng: number }>
  >({});

  const pendingCities = useMemo(
    () => cityOptions.filter((option) => !cityGeocodeCache.has(option.city)),
    [cityOptions],
  );
  const pendingKey = useMemo(
    () => pendingCities.map((option) => option.city).join("|"),
    [pendingCities],
  );

  useEffect(() => {
    if (!geocoder || pendingCities.length === 0) return;

    let cancelled = false;

    const geocodePending = async () => {
      const next: Record<string, { lat: number; lng: number }> = {};

      for (const option of pendingCities) {
        if (cancelled) return;

        try {
          const response = await geocoder.geocode({
            address: `${option.city}, Philippines`,
            region: "ph",
          });
          if (cancelled) return;

          const location = response.results[0]?.geometry?.location;
          if (!location) continue;

          const coords = { lat: location.lat(), lng: location.lng() };
          cityGeocodeCache.set(option.city, coords);
          next[option.city] = coords;
        } catch {
          // Skip cities Google cannot resolve; others still render.
        }
      }

      if (!cancelled && Object.keys(next).length > 0) {
        setResolvedByCity((prev) => ({ ...prev, ...next }));
      }
    };

    void geocodePending();

    return () => {
      cancelled = true;
    };
    // pendingCities is intentionally omitted: it's a new array reference on
    // every request even when its content is unchanged, which would cancel
    // and restart this sequential geocode loop on every navigation. pendingKey
    // already captures everything that should actually re-trigger geocoding.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geocoder, pendingKey]);

  return useMemo(() => {
    const markers: CityMapMarker[] = [];

    for (const option of cityOptions) {
      const coords = cityGeocodeCache.get(option.city) ?? resolvedByCity[option.city];
      if (!coords) continue;
      markers.push({
        city: option.city,
        count: option.count,
        lat: coords.lat,
        lng: coords.lng,
      });
    }

    return markers;
  }, [cityOptions, resolvedByCity]);
}
