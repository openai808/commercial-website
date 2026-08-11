import { OFFICE_LOCATIONS } from "@/lib/offices/offices";

export type CompanyKnowledgeTopic = "overview" | "services" | "offices" | "all";

// Reuses the site's own published metadata description (app/layout.tsx) rather
// than inventing new marketing copy.
const OVERVIEW =
  "Connect with RE/MAX Commercial 8 for commercial real estate services, investment, leasing, and property solutions across the Philippines.";

type ServiceSummary = { name: string; href: string; summary: string };

// Enumerated from `app/services/*` route directories; summaries are each
// page's own published meta description. Keep in sync manually if a service
// page is added, removed, or its copy changes.
const SERVICES: ServiceSummary[] = [
  {
    name: "Tenant Representation",
    href: "/services/tenant",
    summary:
      "Find the right property, negotiate lease terms, and secure the best space.",
  },
  {
    name: "Landlord Representation",
    href: "/services/landlord",
    summary:
      "List your property, attract qualified tenants, and close profitable leases.",
  },
  {
    name: "Residential Services",
    href: "/services/residential-services",
    summary: "Buy or sell your home, lease with confidence, move hassle-free.",
  },
  {
    name: "Capital Markets & Investment Services",
    href: "/services/capital-markets-and-investment-services",
    summary:
      "Identify opportunities, maximize returns, grow your real estate portfolio.",
  },
  {
    name: "Title Conveyancing",
    href: "/services/title-conveyancing",
    summary:
      "Transfer ownership, complete legal documents, close transactions smoothly.",
  },
  {
    name: "Property Vetting",
    href: "/services/property-vetting",
    summary: "Verify ownership, assess risks, ensure property legitimacy.",
  },
  {
    name: "Industrial Services",
    href: "/services/industrial",
    summary:
      "Specialist support for logistics, warehousing, and industrial property strategy.",
  },
  {
    name: "Occupier Services",
    href: "/services/occupier-services",
    summary: "Align your real estate strategy with your business goals.",
  },
  {
    name: "Real Estate Management Services",
    href: "/services/real-estate-management-services",
    summary:
      "Property, facilities, financial, and portfolio management aligned to your investment objectives.",
  },
  {
    name: "Sustainability Services",
    href: "/services/sustainability-services",
    summary:
      "Practical, data-led real estate guidance to accelerate your path to net zero.",
  },
  {
    name: "Valuation & Advisory Services",
    href: "/services/valuation-and-advisory-services",
    summary:
      "Professional property development and investment advice for your real estate and business needs.",
  },
];

export function getCompanyKnowledge(topic: CompanyKnowledgeTopic) {
  const offices = OFFICE_LOCATIONS.map((o) => ({
    name: o.name,
    city: o.city,
    address: o.address,
    phone: o.phone,
    email: o.email,
  }));

  if (topic === "overview") return { overview: OVERVIEW };
  if (topic === "services") return { services: SERVICES };
  if (topic === "offices") return { offices };
  return { overview: OVERVIEW, services: SERVICES, offices };
}
