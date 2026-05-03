import Link from "next/link";
import type { ReactNode } from "react";

function IconCareers() {
  return (
    <svg viewBox="0 0 56 56" className="h-14 w-14 shrink-0" aria-hidden>
      <circle cx="18" cy="14" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="38" cy="14" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14 26l6 8M42 26l-6 8M20 34v6M36 34v6M22 20l4 4M34 20l-4 4M26 24l4 4"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        d="M12 40c0-6 4-10 10-10M44 40c0-6-4-10-10-10"
      />
    </svg>
  );
}

function IconImpact() {
  return (
    <svg viewBox="0 0 56 56" className="h-14 w-14 shrink-0" aria-hidden>
      <circle cx="28" cy="28" r="22" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {/* person — top */}
      <circle cx="28" cy="14" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        d="M24 20h8M26 20v6M22 26h12"
      />
      {/* building — bottom right */}
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        d="M36 40V28h10v12M38 40v-4h2v4M42 40v-4h2v4M40 32v-2"
      />
      {/* leaf — bottom left */}
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        d="M14 34c6 0 10 4 10 10-6-2-10-6-10-10zM18 38l-4 4"
      />
    </svg>
  );
}

function IconDiversity() {
  return (
    <svg viewBox="0 0 56 56" className="h-14 w-14 shrink-0" aria-hidden>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 40c4-12 10-16 16-18M44 40c-4-12-10-16-16-18M28 42v-4"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        d="M18 44h20l-2-8H20l-2 8zM22 36h12"
      />
      <circle cx="22" cy="14" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="28" cy="10" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="34" cy="14" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        d="M22 18v4M28 14v8M34 18v4"
      />
    </svg>
  );
}

function CtaLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-3 text-sm font-semibold text-[#233d83] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#233d83]"
    >
      <span>{children}</span>
      <span className="h-px w-10 shrink-0 bg-[#233d83] transition-[width] group-hover:w-14" aria-hidden />
    </Link>
  );
}

export default function HomePillars() {
  return (
    <section
      className="w-full bg-white text-[#233d83]"
      aria-labelledby="home-pillars-heading"
    >
      <h2 id="home-pillars-heading" className="sr-only">
        Careers, impact, and diversity
      </h2>
      <div className="mx-auto w-full max-w-7xl px-6 py-14 md:py-16 lg:px-10 lg:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10 lg:gap-16">
          <div className="flex min-w-0 flex-col items-start gap-5 text-left">
            <IconCareers />
            <p className="text-base font-normal leading-relaxed md:text-lg">
              Cultivating expertise to lead the industry into the future.
            </p>
            <CtaLink href="/careers">Explore Careers</CtaLink>
          </div>
          <div className="flex min-w-0 flex-col items-start gap-5 text-left">
            <IconImpact />
            <p className="text-base font-normal leading-relaxed md:text-lg">
              Identifying local strategies to make a global impact.
            </p>
            <CtaLink href="/impact">Our Impact</CtaLink>
          </div>
          <div className="flex min-w-0 flex-col items-start gap-5 text-left">
            <IconDiversity />
            <p className="text-base font-normal leading-relaxed md:text-lg">
              Embracing diversity, equity and inclusion.
            </p>
            <CtaLink href="/diversity-inclusion">Our Diversity &amp; Inclusion Statement</CtaLink>
          </div>
        </div>
      </div>
    </section>
  );
}
