"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";

const PARAGRAPHS = [
  "REMAX 8 Philippines is a premier real estate brokerage firm specializing in Commercial, Residential, and Industrial properties across Metro Manila and beyond.",
  "As part of the world’s most productive and trusted real estate network—REMAX, founded in 1973 in Denver, Colorado—we bring over 45 years of global expertise to every transaction.",
  "But we don’t just sell properties. We go Beyond Real Estate.",
  "Whether you’re buying, selling, or leasing, our team of highly trained professionals is committed to delivering excellent customer service with Integrity, Collaboration, and Excellence—the core values that define everything we do.",
  "With more than 155,000 professionals in over 100 countries, RE/MAX 8 Philippines is the global leader in commercial real estate services and investment and a premier provider of critical infrastructure services.",
];

// Reveal order: label, underline, heading, each paragraph, button.
const STAGGER_MS = 110;

function delayFor(index: number) {
  return index * STAGGER_MS;
}

export default function HomeWhoWeAre() {
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
      className="w-full overflow-hidden bg-white pt-10 pb-20"
      aria-labelledby="home-who-we-are-heading"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-6 sm:px-8 lg:px-10">
        <p
          className={`font-gotham text-[12px] font-normal uppercase tracking-[0.32em] text-[#0c2749] sm:text-[13.5px] lg:text-[15.4px] ${revealClass()}`}
          style={revealStyle(0)}
        >
          Who We Are
        </p>
        <div
          className={`mt-4 h-[3px] w-12 origin-center bg-red-600 transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
            revealed ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
          }`}
          style={revealStyle(1)}
          aria-hidden
        />

        <div
          ref={contentRef}
          className="mt-14 grid w-full grid-cols-1 items-start gap-5 md:mt-16 lg:grid-cols-2 lg:items-stretch lg:gap-5"
        >
          <div className="flex min-w-0 flex-col items-start gap-6 text-left">
            <h2
              id="home-who-we-are-heading"
              className={`font-gotham-condensed text-[24px] font-extrabold uppercase leading-[1.1] tracking-tight text-[#0c2749] sm:text-[28px] md:text-[32px] lg:text-[36px] xl:text-[40px] ${revealClass()}`}
              style={revealStyle(2)}
            >
              Your Global Partner in Philippine Real Estate.
            </h2>

            {PARAGRAPHS.map((paragraph, i) => (
              <p
                key={paragraph}
                className={`font-gotham text-[13px] font-normal leading-relaxed text-slate-600 sm:text-[14px] md:text-[15px] lg:text-[16px] ${revealClass()}`}
                style={revealStyle(3 + i)}
              >
                {paragraph}
              </p>
            ))}

            <Link
              href="/about-us"
              className={`mt-2 inline-flex items-center self-center rounded-md bg-[#000759] px-8 py-3.5 text-[8.3px] font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-300 ease-out hover:bg-[#000759]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#000759] sm:text-[9.1px] lg:self-start lg:text-[10.4px] ${revealClass()}`}
              style={revealStyle(3 + PARAGRAPHS.length)}
            >
              About RE/MAX 8 Philippines
            </Link>
          </div>

          <div
            role="img"
            aria-label="Two RE/MAX 8 Philippines real estate professionals discussing a property document."
            className="relative mx-auto aspect-square w-full max-w-lg overflow-hidden bg-[url('/images/who_we_are_bg.png')] bg-cover bg-center bg-no-repeat lg:aspect-auto lg:h-full lg:max-w-none"
          />
        </div>
      </div>
    </section>
  );
}
