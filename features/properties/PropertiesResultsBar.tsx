"use client";

import { usePropertiesListingsNavigation } from "@/features/properties/PropertiesListingsNavigationContext";
import {
  appendPropertiesSortParams,
  sortFieldHasDirection,
  type PropertiesSort,
  type SortDirection,
  type SortField,
} from "@/lib/properties/sortParams";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SORT_OPTIONS: {
  id: SortField;
  label: string;
  hasCaret: boolean;
}[] = [
  { id: "relevance", label: "Relevance", hasCaret: false },
  { id: "date", label: "Date", hasCaret: false },
  { id: "price", label: "Price", hasCaret: true },
  { id: "size", label: "Size", hasCaret: true },
];

const barTextClass =
  "text-[11px] font-semibold uppercase tracking-[0.08em]";

const sortButtonBaseClass =
  `${barTextClass} inline-flex items-center gap-1 transition hover:opacity-80`;

function SortCaret({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type PropertiesResultsBarProps = {
  start?: number;
  end?: number;
  total?: number;
  initialSort: PropertiesSort;
};

export default function PropertiesResultsBar({
  start = 1,
  end = 30,
  total = 1018,
  initialSort,
}: PropertiesResultsBarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const nav = usePropertiesListingsNavigation();
  const [sort, setSort] = useState<PropertiesSort>(initialSort);

  useEffect(() => {
    setSort(initialSort);
  }, [initialSort]);

  const formattedTotal = total.toLocaleString("en-US");

  const applySort = (next: PropertiesSort) => {
    setSort(next);

    const params = new URLSearchParams(searchParams.toString());
    params.delete("sort");
    params.delete("dir");
    appendPropertiesSortParams(params, next);
    params.delete("page");

    const qs = params.toString();
    const url = qs.length > 0 ? `${pathname}?${qs}` : pathname;

    if (nav) {
      nav.navigateListings(url);
      return;
    }

    window.location.assign(url);
  };

  const handleSortClick = (field: SortField) => {
    if (sortFieldHasDirection(field)) {
      if (sort.field === field) {
        const nextDirection: SortDirection =
          sort.direction === "desc" ? "asc" : "desc";
        applySort({ field, direction: nextDirection });
        return;
      }

      applySort({ field, direction: "desc" });
      return;
    }

    applySort({ field, direction: "desc" });
  };

  return (
    <section
      aria-label="Search results and sorting"
      className="w-full bg-[#f0f4fa] text-[#000759]"
    >
      <div className="mx-auto mt-2 flex w-full flex-wrap items-center justify-end gap-x-4 gap-y-2 px-6 py-7 md:px-10">
        <p className={barTextClass}>
          Results {start}-{end} of {formattedTotal}
        </p>

        <span className="hidden h-4 w-px bg-[#000759]/35 sm:block" aria-hidden />

        <div
          className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2"
          role="toolbar"
          aria-label="Sort results"
        >
          <span className={barTextClass}>Sort by</span>

          {SORT_OPTIONS.map((option) => {
            const isActive = sort.field === option.id;
            const direction =
              isActive && sortFieldHasDirection(option.id)
                ? sort.direction
                : null;

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSortClick(option.id)}
                className={`${sortButtonBaseClass} ${
                  isActive ? "text-[#3b82f6]" : "text-[#000759]"
                }`}
                aria-pressed={isActive}
                aria-label={
                  direction
                    ? `Sort by ${option.label}, ${direction === "desc" ? "high to low" : "low to high"}`
                    : `Sort by ${option.label}`
                }
              >
                {option.label}
                {option.hasCaret ? (
                  <SortCaret
                    className={`h-2.5 w-2.5 ${direction === "asc" ? "rotate-180" : ""}`}
                  />
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
