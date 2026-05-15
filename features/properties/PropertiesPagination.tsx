"use client";

import Link from "next/link";
import { usePropertiesListingsNavigation } from "@/features/properties/PropertiesListingsNavigationContext";
import type { ReactNode } from "react";

type PropertiesPaginationProps = {
  page: number;
  totalPages: number;
  className?: string;
};

export default function PropertiesPagination({
  page,
  totalPages,
  className = "",
}: PropertiesPaginationProps) {
  if (totalPages <= 1) return null;

  const pages = buildPageNumbers(page, totalPages);

  return (
    <nav
      aria-label="Property listings pagination"
      className={`cursor-pointer bg-white px-6 pb-16 text-[#000759] md:px-10 ${className}`}
    >
      <ul className="mx-auto flex flex-wrap items-center justify-center gap-2">
        <li>
          <PaginationLink
            href={page > 1 ? `?page=${page - 1}` : undefined}
            targetPage={page > 1 ? page - 1 : undefined}
            label="Previous page"
            disabled={page <= 1}
          >
            Previous
          </PaginationLink>
        </li>

        {pages.map((item, index) =>
          item === "ellipsis" ? (
            <li
              key={`ellipsis-${index}`}
              className="px-2 text-sm text-[#4a5f9a]"
              aria-hidden
            >
              …
            </li>
          ) : (
            <li key={item}>
              <PaginationLink
                href={`?page=${item}`}
                targetPage={item}
                label={`Page ${item}`}
                active={item === page}
              >
                {item}
              </PaginationLink>
            </li>
          ),
        )}

        <li>
          <PaginationLink
            href={page < totalPages ? `?page=${page + 1}` : undefined}
            targetPage={page < totalPages ? page + 1 : undefined}
            label="Next page"
            disabled={page >= totalPages}
          >
            Next
          </PaginationLink>
        </li>
      </ul>
    </nav>
  );
}

function PaginationLink({
  href,
  targetPage,
  label,
  children,
  active = false,
  disabled = false,
}: {
  href?: string;
  /** Page index (1-based) for client navigation; omit when disabled. */
  targetPage?: number;
  label: string;
  children: ReactNode;
  active?: boolean;
  disabled?: boolean;
}) {
  const nav = usePropertiesListingsNavigation();

  const className = `inline-flex min-w-9 items-center justify-center rounded border px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] transition ${
    active
      ? "border-[#23408e] bg-[#23408e] text-white"
      : "border-[#d9dce5] text-[#23408e] hover:bg-[#f0f4fa]"
  } ${disabled ? "pointer-events-none opacity-40" : ""}`;

  if (!href || disabled) {
    return (
      <span className={className} aria-label={label} aria-disabled="true">
        {children}
      </span>
    );
  }

  if (active) {
    return (
      <span className={className} aria-label={label} aria-current="page">
        {children}
      </span>
    );
  }

  if (!nav || targetPage == null) {
    return (
      <Link
        href={href}
        scroll={false}
        className={className}
        aria-label={label}
      >
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={className}
      aria-label={label}
      aria-current={active ? "page" : undefined}
      onClick={(e) => {
        e.preventDefault();
        nav.navigateToPage(targetPage);
      }}
    >
      {children}
    </a>
  );
}

function buildPageNumbers(
  current: number,
  total: number,
): Array<number | "ellipsis"> {
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  const pages: Array<number | "ellipsis"> = [1];

  if (current > 3) pages.push("ellipsis");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let page = start; page <= end; page += 1) {
    pages.push(page);
  }

  if (current < total - 2) pages.push("ellipsis");

  pages.push(total);
  return pages;
}
