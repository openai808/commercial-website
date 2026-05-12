"use client";

import Image from "next/image";
import { useId, useState } from "react";

type TabId = "land" | "litigation" | "ma";

type TabContent = {
  id: TabId;
  label: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
};

const TABS: TabContent[] = [
  {
    id: "land",
    label: "Land Administration",
    body:
      "We advise on town planning applications, change of use, lease modifications and short-term tenancies. Services include valuations and estimations of the land premium involved, the optimum approach to be adopted, lodging of documents and negotiations with the relevant government departments.",
    imageSrc:
      "https://images.unsplash.com/photo-1486325212027-8081e485255d?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Low-angle view of modern glass towers against a bright sky",
  },
  {
    id: "litigation",
    label: "Litigation & Arbitration Support",
    body:
      "We provide independent valuation opinions and expert support where real estate is central to disputes. Our teams prepare clear assumptions, market evidence, and sensitivity analysis to assist counsel, tribunals, and opposing parties in reaching well-informed outcomes.",
    imageSrc:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Legal volumes and reference materials in a professional setting",
  },
  {
    id: "ma",
    label: "Mergers & Acquisitions",
    body:
      "Transaction advice spans purchase price allocations, fair value assessments, and synergy modelling tied to property and operating assets. We coordinate with financial and legal advisers so valuation deliverables align with diligence timelines and reporting requirements.",
    imageSrc:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Executives in discussion during a corporate meeting",
  },
];

export default function ValuationAndAdvisoryServicesSecondaryTabs() {
  const baseId = useId();
  const [active, setActive] = useState<TabId>("land");
  const activeContent = TABS.find((t) => t.id === active) ?? TABS[0];

  return (
    <section
      className="w-full bg-white text-[#1f2d57]"
      aria-labelledby={`${baseId}-heading`}
    >
      <h2 id={`${baseId}-heading`} className="sr-only">
        Additional valuation and advisory services
      </h2>

      <div className="w-full pt-9 bg-[#f0f4f8]">
        <div
          role="tablist"
          aria-label="Land, disputes, and transactions"
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
            <h3 className="text-3xl font-normal leading-tight text-[#1f2d57] md:text-4xl">
              {activeContent.label}
            </h3>
            <p className="mt-5 text-base leading-relaxed text-[#3c4a76] md:text-lg">
              {activeContent.body}
            </p>
          </div>
          <div className="relative aspect-square w-full overflow-hidden">
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
