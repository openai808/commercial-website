import Link from "next/link";

const GEO_PATTERN_ID = "sustainability-hero-geo";

export default function SustainabilityServicesHero() {
  return (
    <section aria-labelledby="sustainability-services-title" className="w-full">
      <div className="relative flex min-h-[320px] flex-col items-center justify-center bg-[#1a2d5c] px-6 py-28 text-center text-white md:min-h-[380px] md:py-32">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <svg
            className="h-full w-full min-h-full text-white"
            preserveAspectRatio="xMidYMid slice"
            role="presentation"
          >
            <defs>
              <pattern
                id={GEO_PATTERN_ID}
                width="72"
                height="72"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M36 4 L68 36 L36 68 L4 36 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeOpacity="0.1"
                  strokeWidth="1"
                />
                <path
                  d="M36 22 L54 36 L36 50 L18 36 Z"
                  fill="currentColor"
                  fillOpacity="0.05"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${GEO_PATTERN_ID})`} />
          </svg>
        </div>

        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center">
          <h1
            id="sustainability-services-title"
            className="text-3xl font-medium leading-tight tracking-tight md:text-4xl lg:text-5xl"
          >
            Sustainability Services
          </h1>
          <p className="mt-5 text-base font-light leading-relaxed text-white/95 md:text-lg">
            Accelerate your path to net zero.
          </p>
          <Link
            href="/contact-us"
            className="mt-10 inline-flex rounded-full bg-white px-10 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-[#1a2d5c] transition-colors hover:bg-white/90"
          >
            Contact an expert
          </Link>
        </div>
      </div>
    </section>
  );
}
