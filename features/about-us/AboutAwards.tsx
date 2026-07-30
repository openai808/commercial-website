"use client";

import { useState } from "react";
import Image from "next/image";

type AwardItem = {
  id: string;
  src: string;
  alt: string;
};

const AWARDS: AwardItem[] = [
  { id: "award-9", src: "/images/awards/9.png", alt: "RE/MAX 8 Philippines award 9" },
  { id: "award-8", src: "/images/awards/8.png", alt: "RE/MAX 8 Philippines award 8" },
  { id: "award-7", src: "/images/awards/7.png", alt: "RE/MAX 8 Philippines award 7" },
  { id: "award-5", src: "/images/awards/5.png", alt: "RE/MAX 8 Philippines award 5" },
  { id: "award-4", src: "/images/awards/4.png", alt: "RE/MAX 8 Philippines award 4" },
  { id: "award-3", src: "/images/awards/3.png", alt: "RE/MAX 8 Philippines award 3" },
  { id: "award-2", src: "/images/awards/2.png", alt: "RE/MAX 8 Philippines award 2" },
  { id: "award-1", src: "/images/awards/1.png", alt: "RE/MAX 8 Philippines award 1" },
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

function AwardBadge({ award }: { award: AwardItem }) {
  return (
    <div className="flex w-[180px] items-center justify-center">
      <Image
        src={award.src}
        alt={award.alt}
        width={160}
        height={160}
        className="h-28 w-28 object-contain md:h-32 md:w-32"
      />
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
