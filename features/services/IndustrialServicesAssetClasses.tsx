import Link from "next/link";
import type { ReactNode } from "react";

const strokeProps = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: "1.6",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const iconClass = "h-16 w-16 text-[#23408e]";

function OfficeIcon() {
  return (
    <svg viewBox="0 0 64 64" className={iconClass} aria-hidden>
      <path {...strokeProps} d="M8 52V18h16v34H8z" />
      <path {...strokeProps} d="M28 52V10h20v42H28z" />
      <path {...strokeProps} d="M12 22h8M12 30h8M12 38h8M12 46h6" />
      <path {...strokeProps} d="M34 18h8M34 26h8M34 34h8M34 42h8M42 18v34M34 50h12" />
    </svg>
  );
}

function ResidentialIcon() {
  return (
    <svg viewBox="0 0 64 64" className={iconClass} aria-hidden>
      <path {...strokeProps} d="M12 52V28l20-14 20 14v24H12z" />
      <path {...strokeProps} d="M32 16v8" />
      <path {...strokeProps} d="M18 40h6v12h-6zM28 36h8v16h-8zM40 40h6v12h-6z" />
      <path {...strokeProps} d="M22 44h2M30 40h4M30 46h4M42 44h2" />
    </svg>
  );
}

function RetailIcon() {
  return (
    <svg viewBox="0 0 64 64" className={iconClass} aria-hidden>
      <path {...strokeProps} d="M10 48V30l2-12h12l2 12v18H10z" />
      <path {...strokeProps} d="M10 30h16" />
      <path {...strokeProps} d="M14 18v-5M22 18v-5" />
      <path {...strokeProps} d="M26 46V28l3-14h14l3 14v18H26z" />
      <path {...strokeProps} d="M26 28h20" />
      <path {...strokeProps} d="M34 14v-4M46 14v-4" />
      <path {...strokeProps} d="M50 10l3 3-3 3-3-3 3-3z" />
    </svg>
  );
}

const assetClasses: { label: string; href: string; icon: ReactNode }[] = [
  { label: "Office", href: "/properties/office", icon: <OfficeIcon /> },
  {
    label: "Residential",
    href: "/properties/multifamily",
    icon: <ResidentialIcon />,
  },
  { label: "Retail", href: "/properties/retail", icon: <RetailIcon /> },
];

export default function IndustrialServicesAssetClasses() {
  return (
    <section
      aria-labelledby="industrial-asset-classes-heading"
      className="bg-white px-6 py-14 text-[#1f2d57] md:py-16"
    >
      <div className="mx-auto w-full max-w-5xl">
        <h2
          id="industrial-asset-classes-heading"
          className="text-center text-2xl font-light leading-snug tracking-tight text-[#23408e] md:text-3xl"
        >
          Explore our expertise across every asset class
        </h2>

        <ul className="mx-auto mt-10 grid max-w-3xl list-none grid-cols-1 gap-4 sm:mx-auto sm:max-w-none sm:grid-cols-3">
          {assetClasses.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group flex min-h-[11rem] flex-col items-center justify-center gap-5 border border-[#dde2ed] bg-white px-6 py-8 text-center transition-all duration-200 hover:shadow-[0_10px_24px_rgba(35,61,131,0.12)]"
              >
                {item.icon}
                <h3 className="text-sm font-normal text-[#2d3c70] transition-colors group-hover:text-[#59a8ff] group-hover:underline md:text-base">
                  {item.label}
                </h3>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
