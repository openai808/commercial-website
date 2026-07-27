"use client";

import { useState } from "react";

type AwardItem = {
  id: string;
  variant: "laurel" | "building";
  caption: string;
  subtitle?: string;
};

/**
 * Placeholder badge artwork (laurel wreath, building silhouette) — replace
 * with the real exported RE/MAX award graphics once available.
 */
const AWARDS: AwardItem[] = [
  { id: "top8-medium-team", variant: "laurel", caption: "MEDIUM TEAM" },
  {
    id: "platinum-club-team",
    variant: "building",
    caption: "PLATINUM CLUB",
    subtitle: "TEAM",
  },
  {
    id: "executive-club-individual",
    variant: "building",
    caption: "EXECUTIVE CLUB",
    subtitle: "INDIVIDUAL",
  },
  {
    id: "100-club-team",
    variant: "building",
    caption: "100% CLUB",
    subtitle: "TEAM",
  },
  {
    id: "100-club-individual",
    variant: "building",
    caption: "100% CLUB",
    subtitle: "INDIVIDUAL",
  },
];

const PER_PAGE = 5;

function IconChevron({
  className,
  direction,
}: {
  className?: string;
  direction: "left" | "right";
}) {
  return (
    <svg
      className={className}
      width="14"
      height="24"
      viewBox="0 0 14 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={direction === "left" ? "M11 2 1 12l10 10" : "M3 2l10 10L3 22"} />
    </svg>
  );
}

function IconBuilding({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 56"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 34c14-13 54-13 68 0" />
      <rect x="10" y="30" width="14" height="22" />
      <rect x="28" y="14" width="16" height="38" />
      <rect x="48" y="22" width="14" height="30" />
    </svg>
  );
}

function IconLaurel({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M50 104C28 94 15 72 17 46C18 30 26 17 37 10" />
      <path d="M20 52c6 2 12 0 16-5" />
      <path d="M22 67c6 2 12 0 16-6" />
      <path d="M27 82c6 1 11-1 15-6" />
      <path d="M34 95c5 1 10-1 13-5" />
      <path d="M70 104C92 94 105 72 103 46C102 30 94 17 83 10" />
      <path d="M100 52c-6 2-12 0-16-5" />
      <path d="M98 67c-6 2-12 0-16-6" />
      <path d="M93 82c-6 1-11-1-15-6" />
      <path d="M86 95c-5 1-10-1-13-5" />
    </svg>
  );
}

function AwardBadge({ award }: { award: AwardItem }) {
  return (
    <div className="flex w-[180px] flex-col items-center text-center">
      {award.variant === "laurel" ? (
        <div className="relative h-24 w-24">
          <IconLaurel className="absolute inset-0 h-full w-full text-white" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <span className="text-[9px] font-bold uppercase tracking-[0.15em]">
              Top
            </span>
            <span className="text-3xl font-extrabold leading-none">8</span>
            <span className="mt-1 text-[7px] font-semibold uppercase leading-tight">
              Commercial
              <br />
              Producer
              <br />
              Global
            </span>
          </div>
        </div>
      ) : (
        <IconBuilding className="h-14 w-20 text-white" />
      )}

      <p className="mt-4 text-sm font-bold uppercase tracking-[0.08em] text-white">
        {award.caption}
      </p>
      {award.subtitle ? (
        <>
          <div className="mt-1.5 h-px w-16 bg-white/40" aria-hidden />
          <p className="mt-1.5 text-[11px] uppercase tracking-[0.1em] text-white/70">
            {award.subtitle}
          </p>
        </>
      ) : null}
    </div>
  );
}

export default function AboutAwards() {
  const totalPages = Math.max(1, Math.ceil(AWARDS.length / PER_PAGE));
  const [page, setPage] = useState(0);

  const start = page * PER_PAGE;
  const visible = AWARDS.slice(start, start + PER_PAGE);

  return (
    <section
      className="bg-[#0c2749] py-16 md:py-20"
      aria-labelledby="about-awards-heading"
    >
      <div className="mx-auto flex max-w-[1400px] flex-col items-center px-6 md:px-10">
        <h2
          id="about-awards-heading"
          className="text-center font-montserrat text-[15.95px] font-semibold uppercase tracking-[0.2em] text-white sm:text-[17.95px] lg:text-[20.4742px]"
        >
          Awards and Recognitions
        </h2>
        <div className="mt-3 h-[3px] w-[82.3894px] bg-red-600" aria-hidden />

        <div className="mt-14 flex w-full items-center gap-4 md:gap-8">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            aria-label="Previous awards"
            className="shrink-0 text-white/70 transition-colors hover:text-white disabled:opacity-30"
          >
            <IconChevron direction="left" />
          </button>

          <div className="flex flex-1 flex-wrap items-start justify-center gap-x-8 gap-y-10">
            {visible.map((award) => (
              <AwardBadge key={award.id} award={award} />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            aria-label="Next awards"
            className="shrink-0 text-white/70 transition-colors hover:text-white disabled:opacity-30"
          >
            <IconChevron direction="right" />
          </button>
        </div>

        {totalPages > 1 ? (
          <div className="mt-10 flex items-center gap-2" aria-hidden>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPage(i)}
                aria-label={`Go to page ${i + 1}`}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  i === page ? "bg-white" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
