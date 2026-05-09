import Link from "next/link";
import type { ReactNode } from "react";

type ServiceIcon =
  | "capital"
  | "occupier"
  | "management"
  | "valuation"
  | "residential"
  | "industrial"
  | "sustainability";

const serviceLines: { title: string; icon: ServiceIcon; href: string }[] = [
  {
    title: "Capital Markets & Investment Services",
    icon: "capital",
    href: "/services/capital-markets-and-investment-services",
  },
  { title: "Occupier Services", icon: "occupier", href: "/services/occupier-services" },
  {
    title: "Real Estate Management Services",
    icon: "management",
    href: "/services/transform-outcomes1",
  },
  {
    title: "Valuation and Advisory Services",
    icon: "valuation",
    href: "/services/transform-outcomes2",
  },
  { title: "Residential", icon: "residential", href: "/services/manage-portfolios" },
  { title: "Industrial", icon: "industrial", href: "/properties/industrial" },
  { title: "Sustainability Services", icon: "sustainability", href: "/services/sustainability" },
];

function ServiceCardIcon({ icon }: { icon: ServiceIcon }) {
  const base = "h-16 w-16 text-[#5f74ab]";
  const strokeProps = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  const icons: Record<ServiceIcon, ReactNode> = {
    capital: (
      <svg viewBox="0 0 64 64" className={base} aria-hidden>
        <ellipse {...strokeProps} cx="13" cy="15" rx="7" ry="2.8" />
        <path {...strokeProps} d="M6 15v7c0 1.6 3.1 2.8 7 2.8s7-1.2 7-2.8v-7" />
        <path {...strokeProps} d="M28 48h26M30 44v-8M36 44V30M42 44V26M48 44V20" />
        <path {...strokeProps} d="M24 43l5-4M32 35l5-4M40 30l5-4" />
        <path {...strokeProps} d="M44 12l8 8M52 12v8h-8" />
      </svg>
    ),
    occupier: (
      <svg viewBox="0 0 64 64" className={base} aria-hidden>
        <rect {...strokeProps} x="24" y="10" width="16" height="26" rx="1.6" />
        <path {...strokeProps} d="M19 29h5M40 29h5M16 48c9 6 23 6 32 0M32 36v16M24 56l8-4 8 4" />
      </svg>
    ),
    management: (
      <svg viewBox="0 0 64 64" className={base} aria-hidden>
        <path {...strokeProps} d="M14 40h16l10-10h10M50 30V14h-14" />
        <path {...strokeProps} d="M6 46h18l6-6" />
        <path {...strokeProps} d="M30 38h18l10-9" />
      </svg>
    ),
    valuation: (
      <svg viewBox="0 0 64 64" className={base} aria-hidden>
        <rect {...strokeProps} x="8" y="10" width="24" height="30" rx="6" />
        <path {...strokeProps} d="M15 20h10M15 30h10" />
        <circle {...strokeProps} cx="20" cy="50" r="8" />
        <path {...strokeProps} d="M17 50h6M20 47v6" />
        <circle {...strokeProps} cx="43" cy="20" r="10" />
        <path {...strokeProps} d="M38 20h10" />
        <circle {...strokeProps} cx="44" cy="45" r="9" />
        <path {...strokeProps} d="M39 45h10M41 43l6 4" />
      </svg>
    ),
    residential: (
      <svg viewBox="0 0 64 64" className={base} aria-hidden>
        <path {...strokeProps} d="M10 28l22-12 22 12M14 26v24h36V26" />
        <path {...strokeProps} d="M26 50V38h12v12M20 32h4M20 38h4M20 44h4M40 32h4M40 38h4M40 44h4" />
      </svg>
    ),
    industrial: (
      <svg viewBox="0 0 64 64" className={base} aria-hidden>
        <path {...strokeProps} d="M8 50h48M10 50V14h10M20 50V30l9-5v5l9-5v5l9-5v25" />
        <path {...strokeProps} d="M23 40h2M31 38h2M39 36h2" />
      </svg>
    ),
    sustainability: (
      <svg viewBox="0 0 64 64" className={base} aria-hidden>
        <path {...strokeProps} d="M8 47c7-10 5-19 15-24M56 47c-7-10-5-19-15-24M18 47h28" />
        <path {...strokeProps} d="M14 30c0-4 3-7 7-7s7 3 7 7M43 30h10M45 24h6M47 20h2" />
        <path {...strokeProps} d="M31 52c5 0 10-4 10-9-5 0-10 4-10 9zM31 52c0-4-2-7-6-9" />
      </svg>
    ),
  };

  return icons[icon];
}

export default function ServiceLines() {
  return (
    <section aria-labelledby="services-intro-title" className="px-6 py-14 md:py-16">
      <div className="mx-auto w-full max-w-5xl text-center">
        <h2 id="services-intro-title" className="text-2xl font-normal text-[#2f3f74] md:text-3xl">
          REMAX/8 professionals think differently
        </h2>
        <p className="mx-auto mt-3 max-w-4xl text-sm leading-relaxed text-[#3f4f80] md:text-base">
          What sets REMAX/8 apart is not what we do, but how we do it. You&apos;ll
          experience forward-looking expertise that elevates value every step of the way.
          We simply think differently and that produces innovative outcomes. Whether
          you&apos;re a developer, investor, landlord or tenant, we are a partner who is
          invested in seeing you succeed.
        </p>

        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {serviceLines.map((service, index) => (
            <Link
              key={service.title}
              href={service.href}
              className={`group flex min-h-36 cursor-pointer flex-col items-center justify-center gap-4 border border-[#dde2ed] bg-white px-5 py-6 text-center transition-all duration-200 hover:shadow-[0_10px_24px_rgba(35,61,131,0.16)] ${
                index === serviceLines.length - 1
                  ? "sm:col-span-2 lg:col-span-1 lg:col-start-2"
                  : ""
              }`}
            >
              <ServiceCardIcon icon={service.icon} />
              <h3 className="text-sm font-normal leading-snug text-[#2d3c70] transition-colors duration-200 group-hover:text-[#59a8ff] group-hover:underline md:text-base">
                {service.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
