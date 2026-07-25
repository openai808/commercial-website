"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
  type TransitionEvent,
} from "react";
import { createPortal } from "react-dom";
import ContactModal from "@/components/ContactModal";

type MegaIntroColumn = {
  kind: "intro";
  title: string;
  description: string;
  overviewLabel: string;
  overviewHref: string;
  featured?: {
    imageSrc: string;
    imageAlt: string;
    title: string;
    href: string;
    linkLabel?: string;
  };
};

type MegaLinkStackColumn = {
  kind: "linkStack";
  heading: string;
  headingHref?: string;
  items: { label: string; href: string; external?: boolean }[];
  viewAll?: { label: string; href: string };
};

type MegaSimpleList = {
  kind: "simple";
  title: string;
  items: { label: string; href: string }[];
};

type MegaSimpleGroup = {
  heading: string;
  headingHref: string;
  items: { label: string; href: string }[];
};

type MegaSimpleGroups = {
  kind: "simpleGroups";
  title: string;
  groups: [MegaSimpleGroup, MegaSimpleGroup, ...MegaSimpleGroup[]];
};

const PROPERTIES_FOR_LEASE_HREF = "/properties?listing=for-lease";
const PROPERTIES_FOR_SALE_HREF = "/properties?listing=for-sale";

type MegaMenu =
  | {
      /** Intro column plus two or more link stacks (desktop mega-menu layout). */
      kind: "columns";
      columns: [
        MegaIntroColumn,
        MegaLinkStackColumn,
        MegaLinkStackColumn,
        ...MegaLinkStackColumn[],
      ];
    }
  | MegaSimpleList
  | MegaSimpleGroups;

type NavItem = {
  id: string;
  href: string;
  label: string;
  mega?: MegaMenu;
  hidden?: boolean;
};

/** Edge Tools ARIA rule expects concrete "true" | "false" tokens, not boolean JSX props. */
function ariaExpandedProps(expanded: boolean) {
  return expanded
    ? { "aria-expanded": "true" as const }
    : { "aria-expanded": "false" as const };
}

const navConfig: NavItem[] = [
  {
    id: "services",
    href: "/services",
    label: "Services",
    mega: {
      kind: "simple",
      title: "Services",
      items: [
        { label: "Tenant Representation", href: "/services/tenant" },
        { label: "Landlord Representation", href: "/services/landlord" },
        {
          label: "Residential Services",
          href: "/services/residential-services",
        },
        {
          label: "Capital Markets & Investment Service",
          href: "/services/capital-markets-and-investment-services",
        },
        {
          label: "Title Conveyancing Service",
          href: "/services/title-conveyancing",
        },
        { label: "Property Vetting Service", href: "/services/property-vetting" },
      ],
    },
  },
  {
    id: "properties",
    href: "/properties",
    label: "Properties",
    mega: {
      kind: "simpleGroups",
      title: "Properties",
      groups: [
        {
          heading: "For Sale",
          headingHref: PROPERTIES_FOR_SALE_HREF,
          items: [
            { label: "Office", href: `${PROPERTIES_FOR_SALE_HREF}&type=office` },
            {
              label: "Industrial and Logistics",
              href: `${PROPERTIES_FOR_SALE_HREF}&type=industrial-and-logistics`,
            },
            {
              label: "Hotels and Hospitality",
              href: `${PROPERTIES_FOR_SALE_HREF}&type=hotels-and-hospitality`,
            },
            { label: "Retail", href: `${PROPERTIES_FOR_SALE_HREF}&type=retail` },
            {
              label: "Residential",
              href: `${PROPERTIES_FOR_SALE_HREF}&type=residential`,
            },
          ],
        },
        {
          heading: "For Lease",
          headingHref: PROPERTIES_FOR_LEASE_HREF,
          items: [
            { label: "Office", href: `${PROPERTIES_FOR_LEASE_HREF}&type=office` },
            {
              label: "Industrial and Logistics",
              href: `${PROPERTIES_FOR_LEASE_HREF}&type=industrial-and-logistics`,
            },
            {
              label: "Hotels and Hospitality",
              href: `${PROPERTIES_FOR_LEASE_HREF}&type=hotels-and-hospitality`,
            },
            { label: "Retail", href: `${PROPERTIES_FOR_LEASE_HREF}&type=retail` },
            {
              label: "Residential",
              href: `${PROPERTIES_FOR_LEASE_HREF}&type=residential`,
            },
          ],
        },
      ],
    },
  },
  {
    id: "blogs-and-news",
    href: "/blogs-and-news",
    label: "Insights",
    mega: {
      kind: "simpleGroups",
      title: "Insights",
      groups: [
        {
          heading: "Featured Content",
          headingHref: "/blogs-and-news",
          items: [
            { label: "Research Reports", href: "/blogs-and-news/reports" },
            { label: "RE/MAX Commercial Blog", href: "/blogs-and-news" },
          ],
        },
        {
          heading: "Property Type",
          headingHref: "/blogs-and-news",
          items: [
            { label: "Office", href: "/blogs-and-news?type=office" },
            {
              label: "Industrial and Logistics",
              href: "/blogs-and-news?type=industrial-and-logistics",
            },
            {
              label: "Hotels and Hospitality",
              href: "/blogs-and-news?type=hotels-and-hospitality",
            },
            { label: "Retail", href: "/blogs-and-news?type=retail" },
            { label: "Residential", href: "/blogs-and-news?type=residential" },
          ],
        },
      ],
    },
  },
  {
    id: "about-us",
    href: "/about-us",
    label: "About Us",
    mega: {
      kind: "simple",
      title: "About Us",
      items: [
        { label: "Company", href: "/about-us" },
        {
          label: "Leadership",
          href: "/about-us/global-executive-leadership",
        },
        { label: "REMAX News", href: "/news" },
      ],
    },
  },
  {
    hidden: true,
    id: "people-offices",
    href: "/people-and-offices",
    label: "People & Offices",
  },
  {
    hidden: true,
    id: "careers",
    href: "/careers",
    label: "Careers",
    mega: {
      kind: "columns",
      columns: [
        {
          kind: "intro",
          title: "Careers",
          description:
            "Find your next opportunity on the world's leading commercial real estate services and investment team.",
          overviewLabel: "Explore Careers",
          overviewHref: "/careers",
          featured: {
            imageSrc:
              "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=320&q=80",
            imageAlt: "Professional portrait for careers blog",
            title: "Explore how we help businesses and people thrive",
            href: "/careers/blog",
            linkLabel: "Learn More",
          },
        },
        {
          kind: "linkStack",
          heading: "Working at REMAX/8",
          items: [
            {
              label: "Interview Accomodations",
              href: "/careers/interview-accommodations",
            },
            { label: "FAQs", href: "/careers/faqs" },
            { label: "Our Benefits", href: "/careers/benefits" },
            { label: "Our Values-Driven Culture", href: "/careers/culture" },
            { label: "Military", href: "/careers/military" },
            { label: "Search Jobs", href: "/careers/jobs" },
          ],
        },
        {
          kind: "linkStack",
          heading: "Our Career Opportunities",
          items: [
            { label: "Sales & Consulting", href: "/careers/sales-consulting" },
            {
              label: "Digital & Technology",
              href: "/careers/digital-technology",
            },
            {
              label: "Building Operations & Management",
              href: "/careers/building-operations-management",
            },
            {
              label: "Project Management",
              href: "/careers/project-management",
            },
            { label: "Corporate", href: "/careers/corporate" },
            {
              label: "Investment Management",
              href: "/careers/investment-management",
            },
            { label: "Students & Grads", href: "/careers/students-grads" },
          ],
        },
        {
          kind: "linkStack",
          heading: "Learn More",
          items: [
            {
              label: "Thrive at CBRE Careers Blog",
              href: "/careers/blog",
            },
            {
              label: "Join our Talent Community",
              href: "/careers/talent-community",
            },
            { label: "Meet Our Leaders", href: "/careers/leaders" },
            { label: "Our Culture", href: "/careers/culture" },
            { label: "What We Do", href: "/careers/what-we-do" },
          ],
        },
      ],
    },
  },
];

function LinkStackRowChevron() {
  return (
    <span className="shrink-0 text-sm font-light text-zinc-300" aria-hidden>
      ›
    </span>
  );
}

function ExternalLinkMark() {
  return (
    <span className="ml-1 text-[11px] text-zinc-400" aria-hidden>
      ↗
    </span>
  );
}

function AccentRuleLink({
  href,
  children,
  className = "",
  onClick,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group/va inline-flex items-center gap-2 text-sm text-[#000759] transition-opacity duration-200 ease-in-out hover:opacity-80 ${className}`}
    >
      <span
        className="h-px w-6 shrink-0 bg-emerald-400 transition-colors group-hover/va:bg-emerald-500"
        aria-hidden
      />
      {children}
    </Link>
  );
}

function IntroMegaColumn({
  column,
  motionClass,
}: {
  column: MegaIntroColumn;
  motionClass: string;
}) {
  return (
    <div
      className={`min-w-0 border-b border-zinc-200 pb-10 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-10 ${motionClass}`}
    >
      <h2 className="font-serif text-3xl font-normal tracking-tight text-[#000759] sm:text-4xl">
        {column.title}
      </h2>
      <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-600">
        {column.description}
      </p>
      <Link
        href={column.overviewHref}
        className="mt-6 inline-flex items-center justify-center bg-[#000759] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[#001a8f]"
      >
        {column.overviewLabel}
      </Link>
      {column.featured && (
        <div className="mt-10 border-t border-zinc-200 pt-8">
          <Link
            href={column.featured.href}
            className="group/feat flex gap-4 transition-opacity hover:opacity-90"
          >
            <div className="relative h-[4.5rem] w-[5.5rem] shrink-0 overflow-hidden bg-zinc-100 sm:h-[5rem] sm:w-24">
              <Image
                src={column.featured.imageSrc}
                alt={column.featured.imageAlt}
                fill
                className="object-cover transition duration-300 group-hover/feat:scale-[1.03]"
                sizes="96px"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-serif text-base font-normal leading-snug text-[#000759] sm:text-lg">
                {column.featured.title}
              </p>
              <span className="mt-3 inline-flex items-center gap-2 text-sm text-[#000759]">
                <span
                  className="h-px w-6 shrink-0 bg-emerald-400 transition-colors group-hover/feat:bg-emerald-500"
                  aria-hidden
                />
                {column.featured.linkLabel ?? "Learn more"}
              </span>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}

function LinkStackMegaColumn({
  column,
  isLast,
  stackIndex,
  motionClass,
}: {
  column: MegaLinkStackColumn;
  isLast: boolean;
  stackIndex: number;
  motionClass: string;
}) {
  return (
    <div
      className={`min-w-0 ${stackIndex === 0 ? "pt-6 sm:pt-8" : "pt-8 sm:pt-10"} pb-8 sm:pb-10 lg:py-0 lg:pl-10 ${isLast ? "" : "border-b border-zinc-200 lg:border-b-0 lg:border-r"} ${motionClass}`}
    >
      {column.heading && (
        <h3 className="font-serif text-sm font-normal tracking-wide text-zinc-500">
          {column.headingHref ? (
            <Link
              href={column.headingHref}
              className="transition-colors duration-200 ease-in-out hover:text-[#000759]"
            >
              {column.heading}
            </Link>
          ) : (
            column.heading
          )}
        </h3>
      )}
      <ul className={column.heading ? "mt-5" : "mt-0"}>
        {column.items.map((item) => (
          <li
            key={item.href}
            className="border-b border-zinc-200 first:border-t"
          >
            <Link
              href={item.href}
              className="flex items-center justify-between gap-3 py-3.5 text-sm font-semibold text-[#000759] transition-colors duration-200 ease-in-out hover:text-[#001a8f]"
            >
              <span className="min-w-0">
                {item.label}
                {item.external && <ExternalLinkMark />}
              </span>
              <LinkStackRowChevron />
            </Link>
          </li>
        ))}
      </ul>
      {column.viewAll && (
        <div className="mt-6">
          <AccentRuleLink href={column.viewAll.href}>
            {column.viewAll.label}
          </AccentRuleLink>
        </div>
      )}
    </div>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg
        className="cursor-pointer h-6 w-6 text-[#000759]"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path
          d="M6 6l12 12M18 6L6 18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  return (
    <svg className="h-6 w-6 text-[#000759]" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M4 7h16M4 12h16M4 17h16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MobileMenuRowArrow({ expanded }: { expanded: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      aria-hidden
      className={`cursor-pointer shrink-0 text-[#000759] transition-transform duration-200 ease-in-out ${expanded ? "rotate-90" : ""}`}
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MobileSearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5V10.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseSearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        d="M6 6l12 12M18 6L6 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="12"
      height="12"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        d="M6 9l6 6 6-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MobileNavGroup({
  item,
  onNavigate,
}: {
  item: (typeof navConfig)[number];
  onNavigate: () => void;
}) {
  if (!item.mega) {
    return (
      <div className="border-b border-[#000759]/25">
        <Link
          href={item.href}
          className="flex w-full items-center justify-between gap-4 py-5 text-left font-montserrat text-xl font-normal tracking-tight text-[#000759] transition-colors duration-200 ease-in-out hover:text-[#001a8f] sm:py-6 sm:text-2xl"
          onClick={onNavigate}
        >
          {item.label}
          <LinkStackRowChevron />
        </Link>
      </div>
    );
  }

  const [expanded, setExpanded] = useState(false);
  const mega = item.mega;

  if (mega.kind === "simple") {
    return (
      <div className="border-b border-[#000759]/25">
        <div className="flex w-full items-center justify-between gap-4 py-5 sm:py-6">
          <Link
            href={item.href}
            className="flex-1 text-left font-montserrat text-xl font-normal tracking-tight text-[#000759] transition-colors duration-200 ease-in-out hover:text-[#001a8f] sm:text-2xl"
            onClick={onNavigate}
          >
            {item.label}
          </Link>
          <button
            type="button"
            className="shrink-0 rounded p-1 text-[#000759] transition-colors duration-200 ease-in-out hover:text-[#001a8f]"
            onClick={() => setExpanded((v) => !v)}
            aria-label={expanded ? `Collapse ${item.label} menu` : `Expand ${item.label} menu`}
            {...ariaExpandedProps(expanded)}
            {...(expanded
              ? { "aria-controls": `mobile-nav-section-${item.id}` }
              : {})}
          >
            <MobileMenuRowArrow expanded={expanded} />
          </button>
        </div>
        <div
          className={`grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
        >
          <div
            id={`mobile-nav-section-${item.id}`}
            className="min-h-0 overflow-hidden"
          >
            <ul className="space-y-1 pb-4 pl-1">
              {mega.items.map((l) => (
                <li key={l.href} className="border-b border-zinc-200 first:border-t">
                  <Link
                    href={l.href}
                    className="flex items-center justify-between gap-2 py-3 text-base text-[#000759] transition-colors duration-200 ease-in-out hover:text-[#001a8f]"
                    onClick={onNavigate}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (mega.kind === "simpleGroups") {
    return (
      <div className="border-b border-[#000759]/25">
        <div className="flex w-full items-center justify-between gap-4 py-5 sm:py-6">
          <Link
            href={item.href}
            className="flex-1 text-left font-montserrat text-xl font-normal tracking-tight text-[#000759] transition-colors duration-200 ease-in-out hover:text-[#001a8f] sm:text-2xl"
            onClick={onNavigate}
          >
            {item.label}
          </Link>
          <button
            type="button"
            className="shrink-0 rounded p-1 text-[#000759] transition-colors duration-200 ease-in-out hover:text-[#001a8f]"
            onClick={() => setExpanded((v) => !v)}
            aria-label={expanded ? `Collapse ${item.label} menu` : `Expand ${item.label} menu`}
            {...ariaExpandedProps(expanded)}
            {...(expanded
              ? { "aria-controls": `mobile-nav-section-${item.id}` }
              : {})}
          >
            <MobileMenuRowArrow expanded={expanded} />
          </button>
        </div>
        <div
          className={`grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
        >
          <div
            id={`mobile-nav-section-${item.id}`}
            className="min-h-0 overflow-hidden"
          >
            <div className="space-y-6 pb-4 pl-1">
              {mega.groups.map((group) => (
                <div key={group.heading}>
                  <Link
                    href={group.headingHref}
                    className="block text-base font-semibold text-red-600 transition-colors duration-200 ease-in-out hover:text-red-700"
                    onClick={onNavigate}
                  >
                    {group.heading}
                  </Link>
                  <ul className="mt-2">
                    {group.items.map((l) => (
                      <li
                        key={l.href}
                        className="border-b border-zinc-200 first:border-t"
                      >
                        <Link
                          href={l.href}
                          className="flex items-center justify-between gap-2 py-2.5 text-base text-[#000759] transition-colors duration-200 ease-in-out hover:text-[#001a8f]"
                          onClick={onNavigate}
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const [intro, ...stacks] = mega.columns;
  if (
    intro?.kind !== "intro" ||
    stacks.length < 2 ||
    !stacks.every((c) => c.kind === "linkStack")
  ) {
    return null;
  }

  return (
    <div className="border-b border-[#000759]/25">
      <div className="flex w-full items-center justify-between gap-4 py-5 sm:py-6">
        <Link
          href={item.href}
          className="flex-1 text-left font-montserrat text-xl font-normal tracking-tight text-[#000759] transition-colors duration-200 ease-in-out hover:text-[#001a8f] sm:text-2xl"
          onClick={onNavigate}
        >
          {item.label}
        </Link>
        <button
          type="button"
          className="shrink-0 rounded p-1 text-[#000759] transition-colors duration-200 ease-in-out hover:text-[#001a8f]"
          onClick={() => setExpanded((v) => !v)}
          aria-label={expanded ? `Collapse ${item.label} menu` : `Expand ${item.label} menu`}
          {...ariaExpandedProps(expanded)}
          {...(expanded
            ? { "aria-controls": `mobile-nav-section-${item.id}` }
            : {})}
        >
          <MobileMenuRowArrow expanded={expanded} />
        </button>
      </div>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div
          id={`mobile-nav-section-${item.id}`}
          className="min-h-0 overflow-hidden"
        >
          <div className="space-y-6 pb-4 pl-1">
            <div>
              <p className="font-serif text-2xl text-[#000759]">
                {intro.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                {intro.description}
              </p>
              <Link
                href={intro.overviewHref}
                className="mt-4 inline-flex w-full items-center justify-center bg-[#000759] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#001a8f]"
                onClick={onNavigate}
              >
                {intro.overviewLabel}
              </Link>
              {intro.featured && (
                <Link
                  href={intro.featured.href}
                  className="mt-6 flex gap-3 border-t border-zinc-200 pt-6"
                  onClick={onNavigate}
                >
                  <div className="relative h-16 w-20 shrink-0 overflow-hidden bg-zinc-100">
                    <Image
                      src={intro.featured.imageSrc}
                      alt={intro.featured.imageAlt}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-serif text-base text-[#000759]">
                      {intro.featured.title}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-2 text-sm text-[#000759]">
                      <span
                        className="h-px w-5 shrink-0 bg-emerald-400"
                        aria-hidden
                      />
                      {intro.featured.linkLabel ?? "Learn more"}
                    </span>
                  </div>
                </Link>
              )}
            </div>
            {stacks.map((col) => (
              <div key={col.heading}>
                <p className="font-serif text-sm text-zinc-500">
                  {col.headingHref ? (
                    <Link
                      href={col.headingHref}
                      className="transition-colors duration-200 ease-in-out hover:text-[#000759]"
                      onClick={onNavigate}
                    >
                      {col.heading}
                    </Link>
                  ) : (
                    col.heading
                  )}
                </p>
                <ul className="mt-2">
                  {col.items.map((l) => (
                    <li
                      key={l.href}
                      className="border-b border-zinc-200 first:border-t"
                    >
                      <Link
                        href={l.href}
                        className="flex items-center justify-between gap-2 py-2.5 text-sm font-semibold text-[#000759] transition-colors duration-200 ease-in-out hover:text-[#001a8f]"
                        onClick={onNavigate}
                      >
                        <span>
                          {l.label}
                          {l.external && <ExternalLinkMark />}
                        </span>
                        <LinkStackRowChevron />
                      </Link>
                    </li>
                  ))}
                </ul>
                {col.viewAll && (
                  <div className="mt-3">
                    <AccentRuleLink
                      href={col.viewAll.href}
                      onClick={onNavigate}
                    >
                      {col.viewAll.label}
                    </AccentRuleLink>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SimpleMegaPanel({
  mega,
  motionClass,
}: {
  mega: MegaSimpleList;
  motionClass: string;
}) {
  return (
    <div className="bg-[#f4f4f4] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.12)]">
      <div className="mx-auto w-full px-6">
        <div className="mx-auto w-full max-w-6xl px-7 py-10 lg:py-12">
          <div
            className={`flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8 lg:gap-12 ${motionClass}`}
          >
            <h2 className="shrink-0 font-gotham text-[28px] font-extrabold tracking-wide text-[#000759] sm:mr-4 sm:text-[34px] lg:mr-9 lg:text-[42px]">
              {mega.title}
            </h2>
            <div
              className="hidden w-[3px] shrink-0 self-stretch bg-black sm:block"
              aria-hidden
            />
            <ul className="flex min-w-0 flex-col gap-3">
              {mega.items.map((item) => (
                <li key={item.href} className="min-w-0">
                  <Link
                    href={item.href}
                    className="block text-base text-[#000759]/85 transition-colors duration-200 ease-in-out hover:text-[#000759]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function SimpleGroupsMegaPanel({
  mega,
  motionClass,
}: {
  mega: MegaSimpleGroups;
  motionClass: string;
}) {
  return (
    <div className="bg-[#f4f4f4] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.12)]">
      <div className="mx-auto w-full px-6">
        <div className="mx-auto w-full max-w-6xl px-7 py-10 lg:py-12">
          <div
            className={`flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8 lg:gap-12 ${motionClass}`}
          >
            <h2 className="shrink-0 font-gotham text-[28px] font-extrabold tracking-wide text-[#000759] sm:self-center sm:text-[34px] lg:text-[42px]">
              {mega.title}
            </h2>
            {mega.groups.map((group, index) => (
              <div key={group.heading} className="flex gap-6 min-w-0 sm:contents">
                <div
                  className={`hidden w-[3px] shrink-0 self-stretch bg-black sm:block ${index > 0 ? "sm:ml-[30px] md:ml-[50px] lg:ml-[70px] xl:ml-[90px]" : ""}`}
                  aria-hidden
                />
                <ul className="flex min-w-0 flex-col gap-3">
                  <li>
                    <Link
                      href={group.headingHref}
                      className="block text-base font-semibold text-red-600 transition-colors duration-200 ease-in-out hover:text-red-700"
                    >
                      {group.heading}
                    </Link>
                  </li>
                  {group.items.map((item) => (
                    <li key={item.href} className="min-w-0">
                      <Link
                        href={item.href}
                        className="block text-base text-[#000759]/85 transition-colors duration-200 ease-in-out hover:text-[#000759]"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MegaMenuPanel({
  mega,
  subReveal = true,
}: {
  mega: MegaMenu;
  subReveal?: boolean;
}) {
  const colMotion =
    "transition-[opacity,transform] duration-200 ease-in-out motion-reduce:transition-none motion-reduce:translate-y-0 motion-reduce:opacity-100";

  const colClass = (delayClass: string) =>
    `${colMotion} ${subReveal ? `translate-y-0 opacity-100 ${delayClass}` : "translate-y-2 opacity-0 delay-0 lg:[transition-delay:0ms]"}`;

  if (mega.kind === "simple") {
    return (
      <SimpleMegaPanel
        mega={mega}
        motionClass={colClass("delay-0 lg:[transition-delay:0ms]")}
      />
    );
  }

  if (mega.kind === "simpleGroups") {
    return (
      <SimpleGroupsMegaPanel
        mega={mega}
        motionClass={colClass("delay-0 lg:[transition-delay:0ms]")}
      />
    );
  }

  const [intro, ...stacks] = mega.columns;
  if (intro?.kind !== "intro" || stacks.length < 2) {
    return null;
  }

  return (
    <div className="bg-white shadow-[0_24px_48px_-12px_rgba(0,0,0,0.12)]">
      <div className="mx-auto w-full px-6">
        <div className="mx-auto w-full px-7 py-10 lg:py-12">
          <div
            className={`grid gap-0 ${
              stacks.length === 2
                ? "lg:grid-cols-[minmax(260px,1.1fr)_1fr_1fr]"
                : "lg:grid-cols-[minmax(260px,1.1fr)_1fr_1fr_1fr]"
            }`}
          >
            <IntroMegaColumn
              column={intro}
              motionClass={colClass("delay-0 lg:[transition-delay:0ms]")}
            />
            {stacks.map((stack, index) => (
              <LinkStackMegaColumn
                key={`${stack.heading}-${index}`}
                column={stack}
                stackIndex={index}
                isLast={index === stacks.length - 1}
                motionClass={colClass(
                  index === 0
                    ? "delay-75 lg:[transition-delay:75ms]"
                    : index === 1
                      ? "delay-150 lg:[transition-delay:150ms]"
                      : "delay-200 lg:[transition-delay:200ms]",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Re-runs sub-item transitions when `menuId` changes (each top-level nav hover). */
function MegaMenuHoverAnimation({
  menuId,
  mega,
}: {
  menuId: string;
  mega: MegaMenu;
}) {
  const [reveal, setReveal] = useState(true);
  const prevMenuIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (prevMenuIdRef.current === null) {
      prevMenuIdRef.current = menuId;
      setReveal(true);
      return;
    }
    if (prevMenuIdRef.current === menuId) return;
    prevMenuIdRef.current = menuId;

    let raf1 = 0;
    let raf2 = 0;
    let raf3 = 0;
    raf1 = requestAnimationFrame(() => {
      setReveal(false);
      raf2 = requestAnimationFrame(() => {
        raf3 = requestAnimationFrame(() => setReveal(true));
      });
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      cancelAnimationFrame(raf3);
    };
  }, [menuId]);

  return <MegaMenuPanel mega={mega} subReveal={reveal} />;
}

function DesktopHeaderSection({
  openId,
  desktopSearchOpen,
  desktopSearchInputRef,
  hideSearch,
  onOpenMega,
  onCloseMega,
  onOpenSearch,
  onCloseSearch,
  onOpenContact,
}: {
  openId: string | null;
  desktopSearchOpen: boolean;
  desktopSearchInputRef: RefObject<HTMLInputElement | null>;
  hideSearch: boolean;
  onOpenMega: (id: string) => void;
  onCloseMega: () => void;
  onOpenSearch: () => void;
  onCloseSearch: () => void;
  onOpenContact: () => void;
}) {
  if (desktopSearchOpen && !hideSearch) {
    return (
      <div className="hidden min-w-0 flex-1 items-center gap-6 lg:flex">
        <Link
          href="/"
          className="shrink-0 text-lg font-semibold tracking-tight"
          onClick={onCloseMega}
        >
          <Image
            src="/logo_black.png"
            alt="RE/MAX"
            width={200}
            height={200}
            className="h-8 w-auto sm:h-9 lg:h-12"
            priority
          />
        </Link>

        <form
          role="search"
          className="ml-2 flex min-w-0 flex-1 items-center border border-[#000759]"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <label className="sr-only" htmlFor="header-search">
            Search
          </label>
          <input
            ref={desktopSearchInputRef}
            id="header-search"
            type="search"
            placeholder="What are you looking for?"
            className="min-h-[44px] min-w-0 flex-1 border-0 bg-white px-4 text-base text-[#000759] outline-none placeholder:text-[#000759]/65 focus-visible:ring-2 focus-visible:ring-[#000759] focus-visible:ring-inset"
          />
          <button
            type="submit"
            className="shrink-0 px-3 py-2 text-[#000759] transition hover:opacity-70 cursor-pointer"
            aria-label="Submit search"
          >
            <MobileSearchIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="cursor-pointer shrink-0 px-2 py-2 text-[#000759] transition hover:opacity-70"
            aria-label="Close search"
            onClick={onCloseSearch}
          >
            <CloseSearchIcon className="h-5 w-5" />
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex min-w-0 flex-1 items-center justify-between gap-6 lg:gap-12">
      <Link
        href="/"
        className="shrink-0 text-lg font-semibold tracking-tight"
        onClick={onCloseMega}
      >
        <Image
          src="/logo_black.png"
          alt="RE/MAX"
          width={200}
          height={200}
          className="h-8 w-auto sm:h-9 lg:h-12"
          priority
        />
      </Link>

      <div className="hidden min-w-0 items-center gap-6 lg:flex xl:gap-10">
        <nav
          aria-label="Main navigation"
          className={`min-w-0 ${desktopSearchOpen ? "lg:hidden" : ""}`}
        >
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 font-montserrat text-[10.2px] font-bold uppercase tracking-[0.314em] text-[#000e35] xl:gap-x-10 xl:text-[11.5px] 2xl:text-[13px]">
            {navConfig
              .filter((item) => !item.hidden)
              .map((item) => (
                <li
                  key={item.id}
                  onMouseEnter={() => {
                    if (item.mega) onOpenMega(item.id);
                    else onCloseMega();
                  }}
                  className="relative"
                >
                  <Link
                    id={`nav-trigger-${item.id}`}
                    href={item.href}
                    onClick={onCloseMega}
                    onFocus={() => {
                      if (item.mega) onOpenMega(item.id);
                      else onCloseMega();
                    }}
                    aria-haspopup={item.mega ? "true" : undefined}
                    aria-expanded={
                      item.mega
                        ? openId === item.id
                          ? "true"
                          : "false"
                        : undefined
                    }
                    className={`inline-flex items-center gap-1.5 no-underline transition-colors duration-300 ease-in-out ${openId === item.id ? "font-bold text-[#000e35]" : "text-[#000e35]"} after:absolute after:left-0 after:-bottom-1
                  after:h-[2px] after:w-0 after:bg-[#000e35]
                  after:transition-all after:duration-300 after:ease-in-out
                  hover:after:w-full`}
                  >
                    {item.label}
                    {item.mega && (
                      <ChevronDownIcon
                        className={`h-3 w-3 shrink-0 transition-transform duration-300 ease-in-out ${openId === item.id ? "rotate-180" : ""}`}
                      />
                    )}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>

        {!hideSearch && (
          <button
            type="button"
            className="cursor-pointer flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#c5d3f0] bg-white text-[#000759] shadow-sm transition-colors hover:border-[#000759] hover:bg-[#000759] hover:text-white dark:border-[#4a5a8a] dark:text-[#000759] dark:hover:border-[#000759] dark:hover:bg-[#000759] dark:hover:text-white"
            aria-label="Open search"
            onClick={onOpenSearch}
          >
            <MobileSearchIcon className="h-[22px] w-[22px]" />
          </button>
        )}
        <button
          type="button"
          className="cursor-pointer shrink-0 bg-[#000759] px-2 rounded-sm text-[10.2px] font-bold uppercase tracking-[0.15em] text-white transition hover:bg-[#001a8f] xl:text-[11.5px] 2xl:text-[13px]"
          onClick={onOpenContact}
        >
          Contact Us
        </button>
      </div>
    </div>
  );
}

function MobileHeaderSection({
  mounted,
  mobileOpen,
  mobileSearchInputRef,
  pathname,
  hideSearch,
  closeMobile,
  toggleMobile,
  onOpenContact,
}: {
  mounted: boolean;
  mobileOpen: boolean;
  mobileSearchInputRef: RefObject<HTMLInputElement | null>;
  pathname: string;
  hideSearch: boolean;
  closeMobile: () => void;
  toggleMobile: () => void;
  onOpenContact: () => void;
}) {
  const [portalMounted, setPortalMounted] = useState(false);
  const [panelVisible, setPanelVisible] = useState(false);

  useEffect(() => {
    let raf1 = 0;
    let raf2 = 0;
    if (mobileOpen) {
      raf1 = requestAnimationFrame(() => {
        setPortalMounted(true);
        raf2 = requestAnimationFrame(() => setPanelVisible(true));
      });
    } else {
      raf1 = requestAnimationFrame(() => setPanelVisible(false));
    }
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [mobileOpen]);

  const onMobilePanelTransitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    if (e.propertyName !== "opacity") return;
    if (!mobileOpen) setPortalMounted(false);
  };

  return (
    <>
      <div className="flex items-center gap-3 lg:hidden">
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md text-[#000759] transition hover:bg-zinc-100"
          {...ariaExpandedProps(mobileOpen)}
          {...(mobileOpen ? { "aria-controls": "mobile-navigation" } : {})}
          onClick={toggleMobile}
        >
          <span className="sr-only">
            {mobileOpen ? "Close menu" : "Open menu"}
          </span>
          <HamburgerIcon open={mobileOpen} />
        </button>
      </div>

      {mounted &&
        portalMounted &&
        createPortal(
          <div
            id="mobile-navigation"
            className={`fixed inset-0 z-[200] flex max-h-[100dvh] flex-col bg-white text-[#000759] transition-[opacity,transform] duration-300 ease-in-out motion-reduce:transition-none lg:hidden ${
              panelVisible
                ? "translate-y-0 opacity-100 motion-reduce:translate-y-0"
                : "pointer-events-none translate-y-2 opacity-0 motion-reduce:translate-y-0"
            }`}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            onTransitionEnd={onMobilePanelTransitionEnd}
          >
            <div className="mx-auto w-full shrink-0 px-6">
              <div className="mx-auto flex w-full items-center justify-between gap-4 px-7 py-3 sm:py-5">
                <Link href="/" className="shrink-0" onClick={closeMobile}>
                  <Image
                    src="/logo_black.png"
                    alt="RE/MAX"
                    width={120}
                    height={40}
                    className="h-8 w-auto sm:h-9"
                  />
                </Link>
                <div className="flex shrink-0 items-center gap-3">
                  <button
                    type="button"
                    className="cursor-pointer flex h-10 w-10 items-center justify-center rounded-md text-[#000759] transition hover:bg-zinc-100"
                    onClick={closeMobile}
                    aria-label="Close menu"
                  >
                    <svg
                      className="cursor-pointer h-6 w-6"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path
                        d="M6 6l12 12M18 6L6 18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="mx-auto w-full shrink-0 px-6 pb-2">
              <div className="mx-auto w-full px-7">
                <button
                  type="button"
                  className="cursor-pointer block w-full bg-[#000759] px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.15em] text-white transition hover:bg-[#001a8f]"
                  onClick={() => {
                    closeMobile();
                    onOpenContact();
                  }}
                >
                  Contact Us
                </button>
              </div>
            </div>

            {!hideSearch && (
              <div className="mx-auto w-full shrink-0 px-6 pb-2 pt-2">
                <div className="mx-auto w-full px-7">
                  <form
                    role="search"
                    className="pt-1"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <div className="ml-auto flex h-11 w-full items-center overflow-hidden border-b border-[#000759] bg-white">
                      <label className="sr-only" htmlFor="header-search-mobile">
                        Search
                      </label>
                      <input
                        ref={mobileSearchInputRef}
                        id="header-search-mobile"
                        type="text"
                        inputMode="search"
                        enterKeyHint="search"
                        placeholder="What are you looking for?"
                        className="min-w-0 flex-1 border-0 bg-transparent py-1 pr-2 text-base text-[#000759] placeholder:text-[#000759]/70 outline-none focus-visible:ring-2 focus-visible:ring-[#000759] focus-visible:ring-inset"
                      />
                      <button
                        type="submit"
                        className="shrink-0 px-2 py-1 text-[#000759] transition hover:opacity-70"
                        aria-label="Submit search"
                      >
                        <MobileSearchIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <nav
              className="min-h-0 min-w-0 flex-1 overflow-y-auto overscroll-contain px-6 pb-10 pt-2"
              aria-label="Mobile navigation"
            >
              <div className="mx-auto w-full px-7" key={pathname}>
                {navConfig
                  .filter((item) => !item.hidden)
                  .map((item) => (
                    <MobileNavGroup
                      key={item.id}
                      item={item}
                      onNavigate={closeMobile}
                    />
                  ))}
              </div>
            </nav>
          </div>,
          document.body,
        )}
    </>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [openId, setOpenId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [desktopSearchOpen, setDesktopSearchOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [megaPanelMega, setMegaPanelMega] = useState<MegaMenu | null>(null);
  const [megaPanelOpen, setMegaPanelOpen] = useState(false);
  const [lastHoveredMenuId, setLastHoveredMenuId] = useState<string | null>(
    null,
  );
  const desktopSearchInputRef = useRef<HTMLInputElement>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (desktopSearchOpen) {
      desktopSearchInputRef.current?.focus();
    }
  }, [desktopSearchOpen]);

  useEffect(() => {
    if (!desktopSearchOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDesktopSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [desktopSearchOpen]);

  useEffect(() => {
    if (!openId) return;
    const currentOpenId = openId;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenId(null);
        document.getElementById(`nav-trigger-${currentOpenId}`)?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openId]);

  const handleEnter = useCallback((id: string) => {
    setLastHoveredMenuId(id);
    setOpenId(id);
  }, []);

  const handleLeave = useCallback(() => {
    setOpenId(null);
  }, []);

  useEffect(() => {
    let raf1 = 0;
    let raf2 = 0;
    if (openId) {
      const mega = navConfig.find((n) => n.id === openId)?.mega ?? null;
      if (!mega) return;
      raf1 = requestAnimationFrame(() => {
        setMegaPanelMega(mega);
        raf2 = requestAnimationFrame(() => setMegaPanelOpen(true));
      });
    } else {
      raf1 = requestAnimationFrame(() => setMegaPanelOpen(false));
    }
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [openId]);

  const onDesktopMegaShellTransitionEnd = useCallback(
    (e: TransitionEvent<HTMLDivElement>) => {
      if (e.target !== e.currentTarget) return;
      if (e.propertyName !== "opacity" && e.propertyName !== "transform")
        return;
      if (!openId) setMegaPanelMega(null);
    },
    [openId],
  );

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const closeDesktopMega = useCallback(() => setOpenId(null), []);

  useEffect(() => {
    closeMobile();
    setOpenId(null);
  }, [pathname, closeMobile]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobile();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen, closeMobile]);

  const megaMenuAnimId = openId ?? lastHoveredMenuId ?? "";

  return (
    <header
      className={`sticky top-0 z-50 border-b border-black/10 bg-white transition-[box-shadow] duration-200 dark:border-white/15 dark:bg-white ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div
        className="relative"
        onMouseLeave={handleLeave}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
            handleLeave();
          }
        }}
      >
        <div className="mx-auto w-full px-6">
          <div
            id="site-header-bar"
            className="mx-auto flex w-full items-center justify-between gap-4 py-3 sm:py-5 lg:gap-8"
          >
            <DesktopHeaderSection
              openId={openId}
              desktopSearchOpen={desktopSearchOpen}
              desktopSearchInputRef={desktopSearchInputRef}
              hideSearch={
                true /* was: isPropertiesPage — search hidden site-wide per header redesign */
              }
              onOpenMega={handleEnter}
              onCloseMega={closeDesktopMega}
              onOpenSearch={() => {
                setOpenId(null);
                setDesktopSearchOpen(true);
              }}
              onCloseSearch={() => setDesktopSearchOpen(false)}
              onOpenContact={() => setContactOpen(true)}
            />

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <MobileHeaderSection
                mounted={mounted}
                mobileOpen={mobileOpen}
                mobileSearchInputRef={mobileSearchInputRef}
                pathname={pathname}
                hideSearch={
                  true /* was: isPropertiesPage — search hidden site-wide per header redesign */
                }
                closeMobile={closeMobile}
                toggleMobile={() => setMobileOpen((o) => !o)}
                onOpenContact={() => setContactOpen(true)}
              />
            </div>
          </div>
        </div>

        {megaPanelMega && (
          <div
            className={`absolute left-0 right-0 top-full hidden origin-top transition-[opacity,transform] duration-200 ease-in-out motion-reduce:transition-none lg:block ${
              megaPanelOpen
                ? "pointer-events-auto translate-y-0 opacity-100 motion-reduce:translate-y-0"
                : "pointer-events-none -translate-y-2 opacity-0 motion-reduce:translate-y-0"
            }`}
            role="region"
            aria-label="Submenu"
            onTransitionEnd={onDesktopMegaShellTransitionEnd}
          >
            <MegaMenuHoverAnimation
              menuId={megaMenuAnimId}
              mega={megaPanelMega}
            />
          </div>
        )}
      </div>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </header>
  );
}
