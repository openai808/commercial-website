"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

type StoryCard = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

const SLIDES: StoryCard[][] = [
  [
    {
      title: "Osaka flagship office reimagined for the future",
      description:
        "Thoughtful relocation enhanced employee wellbeing, energy efficiency and disaster readiness.",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80",
      imageAlt: "Modern office interior with glass partitions and open workspace",
    },
    {
      title: "Helping CapitaLand advance towards its sustainability goals",
      description:
        "Our teams collaborate to help CapitaLand cut carbon emissions and enhance indoor environment quality for tenants.",
      image:
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1000&q=80",
      imageAlt: "Bright office lounge with communal table and city views",
    },
  ],
  [
    {
      title: "Net zero roadmap for a Metro Manila office tower",
      description:
        "Science-based targets, retrofit sequencing, and tenant engagement cut operational carbon while improving comfort scores.",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80",
      imageAlt: "High-rise office buildings in a central business district",
    },
    {
      title: "Green lease rollout across a retail portfolio",
      description:
        "Standardised clauses and landlord–tenant data sharing unlocked measurable energy savings within the first year.",
      image:
        "https://images.unsplash.com/photo-1555529908-3e8e928c9523?auto=format&fit=crop&w=1000&q=80",
      imageAlt: "Retail storefronts along a pedestrian shopping street",
    },
  ],
  [
    {
      title: "Warehouse cluster meets tighter emissions targets",
      description:
        "LED retrofits, smart metering, and on-site solar feasibility studies aligned operations with investor disclosure expectations.",
      image:
        "https://images.unsplash.com/photo-1586528116311-ad8dde234ddb?auto=format&fit=crop&w=1000&q=80",
      imageAlt: "Large industrial logistics building exterior",
    },
    {
      title: "Data-backed climate risk screening for acquisitions",
      description:
        "Scenario analysis and physical risk scoring supported board-level decisions on two major acquisitions in flood-prone zones.",
      image:
        "https://images.unsplash.com/photo-1565514020161-6d943f9a99d3?auto=format&fit=crop&w=1000&q=80",
      imageAlt: "Distribution warehouse interior with high ceilings",
    },
  ],
  [
    {
      title: "Certification pathway for a mixed-use development",
      description:
        "Design workshops and commissioning oversight helped the client pursue green building certification without delaying delivery.",
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80",
      imageAlt: "Modern glass towers against a blue sky",
    },
    {
      title: "Tenant wellness program in a CBD campus",
      description:
        "Indoor air quality upgrades, biophilic design pilots, and commute surveys lifted engagement scores across three towers.",
      image:
        "https://images.unsplash.com/photo-1497366754035-200968a66788?auto=format&fit=crop&w=1000&q=80",
      imageAlt: "Office lobby with plants and natural light",
    },
  ],
  [
    {
      title: "Circular fit-out for a financial services HQ",
      description:
        "Material passports and low-carbon specifications reduced embodied carbon while meeting strict security and uptime needs.",
      image:
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1000&q=80",
      imageAlt: "Professionals meeting at a conference table",
    },
    {
      title: "Water stewardship at an industrial park",
      description:
        "Rainwater harvesting, reuse loops, and benchmarking against peers cut potable water intensity across the estate.",
      image:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80",
      imageAlt: "Aerial view of land and development plots",
    },
  ],
  [
    {
      title: "ESG disclosure alignment for a listed REIT",
      description:
        "KPI libraries, governance workshops, and assurance-ready documentation streamlined annual sustainability reporting.",
      image:
        "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1000&q=80",
      imageAlt: "Team collaboration in a bright meeting space",
    },
    {
      title: "Electrification study for a hospitality portfolio",
      description:
        "Phased boiler replacement and heat-pump pilots were sequenced to minimise capex spikes and guest disruption.",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
      imageAlt: "Resort-style pool and hotel buildings",
    },
  ],
  [
    {
      title: "Supply chain engagement for Scope 3 reductions",
      description:
        "Supplier questionnaires and category prioritisation identified quick wins in logistics and construction spend.",
      image:
        "https://images.unsplash.com/photo-1586528116311-ad8dde234ddb?auto=format&fit=crop&w=1000&q=80",
      imageAlt: "Industrial warehouse facade",
    },
    {
      title: "Resilience upgrades after a climate hazard review",
      description:
        "Backup power, façade drainage, and emergency playbooks strengthened business continuity for critical operations floors.",
      image:
        "https://images.unsplash.com/photo-1497366754035-200968a66788?auto=format&fit=crop&w=1000&q=80",
      imageAlt: "Modern office interior with seating and greenery",
    },
  ],
  [
    {
      title: "Low-carbon materials pilot on a flagship fit-out",
      description:
        "Embodied carbon benchmarking and supplier incentives delivered measurable savings without compromising design intent.",
      image:
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80",
      imageAlt: "Stylish residential-style interior with wood accents",
    },
    {
      title: "Energy performance contract for a regional HQ",
      description:
        "Shared savings structure aligned landlord and tenant on deep retrofits, unlocking multi-year efficiency gains.",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80",
      imageAlt: "Colleagues collaborating over a laptop in an office",
    },
  ],
  [
    {
      title: "Biodiversity-sensitive master planning",
      description:
        "Green corridors and native planting integrated into the campus plan supported local ecology goals and placemaking.",
      image:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1000&q=80",
      imageAlt: "Mountain landscape with lake and forest",
    },
    {
      title: "Smart building analytics at scale",
      description:
        "Fault detection rules and normalised baselines surfaced hidden HVAC waste across a dozen assets in six months.",
      image:
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1000&q=80",
      imageAlt: "Team reviewing analytics on a large display",
    },
  ],
  [
    {
      title: "Stakeholder workshops for a credible transition plan",
      description:
        "Cross-functional sessions aligned finance, operations, and communications on milestones, risks, and messaging.",
      image:
        "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1000&q=80",
      imageAlt: "People discussing strategy in a workshop setting",
    },
    {
      title: "Renewable power purchase strategy",
      description:
        "Market scans and contract structuring advice helped secure long-term renewable coverage at predictable pricing.",
      image:
        "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1000&q=80",
      imageAlt: "Solar panels in a sunny field",
    },
  ],
  [
    {
      title: "Occupier engagement for behaviour change",
      description:
        "Campaigns, dashboards, and recognition programs sustained double-digit reductions in after-hours energy use.",
      image:
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1000&q=80",
      imageAlt: "Customer service or office reception area",
    },
    {
      title: "Science-based target validation support",
      description:
        "Inventory quality checks and pathway modelling gave leadership confidence to commit and communicate targets publicly.",
      image:
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1000&q=80",
      imageAlt: "Business team reviewing charts and documents",
    },
  ],
  [
    {
      title: "Post-occupancy evaluation for a new HQ",
      description:
        "Surveys and sensor data closed the loop on design assumptions, informing the next wave of capital improvements.",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80",
      imageAlt: "Open office with glass walls and desks",
    },
    {
      title: "Financing-ready sustainability business case",
      description:
        "Cost–benefit narratives and risk framing aligned sustainability capex with lender and equity partner expectations.",
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1000&q=80",
      imageAlt: "Professionals reviewing architectural plans",
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

export default function SustainabilityServicesClientSuccess() {
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
      className="bg-white pb-16 pt-6 text-[#27386e] md:pb-20 md:pt-8"
      aria-labelledby="sustainability-client-success-heading"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <h2
          id="sustainability-client-success-heading"
          className="text-center text-3xl font-light tracking-tight md:text-4xl"
        >
          How we&apos;ve helped clients succeed
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-base text-[#5a6478] md:text-lg">
          Explore our client success stories.
        </p>

        <div className="mt-10 flex items-stretch gap-2 md:gap-4">
          <button
            type="button"
            onClick={goPrev}
            className="flex shrink-0 items-center justify-center self-center rounded border border-transparent px-1 text-[#23408e] transition-colors hover:bg-[#f0f3fa] md:px-2"
            aria-label="Previous client stories"
          >
            <ChevronIcon direction="left" />
          </button>

          <div className="min-w-0 flex-1">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {items.map((story, index) => (
                <article
                  key={`${page}-${index}-${story.title}`}
                  className="flex flex-col overflow-hidden bg-white text-center shadow-[0_8px_30px_rgba(35,64,142,0.1)]"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#eef0f5]">
                    <Image
                      src={story.image}
                      alt={story.imageAlt}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col px-5 pb-8 pt-6 md:px-6 md:pb-9 md:pt-7">
                    <h3 className="text-base font-bold leading-snug text-[#27386e] md:text-lg">
                      {story.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#5a6478] md:text-base">
                      {story.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={goNext}
            className="flex shrink-0 items-center justify-center self-center rounded border border-transparent px-1 text-[#23408e] transition-colors hover:bg-[#f0f3fa] md:px-2"
            aria-label="Next client stories"
          >
            <ChevronIcon direction="right" />
          </button>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-1.5" aria-label="Client stories pages">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show client stories page ${i + 1}`}
              aria-current={i === page ? "page" : undefined}
              onClick={() => setPage(i)}
              className={`h-1 rounded-full transition-all ${
                i === page ? "w-10 bg-[#23408e]" : "w-6 bg-[#c5cbd9] hover:bg-[#a8b0c4]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
