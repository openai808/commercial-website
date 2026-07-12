"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";

type Client = {
  name: string;
  logo: string;
  /** Near-square/circular badge logos render much narrower than wordmarks at a shared height, so give them extra height to match visual weight. */
  compact?: boolean;
};

const CLIENTS: Client[] = [
  { name: "Viber", logo: "/images/clients/viber.png" },
  { name: "Suzuki", logo: "/images/clients/suzuki.png" },
  { name: "Dunkin'", logo: "/images/clients/dunkin.png" },
  { name: "iFAST", logo: "/images/clients/ifast.png" },
  {
    name: "Domino's Pizza",
    logo: "/images/clients/dominos_pizza.png",
    compact: true,
  },
  { name: "KKV", logo: "/images/clients/kkv.png" },
  { name: "Allu", logo: "/images/clients/allu.png" },
  { name: "Lynk & Co", logo: "/images/clients/lynk_co.png" },
  { name: "Ticketmaster", logo: "/images/clients/ticketmaster.png" },
  { name: "Nippon Express", logo: "/images/clients/nippon_express.png" },
  { name: "Flash Express", logo: "/images/clients/flash_express.png" },
  { name: "Lazada", logo: "/images/clients/lazada.png" },
  { name: "FB", logo: "/images/clients/fb.png" },
  { name: "The Gun Store", logo: "/images/clients/the_gun_store.png" },
  { name: "Gurin Energy", logo: "/images/clients/gurin_energy.png" },
  { name: "Sales Rain", logo: "/images/clients/sales_rain.png" },
  {
    name: "Golden Topper",
    logo: "/images/clients/golden_topper.png",
    compact: true,
  },
  {
    name: "Commonwealth Insurance",
    logo: "/images/clients/commonwealth_insurance.png",
    compact: true,
  },
  { name: "Sumec", logo: "/images/clients/sumec.png" },
  { name: "Peacock", logo: "/images/clients/peacock.png" },
  { name: "Daiichi Properties", logo: "/images/clients/daiichi_properties.png" },
  { name: "Distriphil", logo: "/images/clients/distriphil.png" },
  { name: "CXApp", logo: "/images/clients/cxapp.png" },
  { name: "PGA", logo: "/images/clients/pga.png", compact: true },
  { name: "La Europa Ceramica", logo: "/images/clients/la_europa.png" },
  { name: "ICRC", logo: "/images/clients/icrc.png", compact: true },
  {
    name: "General Milling Corporation",
    logo: "/images/clients/general_milling_corporation.png",
  },
  { name: "CTI Engineering", logo: "/images/clients/cti_engineering.png" },
  { name: "EZ Housing", logo: "/images/clients/ez_housing.png" },
  { name: "Stanley", logo: "/images/clients/stanley.png" },
];

const STAGGER_MS = 90;

function delayFor(index: number) {
  return index * STAGGER_MS;
}

export default function HomeOurClients() {
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
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
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
      className="w-full bg-white pt-15 pb-20 shadow-[0_-6px_10px_-8px_rgba(0,0,0,0.08)]"
      aria-labelledby="home-our-clients-heading"
    >
      <div
        ref={contentRef}
        className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 text-center sm:px-8 lg:px-10"
      >
        <h2
          id="home-our-clients-heading"
          className={`font-gotham text-[12px] font-normal uppercase leading-snug tracking-[0.2em] text-[#0c2749] sm:text-[13.5px] lg:text-[15.4px] ${revealClass()}`}
          style={revealStyle(0)}
        >
          Our Partial
          <br />
          List of Clients
        </h2>
        <div
          className={`mt-4 h-[3px] w-12 origin-center bg-red-600 transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
            revealed ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
          }`}
          style={revealStyle(1)}
          aria-hidden
        />

        <div
          className={`mt-14 grid w-full grid-cols-3 items-center justify-items-center gap-x-6 gap-y-8 sm:gap-x-8 md:mt-16 md:grid-cols-6 md:gap-x-6 ${revealClass()}`}
          style={revealStyle(2)}
        >
          {CLIENTS.map((client) => (
            <Image
              key={client.name}
              src={client.logo}
              alt={client.name}
              width={300}
              height={100}
              unoptimized
              className={`w-auto max-w-full object-contain ${
                client.compact
                  ? "h-[54px] sm:h-[66px] md:h-[60px] lg:h-[72px]"
                  : "h-9 sm:h-11 md:h-10 lg:h-12"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
