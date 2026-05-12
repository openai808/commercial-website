"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";

type ServiceTab = {
  id: string;
  label: string;
  imageSrc: string;
  imageAlt: string;
  callout: string;
  body: string;
  services: string[];
  readMoreHref: string;
};

const TABS: ServiceTab[] = [
  {
    id: "project-management",
    label: "Project Management",
    imageSrc:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Construction professionals reviewing plans on site",
    callout:
      "We provide integrated project management and advisory services to maximize financial performance at all stages.",
    body: "We ensure projects are delivered on time, within budget and to high standards, providing invaluable insights and strategic leadership across the property lifecycle.",
    services: [
      "Development advisory and management",
      "Due diligence and quality assurance",
      "Engineering and design",
    ],
    readMoreHref: "/contact-us",
  },
  {
    id: "facilities-management",
    label: "Facilities Management Advisory",
    imageSrc:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Modern office building interior",
    callout:
      "We help you optimize operations, vendor strategy, and workplace performance so your portfolio runs efficiently and supports your people.",
    body: "From service-level design to governance and cost transparency, we bring practical advisory that aligns facilities delivery with business priorities and long-term asset value.",
    services: [
      "Operating model and outsourcing advisory",
      "Performance benchmarking and savings programs",
      "Workplace experience and service integration",
    ],
    readMoreHref: "/contact-us",
  },
];

export default function OccupierServicesOurServices() {
  const baseId = useId();
  const [activeIndex, setActiveIndex] = useState(0);
  const active = TABS[activeIndex]!;

  return (
    <section
      id="our-services"
      className="scroll-mt-24 bg-white py-14 text-[#1f2d57] md:py-20"
      aria-labelledby={`${baseId}-heading`}
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <h2
          id={`${baseId}-heading`}
          className="text-center text-3xl font-light tracking-tight text-[#27386e] md:text-4xl"
        >
          What we take pride in
        </h2>

        <div className="mt-12 grid gap-10 md:grid-cols-[minmax(0,280px)_1fr] md:gap-12 lg:grid-cols-[minmax(0,320px)_1fr]">
          <nav className="border-b border-[#d9dce5] md:border-b-0" aria-label="Service categories">
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
                    className={`w-full border-b border-[#d9dce5] px-4 py-4 text-left text-sm font-semibold transition-colors last:border-b-0 md:border-b md:px-5 md:py-4 ${
                      selected
                        ? "bg-[#23408e] text-white md:rounded-sm"
                        : "bg-white text-[#5a6478] hover:bg-[#f7f8fb] hover:text-[#27386e]"
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
            <div className="relative min-h-[220px] md:min-h-[300px]">
              <div className="absolute inset-y-3 right-0 hidden w-[56%] overflow-hidden md:block">
                <Image
                  src={active.imageSrc}
                  alt={active.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  priority={activeIndex === 0}
                />
              </div>

              <div className="relative z-10 w-full md:w-[58%] md:pr-6 md:pt-3 lg:pr-10">
                <div className="relative aspect-[4/3] w-full md:hidden">
                  <Image
                    src={active.imageSrc}
                    alt={active.imageAlt}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
                <div className="relative -mt-14 bg-[#233d83] px-5 py-6 shadow-xl md:-mt-0 md:shadow-lg md:px-8 md:py-10 lg:-mr-6">
                  <div className="border border-white/90 px-5 py-6 text-center text-sm font-normal leading-relaxed text-white md:text-base">
                    {active.callout}
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-8 max-w-2xl text-base leading-relaxed text-[#3c4a76] md:text-lg">
              {active.body}
            </p>

            <div className="mt-8">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#27386e]">
                Our services include:
              </p>
              <ul className="mt-3 space-y-2 text-[#3c4a76]">
                {active.services.map((item) => (
                  <li key={item} className="flex gap-2 text-base leading-relaxed">
                    <span className="shrink-0 text-[#27386e]" aria-hidden>
                      -
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href={active.readMoreHref}
              className="mt-8 inline-flex items-center rounded-full bg-[#23408e] px-8 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#1d3575]"
            >
              Read more
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
