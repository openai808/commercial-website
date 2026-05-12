"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";

type FeaturedProperty = {
  title: string;
  location: string;
  size: string;
  tag: string;
  extraTags: number;
  image: string;
  href: string;
};

const SLIDES: FeaturedProperty[][] = [
  [
    {
      title: "Vacant Lot for Sale in Cebu City",
      location: "Banilad, Cebu City",
      size: "909 m²",
      tag: "LAND",
      extraTags: 2,
      image:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80",
      href: "/properties/for-sale",
    },
    {
      title: "Residential Lot with Mountain View",
      location: "Maria Luisa Estate, Cebu",
      size: "650 m²",
      tag: "LAND",
      extraTags: 1,
      image:
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=900&q=80",
      href: "/properties/for-sale",
    },
    {
      title: "Corner Parcel near Business District",
      location: "Mandaue City, Cebu",
      size: "420 m²",
      tag: "LAND",
      extraTags: 3,
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80",
      href: "/properties/for-sale",
    },
  ],
  [
    {
      title: "Premium Condominium Unit",
      location: "Rockwell, Makati",
      size: "128 m²",
      tag: "CONDO",
      extraTags: 2,
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=80",
      href: "/properties/for-sale",
    },
    {
      title: "Townhouse in Gated Community",
      location: "Alabang, Muntinlupa",
      size: "220 m²",
      tag: "HOUSE",
      extraTags: 1,
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80",
      href: "/properties/for-sale",
    },
    {
      title: "Development Land with Road Frontage",
      location: "Santa Rosa, Laguna",
      size: "2.4 ha",
      tag: "LAND",
      extraTags: 2,
      image:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80",
      href: "/properties/for-sale",
    },
  ],
  [
    {
      title: "Beachfront Residential Plot",
      location: "Lian, Batangas",
      size: "1,200 m²",
      tag: "LAND",
      extraTags: 1,
      image:
        "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=900&q=80",
      href: "/properties/for-sale",
    },
    {
      title: "High-Rise Studio for Sale",
      location: "BGC, Taguig",
      size: "36 m²",
      tag: "CONDO",
      extraTags: 2,
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80",
      href: "/properties/for-sale",
    },
    {
      title: "Estate Lot in Private Enclave",
      location: "Ayala Alabang Village",
      size: "800 m²",
      tag: "LAND",
      extraTags: 2,
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
      href: "/properties/for-sale",
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

export default function ResidentialServicesFeaturedProperties() {
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
      aria-labelledby="residential-featured-heading"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <h2
          id="residential-featured-heading"
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
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <span className="absolute right-2 top-2 bg-[#23408e] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                      For sale
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-4">
                    <h3 className="text-sm font-bold leading-snug text-[#27386e] group-hover:underline md:text-base">
                      {property.title}
                    </h3>
                    <p className="text-xs text-[#6a7697] md:text-sm">{property.location}</p>
                    <p className="text-sm font-bold text-[#27386e] md:text-base">{property.size}</p>
                    <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
                      <span className="rounded-full bg-[#e4ebf7] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#23408e]">
                        {property.tag}
                      </span>
                      <span className="rounded-full border border-[#d9dce5] bg-white px-2 py-0.5 text-[11px] font-medium text-[#5a6a8c]">
                        +{property.extraTags}
                      </span>
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
            href="/properties/for-sale"
            className="rounded-full bg-[#23408e] px-8 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#1d3575]"
          >
            VIEW MORE
          </Link>
        </div>
      </div>
    </section>
  );
}
