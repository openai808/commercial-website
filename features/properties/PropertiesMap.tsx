"use client";

import { APIProvider, Map, Marker, useMap } from "@vis.gl/react-google-maps";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { usePropertiesListingsNavigation } from "@/features/properties/PropertiesListingsNavigationContext";
import { useGeocodedCityMarkers } from "@/features/properties/useGeocodedCityMarkers";
import type { CityMapMarker } from "@/lib/properties/cityMapMarkers";
import { getCityMarkerIcon } from "@/lib/properties/mapMarkerIcon";
import type { ListingCityCount } from "@/lib/properties/types";
import { canonicalCityGroupKey } from "@/lib/text/expandCityFilterVariants";
import {
  hasActivePropertiesQuery,
  parsePropertiesSearchParams,
} from "@/lib/properties/searchParams";

const PHILIPPINES_CENTER = { lat: 12.8797, lng: 121.774 };

type PropertiesMapProps = {
  cityOptions: ListingCityCount[];
};

export default function PropertiesMap({ cityOptions }: PropertiesMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <PropertiesMapPlaceholder message="Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to enable the map." />
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      <div className="flex h-full min-h-0 w-full flex-col">
        <PropertiesMapInner cityOptions={cityOptions} />
      </div>
    </APIProvider>
  );
}

function PropertiesMapInner({ cityOptions }: PropertiesMapProps) {
  const cityMarkers = useGeocodedCityMarkers(cityOptions);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const nav = usePropertiesListingsNavigation();

  const anyFilterActive = hasActivePropertiesQuery(
    parsePropertiesSearchParams(Object.fromEntries(searchParams.entries())),
  );
  /** Changes only on navigation, unlike the marker list which resolves gradually as city names geocode. */
  const navigationKey = searchParams.toString();

  const activeCityKeys = useMemo(() => {
    const raw = searchParams.get("city");
    if (!raw) return new Set<string>();
    return new Set(
      raw
        .split(",")
        .map((city) => canonicalCityGroupKey(city.trim()))
        .filter(Boolean),
    );
  }, [searchParams]);

  const navigate = useCallback(
    (url: string) => {
      if (nav) {
        nav.navigateListings(url);
        return;
      }
      router.push(url, { scroll: false });
    },
    [nav, router],
  );

  /**
   * Clears every other filter and jumps to just this city. A merge (keeping
   * e.g. the current property-type filter) could leave this city's own
   * listings still excluded by some other filter dimension.
   */
  const selectCity = useCallback(
    (city: string) => {
      const params = new URLSearchParams();
      const sort = searchParams.get("sort");
      const dir = searchParams.get("dir");
      if (sort) params.set("sort", sort);
      if (dir) params.set("dir", dir);
      params.set("city", city);
      const qs = params.toString();
      navigate(qs ? `${pathname}?${qs}` : pathname);
    },
    [searchParams, pathname, navigate],
  );

  const resetFilters = useCallback(() => {
    navigate(pathname);
  }, [pathname, navigate]);

  const center = useMemo(() => {
    if (cityMarkers.length === 0) return PHILIPPINES_CENTER;
    const lat =
      cityMarkers.reduce((sum, marker) => sum + marker.lat, 0) / cityMarkers.length;
    const lng =
      cityMarkers.reduce((sum, marker) => sum + marker.lng, 0) / cityMarkers.length;
    return { lat, lng };
  }, [cityMarkers]);

  const zoom = cityMarkers.length === 1 ? 12 : cityMarkers.length > 0 ? 7 : 6;

  return (
    <div className="relative h-full min-h-0 w-full flex-1">
      <Map
        defaultCenter={center}
        defaultZoom={zoom}
        gestureHandling="greedy"
        disableDefaultUI={false}
        mapTypeControl
        fullscreenControl={false}
        streetViewControl={false}
        className="h-full min-h-0 w-full"
      >
        <CityMarkerLayer
          markers={cityMarkers}
          activeCityKeys={activeCityKeys}
          onSelectCity={selectCity}
          navigationKey={navigationKey}
        />
      </Map>
      {anyFilterActive ? (
        <button
          type="button"
          onClick={resetFilters}
          className="absolute left-3 top-3 z-10 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#000759] shadow-md hover:bg-[#f2f4fa]"
        >
          Reset filters
        </button>
      ) : null}
    </div>
  );
}

function CityMarkerLayer({
  markers,
  activeCityKeys,
  onSelectCity,
  navigationKey,
}: {
  markers: CityMapMarker[];
  activeCityKeys: Set<string>;
  onSelectCity: (city: string) => void;
  navigationKey: string;
}) {
  const map = useMap();
  /** Fit once per navigation; city geocoding keeps resolving afterward and shouldn't keep re-zooming the map out. */
  const fitNavigationKeyRef = useRef<string | null>(null);

  const activeMarkers = markers.filter((marker) =>
    activeCityKeys.has(canonicalCityGroupKey(marker.city)),
  );
  /** Zoom into the selected city instead of re-fitting to every city on the map. */
  const boundsMarkers = activeMarkers.length > 0 ? activeMarkers : markers;

  useEffect(() => {
    if (!map || boundsMarkers.length === 0) return;
    if (fitNavigationKeyRef.current === navigationKey) return;
    fitNavigationKeyRef.current = navigationKey;

    const bounds = new google.maps.LatLngBounds();
    for (const marker of boundsMarkers) {
      bounds.extend({ lat: marker.lat, lng: marker.lng });
    }

    if (boundsMarkers.length === 1) {
      map.setCenter({ lat: boundsMarkers[0].lat, lng: boundsMarkers[0].lng });
      map.setZoom(12);
      return;
    }

    map.fitBounds(bounds, { top: 48, right: 48, bottom: 48, left: 48 });
  }, [map, navigationKey, boundsMarkers]);

  return (
    <>
      {markers.map((marker) => {
        const isActive = activeCityKeys.has(canonicalCityGroupKey(marker.city));

        return (
          <Marker
            key={marker.city}
            position={{ lat: marker.lat, lng: marker.lng }}
            title={`${marker.city} (${marker.count} listing${marker.count === 1 ? "" : "s"})`}
            zIndex={isActive ? 1000 : 1}
            icon={getCityMarkerIcon({ active: isActive })}
            label={{
              text: String(marker.count),
              color: "#ffffff",
              fontSize: "11px",
              fontWeight: "700",
            }}
            onClick={() => onSelectCity(marker.city)}
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
