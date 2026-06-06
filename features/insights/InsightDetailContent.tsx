import Link from "next/link";

type InsightDetailContentProps = {
  content: string | null;
};

export default function InsightDetailContent({
  content,
}: InsightDetailContentProps) {
  return (
    <section className="border-t border-[#e8ebf2] bg-white">
      <div className="mx-auto max-w-[900px] px-5 py-10 md:px-8 lg:px-10 lg:py-14">
        {content ? (
          <div
            className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:text-[#000759] prose-p:text-[#2a3a5c] prose-a:text-[#23408e] prose-a:no-underline hover:prose-a:underline prose-img:rounded prose-strong:text-[#000759]"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
          <p className="text-sm text-[#4a5f9a]">
            No content available for this article.
          </p>
        )}

        <div className="mt-12 border-t border-[#e8ebf2] pt-8">
          <Link
            href="/blogs-and-news"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#23408e] transition hover:text-[#1d3575]"
          >
            <span aria-hidden className="h-px w-5 bg-current" />
            Back to all blogs &amp; news
          </Link>
        </div>
      </div>
    </section>
  );
}
