import Link from "next/link";
import type { Career } from "@/lib/careers/types";
import CareerApplicationForm from "./CareerApplicationForm";

type CareerDetailContentProps = {
  career: Career;
};

export default function CareerDetailContent({
  career,
}: CareerDetailContentProps) {
  const hasContent =
    career.description || career.requirements || career.benefits;

  return (
    <section className="border-t border-[#e8ebf2] bg-white">
      <div className="mx-auto max-w-[900px] px-5 py-10 md:px-8 lg:px-10 lg:py-14">
        {hasContent ? (
          <div className="flex flex-col gap-10">
            {career.description && (
              <ContentBlock title="Description" html={career.description} />
            )}
            {career.requirements && (
              <ContentBlock title="Requirements" html={career.requirements} />
            )}
            {career.benefits && (
              <ContentBlock title="Benefits" html={career.benefits} />
            )}
          </div>
        ) : (
          <p className="text-sm text-[#4a5f9a]">
            No details available for this position.
          </p>
        )}

        <div className="mt-12">
          <CareerApplicationForm
            careerId={career.id}
            careerTitle={career.title}
          />
        </div>

        <div className="mt-12 border-t border-[#e8ebf2] pt-8">
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#23408e] transition hover:text-[#1d3575]"
          >
            <span aria-hidden className="h-px w-5 bg-current" />
            Back to all careers
          </Link>
        </div>
      </div>
    </section>
  );
}

function ContentBlock({ title, html }: { title: string; html: string }) {
  return (
    <div>
      <h2 className="mb-4 font-serif text-xl font-normal text-[#000759] md:text-2xl">
        {title}
      </h2>
      <div
        className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:text-[#000759] prose-p:text-[#2a3a5c] prose-a:text-[#23408e] prose-a:no-underline hover:prose-a:underline prose-li:text-[#2a3a5c] prose-strong:text-[#000759]"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
