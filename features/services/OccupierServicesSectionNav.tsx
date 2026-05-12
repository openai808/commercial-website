"use client";

import type { MouseEvent } from "react";

export type SectionNavItem = { label: string; href: string };

function scrollToHash(href: string): boolean {
  if (!href.startsWith("#") || href === "#") return false;
  const id = decodeURIComponent(href.slice(1));
  const el = document.getElementById(id);
  if (!el) return false;

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  el.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "start",
  });
  window.history.pushState(null, "", href);
  return true;
}

export default function OccupierServicesSectionNav({
  items,
  className,
}: {
  items: SectionNavItem[];
  className?: string;
}) {
  function onClick(e: MouseEvent<HTMLAnchorElement>, href: string) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (scrollToHash(href)) {
      e.preventDefault();
    }
  }

  return (
    <nav aria-label="Occupier services sections" className={className}>
      {items.map(({ label, href }) => (
        <a
          key={label}
          href={href}
          onClick={(e) => onClick(e, href)}
          className="border-r border-[#c9ceda] px-2 last:border-r-0 hover:text-[#23408e]"
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
