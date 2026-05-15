"use client";

import { useEffect, useRef, type ReactNode } from "react";

type PropertiesListingsListColumnProps = {
  page: number;
  children: ReactNode;
  className?: string;
};

/** Scroll anchor for pagination: after a new page loads, scroll the viewport to this block. */
export default function PropertiesListingsListColumn({
  page,
  children,
  className = "",
}: PropertiesListingsListColumnProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const isFirstPageRender = useRef(true);

  useEffect(() => {
    if (isFirstPageRender.current) {
      isFirstPageRender.current = false;
      return;
    }

    const el = rootRef.current;
    if (!el) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior: ScrollBehavior = prefersReducedMotion ? "auto" : "smooth";

    el.scrollIntoView({ behavior, block: "start" });
  }, [page]);

  return (
    <div
      ref={rootRef}
      className={
        "min-w-0 flex-1 basis-0 overflow-x-hidden scroll-mt-[var(--listing-map-top,112px)] px-6 md:px-10 " +
        className
      }
    >
      {children}
    </div>
  );
}
