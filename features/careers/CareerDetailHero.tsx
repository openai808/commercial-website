import Link from "next/link";
import type { Career } from "@/lib/careers/types";

type CareerDetailHeroProps = {
  career: Career;
};

export default function CareerDetailHero({ career }: CareerDetailHeroProps) {
  const formattedDate = career.published_at
    ? new Date(career.published_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <section className="bg-[#000759]">
      <div className="mx-auto max-w-[900px] px-5 pb-10 pt-10 md:px-8 lg:px-10">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">
            <li>
              <Link href="/careers" className="transition hover:text-white">
                Careers
              </Link>
            </li>
            <li aria-hidden>
              <span className="mx-1">/</span>
            </li>
            {career.department && (
              <li className="text-white/80">{career.department}</li>
            )}
          </ol>
        </nav>

        <h1 className="font-serif text-2xl font-normal leading-snug text-white md:text-4xl lg:text-5xl lg:leading-tight">
          {career.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-white/70">
          {career.location && <span>{career.location}</span>}
          {career.location && career.employment_type && (
            <span aria-hidden className="h-3 w-px bg-white/30" />
          )}
          {career.employment_type && <span>{career.employment_type}</span>}
          {(career.location || career.employment_type) && formattedDate && (
            <span aria-hidden className="h-3 w-px bg-white/30" />
          )}
          {formattedDate && (
            <time dateTime={career.published_at!}>Posted {formattedDate}</time>
          )}
        </div>
      </div>
    </section>
  );
}
