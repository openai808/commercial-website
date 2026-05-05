import Link from "next/link";
import type { ReactNode } from "react";

type ServiceItem = {
  id: string;
  label: string;
  href: string;
  icon: ReactNode;
};

function IconCapitalMarkets() {
  return (
    <svg viewBox="0 0 48 48" className="h-10 w-10 shrink-0" aria-hidden>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 36V20l6-4 6 4 8-10 8 6v16M8 36h32M14 24v12M20 28v8M28 18v18M36 20v16M10 12l3 2-3 2-3-2 3-2z"
      />
    </svg>
  );
}

function IconLandlord() {
  return (
    <svg viewBox="0 0 48 48" className="h-10 w-10 shrink-0" aria-hidden>
      <circle cx="24" cy="18" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        d="M12 38c0-6.6 5.4-12 12-12s12 5.4 12 12M24 32v6"
      />
      <circle cx="24" cy="38" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function IconProjectManagement() {
  return (
    <svg viewBox="0 0 48 48" className="h-10 w-10 shrink-0" aria-hidden>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        d="M10 36V14l10-4v26M20 10l12 4v22M20 18h12M20 24h8M20 30h10"
      />
      <circle cx="30" cy="8" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" d="M27 11l-4 4" />
    </svg>
  );
}

function IconResidential() {
  return (
    <svg viewBox="0 0 48 48" className="h-10 w-10 shrink-0" aria-hidden>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        d="M12 40V18l12-8 12 8v22M18 40V26h12v14M22 40v-6h4v6"
      />
    </svg>
  );
}

function IconTenant() {
  return (
    <svg viewBox="0 0 48 48" className="h-10 w-10 shrink-0" aria-hidden>
      <circle cx="14" cy="16" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="34" cy="16" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="24" cy="12" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        d="M10 36c0-4 2.5-8 8-8M38 36c0-4-2.5-8-8-8M18 36c0-3 2-6 6-6s6 3 6 6M14 22l10 6M24 28l10-6M24 15v7"
      />
    </svg>
  );
}

function IconManagement() {
  return (
    <svg viewBox="0 0 48 48" className="h-10 w-10 shrink-0" aria-hidden>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 28c4-8 12-10 16-10M14 38c2-6 6-8 10-8M22 40h14M28 18v14M28 18l6-4 6 4v18H28"
      />
    </svg>
  );
}

function IconValuation() {
  return (
    <svg viewBox="0 0 48 48" className="h-10 w-10 shrink-0" aria-hidden>
      <rect x="10" y="10" width="28" height="28" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        d="M16 22h4M16 28h6M16 34h8M26 22h6M26 28h4M26 34h6"
      />
    </svg>
  );
}

function IconResearch() {
  return (
    <svg viewBox="0 0 48 48" className="h-10 w-10 shrink-0" aria-hidden>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        d="M14 8h16a4 4 0 014 4v28a2 2 0 01-2 2H16a2 2 0 01-2-2V8zM14 8v30h18"
      />
      <path fill="none" stroke="currentColor" strokeWidth="1.5" d="M22 12h6M22 18h10M22 24h8" />
    </svg>
  );
}

const SERVICES: ServiceItem[] = [
  {
    id: "capital-markets",
    label: "Capital Markets & Investment Services",
    href: "/services/capital-markets",
    icon: <IconCapitalMarkets />,
  },
  {
    id: "landlord",
    label: "Landlord Representation",
    href: "/services/landlord",
    icon: <IconLandlord />,
  },
  {
    id: "projects",
    label: "Project Management",
    href: "/services/projects",
    icon: <IconProjectManagement />,
  },
  {
    id: "residential",
    label: "Residential",
    href: "/properties/residential",
    icon: <IconResidential />,
  },
  {
    id: "tenant",
    label: "Tenant Representation",
    href: "/services/tenant",
    icon: <IconTenant />,
  },
  {
    id: "management",
    label: "Real Estate Management Services",
    href: "/services/management",
    icon: <IconManagement />,
  },
  {
    id: "valuation",
    label: "Valuation and Advisory Services",
    href: "/services/valuation",
    icon: <IconValuation />,
  },
  {
    id: "research",
    label: "Research Services",
    href: "/insights/reports",
    icon: <IconResearch />,
  },
];

export default function HomeServices() {
  return (
    <section
      className="w-full bg-[#233d83] text-white"
      aria-labelledby="home-services-heading"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 py-16 md:gap-14 md:py-20 lg:flex-row lg:items-center lg:gap-16 lg:px-10 lg:py-24">
        <div className="flex min-w-0 flex-col justify-center lg:w-[38%] lg:max-w-xl lg:shrink-0">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/90 md:text-sm">
            Industry-leading services
          </p>
          <h2
            id="home-services-heading"
            className="mt-4 font-serif text-2xl font-normal leading-snug text-white md:text-3xl md:leading-tight lg:text-[2rem] lg:leading-snug"
          >
            Learn more about how we can customize the right solutions for your property needs.
          </h2>
        </div>

        <div className="min-w-0 flex-1">
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {SERVICES.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="group flex items-center gap-4 rounded-lg px-4 py-3.5 text-left transition-colors hover:bg-white/10 focus-visible:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:px-5 md:py-4"
                >
                  <span className="text-white">{item.icon}</span>
                  <span className="text-sm font-medium leading-snug text-white md:text-base">
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
