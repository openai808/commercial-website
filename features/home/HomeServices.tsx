"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type ServiceItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
};

function IconTenantRepresentation() {
  return (
    <Image
      src="/images/tenant.png"
      alt=""
      width={60}
      height={60}
      className="w-[clamp(40px,8vw,60px)] h-[clamp(40px,8vw,60px)] shrink-0 object-contain"
      aria-hidden
    />
  );
}

function IconLandlordRepresentation() {
  return (
    <Image
      src="/images/landlord.png"
      alt=""
      width={60}
      height={60}
      className="w-[clamp(40px,8vw,60px)] h-[clamp(40px,8vw,60px)] shrink-0 object-contain"
      aria-hidden
    />
  );
}

function IconResidentialServices() {
  return (
    <Image
      src="/images/residential.png"
      alt=""
      width={60}
      height={60}
      className="w-[clamp(40px,8vw,60px)] h-[clamp(40px,8vw,60px)] shrink-0 object-contain"
      aria-hidden
    />
  );
}

function IconCapitalMarkets() {
  return (
    <Image
      src="/images/capital.png"
      alt=""
      width={60}
      height={60}
      className="w-[clamp(40px,8vw,60px)] h-[clamp(40px,8vw,60px)] shrink-0 object-contain"
      aria-hidden
    />
  );
}

function IconTitleConveyancing() {
  return (
    <Image
      src="/images/title.png"
      alt=""
      width={60}
      height={60}
      className="w-[clamp(40px,8vw,60px)] h-[clamp(40px,8vw,60px)] shrink-0 object-contain"
      aria-hidden
    />
  );
}

function IconPropertyVetting() {
  return (
    <Image
      src="/images/vetting.png"
      alt=""
      width={60}
      height={60}
      className="w-[clamp(40px,8vw,60px)] h-[clamp(40px,8vw,60px)] shrink-0 object-contain"
      aria-hidden
    />
  );
}

const SERVICES: ServiceItem[] = [
  {
    id: "tenant-representation",
    title: "Tenant Representation",
    description: "Find the right property, negotiate lease terms, secure the best space.",
    href: "/services/tenant",
    icon: <IconTenantRepresentation />,
  },
  {
    id: "landlord-representation",
    title: "Landlord Representation",
    description: "List your property, attract qualifies tenants, close profitable leases.",
    href: "/services/landlord",
    icon: <IconLandlordRepresentation />,
  },
  {
    id: "residential-services",
    title: "Residential Services",
    description: "Buy or sell your home, lease with confidence move hassle-free.",
    href: "/services/residential-services",
    icon: <IconResidentialServices />,
  },
  {
    id: "capital-markets",
    title: "Capital Markets & Investment Service",
    description: "Identify opportunities, maximize returns, grow your real estate portfolio.",
    href: "/services/capital-markets-and-investment-services",
    icon: <IconCapitalMarkets />,
  },
  {
    id: "title-conveyancing",
    title: "Title Conveyancing Service",
    description: "Transfer ownership, complete legal documents, close transactions smoothly.",
    href: "/services/title-conveyancing",
    icon: <IconTitleConveyancing />,
  },
  {
    id: "property-vetting",
    title: "Property Vetting Service",
    description: "Verify ownership, access risks, ensure property legitimacy.",
    href: "/services/property-vetting",
    icon: <IconPropertyVetting />,
  },
];

// Reveal order (top to bottom): label, underline, then each card left-to-right, top-to-bottom.
const STAGGER_MS = 110;

function delayFor(index: number) {
  return index * STAGGER_MS;
}

export default function HomeServices() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const revealClass = () =>
    `transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
      revealed ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
    }`;
  const revealStyle = (index: number) => ({
    transitionDelay: `${delayFor(index)}ms`,
  });

  return (
    <section
      className="relative w-full overflow-hidden bg-[#0c2749] py-22"
      aria-labelledby="home-services-heading"
    >
      <Image
        src="/images/section3.jpg"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[#0c2749]/40" aria-hidden />

      <div
        ref={contentRef}
        className="relative mx-auto flex w-full max-w-7xl flex-col items-center px-6 sm:px-8 lg:px-10"
      >
        <p
          className={`font-gotham text-[12px] font-normal uppercase tracking-[0.32em] text-white sm:text-[13.5px] lg:text-[15.4px] ${revealClass()}`}
          style={revealStyle(0)}
        >
          What We Do
        </p>
        <div
          className={`mt-4 h-[3px] w-12 origin-center bg-red-600 transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
            revealed ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
          }`}
          style={revealStyle(1)}
          aria-hidden
        />
        <h2 id="home-services-heading" className="sr-only">
          Industry-leading services
        </h2>

        <ul className="mt-14 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
          {SERVICES.map((item, i) => (
            <li key={item.id} className={revealClass()} style={revealStyle(2 + i)}>
              <Link
                href={item.href}
                className="group grid h-full grid-cols-[auto_1fr] items-start gap-x-4 rounded-2xl bg-[#0c2749] p-8 text-left transition-colors duration-300 ease-out hover:bg-[#1a3a6e]/90 focus-visible:bg-[#1a3a6e]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span className="col-start-1 row-start-1 row-span-3 self-start text-white">{item.icon}</span>
                <span className="font-gotham col-start-2 row-start-1 self-start text-[12px] font-bold uppercase tracking-wide text-white sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px]">
                  {item.title}
                </span>
                <span className="font-gotham col-start-2 row-start-2 mt-1.5 text-[12px] font-normal leading-relaxed text-white/80 sm:text-[12.5px] md:text-[13px] lg:text-[13.5px]">
                  {item.description}
                </span>
                <span className="font-gotham col-start-2 row-start-3 mt-3 inline-flex items-center gap-1.5 text-[11px] font-medium text-white sm:text-[12px] md:text-[12.5px] lg:text-[13px]">
                  Learn More
                  <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
