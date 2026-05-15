"use client";

import { useState } from "react";

type SortField = "relevance" | "date" | "price" | "size";

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
};

export default function PropertiesResultsBar({
  start = 1,
  end = 30,
  total = 1018,
}: PropertiesResultsBarProps) {
  const [sortBy, setSortBy] = useState<SortField>("price");
  const [sortDirections, setSortDirections] = useState<Record<"price" | "size", "asc" | "desc">>({
    price: "desc",
    size: "desc",
  });

  const formattedTotal = total.toLocaleString("en-US");

  const handleSortClick = (field: SortField) => {
    if (field === "price" || field === "size") {
      if (sortBy === field) {
        setSortDirections((current) => ({
          ...current,
          [field]: current[field] === "desc" ? "asc" : "desc",
        }));
      } else {
        setSortBy(field);
      }
      return;
    }

    setSortBy(field);
  };

  return (
    <section
      aria-label="Search results and sorting"
      className="w-full bg-[#f0f4fa] text-[#000759]"
    >
      <div className="mx-auto flex w-full flex-wrap items-center justify-end gap-x-4 gap-y-2 px-6 py-7 mt-2 md:px-10">
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
            const isActive = sortBy === option.id;
            const direction =
              option.id === "price" || option.id === "size"
                ? sortDirections[option.id]
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
