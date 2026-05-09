"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const NEWS_ITEMS = [
  {
    date: "Apr 18, 2026",
    dateTime: "2026-04-18",
    title: "Logistics hubs in Luzon: Capacity, rents, and tenant demand outlook",
  },
  {
    date: "Apr 20, 2026",
    dateTime: "2026-04-20",
    title: "Rising energy risks in the office sector: Who bears the cost?",
  },
  {
    date: "Apr 22, 2026",
    dateTime: "2026-04-22",
    title: "Retail footfall rebounds in Metro Manila malls as leasing stabilizes",
  },
  {
    date: "Apr 24, 2026",
    dateTime: "2026-04-24",
    title: "Industrial parks outside the capital: What investors are watching next",
  },
  {
    date: "Apr 26, 2026",
    dateTime: "2026-04-26",
    title: "Hospitality assets in secondary cities: Yield trends and buyer appetite",
  },
];

function wheelDeltaPixels(e: WheelEvent): number {
  let y = e.deltaY;
  if (e.deltaMode === 1) y *= 16;
  if (e.deltaMode === 2) y *= typeof window !== "undefined" ? window.innerHeight : 800;
  return y;
}

/**
 * Edge Tools flags `aria-valuemin={0}` / `aria-valuenow={expr}` on elements directly.
 * Spreading a helper keeps attributes valid for assistive tech and satisfies the rule.
 */
function newsScrollProgressbarAria(progressFraction: number) {
  const valueNow = Math.min(
    100,
    Math.max(0, Math.round(progressFraction * 100)),
  );
  return {
    "aria-valuemin": 0,
    "aria-valuemax": 100,
    "aria-valuenow": valueNow,
  } as const;
}

export default function HomeNewsInsights() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragStateRef = useRef<{
    pointerId: number;
    startX: number;
    startScrollLeft: number;
  } | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [centeredIndex, setCenteredIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const setScrollFromClientX = useCallback((clientX: number) => {
    const track = trackRef.current;
    const scroller = scrollerRef.current;
    if (!track || !scroller) return;
    const maxScroll = scroller.scrollWidth - scroller.clientWidth;
    if (maxScroll <= 0) return;
    const rect = track.getBoundingClientRect();
    const ratio = (clientX - rect.left) / rect.width;
    scroller.scrollLeft = Math.min(maxScroll, Math.max(0, ratio * maxScroll));
  }, []);

  const syncScrollState = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    setScrollProgress(maxScroll > 0 ? el.scrollLeft / maxScroll : 0);

    const cards = el.querySelectorAll<HTMLElement>("[data-news-card]");
    if (cards.length === 0) return;

    const containerRect = el.getBoundingClientRect();
    const centerX = containerRect.left + containerRect.width / 2;

    let bestIndex = 0;
    let bestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((node, index) => {
      const rect = node.getBoundingClientRect();
      const mid = rect.left + rect.width / 2;
      const distance = Math.abs(mid - centerX);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestIndex = index;
      }
    });

    setCenteredIndex(bestIndex);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    syncScrollState();

    el.addEventListener("scroll", syncScrollState, { passive: true });
    const ro = new ResizeObserver(syncScrollState);
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", syncScrollState);
      ro.disconnect();
    };
  }, [syncScrollState]);

  /** Map vertical wheel to horizontal scroll so mouse users can move the strip. */
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (el.scrollWidth <= el.clientWidth) return;
      const dx = e.deltaX;
      const dy = wheelDeltaPixels(e);
      if (Math.abs(dx) > Math.abs(dy)) return;
      e.preventDefault();
      el.scrollLeft += dy;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const highlightedIndex = hoveredIndex ?? centeredIndex;

  const onTrackPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setScrollFromClientX(e.clientX);
  };

  const onTrackPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
    setScrollFromClientX(e.clientX);
  };

  const onTrackPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
  };

  const onTrackKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const maxScroll = scroller.scrollWidth - scroller.clientWidth;
    if (maxScroll <= 0) return;
    const step = Math.max(80, scroller.clientWidth * 0.15);
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scroller.scrollBy({ left: -step, behavior: "smooth" });
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      scroller.scrollBy({ left: step, behavior: "smooth" });
    } else if (e.key === "Home") {
      e.preventDefault();
      scroller.scrollTo({ left: 0, behavior: "smooth" });
    } else if (e.key === "End") {
      e.preventDefault();
      scroller.scrollTo({ left: maxScroll, behavior: "smooth" });
    }
  };

  const onScrollerPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const scroller = scrollerRef.current;
    if (!scroller || scroller.scrollWidth <= scroller.clientWidth) return;
    e.preventDefault();
    dragStateRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startScrollLeft: scroller.scrollLeft,
    };
    scroller.setPointerCapture(e.pointerId);
  };

  const onScrollerPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragStateRef.current;
    const scroller = scrollerRef.current;
    if (!drag || !scroller || drag.pointerId !== e.pointerId) return;
    const deltaX = e.clientX - drag.startX;
    scroller.scrollLeft = drag.startScrollLeft - deltaX;
  };

  const endScrollerDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const scroller = scrollerRef.current;
    const drag = dragStateRef.current;
    if (!scroller || !drag || drag.pointerId !== e.pointerId) return;
    try {
      scroller.releasePointerCapture(e.pointerId);
    } catch {
      /* capture already released */
    }
    dragStateRef.current = null;
  };

  return (
    <section className="min-w-0 bg-white py-16 md:py-24">
      <div className="mx-auto w-full max-w-full px-6 sm:px-8 lg:px-12">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6b8cbe] md:text-xs">
          News &amp; expert insights
        </p>
        <h2 className="mt-3 max-w-3xl font-serif text-2xl font-normal leading-snug tracking-tight text-[#243768] md:text-4xl md:leading-tight">
          The latest real estate news, insights, and trends in the Philippines
        </h2>
      </div>

      <div
        ref={scrollerRef}
        id="home-news-insights-scroller"
        className="mt-10 flex w-full min-w-0 snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden scroll-smooth px-6 pb-10 [-webkit-overflow-scrolling:touch] sm:px-8 sm:pb-12 lg:px-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] md:cursor-grab md:select-none active:md:cursor-grabbing"
        role="region"
        aria-label="News and insights articles"
        onMouseLeave={() => setHoveredIndex(null)}
        onPointerDown={onScrollerPointerDown}
        onPointerMove={onScrollerPointerMove}
        onPointerUp={endScrollerDrag}
        onPointerCancel={endScrollerDrag}
      >
        {NEWS_ITEMS.map((item, index) => {
          const isHighlighted = index === highlightedIndex;

          return (
            <article
              key={item.title}
              data-news-card
              className={`relative w-[min(88vw,300px)] shrink-0 snap-center rounded-2xl px-6 py-7 transition-colors duration-200 sm:w-[min(72vw,320px)] md:w-[min(52vw,380px)] md:px-7 md:py-8 lg:w-[min(44vw,420px)] ${
                isHighlighted
                  ? "bg-[#243768] text-white shadow-md"
                  : "border border-[#dfe6f0] bg-[#eef2f8] text-[#243768]"
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
            >
              <time
                dateTime={item.dateTime}
                className={`block text-[10px] font-semibold uppercase tracking-[0.18em] md:text-[11px] ${
                  isHighlighted ? "text-white/75" : "text-[#243768]/55"
                }`}
              >
                {item.date}
              </time>
              <h3
                className={`mt-4 text-[15px] font-semibold leading-snug md:text-[17px] md:leading-snug ${
                  isHighlighted ? "text-white" : "text-[#243768]"
                }`}
              >
                {item.title}
              </h3>
            </article>
          );
        })}
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="py-2.5">
          <div
            ref={trackRef}
            role="progressbar"
            tabIndex={0}
            {...newsScrollProgressbarAria(scrollProgress)}
            aria-label="Article slider position; drag or use arrow keys to scroll articles"
            aria-controls="home-news-insights-scroller"
            className="relative h-1 w-full cursor-grab touch-none overflow-hidden rounded-full bg-[#c8d6ea] outline-none select-none active:cursor-grabbing focus-visible:ring-2 focus-visible:ring-[#243768] focus-visible:ring-offset-2"
            onPointerDown={onTrackPointerDown}
            onPointerMove={onTrackPointerMove}
            onPointerUp={onTrackPointerUp}
            onPointerCancel={onTrackPointerUp}
            onKeyDown={onTrackKeyDown}
          >
            <div
              className="pointer-events-none h-full rounded-full bg-[#243768] transition-[width] duration-150 ease-out"
              style={{ width: `${Math.max(4, scrollProgress * 100)}%` }}
            />
          </div>
        </div>

        <Link
          href="/insights"
          className="group mt-8 inline-flex items-center gap-4 text-sm font-semibold text-[#243768] transition-colors duration-300 ease-out hover:text-[#2f5fe3] focus-visible:text-[#2f5fe3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#243768]"
        >
          <span
            className="h-px w-0 shrink-0 bg-current transition-[width] duration-300 ease-out group-hover:w-10 group-focus-visible:w-10"
            aria-hidden="true"
          />
          View more insights
          <span className="h-px w-10 shrink-0 bg-current" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
