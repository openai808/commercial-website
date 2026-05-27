"use client";

import { usePropertiesListingHighlight } from "@/features/properties/PropertiesListingHighlightContext";
import { usePropertiesListingsNavigation } from "@/features/properties/PropertiesListingsNavigationContext";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import {
  getFloorAreaLabel,
  getListingCity,
  getListingExtraTagsCount,
  getListingFloorAreaDisplay,
  getListingHref,
  getListingIdentifier,
  getListingImage,
  getListingLotAreaDisplay,
  getLotAreaLabel,
  getListingStatus,
  getListingTag,
  getListingTitle,
} from "@/lib/properties/listingDisplay";
import type { ListingWithAgent } from "@/lib/properties/types";

type PropertiesListingGridProps = {
  listings: ListingWithAgent[];
};

export default function PropertiesListingGrid({
  listings,
}: PropertiesListingGridProps) {
  const nav = usePropertiesListingsNavigation();
  const pending = nav?.isListingsPending ?? false;

  const pendingClass = pending
    ? "blur-[2px] opacity-[0.72] pointer-events-none select-none motion-reduce:blur-none motion-reduce:opacity-80"
    : "";

  if (listings.length === 0) {
    return (
      <div
        className={`py-12 text-center transition-[filter,opacity] duration-200 ease-out motion-reduce:transition-none ${pendingClass}`}
        {...(pending ? { "aria-busy": true as const } : {})}
      >
        <p className="text-sm text-[#4a5f9a]">
          No active listings match your search right now.
        </p>
      </div>
    );
  }

  return (
    <div
      aria-label="Property listings"
      {...(pending ? { "aria-busy": true as const } : {})}
      className={`grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-2 lg:gap-4 xl:grid-cols-3 xl:gap-4 2xl:grid-cols-4 min-[2000px]:grid-cols-4 min-[2000px]:gap-4 transition-[filter,opacity] duration-200 ease-out motion-reduce:transition-none ${pendingClass}`}
    >
      {listings.map((listing) => (
        <PropertyListingCard
          key={getListingIdentifier(listing) ?? getListingTitle(listing)}
          listing={listing}
        />
      ))}
    </div>
  );
}

function PropertyListingCard({ listing }: { listing: ListingWithAgent }) {
  const [isNavigating, setIsNavigating] = useState(false);
  const status = getListingStatus(listing);
  const city = getListingCity(listing);
  const lotArea = getListingLotAreaDisplay(listing);
  const floorArea = getListingFloorAreaDisplay(listing);
  const lotLabel = getLotAreaLabel(listing);
  const floorLabel = getFloorAreaLabel(listing);
  const extraTags = getListingExtraTagsCount(listing);
  const listingId = getListingIdentifier(listing);
  const highlight = usePropertiesListingHighlight();
  const isHighlighted =
    listingId != null && (highlight?.isListingHighlighted(listingId) ?? false);

  const setCardRef = useCallback(
    (node: HTMLAnchorElement | null) => {
      if (!listingId) return;
      highlight?.registerListingCardRef(listingId, node);
    },
    [highlight, listingId],
  );

  return (
    <Link
      ref={setCardRef}
      href={getListingHref(listing)}
      data-listing-id={listingId ?? undefined}
      onClick={() => setIsNavigating(true)}
      onMouseEnter={() => {
        if (listingId) highlight?.setHoveredListingId(listingId);
      }}
      onMouseLeave={() => highlight?.setHoveredListingId(null)}
      aria-busy={isNavigating}
      className={
        "group relative flex scroll-mt-[var(--listing-map-top,112px)] flex-col overflow-hidden bg-white text-left transition-[border-color,box-shadow] duration-200 " +
        (isHighlighted
          ? "border-2 border-[#23408e] shadow-md ring-1 ring-[#23408e]/15"
          : "border border-[#d9dce5] hover:shadow-md") +
        (isNavigating ? " pointer-events-none" : "")
      }
    >
      {isNavigating ? (
        <div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#23408e]/80"
          role="status"
          aria-live="polite"
          aria-label="Loading property details"
        >
          <PropertyListingCardSpinner />
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-white">
            Loading…
          </span>
        </div>
      ) : null}
      <div className="cursor-pointer relative aspect-[4/3] w-full cursor-pointer overflow-hidden">
        <Image
          src={getListingImage(listing)}
          alt={getListingTitle(listing)}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, (max-width: 1536px) 25vw, 200px"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center bg-[#23408e]/0 transition-colors duration-200 motion-reduce:transition-none group-hover:bg-[#23408e]/72"
        >
          <span
            className="pointer-events-auto translate-y-1 rounded-full bg-white px-8 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#000759] opacity-0 shadow-md transition-all duration-200 hover:bg-[#000759] hover:text-white motion-reduce:translate-y-0 motion-reduce:transition-none group-hover:translate-y-0 group-hover:opacity-100"
          >
            More details
          </span>
        </div>
        <span
          className={`absolute right-0 top-0 z-[2] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white ${
            status === "lease" ? "bg-[#2b8cff]" : "bg-[#000759]"
          }`}
        >
          {status === "lease" ? "For lease" : "For sale"}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 md:p-5">
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-bold leading-snug text-[#000759] group-hover:underline md:text-[15px] md:leading-6">
            {getListingTitle(listing)}
          </h2>
          {city ? (
            <p className="text-xs text-[#000759]/80 md:text-sm">{city}</p>
          ) : null}
          {lotArea ? (
            <p className="text-xs text-[#000759]/80 md:text-sm">
              <span className="font-semibold text-[#000759]">{lotLabel}:</span>{" "}
              {lotArea}
            </p>
          ) : null}
          {floorArea ? (
            <p className="text-xs text-[#000759]/80 md:text-sm">
              <span className="font-semibold text-[#000759]">{floorLabel}:</span>{" "}
              {floorArea}
            </p>
          ) : null}
        </div>

        <div className="mt-auto border-t border-[#e8ebf2] pt-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-[#000759]">
              {getListingTag(listing)}
            </span>
            {extraTags > 0 ? (
              <span className="rounded-full border border-[#d9dce5] bg-[#f0f4fa] px-2 py-0.5 text-[11px] font-medium text-[#000759]">
                +{extraTags}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </Link>
  );
}

function PropertyListingCardSpinner() {
  return (
    <svg
      className="h-8 w-8 animate-spin text-white motion-reduce:animate-none"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        className="opacity-90"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
