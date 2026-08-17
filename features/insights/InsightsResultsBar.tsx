"use client";

import {
  appendInsightsSortParams,
  insightsSortFieldHasDirection,
  type InsightsSort,
  type InsightsSortDirection,
  type InsightsSortField,
} from "@/lib/insights/sortParams";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SORT_OPTIONS: {
  id: InsightsSortField;
  label: string;
  hasCaret: boolean;
}[] = [
  { id: "relevance", label: "Relevance", hasCaret: false },
  { id: "date", label: "Date", hasCaret: true },
];

const barTextClass = "text-[11px] font-semibold uppercase tracking-[0.08em]";

const sortButtonBaseClass = `${barTextClass} inline-flex items-center gap-1 transition hover:opacity-80`;

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

type InsightsResultsBarProps = {
  start?: number;
  end?: number;
  total?: number;
  initialSort: InsightsSort;
};

export default function InsightsResultsBar({
  start = 1,
  end = 30,
  total = 0,
  initialSort,
}: InsightsResultsBarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sort, setSort] = useState<InsightsSort>(initialSort);

  useEffect(() => {
    setSort(initialSort);
  }, [initialSort]);

  const formattedTotal = total.toLocaleString("en-US");

  const applySort = (next: InsightsSort) => {
    setSort(next);

    const params = new URLSearchParams(searchParams.toString());
    params.delete("sort");
    params.delete("dir");
    appendInsightsSortParams(params, next);
    params.delete("page");

    const qs = params.toString();
    const url = qs.length > 0 ? `${pathname}?${qs}` : pathname;
    router.push(url, { scroll: false });
  };

  const handleSortClick = (field: InsightsSortField) => {
    if (insightsSortFieldHasDirection(field)) {
      if (sort.field === field) {
        const nextDirection: InsightsSortDirection =
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
              isActive && insightsSortFieldHasDirection(option.id)
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
                    ? `Sort by ${option.label}, ${direction === "desc" ? "newest first" : "oldest first"}`
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
