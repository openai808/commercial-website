"use client";

import { usePropertiesListingsNavigation } from "@/features/properties/PropertiesListingsNavigationContext";
import Image from "next/image";
import Link from "next/link";
import {
  getListingExtraTagsCount,
  getListingHref,
  getListingImage,
  getListingLocation,
  getListingSize,
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
  const pending = nav?.isPaginationPending ?? false;

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
      className={`mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 transition-[filter,opacity] duration-200 ease-out motion-reduce:transition-none ${pendingClass}`}
    >
      {listings.map((listing) => (
        <PropertyListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}

function PropertyListingCard({ listing }: { listing: ListingWithAgent }) {
  const status = getListingStatus(listing);
  const extraTags = getListingExtraTagsCount(listing);

  return (
    <Link
      href={getListingHref(listing)}
      className="group flex flex-col overflow-hidden border border-[#d9dce5] bg-white text-left transition-shadow hover:shadow-md"
    >
      <div className="cursor-pointer relative aspect-[4/3] w-full cursor-pointer overflow-hidden">
        <Image
          src={getListingImage(listing)}
          alt={getListingTitle(listing)}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="(max-width: 1024px) 100vw, 50vw"
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
        <div className="flex flex-col gap-1.5">
          <h2 className="text-sm font-bold leading-snug text-[#000759] group-hover:underline md:text-[15px] md:leading-6">
            {getListingTitle(listing)}
          </h2>
          <p className="text-xs text-[#000759]/80 md:text-sm">
            {getListingLocation(listing)}
          </p>
        </div>

        <p className="text-sm font-bold text-[#000759] md:text-base">
          {getListingSize(listing)}
        </p>

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
