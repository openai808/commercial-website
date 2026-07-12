"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";

type Partner = {
  name: string;
  logo: string;
};

const PARTNER_ROW_1: Partner[] = [
  { name: "PCCI", logo: "/images/partners/pcci.png" },
  {
    name: "National Association of Realtors",
    logo: "/images/partners/national_association_of_realtors.png",
  },
  { name: "Rotary International", logo: "/images/partners/rotary.png" },
];

const PARTNER_ROW_2: Partner[] = [
  {
    name: "Urban Land Institute",
    logo: "/images/partners/urban_land_institute.png",
  },
  { name: "SCMAP", logo: "/images/partners/scmap.png" },
];

const STAGGER_MS = 90;

function delayFor(index: number) {
  return index * STAGGER_MS;
}

export default function HomeOurPartners() {
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
      className="w-full bg-white pt-15 pb-20"
      aria-labelledby="home-our-partners-heading"
    >
      <div
        ref={contentRef}
        className="mx-auto flex w-full flex-col items-center px-6 text-center sm:px-8 lg:px-10"
      >
        <h2
          id="home-our-partners-heading"
          className={`font-gotham text-[12px] font-normal uppercase leading-snug tracking-[0.2em] text-[#0c2749] sm:text-[13.5px] lg:text-[15.4px] ${revealClass()}`}
          style={revealStyle(0)}
        >
          Our Partners &amp;
          <br />
          Affiliates
        </h2>
        <div
          className={`mt-4 h-[3px] w-12 origin-center bg-red-600 transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
            revealed ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
          }`}
          style={revealStyle(1)}
          aria-hidden
        />

        <div className="mt-14 flex w-full flex-col items-center gap-y-12 md:mt-16 md:gap-y-16">
          <div className="flex w-full flex-wrap items-center justify-center gap-x-10 gap-y-8 sm:gap-x-14 lg:gap-x-20">
            {PARTNER_ROW_1.map((partner, i) => (
              <Image
                key={partner.name}
                src={partner.logo}
                alt={partner.name}
                width={300}
                height={100}
                className={`h-14 w-auto object-contain sm:h-16 lg:h-20 ${revealClass()}`}
                style={revealStyle(2 + i)}
              />
            ))}
          </div>

          <div className="flex w-full flex-wrap items-center justify-center gap-x-10 gap-y-8 sm:gap-x-14 lg:gap-x-20">
            {PARTNER_ROW_2.map((partner, i) => (
              <Image
                key={partner.name}
                src={partner.logo}
                alt={partner.name}
                width={300}
                height={100}
                className={`h-14 w-auto object-contain sm:h-16 lg:h-20 ${revealClass()}`}
                style={revealStyle(2 + PARTNER_ROW_1.length + i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
