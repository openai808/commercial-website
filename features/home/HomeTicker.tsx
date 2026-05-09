"use client";

import { useState } from "react";

export default function HomeTicker() {
  const [isTickerPaused, setIsTickerPaused] = useState(false);

  return (
    <section className="relative overflow-hidden border-y border-[#c7ccd7] bg-[#d9dee6]">
      <div className="overflow-hidden py-[17px]">
        <div
          className={`marquee-track py-1 flex w-max items-center gap-8 whitespace-nowrap text-[13px] leading-none tracking-[0.01em] text-[#49546a] ${
            isTickerPaused ? "paused" : ""
          }`}
          aria-label="Latest market headlines"
        >
          <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#243768]">
            Insights
          </span>
          <span>Colliers Radar: Cebu Residential Market Is Primed For Rebound</span>
          <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#243768]">
            Insights
          </span>
          <span>Colliers Radar: Cebu Residential Market Is Primed For Rebound</span>
          <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#243768]">
            Insights
          </span>
          <span>Colliers Radar: Cebu Residential Market Is Primed For Rebound</span>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setIsTickerPaused((current) => !current)}
        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#243768] bg-[#e9edf5] text-[#243768] hover:bg-[#f2f5fa]"
        aria-label={isTickerPaused ? "Play scrolling headlines" : "Pause scrolling headlines"}
      >
        {isTickerPaused ? (
          <svg viewBox="0 0 20 20" className="h-[12px] w-[12px]" aria-hidden="true">
            <path d="M6 4.5v11l8-5.5-8-5.5z" fill="currentColor" />
          </svg>
        ) : (
          <svg viewBox="0 0 20 20" className="h-[16px] w-[16px]" aria-hidden="true">
            <rect x="5.2" y="4.5" width="3.3" height="11" rx="0.8" fill="currentColor" />
            <rect x="11.5" y="4.5" width="3.3" height="11" rx="0.8" fill="currentColor" />
          </svg>
        )}
      </button>
      <style jsx>{`
        .marquee-track {
          animation: marquee-scroll 24s linear infinite;
        }

        .marquee-track.paused {
          animation-play-state: paused;
        }

        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
