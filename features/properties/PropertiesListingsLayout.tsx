"use client";

import PropertiesMapPanel from "@/features/properties/PropertiesMapPanel";
import type { ListingMapMarker } from "@/lib/properties/mapMarkers";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

const LG_PX = 1024;
/** Reasonable default before we measure the real sticky <header> height (px). */
const FALLBACK_HEADER_STICKY_PX = 112;

type PropertiesListingsLayoutProps = {
  markers: ListingMapMarker[];
  leftColumn: ReactNode;
  /** Full-width block below the listings + map row (e.g. pagination). */
  belowColumns?: ReactNode;
};

export default function PropertiesListingsLayout({
  markers,
  leftColumn,
  belowColumns,
}: PropertiesListingsLayoutProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const mapOuterRef = useRef<HTMLDivElement>(null);
  const [stickyHeaderPx, setStickyHeaderPx] = useState(FALLBACK_HEADER_STICKY_PX);
  /** Past the point where a sticky sidebar would overrun the listings column bottom. */
  const [releasedFromSticky, setReleasedFromSticky] = useState(false);

  const measureHeader = useCallback(() => {
    const header = document.querySelector("body > header");
    if (!(header instanceof HTMLElement)) return;
    const h = Math.ceil(header.getBoundingClientRect().height);
    if (h > 0) setStickyHeaderPx(h);
  }, []);

  useLayoutEffect(() => {
    const header = document.querySelector("body > header");

    let ro: ResizeObserver | undefined;
    if (header instanceof HTMLElement) {
      ro = new ResizeObserver(measureHeader);
      ro.observe(header);
    }

    /** Defer DOM reads so ESLint avoids sync setState in effect body edge cases. */
    const raf = requestAnimationFrame(measureHeader);
    window.addEventListener("resize", measureHeader);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measureHeader);
      ro?.disconnect();
    };
  }, [measureHeader]);

  const updateReleased = useCallback(() => {
    const row = rowRef.current;
    const mapOuter = mapOuterRef.current;
    if (!row || !mapOuter) return;

    if (typeof window === "undefined" || window.innerWidth < LG_PX) {
      setReleasedFromSticky(false);
      return;
    }

    /**
     * Turn off `position: sticky` only when a stuck map (top = header offset, height
     * = map column) would extend past the flex row’s bottom. The old check
     * `rowBottom <= window.innerHeight` stayed true whenever the row fit in the
     * viewport, so sticky almost never activated.
     */
    const rowBottom = row.getBoundingClientRect().bottom;
    const mapHeight = mapOuter.getBoundingClientRect().height;
    const stickyBottom = stickyHeaderPx + mapHeight;
    setReleasedFromSticky(stickyBottom >= rowBottom - 1);
  }, [stickyHeaderPx]);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => updateReleased());
    };

    tick();
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick);

    const mq = window.matchMedia(`(min-width: ${LG_PX}px)`);
    const onMq = () => tick();
    mq.addEventListener("change", onMq);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", tick);
      window.removeEventListener("resize", tick);
      mq.removeEventListener("change", onMq);
    };
  }, [updateReleased]);

  const mapWrapStyle = {
    "--listing-map-top": `${stickyHeaderPx}px`,
  } as CSSProperties;

  const mapOuterClass =
    "h-[min(52vh,420px)] w-full overflow-hidden lg:z-10 lg:shrink-0 " +
    "lg:h-[min(calc(100vh_-_370px),calc(100dvh_-_var(--listing-map-top)_-_1rem))] " +
    (releasedFromSticky ? "lg:relative" : "lg:sticky lg:top-[var(--listing-map-top)]");

  return (
    <section
      aria-label="Property listings and map"
      className="mt-9 bg-white text-[#000759]"
      style={mapWrapStyle}
    >
      <div
        ref={rowRef}
        className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-8 xl:gap-10"
      >
        {leftColumn}

        <aside
          className={
            "min-w-0 w-full flex-1 basis-0 border-t border-[#e8ebf2] lg:flex lg:min-h-0 lg:flex-col lg:border-t-0 " +
            (releasedFromSticky ? "lg:self-end" : "lg:self-stretch")
          }
          aria-label="Property locations map"
        >
          <div ref={mapOuterRef} className={mapOuterClass}>
            <div className="relative h-full min-h-0 w-full lg:absolute lg:inset-0">
              <PropertiesMapPanel markers={markers} />
            </div>
          </div>
        </aside>
      </div>
      {belowColumns != null ? (
        <div className="mx-auto w-full max-w-[1600px]">{belowColumns}</div>
      ) : null}
    </section>
  );
}
