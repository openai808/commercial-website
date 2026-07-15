"use client";

import { useLayoutEffect, useRef, useState } from "react";

type Award = {
  title: string;
  description: string;
};

const AWARDS: Award[] = [
  {
    title: "#1 Globally – Commercial Large Team (January – March 2026)",
    description:
      "TEAM 8 of REMAX 8 Realty, based in Bonifacio Global City, Taguig, ranked #1 in the world for Commercial Large Team Commission among all REMAX teams globally.",
  },
  {
    title: "#2 Globally – Commercial Large Team (Year-End 2025)",
    description:
      "Ranked #2 in the world for Commercial Large Team Commission, placing ahead of thousands of teams across the REMAX global network.",
  },
  {
    title: "#1 in the Philippines",
    description:
      "Our team also secured the top ranking in the Philippines for Commercial Large Team Commission—a testament to our leadership in the local market.",
  },
];

// Reveal order (top to bottom): label, underline, award 1, award 2, award 3, tagline.
// Delays are assigned in reverse so the last element (tagline) animates first,
// cascading upward until the label/underline animate last.
const REVEAL_STEPS = AWARDS.length + 3;
const STAGGER_MS = 120;

function delayFor(index: number) {
  return (REVEAL_STEPS - 1 - index) * STAGGER_MS;
}

export default function HomeAwards() {
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
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-[#0c2749]"
      aria-labelledby="home-awards-heading"
    >
      <img
        src="/images/section2.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/35"
        aria-hidden
      />

      <div
        ref={contentRef}
        className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center sm:px-8 lg:px-10"
      >
        <h2 id="home-awards-heading" className="sr-only">
          Global excellence, proven results
        </h2>
        <p
          className={`font-montserrat text-[12px] font-normal uppercase tracking-[0.136em] text-white sm:text-[13.5px] lg:text-[15.4px] ${revealClass()}`}
          style={revealStyle(0)}
        >
          Global Excellence. Proven Results.
        </p>
        <div
          className={`mt-4 h-[3px] w-12 origin-center bg-red-600 transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
            revealed ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
          }`}
          style={revealStyle(1)}
          aria-hidden
        />

        <div className="mt-14 flex flex-col gap-12 md:mt-8 md:gap-10">
          {AWARDS.map((award, i) => (
            <div
              key={award.title}
              className={revealClass()}
              style={revealStyle(2 + i)}
            >
              <h3
                className="font-gotham-condensed text-[20px] font-extrabold leading-snug tracking-[0em] text-white sm:text-[24px] lg:text-[28px]"
              >
                {award.title}
              </h3>
              <p className="mx-auto mt-3 max-w-2xl text-[14px] font-normal leading-relaxed text-white/85 sm:text-[15px] md:text-[16px] lg:text-[17px]">
                {award.description}
              </p>
            </div>
          ))}
        </div>

        <p
          className={`mt-16 max-w-xl text-[16px] font-normal leading-relaxed text-white/90 sm:text-[17px] md:mt-20 md:text-[18px] lg:text-[19px] ${revealClass()}`}
          style={revealStyle(2 + AWARDS.length)}
        >
          This isn&apos;t just an award. It&apos;s proof of our commitment to
          delivering exceptional results for our clients.
        </p>
      </div>
    </section>
  );
}
