"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";

type TabId = "define" | "transact" | "enhance" | "report";

type TabPanel = {
  id: TabId;
  label: string;
  intro: string;
  caseStudy?: {
    before: string;
    linkText: string;
    after: string;
    href: string;
  };
  servicesIntro: string;
  bullets: string[];
  imageSrc: string;
  imageAlt: string;
};

const TABS: TabPanel[] = [
  {
    id: "define",
    label: "Define strategy",
    intro:
      "Your journey to a sustainable real estate portfolio begins with having a well-informed plan. We can help you conduct materiality assessments and determine risk associated with climate change, then develop the appropriate energy transition and net zero carbon strategies, along with KPIs.",
    caseStudy: {
      before: "Find out how we have supported ",
      linkText: "Fiera Real Estate",
      after: " with a strategic sustainability plan.",
      href: "/contact-us",
    },
    servicesIntro: "Our services include:",
    bullets: [
      "Materiality studies and KPI definition",
      "Physical climate change risk assessment",
      "Energy transition strategy",
    ],
    imageSrc:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Modern office corridor with glass walls and natural light",
  },
  {
    id: "transact",
    label: "Transact and Invest",
    intro:
      "Align acquisitions, disposals, and financing with your sustainability objectives. We support diligence on environmental performance, pricing of green attributes, and structures that reflect evolving regulation and investor expectations.",
    servicesIntro: "Our services include:",
    bullets: [
      "Investment screening for climate and transition risk",
      "Green lease and covenant advisory",
      "Sustainable finance and capital markets coordination",
    ],
    imageSrc:
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Professionals reviewing documents during a transaction meeting",
  },
  {
    id: "enhance",
    label: "Enhance assets",
    intro:
      "Improve operational performance and reduce environmental impact across your portfolio. We combine engineering, procurement, and tenant engagement to unlock efficiency, renewables, and healthier workplaces.",
    servicesIntro: "Our services include:",
    bullets: [
      "Building performance optimisation and retrofits",
      "Renewable energy and on-site generation planning",
      "Waste, water, and circularity programs",
    ],
    imageSrc:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Contemporary high-rise buildings in a business district",
  },
  {
    id: "report",
    label: "Report and certify",
    intro:
      "Transparent reporting builds stakeholder trust. We help you design KPI frameworks, align disclosures with recognised standards, and prepare evidence for certification and assurance pathways.",
    servicesIntro: "Our services include:",
    bullets: [
      "ESG and climate disclosure support",
      "Certification roadmap (e.g. green building, net zero)",
      "Third-party assurance and data governance",
    ],
    imageSrc:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Team collaborating over sustainability reporting materials",
  },
];

export default function SustainabilityServicesHowWeHelp() {
  const baseId = useId().replace(/:/g, "");
  const arcPathId = `${baseId}-arc-path`;
  const [active, setActive] = useState<TabId>("define");
  const panel = TABS.find((t) => t.id === active) ?? TABS[0];

  return (
    <section
      className="w-full bg-white text-[#1f2d57]"
      aria-labelledby={`${baseId}-section-heading`}
    >
      <div className="w-full bg-[#f0f4f8] pt-10 pb-0 md:pt-12">
        <div className="mx-auto max-w-6xl px-6">
          <h2
            id={`${baseId}-section-heading`}
            className="text-center text-2xl font-normal text-[#23408e] md:text-3xl"
          >
            How we can help
          </h2>

          <div
            role="tablist"
            aria-label="Sustainability service stages"
            className="mt-8 flex snap-x snap-mandatory overflow-x-auto border border-[#d4dce8] border-b-0 bg-[#e4edf4] sm:snap-none sm:overflow-visible"
          >
            {TABS.map((tab) => {
              const isActive = tab.id === active;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  id={`${baseId}-tab-${tab.id}`}
                  aria-selected={isActive}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActive(tab.id)}
                  className={`relative min-w-[45%] shrink-0 snap-start px-4 py-4 text-left text-sm font-medium transition-colors last:border-r-0 sm:min-w-0 sm:flex-1 sm:px-3 sm:text-center md:text-[15px] ${
                    isActive
                      ? "bg-white text-[#1f2d57] shadow-[inset_0_4px_0_0_#2563eb]"
                      : "border-r border-[#d4dce8] bg-[#e4edf4] text-[#3c4a76] last:border-r-0 hover:text-[#1f2d57] sm:border-r"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${panel.id}`}
        className="mx-auto max-w-6xl border border-t-0 border-[#d4dce8] bg-white px-6 py-12 md:px-10 md:py-16"
      >
        <div className="grid gap-12 md:grid-cols-[1.15fr_0.85fr] md:items-center md:gap-14 lg:gap-16">
          <div className="min-w-0 text-left">
            <h3 className="text-xl font-medium leading-snug text-[#23408e] md:text-2xl">
              {panel.label}
            </h3>
            <p className="mt-5 text-base leading-relaxed text-[#3c4a76] md:text-lg">
              {panel.intro}
            </p>
            {panel.caseStudy ? (
              <p className="mt-5 text-base leading-relaxed text-[#3c4a76] md:text-lg">
                {panel.caseStudy.before}
                <Link
                  href={panel.caseStudy.href}
                  className="font-medium text-[#2563eb] underline decoration-[#2563eb] underline-offset-2 hover:text-[#1d4ed8]"
                >
                  {panel.caseStudy.linkText}
                </Link>
                {panel.caseStudy.after}
              </p>
            ) : null}
            <p className="mt-6 text-base font-bold text-[#23408e] md:text-lg">
              {panel.servicesIntro}
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-[#3c4a76] md:text-lg">
              {panel.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto flex w-full max-w-[400px] justify-center md:mx-0 md:max-w-none md:justify-end">
            <div className="relative aspect-square w-full max-w-[400px] shrink-0">
              <svg
                className="pointer-events-none absolute inset-0 z-10 h-full w-full overflow-visible"
                viewBox="0 0 400 400"
                aria-hidden
              >
                <defs>
                  <path
                    id={arcPathId}
                    d="M 305 48 A 128 128 0 0 1 352 188"
                    fill="none"
                  />
                </defs>
                <path
                  d="M 305 48 A 128 128 0 0 1 352 188"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="22"
                  strokeLinecap="round"
                />
                <text
                  fill="white"
                  fontSize="11"
                  fontWeight="600"
                  letterSpacing="0.04em"
                >
                  <textPath href={`#${arcPathId}`} startOffset="8%">
                    {panel.label}
                  </textPath>
                </text>
              </svg>
              <div className="relative z-0 mx-auto aspect-square w-[82%] overflow-hidden rounded-full border-4 border-white shadow-[0_12px_40px_rgba(35,64,142,0.15)]">
                <Image
                  key={panel.id}
                  src={panel.imageSrc}
                  alt={panel.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 82vw, 360px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
