import Link from "next/link";
import type { Career } from "@/lib/careers/types";
import CareerApplicationForm from "./CareerApplicationForm";

type CareersGridProps = {
  careers: Career[];
};

export default function CareersGrid({ careers }: CareersGridProps) {
  if (careers.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-sm text-[#4a5f9a]">
          No open positions at the moment. Check back soon.
        </p>
      </div>
    );
  }

  return (
    <div aria-label="Job openings" className="flex flex-col gap-4">
      {careers.map((career) => (
        <CareerCard key={career.id} career={career} />
      ))}
    </div>
  );
}

function CareerCard({ career }: { career: Career }) {
  const formattedDate = career.published_at
    ? new Date(career.published_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div className="group flex flex-col gap-4 border border-[#d9dce5] bg-white p-6 transition-shadow duration-200 hover:shadow-lg md:flex-row md:items-center md:justify-between">
      <Link
        href={`/careers/${career.slug}`}
        className="flex flex-1 flex-col gap-2"
      >
        <h2 className="text-base font-bold leading-snug text-[#000759] group-hover:underline md:text-lg">
          {career.title}
        </h2>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#4a5f9a]">
          {career.department && (
            <span className="flex items-center gap-1.5">
              <span aria-hidden className="size-1 rounded-full bg-[#6b8cbe]" />
              {career.department}
            </span>
          )}
          {career.location && (
            <span className="flex items-center gap-1.5">
              <span aria-hidden className="size-1 rounded-full bg-[#6b8cbe]" />
              {career.location}
            </span>
          )}
          {career.employment_type && (
            <span className="flex items-center gap-1.5">
              <span aria-hidden className="size-1 rounded-full bg-[#6b8cbe]" />
              {career.employment_type}
            </span>
          )}
        </div>

        {formattedDate && (
          <time
            dateTime={career.published_at!}
            className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6b8cbe]"
          >
            Posted {formattedDate}
          </time>
        )}
      </Link>

      <div className="flex shrink-0 items-center gap-4">
        <CareerApplicationForm
          careerId={career.id}
          careerTitle={career.title}
        />
        <Link
          href={`/careers/${career.slug}`}
          className="inline-flex shrink-0 items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#23408e]"
        >
          View details
          <span aria-hidden className="h-px w-5 bg-[#23408e]" />
        </Link>
      </div>
    </div>
  );
}
