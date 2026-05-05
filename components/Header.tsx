"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
  type TransitionEvent,
} from "react";
import { createPortal } from "react-dom";

type AccordionItem = {
  title: string;
  links?: { label: string; href: string }[];
};

type MegaColumn =
  | {
      kind: "accordion";
      heading: string;
      items: AccordionItem[];
      viewAll?: { label: string; href: string };
    }
  | { kind: "links"; heading: string; items: { label: string; href: string }[] }
  | {
      kind: "featured";
      heading: string;
      imageSrc: string;
      imageAlt: string;
      tag: string;
      title: string;
      excerpt: string;
      href: string;
      readMore?: string;
    };

type MegaMenu = {
  columns: MegaColumn[];
  footer: { text: string; buttonLabel: string; buttonHref: string };
};

type NavItem = { id: string; href: string; label: string; mega: MegaMenu };

/** Edge Tools ARIA rule expects concrete "true" | "false" tokens, not boolean JSX props. */
function ariaExpandedProps(expanded: boolean) {
  return expanded
    ? { "aria-expanded": "true" as const }
    : { "aria-expanded": "false" as const };
}

function ariaHiddenProps(hidden: boolean) {
  return hidden
    ? { "aria-hidden": "true" as const }
    : { "aria-hidden": "false" as const };
}

const navConfig: NavItem[] = [
  {
    id: "services",
    href: "/services",
    label: "Services",
    mega: {
      columns: [
        {
          kind: "accordion",
          heading: "How we can help",
          viewAll: { label: "View all services", href: "/services" },
          items: [
            {
              title: "Value and invest in real estate",
              links: [
                {
                  label: "Capital Markets and Investment Services",
                  href: "/services/capital-markets",
                },
                { label: "Valuation Services", href: "/services/valuation" },
              ],
            },
            {
              title: "Lease, occupy, and optimise space",
              links: [
                { label: "Tenant representation", href: "/services/tenant" },
                { label: "Occupier solutions", href: "/services/occupier" },
              ],
            },
            {
              title: "Manage your property",
              links: [
                { label: "Property management", href: "/services/management" },
                { label: "Facilities services", href: "/services/facilities" },
              ],
            },
            {
              title: "Engineer and manage your project",
              links: [
                { label: "Project management", href: "/services/projects" },
                {
                  label: "Development advisory",
                  href: "/services/development",
                },
              ],
            },
          ],
        },
        {
          kind: "links",
          heading: "Property types",
          items: [
            { label: "Office", href: "/properties/office" },
            {
              label: "Industrial and Logistics",
              href: "/properties/industrial",
            },
            {
              label: "Hotels and Hospitality",
              href: "/properties/hospitality",
            },
            { label: "Retail", href: "/properties/retail" },
            { label: "Residential", href: "/properties/residential" },
          ],
        },
        {
          kind: "featured",
          heading: "Featured article",
          imageSrc: "/REMAX Commercial Logo.png",
          imageAlt: "RE/MAX Philippines",
          tag: "Research & Insights",
          title: "2026 Asia Pacific Workplace Insights",
          excerpt: "Perspectives from Office Occupier Survey",
          href: "/insights/workplace-2026",
          readMore: "Read more",
        },
      ],
      footer: {
        text: "Find out how we can help you achieve more",
        buttonLabel: "VIEW ALL SERVICES",
        buttonHref: "/services",
      },
    },
  },
  {
    id: "properties",
    href: "/properties",
    label: "Properties",
    mega: {
      columns: [
        {
          kind: "accordion",
          heading: "Find a property",
          viewAll: { label: "View all listings", href: "/properties" },
          items: [
            {
              title: "Buy",
              links: [
                {
                  label: "Residential for sale",
                  href: "/properties/buy/residential",
                },
                {
                  label: "Commercial for sale",
                  href: "/properties/buy/commercial",
                },
              ],
            },
            {
              title: "Rent",
              links: [
                { label: "Long-term rentals", href: "/properties/rent" },
                { label: "Short-stay", href: "/properties/short-stay" },
              ],
            },
            {
              title: "New developments",
              links: [{ label: "Pre-selling", href: "/properties/new" }],
            },
          ],
        },
        {
          kind: "links",
          heading: "Popular searches",
          items: [
            { label: "Metro Manila", href: "/properties?area=ncr" },
            { label: "Cebu", href: "/properties?area=cebu" },
            { label: "Davao", href: "/properties?area=davao" },
            { label: "Clark / Pampanga", href: "/properties?area=clark" },
            { label: "Beach & leisure", href: "/properties?type=leisure" },
          ],
        },
        {
          kind: "featured",
          heading: "Featured article",
          imageSrc: "/REMAX Commercial Logo.png",
          imageAlt: "RE/MAX",
          tag: "Market spotlight",
          title: "Q1 2026 Metro Manila residential outlook",
          excerpt: "Pricing, inventory, and buyer demand at a glance",
          href: "/insights/metro-manila-q1-2026",
          readMore: "Read more",
        },
      ],
      footer: {
        text: "Browse curated listings and connect with an agent",
        buttonLabel: "VIEW ALL PROPERTIES",
        buttonHref: "/properties",
      },
    },
  },
  {
    id: "insights",
    href: "/insights",
    label: "Insights",
    mega: {
      columns: [
        {
          kind: "accordion",
          heading: "Explore insights",
          viewAll: { label: "View all insights", href: "/insights" },
          items: [
            {
              title: "Research & reports",
              links: [
                { label: "Market reports", href: "/insights/reports" },
                { label: "Sector briefings", href: "/insights/sectors" },
              ],
            },
            {
              title: "News & commentary",
              links: [
                { label: "Company news", href: "/insights/news" },
                { label: "Expert opinion", href: "/insights/commentary" },
              ],
            },
            {
              title: "Events & webinars",
              links: [{ label: "Upcoming sessions", href: "/insights/events" }],
            },
          ],
        },
        {
          kind: "links",
          heading: "Topics",
          items: [
            { label: "Workplace", href: "/insights/workplace" },
            { label: "Capital markets", href: "/insights/capital-markets" },
            { label: "Sustainability", href: "/insights/sustainability" },
            { label: "Technology", href: "/insights/technology" },
            { label: "Economy", href: "/insights/economy" },
          ],
        },
        {
          kind: "featured",
          heading: "Featured article",
          imageSrc: "/REMAX Commercial Logo.png",
          imageAlt: "Insights",
          tag: "Research & Insights",
          title: "2026 Asia Pacific Workplace Insights",
          excerpt: "Perspectives from Office Occupier Survey",
          href: "/insights/workplace-2026",
          readMore: "Read more",
        },
      ],
      footer: {
        text: "Stay ahead with data-driven perspectives",
        buttonLabel: "VIEW ALL INSIGHTS",
        buttonHref: "/insights",
      },
    },
  },
  {
    id: "experts",
    href: "/experts",
    label: "Experts",
    mega: {
      columns: [
        {
          kind: "accordion",
          heading: "Meet our people",
          viewAll: { label: "View directory", href: "/experts" },
          items: [
            {
              title: "Leadership",
              links: [
                { label: "Executive team", href: "/experts/leadership" },
                { label: "Regional heads", href: "/experts/regional" },
              ],
            },
            {
              title: "Advisory",
              links: [
                { label: "Capital markets", href: "/experts/capital-markets" },
                { label: "Valuation", href: "/experts/valuation" },
              ],
            },
            {
              title: "Client services",
              links: [{ label: "Account teams", href: "/experts/accounts" }],
            },
          ],
        },
        {
          kind: "links",
          heading: "Office expertise",
          items: [
            { label: "Brokerage", href: "/experts/brokerage" },
            { label: "Property management", href: "/experts/management" },
            { label: "Project services", href: "/experts/projects" },
            { label: "Research", href: "/experts/research" },
          ],
        },
        {
          kind: "featured",
          heading: "Featured article",
          imageSrc: "/REMAX Commercial Logo.png",
          imageAlt: "Experts",
          tag: "People",
          title: "How our specialists partner with occupiers",
          excerpt: "A closer look at integrated client teams",
          href: "/insights/expert-teams",
          readMore: "Read more",
        },
      ],
      footer: {
        text: "Connect with the right specialist for your goals",
        buttonLabel: "VIEW ALL EXPERTS",
        buttonHref: "/experts",
      },
    },
  },
  {
    id: "office-locations",
    href: "/office-locations",
    label: "Office locations",
    mega: {
      columns: [
        {
          kind: "accordion",
          heading: "Regions",
          viewAll: {
            label: "View global footprint",
            href: "/office-locations",
          },
          items: [
            {
              title: "Philippines",
              links: [
                {
                  label: "Metro Manila",
                  href: "/office-locations/metro-manila",
                },
                {
                  label: "Visayas & Mindanao",
                  href: "/office-locations/vismin",
                },
              ],
            },
            {
              title: "Asia Pacific",
              links: [
                { label: "Singapore", href: "/office-locations/singapore" },
                { label: "Hong Kong", href: "/office-locations/hong-kong" },
              ],
            },
            {
              title: "Americas & EMEA",
              links: [
                {
                  label: "International offices",
                  href: "/office-locations/global",
                },
              ],
            },
          ],
        },
        {
          kind: "links",
          heading: "Visit us",
          items: [
            { label: "Book a meeting", href: "/contact" },
            { label: "New business enquiries", href: "/contact/business" },
            { label: "Media enquiries", href: "/contact/media" },
            { label: "Careers", href: "/careers" },
          ],
        },
        {
          kind: "featured",
          heading: "Featured article",
          imageSrc: "/REMAX Commercial Logo.png",
          imageAlt: "Offices",
          tag: "Locations",
          title: "Opening our newest flagship workspace",
          excerpt: "Designed for collaboration and client experience",
          href: "/insights/new-office",
          readMore: "Read more",
        },
      ],
      footer: {
        text: "Find an office near you",
        buttonLabel: "VIEW ALL OFFICES",
        buttonHref: "/office-locations",
      },
    },
  },
  {
    id: "about-us",
    href: "/about-us",
    label: "About us",
    mega: {
      columns: [
        {
          kind: "accordion",
          heading: "Who we are",
          viewAll: { label: "About RE/MAX", href: "/about-us" },
          items: [
            {
              title: "Our company",
              links: [
                { label: "Purpose & values", href: "/about-us/values" },
                { label: "History", href: "/about-us/history" },
              ],
            },
            {
              title: "Responsibility",
              links: [
                { label: "ESG & sustainability", href: "/about-us/esg" },
                { label: "Community", href: "/about-us/community" },
              ],
            },
            {
              title: "Investors",
              links: [
                { label: "Reports & governance", href: "/about-us/investors" },
              ],
            },
          ],
        },
        {
          kind: "links",
          heading: "Quick links",
          items: [
            { label: "Newsroom", href: "/news" },
            { label: "Careers", href: "/careers" },
            { label: "Contact", href: "/contact" },
            { label: "Brand centre", href: "/about-us/brand" },
          ],
        },
        {
          kind: "featured",
          heading: "Featured article",
          imageSrc: "/REMAX Commercial Logo.png",
          imageAlt: "About",
          tag: "Company",
          title: "Building trust in every transaction",
          excerpt: "How we support clients across the property lifecycle",
          href: "/insights/trust",
          readMore: "Read more",
        },
      ],
      footer: {
        text: "Learn more about our network and culture",
        buttonLabel: "VIEW ABOUT US",
        buttonHref: "/about-us",
      },
    },
  },
];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      aria-hidden
      className={`shrink-0 text-[#000759] transition-transform duration-200 ease-in-out ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M2 4.5L6 8.5L10 4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AccordionColumn({
  heading,
  items,
  viewAll,
}: {
  heading: string;
  items: AccordionItem[];
  viewAll?: { label: string; href: string };
}) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="min-w-0 border-r border-zinc-200 pr-8 lg:pr-12">
      <h3 className="font-serif text-xl font-normal tracking-tight text-[#000759]">
        {heading}
      </h3>
      <ul className="mt-6 space-y-0">
        {items.map((item, i) => {
          const isExpanded = openIndex === i;
          const sublistId = `mega-accordion-panel-${heading.replace(/\s+/g, "-").toLowerCase()}-${i}`;
          return (
            <li
              key={item.title}
              className="border-b border-zinc-200 first:border-t"
            >
              <button
                type="button"
                className="flex w-full items-center justify-between gap-3 py-4 text-left text-base font-medium text-[#000759] transition-colors duration-200 ease-in-out hover:text-[#001a8f]"
                onClick={() => setOpenIndex(isExpanded ? -1 : i)}
                {...ariaExpandedProps(isExpanded)}
                {...(item.links?.length ? { "aria-controls": sublistId } : {})}
              >
                <span>{item.title}</span>
                <Chevron open={isExpanded} />
              </button>
              {item.links && item.links.length > 0 && (
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none ${
                    isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <ul
                      id={sublistId}
                      {...ariaHiddenProps(!isExpanded)}
                      className="space-y-2 pb-4 pl-0"
                    >
                      {item.links.map((l) => (
                        <li key={l.href}>
                          <Link
                            href={l.href}
                            className="text-sm font-medium text-[#000759] transition-colors duration-200 ease-in-out hover:text-[#001a8f] hover:underline"
                          >
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
      {viewAll && (
        <Link
          href={viewAll.href}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#000759] transition-opacity duration-200 ease-in-out after:block after:h-px after:w-8 after:bg-[#000759] hover:opacity-80"
        >
          {viewAll.label}
        </Link>
      )}
    </div>
  );
}

function LinksColumn({
  heading,
  items,
}: {
  heading: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div className="min-w-0 border-r border-zinc-200 px-8 lg:px-12">
      <h3 className="font-serif text-xl font-normal tracking-tight text-[#000759]">
        {heading}
      </h3>
      <ul className="mt-6">
        {items.map((item) => (
          <li
            key={item.href}
            className="border-b border-zinc-200 first:border-t"
          >
            <Link
              href={item.href}
              className="block py-4 text-base font-medium text-[#000759] transition-colors duration-200 ease-in-out hover:text-[#001a8f]"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FeaturedColumn({
  heading,
  imageSrc,
  imageAlt,
  tag,
  title,
  excerpt,
  href,
  readMore = "Read more",
}: {
  heading: string;
  imageSrc: string;
  imageAlt: string;
  tag: string;
  title: string;
  excerpt: string;
  href: string;
  readMore?: string;
}) {
  return (
    <div className="min-w-0 pl-0 lg:pl-4">
      <h3 className="font-serif text-xl font-normal tracking-tight text-[#000759]">
        {heading}
      </h3>
      <Link href={href} className="mt-6 block group/card">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover transition duration-300 group-hover/card:scale-[1.02]"
            sizes="(min-width: 1024px) 320px, 100vw"
          />
        </div>
        <p className="mt-4 text-xs font-bold uppercase tracking-wide text-[#000759]">
          {tag}
        </p>
        <p className="mt-2 text-lg font-bold leading-snug text-[#000759]">
          {title}
        </p>
        <p className="mt-1 text-sm text-[#000759]">
          {excerpt}
        </p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#000759] after:block after:h-px after:w-8 after:bg-[#000759] group-hover/card:opacity-80">
          {readMore}
        </span>
      </Link>
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

function MobileNavGroup({
  item,
  onNavigate,
}: {
  item: (typeof navConfig)[number];
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const mega = item.mega;
  const [c1, c2, c3] = mega.columns;
  if (!c1 || !c2 || !c3) return null;

  return (
    <div className="border-b border-[#000759]/25">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 py-5 text-left text-xl font-normal tracking-tight text-[#000759] transition-colors duration-200 ease-in-out hover:text-[#001a8f] sm:py-6 sm:text-2xl"
        onClick={() => setExpanded((v) => !v)}
        {...ariaExpandedProps(expanded)}
        {...(expanded
          ? { "aria-controls": `mobile-nav-section-${item.id}` }
          : {})}
      >
        <span>{item.label}</span>
        <MobileMenuRowArrow expanded={expanded} />
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div
          id={`mobile-nav-section-${item.id}`}
          className="min-h-0 overflow-hidden"
        >
          <div className="space-y-6 pb-4 pl-1">
            {c1.kind === "accordion" && (
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
                  {c1.heading}
                </p>
                <ul className="mt-2 space-y-1">
                  {c1.items.map((acc) => (
                    <li key={acc.title}>
                      <p className="py-2 text-sm font-semibold text-[#000759]">
                        {acc.title}
                      </p>
                      {acc.links && (
                        <ul className="space-y-1 border-l-2 border-zinc-200 pl-3">
                          {acc.links.map((l) => (
                            <li key={l.href}>
                              <Link
                                href={l.href}
                                className="block py-1.5 text-sm text-[#2563eb] transition-colors duration-200 ease-in-out hover:underline"
                                onClick={onNavigate}
                              >
                                {l.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
                {c1.viewAll && (
                  <Link
                    href={c1.viewAll.href}
                    className="mt-3 inline-block text-sm font-semibold text-[#000759] underline transition-opacity duration-200 ease-in-out hover:opacity-80"
                    onClick={onNavigate}
                  >
                    {c1.viewAll.label}
                  </Link>
                )}
              </div>
            )}
            {c2.kind === "links" && (
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
                  {c2.heading}
                </p>
                <ul className="mt-2">
                  {c2.items.map((l) => (
                    <li
                      key={l.href}
                      className="border-b border-zinc-100 last:border-0"
                    >
                      <Link
                        href={l.href}
                        className="block py-2.5 text-sm font-medium text-[#000759] transition-colors duration-200 ease-in-out hover:text-[#001a8f]"
                        onClick={onNavigate}
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {c3.kind === "featured" && (
              <Link
                href={c3.href}
                className="block rounded-lg border border-zinc-200 p-3 transition-colors duration-200 ease-in-out hover:border-[#000759]/30 hover:bg-zinc-50"
                onClick={onNavigate}
              >
                <p className="text-xs font-bold uppercase tracking-wide text-[#2563eb]">
                  {c3.tag}
                </p>
                <p className="mt-1 text-sm font-bold text-[#000759]">
                  {c3.title}
                </p>
                <span className="mt-2 inline-block text-xs font-semibold text-[#000759] underline">
                  {c3.readMore ?? "Read more"}
                </span>
              </Link>
            )}
            <Link
              href={mega.footer.buttonHref}
              className="inline-flex w-full items-center justify-center rounded-md bg-[#000759] px-4 py-3 text-xs font-bold uppercase tracking-wider text-white"
              onClick={onNavigate}
            >
              {mega.footer.buttonLabel}
            </Link>
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
  const [c1, c2, c3] = mega.columns;
  if (!c1 || !c2 || !c3) return null;

  const colMotion =
    "transition-[opacity,transform] duration-200 ease-in-out motion-reduce:transition-none motion-reduce:translate-y-0 motion-reduce:opacity-100";

  const colClass = (delayClass: string) =>
    `${colMotion} ${subReveal ? `translate-y-0 opacity-100 ${delayClass}` : "translate-y-2 opacity-0 delay-0 lg:[transition-delay:0ms]"}`;

  return (
    <div className="bg-white shadow-[0_24px_48px_-12px_rgba(0,0,0,0.12)]">
      <div className="mx-auto w-full px-6">
        <div className="mx-auto w-full px-7 py-10 lg:py-12">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr_1fr] lg:gap-0">
            {c1.kind === "accordion" && (
              <div className={colClass("delay-0 lg:[transition-delay:0ms]")}>
                <AccordionColumn
                  heading={c1.heading}
                  items={c1.items}
                  viewAll={c1.viewAll}
                />
              </div>
            )}
            {c2.kind === "links" && (
              <div className={colClass("delay-75 lg:[transition-delay:75ms]")}>
                <LinksColumn heading={c2.heading} items={c2.items} />
              </div>
            )}
            {c3.kind === "featured" && (
              <div
                className={colClass("delay-150 lg:[transition-delay:150ms]")}
              >
                <FeaturedColumn
                  heading={c3.heading}
                  imageSrc={c3.imageSrc}
                  imageAlt={c3.imageAlt}
                  tag={c3.tag}
                  title={c3.title}
                  excerpt={c3.excerpt}
                  href={c3.href}
                  readMore={c3.readMore}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className={`border-t border-zinc-200 transition-[opacity,transform] duration-200 ease-in-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none dark:border-white/10 ${subReveal ? "translate-y-0 opacity-100 delay-200 lg:[transition-delay:200ms]" : "translate-y-2 opacity-0 delay-0 lg:[transition-delay:0ms]"}`}
      >
        <div className="mx-auto w-full px-6 py-6">
          <div className="mx-auto flex w-full flex-col items-start justify-between gap-6 px-7 sm:flex-row sm:items-center">
            <p className="max-w-xl font-serif text-lg text-[#000759]">
              {mega.footer.text}
            </p>
            <Link
              href={mega.footer.buttonHref}
              className="inline-flex shrink-0 items-center justify-center rounded-md bg-[#000759] px-8 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#001a8f]"
            >
              {mega.footer.buttonLabel}
            </Link>
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
  onOpenMega,
  onCloseMega,
  onOpenSearch,
  onCloseSearch,
}: {
  openId: string | null;
  desktopSearchOpen: boolean;
  desktopSearchInputRef: RefObject<HTMLInputElement | null>;
  onOpenMega: (id: string) => void;
  onCloseMega: () => void;
  onOpenSearch: () => void;
  onCloseSearch: () => void;
}) {
  if (desktopSearchOpen) {
    return (
      <div className="hidden min-w-0 flex-1 items-center gap-6 lg:flex">
        <Link
          href="/"
          className="shrink-0 text-lg font-semibold tracking-tight"
          onClick={onCloseMega}
        >
          <Image
            src="/REMAX Commercial Logo.png"
            alt="RE/MAX"
            width={200}
            height={200}
            // className="h-8 w-auto sm:h-9 lg:h-12"
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
            className="min-h-[44px] min-w-0 flex-1 border-0 bg-white px-4 text-base text-[#000759] outline-none placeholder:text-[#000759]/65"
          />
          <button
            type="submit"
            className="shrink-0 px-3 py-2 text-[#000759] transition hover:opacity-70 cursor-pointer"
            aria-label="Submit search≈"
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
    <div className="flex min-w-0 flex-1 items-center gap-6 lg:gap-12">
      <div className="flex min-w-0 flex-1 items-center gap-6 lg:gap-12">
        <Link
          href="/"
          className="shrink-0 text-lg font-semibold tracking-tight"
          onClick={onCloseMega}
        >
          <Image
            src="/REMAX Commercial Logo.png"
            alt="RE/MAX"
            width={200}
            height={200}
            // className="h-8 w-auto sm:h-9 lg:h-12"
            priority
          />
        </Link>

        <nav
          aria-label="Main navigation"
          className={`hidden min-w-0 lg:block ${desktopSearchOpen ? "lg:hidden" : ""}`}
        >
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-base font-medium text-[#000759] xl:gap-x-10 xl:text-xl">
            {navConfig.map((item) => (
              <li
                key={item.id}
                onMouseEnter={() => onOpenMega(item.id)}
                className="relative"
              >
                <Link
                  href={item.href}
                  onClick={onCloseMega}
                  className={`decoration-2 transition-colors duration-300 ease-in-out ${openId === item.id ? "font-semibold text-[#000759] decoration-[#000759]" : "text-[#000759] no-underline hover:underline hover:decoration-[#000759]"} after:absolute after:left-0 after:-bottom-1
                  after:h-[2px] after:w-0 after:bg-[#000759]
                  after:transition-all after:duration-300 after:ease-in-out
                  hover:after:w-full hover:font-bold`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="hidden shrink-0 items-center gap-3 lg:ml-auto lg:flex">
        <button
          type="button"
          className="cursor-pointer flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#c5d3f0] bg-white text-[#000759] shadow-sm transition-colors hover:border-[#000759] hover:bg-[#000759] hover:text-white dark:border-[#4a5a8a] dark:text-[#000759] dark:hover:border-[#000759] dark:hover:bg-[#000759] dark:hover:text-white"
          aria-label="Open search"
          onClick={onOpenSearch}
        >
          <MobileSearchIcon className="h-[22px] w-[22px]" />
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
  closeMobile,
  toggleMobile,
}: {
  mounted: boolean;
  mobileOpen: boolean;
  mobileSearchInputRef: RefObject<HTMLInputElement | null>;
  pathname: string;
  closeMobile: () => void;
  toggleMobile: () => void;
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
                    src="/REMAX Commercial Logo.png"
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
                      className="min-w-0 flex-1 border-0 bg-transparent py-1 pr-2 text-base text-[#000759] placeholder:text-[#000759]/70 outline-none"
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

            <nav
              className="min-h-0 min-w-0 flex-1 overflow-y-auto overscroll-contain px-6 pb-10 pt-2"
              aria-label="Mobile navigation"
            >
              <div className="mx-auto w-full px-7" key={pathname}>
                {navConfig.map((item) => (
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
      <div className="relative" onMouseLeave={handleLeave}>
        <div className="mx-auto w-full px-6">
          <div
            id="site-header-bar"
            className="mx-auto flex w-full items-center justify-between gap-4 px-7 py-3 sm:py-5 lg:gap-8 lg:py-7"
          >
            <DesktopHeaderSection
              openId={openId}
              desktopSearchOpen={desktopSearchOpen}
              desktopSearchInputRef={desktopSearchInputRef}
              onOpenMega={handleEnter}
              onCloseMega={closeDesktopMega}
              onOpenSearch={() => {
                setOpenId(null);
                setDesktopSearchOpen(true);
              }}
              onCloseSearch={() => setDesktopSearchOpen(false)}
            />

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <MobileHeaderSection
                mounted={mounted}
                mobileOpen={mobileOpen}
                mobileSearchInputRef={mobileSearchInputRef}
                pathname={pathname}
                closeMobile={closeMobile}
                toggleMobile={() => setMobileOpen((o) => !o)}
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
    </header>
  );
}
