"use client";

import { useLayoutEffect, useRef, useState } from "react";
import ContactModal from "@/components/ContactModal";

const STAGGER_MS = 120;

function delayFor(index: number) {
  return index * STAGGER_MS;
}

export default function HomeGetInTouch() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [open, setOpen] = useState(false);

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
      className="relative min-h-[70vh] w-full overflow-hidden pt-16 pb-24 md:min-h-[80vh] md:pt-20"
      aria-labelledby="home-get-in-touch-heading"
    >
      <img
        src="/images/getintouch.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10"
        aria-hidden
      />

      <div
        ref={contentRef}
        className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center sm:px-8 lg:px-10"
      >
        <p
          className={`font-gotham text-[12px] font-normal uppercase tracking-[0.2em] text-white sm:text-[13.5px] lg:text-[15.4px] ${revealClass()}`}
          style={revealStyle(0)}
        >
          Get in Touch
        </p>
        <div
          className={`mt-4 h-[3px] w-12 origin-center bg-red-600 transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
            revealed ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
          }`}
          style={revealStyle(1)}
          aria-hidden
        />

        <h2
          id="home-get-in-touch-heading"
          className={`mt-40 font-serif text-[26px] font-bold italic leading-tight text-white sm:text-[34px] lg:text-[44px] ${revealClass()}`}
          style={revealStyle(2)}
        >
          Nobody in the world sells more real estate than REMAX.
        </h2>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className={`mt-10 inline-flex items-center justify-center rounded-none bg-[#0c2749] px-10 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white transition-colors duration-300 ease-out hover:bg-[#0c2749]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${revealClass()}`}
          style={revealStyle(3)}
        >
          Talk to Us
        </button>
      </div>

      <ContactModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
