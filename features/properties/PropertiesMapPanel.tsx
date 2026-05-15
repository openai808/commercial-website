"use client";

import dynamic from "next/dynamic";
import type { ListingMapMarker } from "@/lib/properties/mapMarkers";

const PropertiesMap = dynamic(
  () => import("@/features/properties/PropertiesMap"),
  {
    ssr: false,
    loading: () => (
      <div
        className="flex h-full min-h-[320px] w-full items-center justify-center bg-[#eef2f8] text-sm text-[#4a5f9a]"
        aria-hidden
      >
        Loading map…
      </div>
    ),
  },
);

type PropertiesMapPanelProps = {
  markers: ListingMapMarker[];
};

export default function PropertiesMapPanel({ markers }: PropertiesMapPanelProps) {
  return (
    <div className="h-full min-h-0 w-full overflow-hidden">
      <PropertiesMap markers={markers} />
    </div>
  );
}
