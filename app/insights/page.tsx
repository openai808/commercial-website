import type { Metadata } from "next";
import { getBlogPosts } from "@/lib/blog/getBlogPosts";
import InsightsListingGrid from "@/features/insights/InsightsListingGrid";
import InsightsPagination from "@/features/insights/InsightsPagination";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Market insights, industry trends, and expert analysis from RE/MAX Philippines.",
};

const PAGE_SIZE = 9;

type InsightsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function InsightsPage({
  searchParams,
}: InsightsPageProps) {
  const params = await searchParams;
  const requestedPage = Number(
    Array.isArray(params.page) ? params.page[0] : params.page ?? "1",
  );
  const page =
    Number.isFinite(requestedPage) && requestedPage > 0
      ? Math.floor(requestedPage)
      : 1;

  const result = await getBlogPosts(page, PAGE_SIZE);

  const start = result.total === 0 ? 0 : (result.page - 1) * result.pageSize + 1;
  const end = Math.min(result.page * result.pageSize, result.total);

  return (
    <main className="bg-white text-[#000759]">
      <section className="bg-[#000759] px-6 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-[1400px]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6b8cbe] md:text-xs">
            RE/MAX Philippines
          </p>
          <h1 className="mt-3 font-serif text-3xl font-normal leading-snug text-white md:text-5xl md:leading-tight">
            Insights &amp; Articles
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
            Market trends, expert analysis, and the latest from the Philippine
            real estate landscape.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-10 md:px-8 lg:px-10 lg:py-14">
        {result.total > 0 && (
          <p className="mb-6 text-xs text-[#4a5f9a]">
            Showing {start}–{end} of {result.total}{" "}
            {result.total === 1 ? "article" : "articles"}
          </p>
        )}

        <InsightsListingGrid posts={result.data} />

        <InsightsPagination
          page={result.page}
          totalPages={result.totalPages}
          className="mt-10"
        />
      </section>
    </main>
  );
}
