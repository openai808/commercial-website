import Image from "next/image";
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

const SERVICE_ICON_IMAGE_SRC: Partial<Record<ServiceIcon, string>> = {
  tenant: "/images/services-icon/tenant_representation.png",
  landlord: "/images/services-icon/landlord_representation.png",
  residential: "/images/services-icon/residential_services.png",
  wallet: "/images/services-icon/capital_markets_&_investment_service.png",
  titleConveyancing: "/images/services-icon/title_conveyancing_service.png",
  propertyVetting: "/images/services-icon/property_vetting_service.png",
};

export function ServiceCardIcon({ icon }: { icon: ServiceIcon }) {
  const imageSrc = SERVICE_ICON_IMAGE_SRC[icon];
  if (imageSrc) {
    return (
      <Image
        src={imageSrc}
        alt=""
        width={64}
        height={64}
        className="h-16 w-16 object-contain"
        aria-hidden
      />
    );
  }

  const base = "h-16 w-16 text-[#5f74ab]";
  const strokeProps = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  const icons: Record<"capital" | "occupier", ReactNode> = {
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
  };

  return icons[icon as "capital" | "occupier"];
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
