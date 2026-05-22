"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type PropertyDetailHeroProps = {
  photos: string[];
  status: "sale" | "lease";
  projectName: string | null;
  title: string;
  specs: string;
};

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {direction === "left" ? (
        <path d="M15 18l-6-6 6-6" />
      ) : (
        <path d="M9 18l6-6-6-6" />
      )}
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="M8.59 13.51 15.42 17.49M15.41 6.51 8.59 10.49" />
    </svg>
  );
}

function PrintIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <path d="M6 14h12v8H6z" />
    </svg>
  );
}

function GalleryNav({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`absolute top-1/2 z-[2] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/95 text-[#4a5f9a] shadow-md transition hover:bg-white hover:text-[#000759] ${
        direction === "left" ? "left-4 md:left-8" : "right-4 md:right-8"
      }`}
      aria-label={direction === "left" ? "Previous photo" : "Next photo"}
    >
      <ChevronIcon direction={direction} />
    </button>
  );
}

function PropertyGallery({
  photos,
  title,
  status,
}: {
  photos: string[];
  title: string;
  status: "sale" | "lease";
}) {
  const [index, setIndex] = useState(0);
  const total = photos.length;
  const current = photos[index] ?? photos[0];

  const goPrev = useCallback(() => {
    setIndex((currentIndex) => (currentIndex - 1 + total) % total);
  }, [total]);

  const goNext = useCallback(() => {
    setIndex((currentIndex) => (currentIndex + 1) % total);
  }, [total]);

  const statusLabel = status === "lease" ? "For lease" : "For sale";
  const statusBadgeClass =
    status === "lease" ? "bg-[#2b8cff]" : "bg-[#000759]";

  return (
    <PropertyGalleryView
      current={current}
      title={title}
      index={index}
      total={total}
      statusLabel={statusLabel}
      statusBadgeClass={statusBadgeClass}
      showControls={total > 1}
      onPrev={goPrev}
      onNext={goNext}
    />
  );
}

function PropertyGalleryImage({
  src,
  alt,
  className,
  sizes,
  priority,
  ariaHidden,
}: {
  src: string;
  alt: string;
  className: string;
  sizes: string;
  priority?: boolean;
  ariaHidden?: boolean;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
  }, [src]);

  return (
    <>
      {!isLoaded ? (
        <div
          className="absolute inset-0 z-[1] animate-pulse bg-[#1c2860] motion-reduce:animate-none"
          aria-hidden
        />
      ) : null}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        aria-hidden={ariaHidden}
        onLoad={() => setIsLoaded(true)}
        className={`${className} transition-opacity duration-300 motion-reduce:transition-none ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
}

function PropertyGalleryView({
  current,
  title,
  index,
  total,
  statusLabel,
  statusBadgeClass,
  showControls,
  onPrev,
  onNext,
}: {
  current: string;
  title: string;
  index: number;
  total: number;
  statusLabel: string;
  statusBadgeClass: string;
  showControls: boolean;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0a1030] sm:aspect-[21/9]">
      <PropertyGalleryImage
        src={current}
        alt=""
        className="scale-110 object-cover opacity-50 blur-2xl"
        sizes="100vw"
        priority
        ariaHidden
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-full w-full max-w-[min(100%,72rem)]">
          <PropertyGalleryImage
            src={current}
            alt={title}
            className="object-contain"
            sizes="(max-width: 1280px) 100vw, 1152px"
            priority
          />
        </div>
      </div>

      <span
        className={`absolute left-0 top-0 z-[2] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-white ${statusBadgeClass}`}
      >
        {statusLabel}
      </span>

      {total > 0 ? (
        <span className="absolute bottom-4 left-4 z-[2] bg-[#000759]/90 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-white">
          {index + 1} of {total}
        </span>
      ) : null}

      <GalleryLogo />

      {showControls ? (
        <>
          <GalleryNav direction="left" onClick={onPrev} />
          <GalleryNav direction="right" onClick={onNext} />
        </>
      ) : null}
    </div>
  );
}

function GalleryLogo() {
  return (
    <div className="pointer-events-none absolute bottom-4 right-4 z-[2] rounded bg-white/95 px-3 py-2 shadow-sm">
      <Image
        src="/REMAX Commercial Logo.png"
        alt="RE/MAX Commercial"
        width={120}
        height={28}
        className="h-5 w-auto object-contain md:h-6"
      />
    </div>
  );
}

export default function PropertyDetailHero({
  photos,
  status,
  projectName,
  title,
  specs,
}: PropertyDetailHeroProps) {
  const handleShare = useCallback(async () => {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }

      await navigator.clipboard.writeText(url);
    } catch {
      // User dismissed the share sheet or copy was blocked.
    }
  }, [title]);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  return (
    <section aria-label="Property gallery and summary">
      <PropertyGallery photos={photos} title={title} status={status} />

      <div className="bg-[#000759] text-white">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-5 py-6 md:flex-row md:items-center md:justify-between md:gap-10 md:px-8 md:py-7 lg:px-10">
          <div className="min-w-0 flex-1 space-y-1.5">
            {projectName ? (
              <p className="text-sm font-medium text-white/90 md:text-[15px]">
                {projectName}
              </p>
            ) : null}
            <h1 className="text-xl font-bold leading-snug md:text-2xl lg:text-[1.75rem] lg:leading-tight">
              {title}
            </h1>
            <p className="text-sm text-white/95 md:text-base">{specs}</p>
          </div>

          <div className="flex shrink-0 items-center gap-6 md:gap-8">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition hover:text-white/80"
            >
              <ShareIcon />
              Share
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition hover:text-white/80"
            >
              <PrintIcon />
              Print
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
