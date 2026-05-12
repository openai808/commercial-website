"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";

type FeaturedProperty = {
  title: string;
  location: string;
  size: string;
  tag: string;
  extraTags?: number;
  image: string;
  href: string;
  status: "sale" | "lease";
};

const SLIDES: FeaturedProperty[][] = [
  [
    {
      title: "Raw Land for Sale in Batangas",
      location: "Sto. Tomas, Batangas",
      size: "27,728 m²",
      tag: "LAND",
      extraTags: 2,
      image:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80",
      href: "/properties/industrial",
      status: "sale",
    },
    {
      title: "16-Hectare Raw Land for Sale in Batangas",
      location: "Sto. Tomas, Batangas",
      size: "165,969 m²",
      tag: "LAND",
      extraTags: 2,
      image:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80",
      href: "/properties/industrial",
      status: "sale",
    },
    {
      title: "LBC Mandaue",
      location: "F.E. Zuellig Avenue Mandaue",
      size: "190 - 5,000 m²",
      tag: "INDUSTRIAL",
      image:
        "https://images.unsplash.com/photo-1586528116311-ad8dde234ddb?auto=format&fit=crop&w=900&q=80",
      href: "/properties/industrial",
      status: "lease",
    },
  ],
  [
    {
      title: "Logistics Warehouse in Cavite",
      location: "General Trias, Cavite",
      size: "12,400 m²",
      tag: "INDUSTRIAL",
      extraTags: 1,
      image:
        "https://images.unsplash.com/photo-1565514020161-6d943f9a99d3?auto=format&fit=crop&w=900&q=80",
      href: "/properties/industrial",
      status: "lease",
    },
    {
      title: "Industrial Park Lot",
      location: "Clark Freeport, Pampanga",
      size: "8,200 m²",
      tag: "LAND",
      extraTags: 3,
      image:
        "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=900&q=80",
      href: "/properties/industrial",
      status: "sale",
    },
    {
      title: "Cold Storage Facility",
      location: "Laguna Technopark",
      size: "3,500 m²",
      tag: "INDUSTRIAL",
      extraTags: 2,
      image:
        "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=900&q=80",
      href: "/properties/industrial",
      status: "lease",
    },
  ],
  [
    {
      title: "Manufacturing Shell Building",
      location: "Mactan Economic Zone",
      size: "2,800 - 6,000 m²",
      tag: "INDUSTRIAL",
      image:
        "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=900&q=80",
      href: "/properties/industrial",
      status: "lease",
    },
    {
      title: "Agricultural-Industrial Conversion Site",
      location: "Tarlac",
      size: "45 ha",
      tag: "LAND",
      extraTags: 1,
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80",
      href: "/properties/industrial",
      status: "sale",
    },
    {
      title: "Last-Mile Distribution Hub",
      location: "North Caloocan",
      size: "4,200 m²",
      tag: "INDUSTRIAL",
      extraTags: 2,
      image:
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=900&q=80",
      href: "/properties/industrial",
      status: "sale",
    },
  ],
];

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {direction === "left" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
    </svg>
  );
}

export default function IndustrialServicesFeaturedProperties() {
  const [page, setPage] = useState(0);
  const total = SLIDES.length;

  const goPrev = useCallback(() => {
    setPage((p) => (p - 1 + total) % total);
  }, [total]);

  const goNext = useCallback(() => {
    setPage((p) => (p + 1) % total);
  }, [total]);

  const items = SLIDES[page] ?? SLIDES[0];

  return (
    <section
      className="bg-white pb-16 pt-4 text-[#27386e] md:pb-20"
      aria-labelledby="industrial-featured-heading"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <h2
          id="industrial-featured-heading"
          className="text-center text-3xl font-light tracking-tight md:text-4xl"
        >
          Featured properties
        </h2>

        <div className="mt-10 flex items-stretch gap-2 md:gap-4">
          <button
            type="button"
            onClick={goPrev}
            className="flex shrink-0 items-center justify-center self-center rounded border border-transparent px-1 text-[#23408e] transition-colors hover:bg-[#f0f3fa] md:px-2"
            aria-label="Previous featured properties"
          >
            <ChevronIcon direction="left" />
          </button>

          <div className="min-w-0 flex-1">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((property, index) => (
                <Link
                  key={`${page}-${index}-${property.title}`}
                  href={property.href}
                  className="group flex flex-col overflow-hidden border border-[#d9dce5] bg-white text-left transition-shadow hover:shadow-md"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <span
                      className={`absolute right-2 top-2 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white ${
                        property.status === "lease" ? "bg-[#2b8cff]" : "bg-[#23408e]"
                      }`}
                    >
                      {property.status === "lease" ? "For lease" : "For sale"}
                    </span>
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#23408e]/0 transition-colors duration-200 group-hover:bg-[#23408e]/72">
                      <span className="translate-y-1 rounded-md border border-white/90 bg-[#23408e] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white opacity-0 shadow-sm transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                        MORE DETAILS
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-4">
                    <h3 className="text-sm font-bold leading-snug text-[#27386e] group-hover:underline md:text-base">
                      {property.title}
                    </h3>
                    <p className="text-xs text-[#6a7697] md:text-sm">{property.location}</p>
                    <p className="text-sm font-bold text-[#27386e] md:text-base">{property.size}</p>
                    <div className="mt-auto border-t border-[#e8ebf2] pt-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-[#e4ebf7] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#23408e]">
                          {property.tag}
                        </span>
                        {property.extraTags != null && property.extraTags > 0 ? (
                          <span className="rounded-full border border-[#d9dce5] bg-white px-2 py-0.5 text-[11px] font-medium text-[#5a6a8c]">
                            +{property.extraTags}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={goNext}
            className="flex shrink-0 items-center justify-center self-center rounded border border-transparent px-1 text-[#23408e] transition-colors hover:bg-[#f0f3fa] md:px-2"
            aria-label="Next featured properties"
          >
            <ChevronIcon direction="right" />
          </button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2" aria-label="Carousel pages">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show featured properties page ${i + 1}`}
              aria-current={i === page ? "true" : undefined}
              onClick={() => setPage(i)}
              className={`h-1 rounded-full transition-all ${
                i === page ? "w-10 bg-[#23408e]" : "w-6 bg-[#c5cbd9] hover:bg-[#a8b0c4]"
              }`}
            />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/properties/industrial"
            className="rounded-full bg-[#23408e] px-8 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#1d3575]"
          >
            VIEW MORE
          </Link>
        </div>
      </div>
    </section>
  );
}
