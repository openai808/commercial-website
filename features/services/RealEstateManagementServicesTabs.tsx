"use client";

import { useId, useState } from "react";

type TabId = "property" | "facilities" | "financial" | "portfolio";

type Bullet = { title: string; body: string };

type TabContent = {
  id: TabId;
  label: string;
  intro: string;
  bullets: Bullet[];
};

const TABS: TabContent[] = [
  {
    id: "property",
    label: "Property Management",
    intro:
      "Our approach to Property Management begins with understanding your asset and your strategic objectives. We work with our Facilities and Financial Management experts to accelerate the success of your investment through:",
    bullets: [
      {
        title: "Increased tenant retention",
        body:
          "carefully listening, planning forward and never complacent, we are dedicated to creating a customer experience like no other so that we provide the best outcomes for our clients and their tenants.",
      },
      {
        title: "Increased revenue",
        body:
          "we deliver enhanced asset value and greater cash flow through increased tenant satisfaction and operational efficiencies.",
      },
      {
        title: "Reduced costs",
        body:
          "we immediately conduct a property performance audit program to deliver greater operational efficiencies, lower outgoings and increased asset value.",
      },
    ],
  },
  {
    id: "facilities",
    label: "Facilities Management",
    intro:
      "Our approach to Facilities Management centres on how your buildings perform day to day and over their lifecycle. We coordinate engineering, vendors, and compliance so your environment supports productivity and protects your investment through:",
    bullets: [
      {
        title: "Reliable operations",
        body:
          "proactive maintenance, clear service standards, and responsive issue management keep critical systems running and minimise disruption for occupants.",
      },
      {
        title: "Controlled risk",
        body:
          "structured inspections, documentation, and contractor governance help you meet regulatory expectations and reduce exposure across your portfolio.",
      },
      {
        title: "Sustainable asset performance",
        body:
          "we align energy, waste, and lifecycle planning with your ESG priorities to improve efficiency, comfort, and long-term value.",
      },
    ],
  },
  {
    id: "financial",
    label: "Financial Management",
    intro:
      "Our approach to Financial Management combines disciplined reporting with practical insight into your property economics. We work alongside Property and Portfolio teams so you can act with confidence through:",
    bullets: [
      {
        title: "Transparent reporting",
        body:
          "timely budgets, reconciliations, and dashboards give owners and stakeholders a clear view of income, outgoings, and variances.",
      },
      {
        title: "Stronger cash flow",
        body:
          "lease administration, recoveries, and collections are managed with rigour to protect revenue and reduce leakage.",
      },
      {
        title: "Informed decisions",
        body:
          "scenario modelling and benchmarking help you prioritise capex, leasing, and operational trade-offs that support your strategy.",
      },
    ],
  },
  {
    id: "portfolio",
    label: "Portfolio Management",
    intro:
      "Our approach to Portfolio Management links individual assets to your wider business and investment goals. We draw together property, facilities, and financial intelligence to improve outcomes through:",
    bullets: [
      {
        title: "Strategic alignment",
        body:
          "we translate corporate or fund objectives into clear asset-level plans so every initiative supports your defined risk and return profile.",
      },
      {
        title: "Performance insight",
        body:
          "consistent KPIs and reviews across the portfolio highlight where to invest, reposition, or divest for the best use of capital.",
      },
      {
        title: "Integrated execution",
        body:
          "single accountability across service lines reduces gaps between strategy and on-the-ground delivery.",
      },
    ],
  },
];

export default function RealEstateManagementServicesTabs() {
  const baseId = useId();
  const [active, setActive] = useState<TabId>("property");
  const activeContent = TABS.find((t) => t.id === active) ?? TABS[0];

  return (
    <section
      className="w-full bg-white text-[#333e48]"
      aria-labelledby={`${baseId}-heading`}
    >


      <div className="w-full pt-9 bg-[#f0f4f8]">
        <div
          role="tablist"
          aria-label="Management service areas"
          className="mx-auto flex max-w-5xl snap-x snap-mandatory overflow-x-auto px-0 sm:snap-none sm:overflow-visible"
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
                className={`cursor-pointer relative min-w-[48%] shrink-0 snap-start border-r border-[#dde5ee] px-4 py-4 text-left text-sm font-medium transition-colors last:border-r-0 sm:min-w-0 sm:flex-1 sm:px-5 sm:text-center md:text-base ${
                  isActive
                    ? "bg-white text-[#333e48] shadow-[inset_0_4px_0_0_#2b579a]"
                    : "bg-transparent text-[#6b7c8c] hover:text-[#4a5a6a]"
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
        className="mx-auto max-w-5xl px-6 py-10 md:py-14"
      >
        <p className="max-w-3xl text-base leading-relaxed md:text-lg">
          {activeContent.intro}
        </p>
        <ul className="mt-8 max-w-3xl space-y-5">
          {activeContent.bullets.map((item) => (
            <li key={item.title} className="flex gap-3">
              <span
                className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#2b579a]"
                aria-hidden
              />
              <p className="text-base leading-relaxed md:text-lg">
                <strong className="font-semibold text-[#333e48]">
                  {item.title}
                </strong>
                {" – "}
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
