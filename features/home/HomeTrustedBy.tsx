"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";

type Partner = {
  name: string;
  logo: string;
};

const PARTNERS: Partner[] = [
  { name: "AyalaLand", logo: "/images/trusted/ayalaland.png" },
  { name: "Rockwell Land", logo: "/images/trusted/rockwellland.png" },
  { name: "Megaworld", logo: "/images/trusted/megaworld.png" },
  { name: "Federal Land", logo: "/images/trusted/federalland.png" },
  { name: "Alveo", logo: "/images/trusted/alveo.png" },
  { name: "Aboitiz", logo: "/images/trusted/aboitz.png" },
  { name: "RLC Residences", logo: "/images/trusted/rlc-residence.png" },
];

const STAGGER_MS = 90;

function delayFor(index: number) {
  return index * STAGGER_MS;
}

export default function HomeTrustedBy() {
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
      className="w-full bg-[#0c2749] pt-15 pb-20"
      aria-labelledby="home-trusted-by-heading"
    >
      <div
        ref={contentRef}
        className="mx-auto flex w-full flex-col items-center px-6 text-center sm:px-8 lg:px-10"
      >
        <h2
          id="home-trusted-by-heading"
          className={`font-gotham text-[12px] font-normal uppercase leading-snug tracking-[0.2em] text-white sm:text-[13.5px] lg:text-[15.4px] ${revealClass()}`}
          style={revealStyle(0)}
        >
          Trusted by
          <br />
          Industry Leaders
        </h2>
        <div
          className={`mt-5 h-[3px] w-12 origin-center bg-red-600 transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
            revealed ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
          }`}
          style={revealStyle(1)}
          aria-hidden
        />

        <div className="mt-14 grid w-full grid-cols-2 items-center justify-items-center gap-x-4 gap-y-4 sm:grid-cols-3 sm:gap-x-5 sm:gap-y-5 md:mt-16 lg:grid-cols-7 lg:gap-x-4">
          {PARTNERS.map((partner, i) => (
            <div
              key={partner.name}
              className={`flex h-[76px] w-full max-w-[150px] items-center justify-center overflow-hidden bg-white px-4 sm:h-[88px] md:h-[100px] ${revealClass()}`}
              style={revealStyle(2 + i)}
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={240}
                height={100}
                className="h-auto max-h-[40px] w-auto max-w-[100px] object-contain sm:max-h-[48px] sm:max-w-[110px] md:max-h-[56px] md:max-w-[120px]"
              />
            </div>
          ))}
        </div>

        <div
          className={`mt-9 h-[1.5px] w-full bg-[#ff1200] ${revealClass()}`}
          style={revealStyle(2 + PARTNERS.length)}
          aria-hidden
        />
      </div>
    </section>
  );
}
