"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";

type ToolTab = {
  id: string;
  label: string;
  imageSrc: string;
  imageAlt: string;
  body: string;
  readMoreHref: string;
};

const TABS: ToolTab[] = [
  {
    id: "commute",
    label: "REMAX Commute",
    imageSrc:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Tablet on a desk showing charts and workplace analytics",
    body: "Find the optimum location for your business by analysing potential location options against the postcode location of employees with our comprehensive dashboard.",
    readMoreHref: "/contact-us",
  },
  {
    id: "360-technology",
    label: "REMAX 360 Technology",
    imageSrc:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Analytics charts on a laptop screen",
    body: "Bring portfolio, lease, and workplace data together in one platform so leaders can plan faster, collaborate securely, and act with confidence.",
    readMoreHref: "/contact-us",
  },
  {
    id: "mobility-pass",
    label: "REMAX Mobility Pass",
    imageSrc:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Team reviewing mobility and workplace strategy",
    body: "Support hybrid and mobile workforces with tooling that tracks access, utilization, and employee experience across locations and modes of work.",
    readMoreHref: "/contact-us",
  },
  {
    id: "occupier-guide",
    label: "Global Occupier Guide",
    imageSrc:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Colleagues collaborating over a world map document",
    body: "Benchmark markets, incentives, and occupancy norms with a consolidated view built for occupiers expanding or consolidating across regions.",
    readMoreHref: "/contact-us",
  },
  {
    id: "workplace-expert",
    label: "Workplace Expert",
    imageSrc:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Modern open workplace with natural light",
    body: "Translate workplace strategy into measurable outcomes using surveys, sensors, and scenario planning aligned to your culture and growth plans.",
    readMoreHref: "/contact-us",
  },
  {
    id: "lease-compass",
    label: "Lease Compass",
    imageSrc:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Signing documents and reviewing lease terms",
    body: "Navigate critical dates, options, and obligations with alerts and reporting that keep real estate, legal, and finance teams aligned.",
    readMoreHref: "/contact-us",
  },
  {
    id: "smartflex",
    label: "REMAX SmartFlex",
    imageSrc:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Flexible office space with modular seating",
    body: "Model flex agreements, swing space, and service bundles so you can adapt the portfolio without losing visibility on cost or risk.",
    readMoreHref: "/contact-us",
  },
  {
    id: "rent-peak",
    label: "Rent Peak Analysis",
    imageSrc:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Financial charts and market trend analysis",
    body: "Stress-test rent scenarios against market cycles and comps to inform negotiations, renewals, and capital planning with clarity.",
    readMoreHref: "/contact-us",
  },
];

export default function OccupierServicesToolsTech() {
  const baseId = useId();
  const [activeIndex, setActiveIndex] = useState(0);
  const active = TABS[activeIndex]!;

  return (
    <section
      id="tools-tech"
      className="scroll-mt-24 bg-white py-14 text-[#27386e] md:py-20"
      aria-labelledby={`${baseId}-heading`}
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <h2
          id={`${baseId}-heading`}
          className="text-center text-3xl font-light tracking-tight md:text-4xl"
        >
          Get access to winning tools and technologies
        </h2>

        <div className="mt-12 grid gap-10 md:grid-cols-[minmax(0,280px)_1fr] md:gap-12 lg:grid-cols-[minmax(0,320px)_1fr]">
          <nav className="border-b border-[#d9dce5] md:border-b-0" aria-label="Tools and technologies">
            <div role="tablist" className="flex flex-col">
              {TABS.map((tab, index) => {
                const selected = index === activeIndex;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    id={`${baseId}-tab-${tab.id}`}
                    aria-controls={`${baseId}-panel-${tab.id}`}
                    aria-selected={selected ? "true" : "false"}
                    role="tab"
                    onClick={() => setActiveIndex(index)}
                    className={`w-full border-b border-[#d9dce5] px-4 py-3.5 text-left text-sm font-semibold transition-colors last:border-b-0 md:border-b md:px-5 md:py-3.5 ${
                      selected
                        ? "bg-[#23408e] text-white md:rounded-sm"
                        : "bg-white text-[#27386e] hover:bg-[#f7f8fb]"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </nav>

          <div
            role="tabpanel"
            id={`${baseId}-panel-${active.id}`}
            aria-labelledby={`${baseId}-tab-${active.id}`}
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#eef0f5]">
              <Image
                src={active.imageSrc}
                alt={active.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 65vw"
                priority={activeIndex === 0}
              />
            </div>

            <p className="mt-8 max-w-2xl text-base leading-relaxed md:text-lg">{active.body}</p>

            <Link
              href={active.readMoreHref}
              className="mt-8 inline-flex items-center rounded-full bg-[#23408e] px-8 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white underline decoration-white underline-offset-[3px] transition-colors hover:bg-[#1d3575]"
            >
              Read more
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
