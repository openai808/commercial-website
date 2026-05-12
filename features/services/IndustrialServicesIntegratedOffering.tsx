import Link from "next/link";
import { ServiceCardIcon, type ServiceIcon } from "@/features/services/ServiceLines";

function ValuationCalculatorIcon() {
  const base = "h-16 w-16 text-[#5f74ab]";
  const strokeProps = {
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg viewBox="0 0 64 64" className={base} aria-hidden>
      <rect {...strokeProps} x="8" y="8" width="22" height="22" rx="2" />
      <rect {...strokeProps} x="34" y="8" width="22" height="22" rx="2" />
      <rect {...strokeProps} x="8" y="34" width="22" height="22" rx="2" />
      <rect {...strokeProps} x="34" y="34" width="22" height="22" rx="2" />
      <path {...strokeProps} d="M16 19h6M19 16v6" />
      <path {...strokeProps} d="M42 19h6" />
      <path {...strokeProps} d="M16 42l6 6M22 42l-6 6" />
      <path {...strokeProps} d="M42 43h6M42 47h6" />
    </svg>
  );
}

const cards: {
  title: string;
  href: string;
  icon: ServiceIcon | "calculator";
}[] = [
  {
    title: "Capital Markets & Investment Services",
    href: "/services/capital-markets-and-investment-services",
    icon: "capital",
  },
  {
    title: "Occupier Services",
    href: "/services/occupier-services",
    icon: "occupier",
  },
  {
    title: "Valuation and Advisory Services",
    href: "/services/valuation-and-advisory-services",
    icon: "calculator",
  },
];

export default function IndustrialServicesIntegratedOffering() {
  return (
    <section
      aria-labelledby="industrial-integrated-offering-heading"
      className="bg-white px-6 py-14 text-[#1f2d57] md:py-16"
    >
      <div className="mx-auto w-full max-w-5xl">
        <h2
          id="industrial-integrated-offering-heading"
          className="text-center text-sm font-normal leading-snug text-[#2f3f74] md:text-base"
        >
          Access your integrated service offering
        </h2>

        <ul className="mx-auto mt-10 grid max-w-4xl list-none grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <li key={card.href}>
              <Link
                href={card.href}
                className="group flex min-h-[10.5rem] flex-col items-center justify-center gap-5 border border-[#dde2ed] bg-white px-6 py-8 text-center transition-all duration-200 hover:shadow-[0_10px_24px_rgba(35,61,131,0.16)]"
              >
                {card.icon === "calculator" ? (
                  <ValuationCalculatorIcon />
                ) : (
                  <ServiceCardIcon icon={card.icon} />
                )}
                <h3 className="text-sm font-normal leading-snug text-[#2d3c70] transition-colors duration-200 group-hover:text-[#59a8ff] group-hover:underline md:text-base">
                  {card.title}
                </h3>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
