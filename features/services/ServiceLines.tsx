import Link from "next/link";
import type { ReactNode } from "react";

export type ServiceIcon =
  | "capital"
  | "occupier"
  | "residential"
  | "tenant"
  | "landlord"
  | "wallet"
  | "titleConveyancing"
  | "propertyVetting";

const serviceLines: { title: string; description: string; icon: ServiceIcon; href: string }[] = [
  {
    title: "Tenant Representation",
    description: "Find the right property, negotiate lease terms, secure the best space.",
    icon: "tenant",
    href: "/services/tenant",
  },
  {
    title: "Landlord Representation",
    description: "List your property, attract qualifies tenants, close profitable leases.",
    icon: "landlord",
    href: "/services/landlord",
  },
  {
    title: "Residential Services",
    description: "Buy or sell your home, lease with confidence move hassle-free.",
    icon: "residential",
    href: "/services/residential-services",
  },
  {
    title: "Capital Markets & Investment Service",
    description: "Identify opportunities, maximize returns, grow your real estate portfolio.",
    icon: "wallet",
    href: "/services/capital-markets-and-investment-services",
  },
  {
    title: "Title Conveyancing Service",
    description: "Transfer ownership, complete legal documents, close transactions smoothly.",
    icon: "titleConveyancing",
    href: "/services/title-conveyancing",
  },
  {
    title: "Property Vetting Service",
    description: "Verify ownership, access risks, ensure property legitimacy.",
    icon: "propertyVetting",
    href: "/services/property-vetting",
  },
];

export function ServiceCardIcon({ icon }: { icon: ServiceIcon }) {
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
    residential: (
      <svg viewBox="0 0 64 64" className={base} aria-hidden>
        <path {...strokeProps} d="M10 30l22-16 22 16" />
        <path {...strokeProps} d="M16 26v28h32V26" />
        <path {...strokeProps} d="M26 54V40h12v14" />
        <path {...strokeProps} d="M22 32h4M38 32h4" />
      </svg>
    ),
    tenant: (
      <svg viewBox="0 0 64 64" className={base} aria-hidden>
        <path {...strokeProps} d="M36 54V16l14-8 14 8v38" />
        <path {...strokeProps} d="M42 54V32h8v22M46 24h4" />
        <circle {...strokeProps} cx="14" cy="30" r="5" />
        <path {...strokeProps} d="M6 54v-5c0-4.4 3.6-8 8-8s8 3.6 8 8v5" />
        <circle {...strokeProps} cx="26" cy="26" r="4.5" />
        <path {...strokeProps} d="M19 54v-4c0-4 3-7.3 7-7.3s7 3.3 7 7.3v4" />
      </svg>
    ),
    landlord: (
      <svg viewBox="0 0 64 64" className={base} aria-hidden>
        <circle {...strokeProps} cx="32" cy="18" r="9" />
        <path {...strokeProps} d="M14 54c0-11 8-19 18-19s18 8 18 19" />
      </svg>
    ),
    wallet: (
      <svg viewBox="0 0 64 64" className={base} aria-hidden>
        <path {...strokeProps} d="M8 18l6-6h30l6 6" />
        <rect {...strokeProps} x="8" y="18" width="48" height="34" rx="5" />
        <path {...strokeProps} d="M8 28h48" />
        <circle {...strokeProps} cx="44" cy="38" r="4" />
      </svg>
    ),
    titleConveyancing: (
      <svg viewBox="0 0 64 64" className={base} aria-hidden>
        <path {...strokeProps} d="M12 8h24l8 8v40H12z" />
        <path {...strokeProps} d="M36 8v8h8" />
        <path {...strokeProps} d="M18 28h16M18 36h10" />
        <circle {...strokeProps} cx="44" cy="46" r="9" />
        <path {...strokeProps} d="M50.5 52.5L57 59" />
      </svg>
    ),
    propertyVetting: (
      <svg viewBox="0 0 64 64" className={base} aria-hidden>
        <path {...strokeProps} d="M8 14l16-6 16 6 16-6v42l-16 6-16-6-16 6z" />
        <path {...strokeProps} d="M24 8v42M40 14v42" />
        <path {...strokeProps} d="M46 22a8 8 0 018 8c0 6-8 14-8 14s-8-8-8-14a8 8 0 018-8z" />
        <circle {...strokeProps} cx="46" cy="30" r="2.6" />
      </svg>
    ),
  };

  return icons[icon];
}

export default function ServiceLines() {
  return (
    <section aria-labelledby="services-intro-title" className="px-6 py-14 md:py-16">
      <div className="mx-auto w-full max-w-5xl text-center">
        <h2
          id="services-intro-title"
          className="font-gotham text-[30.3px] font-bold italic text-[#0c2749]"
        >
          <span>REMAX Professionals</span>
          <br />
          <span className="text-[#aa1120]">Think Differently.</span>
        </h2>
        <p className="font-gotham mx-auto mt-3 max-w-4xl text-[14.5px] leading-relaxed text-[#3f4f80]">
          What sets REMAX 8 apart is not what we do, but how we do it. You&apos;ll
          experience forward-looking expertise that elevates value every step of the way.
          We simply think differently and that produces innovative outcomes. Whether
          you&apos;re a developer, investor, landlord or tenant, we are a partner who is
          invested in seeing you succeed.
        </p>

        <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 text-left sm:grid-cols-2 lg:grid-cols-3">
          {serviceLines.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group flex cursor-pointer items-start gap-4 rounded-xl border border-[#0c2749] bg-white p-6 transition-all duration-200 hover:shadow-[0_10px_24px_rgba(12,39,73,0.16)]"
            >
              <div className="shrink-0">
                <ServiceCardIcon icon={service.icon} />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-gotham text-sm font-bold uppercase leading-snug text-[#0c2749] transition-colors duration-200 group-hover:text-[#1a3a63] md:text-base">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#5f6b8a]">{service.description}</p>
                <span className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-[#0c2749] group-hover:underline">
                  Learn More
                  <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
