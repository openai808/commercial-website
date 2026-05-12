"use client";

import Image from "next/image";
import { useId, useState } from "react";

type TabId = "financing" | "development" | "compliance";

type TabContent = {
  id: TabId;
  label: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
};

const TABS: TabContent[] = [
  {
    id: "financing",
    label: "Financing & Refinancing",
    body:
      "As lending markets become more sophisticated, so do valuation reports. Fully supported valuations with comparables, calculations and reasoning are increasingly required in Asia, and we have implemented procedures and systems to prepare these in both hard and soft copy formats.",
    imageSrc:
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Business professionals collaborating in a meeting",
  },
  {
    id: "development",
    label: "Development Consultancy",
    body:
      "From feasibility through delivery, we align development assumptions with market evidence and lender expectations. Our advisory work supports underwriting, partner discussions, and milestone reporting so your project stays financeable and on strategy.",
    imageSrc:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Team reviewing plans in a modern office",
  },
  {
    id: "compliance",
    label: "Balance Sheet Compliance",
    body:
      "We help organisations meet accounting, audit, and regulatory standards for property-related disclosures. Documentation, methodology, and review trails are structured for consistency across portfolios and reporting periods.",
    imageSrc:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Colleagues discussing documents at a conference table",
  },
];

export default function ValuationAndAdvisoryServicesTabs() {
  const baseId = useId();
  const [active, setActive] = useState<TabId>("financing");
  const activeContent = TABS.find((t) => t.id === active) ?? TABS[0];

  return (
    <section
      className="w-full bg-white text-[#1f2d57]"
      aria-labelledby={`${baseId}-heading`}
    >
      <h2 id={`${baseId}-heading`} className="sr-only">
        Valuation and advisory capabilities
      </h2>

      <div className="w-full pt-9 bg-[#f0f4f8]">
        <div
          role="tablist"
          aria-label="Valuation and advisory service areas"
          className="mx-auto flex max-w-5xl snap-x snap-mandatory overflow-x-auto sm:snap-none sm:overflow-visible"
        >
          {TABS.map((tab) => {
            const isActive = tab.id === active;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`${baseId}-tab-${tab.id}`}
                aria-selected={isActive ? "true" : "false"}
                aria-controls={`${baseId}-panel`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActive(tab.id)}
                className={`cursor-pointer relative min-w-[52%] shrink-0 snap-start border-r border-[#d4dce8] px-4 py-4 text-left text-sm font-medium transition-colors last:border-r-0 sm:min-w-0 sm:flex-1 sm:px-5 sm:text-center md:text-base ${
                  isActive
                    ? "bg-white text-[#1f2d57] shadow-[inset_0_4px_0_0_#23408e]"
                    : "bg-transparent text-[#3c4a76] hover:text-[#1f2d57]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${activeContent.id}`}
        className="mx-auto max-w-5xl px-6 py-12 md:py-16"
      >
        <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-12 lg:gap-16">
          <div className="min-w-0">
            <h3 className="text-3xl font-light leading-tight text-[#1f2d57] md:text-4xl">
              {activeContent.label}
            </h3>
            <p className="mt-5 text-base leading-relaxed text-[#3c4a76] md:text-lg">
              {activeContent.body}
            </p>
          </div>
          <div className="relative aspect-[4/5] min-h-[280px] w-full overflow-hidden md:aspect-auto md:min-h-[360px]">
            <Image
              key={activeContent.id}
              src={activeContent.imageSrc}
              alt={activeContent.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
