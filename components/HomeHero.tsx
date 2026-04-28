"use client";

import { useEffect, useMemo, useState } from "react";

const SLIDE_DURATION_MS = 5000;
const HERO_SLIDES = [
  {
    image:
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1800&q=80",
    eyebrow: "Pivot to growth",
    title: "Philippine economy continues to reap post-pandemic gains",
    cta: "Read the report",
  },
  {
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=80",
    eyebrow: "Market update",
    title: "Metro Manila office demand picks up in core business districts",
    cta: "Explore market brief",
  },
  {
    image:
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1800&q=80",
    eyebrow: "Property pulse",
    title: "Residential developers launch premium mixed-use communities",
    cta: "View insights",
  },
  {
    image:
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1800&q=80",
    eyebrow: "Capital spotlight",
    title: "International investors expand footprint across the Philippines",
    cta: "See opportunities",
  },
];

export default function HomeHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progressKey, setProgressKey] = useState(0);

  const slideCount = HERO_SLIDES.length;
  const activeSlide = useMemo(() => HERO_SLIDES[activeIndex], [activeIndex]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slideCount);
    }, SLIDE_DURATION_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [slideCount]);

  useEffect(() => {
    setProgressKey((current) => current + 1);
  }, [activeIndex]);

  return (
    <section className="relative h-[35vh] md:h-[65vh] w-full overflow-hidden">
      {HERO_SLIDES.map((slide, index) => {
        const isActive = index === activeIndex;

        return (
          <img
            key={slide.image}
            src={slide.image}
            alt={isActive ? slide.title : ""}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
              isActive ? "opacity-100" : "opacity-0"
            }`}
          />
        );
      })}
      <div className="absolute inset-0 bg-slate-900/25" />

      <div className="absolute left-6 top-1/2 z-20 -translate-y-1/2 max-[1100px]:bottom-8 max-[1100px]:top-auto max-[1100px]:left-8 max-[1100px]:translate-y-0 max-[640px]:left-6 max-[640px]:bottom-6">
        <ul
          className="flex flex-col gap-4 max-[1100px]:flex-row max-[1100px]:items-center max-[1100px]:gap-6 max-[640px]:gap-5"
          aria-label="Hero gallery switcher"
        >
          {HERO_SLIDES.map((_, index) => {
            const isActive = index === activeIndex;

            return (
              <li key={`hero-switcher-${index}`}>
                <button
                  type="button"
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={isActive}
                  onClick={() => setActiveIndex(index)}
                  className="cursor-pointer group relative flex h-10 w-10 items-center justify-center text-white"
                >
                  {isActive ? (
                    <>
                      <svg
                        key={`progress-ring-${index}-${progressKey}`}
                        className="-rotate-90"
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        aria-hidden="true"
                      >
                        <circle
                          cx="20"
                          cy="20"
                          r="16"
                          stroke="rgba(255,255,255,0.35)"
                          strokeWidth="1.5"
                          fill="none"
                        />
                        <circle
                          cx="20"
                          cy="20"
                          r="16"
                          stroke="white"
                          strokeWidth="2"
                          fill="none"
                          strokeDasharray="100.53"
                          strokeDashoffset="100.53"
                        >
                          <animate
                            attributeName="stroke-dashoffset"
                            from="100.53"
                            to="0"
                            dur={`${SLIDE_DURATION_MS}ms`}
                            fill="freeze"
                          />
                        </circle>
                      </svg>
                      <span className="absolute text-sm font-medium">{index + 1}</span>
                    </>
                  ) : (
                    <span className="h-2 w-2 rounded-full border border-white/75 bg-white/10 transition group-hover:bg-white/25" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="absolute left-28 top-[56%] z-20 max-w-[680px] -translate-y-1/2 bg-[#2f4c9a] px-8 py-7 text-white mb-10 md:px-10 md:py-9 max-[1100px]:left-7 max-[1100px]:top-auto max-[1100px]:bottom-20 max-[1100px]:max-w-[440px] max-[1100px]:translate-y-0 max-[1100px]:px-12 max-[1100px]:py-12 max-[640px]:left-4 max-[640px]:right-4 max-[640px]:bottom-16 max-[640px]:max-w-none max-[640px]:px-6 max-[640px]:py-7">
        <p className="mb-3 text-[clamp(0.65rem,0.5vw,0.8rem)] uppercase tracking-[0.22em] text-white/80">
          {activeSlide.eyebrow}
        </p>
        <h1 className="mb-5 text-[clamp(1.75rem,4.3vw,3.7rem)] leading-[1.12] font-light">
          {activeSlide.title}
        </h1>
        <button
          type="button"
          className="inline-flex items-center gap-3 text-[clamp(0.95rem,1.5vw,1.5rem)] font-semibold hover:opacity-80"
        >
          {activeSlide.cta}
          <span aria-hidden="true" className="h-px w-9 bg-current" />
        </button>
      </div>
    </section>
  );
}
