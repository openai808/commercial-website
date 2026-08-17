import InsightsListingRows from "@/features/insights/InsightsListingRows";
import InsightsPagination from "@/features/insights/InsightsPagination";
import InsightsResultsBar from "@/features/insights/InsightsResultsBar";
import InsightsSearchFilters from "@/features/insights/InsightsSearchFilters";
import { getInsightsCategories } from "@/lib/blog/getInsightsCategories";
import { getInsightsLocations } from "@/lib/blog/getInsightsLocations";
import { getInsightsPosts } from "@/lib/blog/getInsightsPosts";
import { parseInsightsSearchParams } from "@/lib/insights/searchParams";
import { parseInsightsSortParams } from "@/lib/insights/sortParams";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Market insights, industry trends, and expert analysis from RE/MAX Philippines.",
};

const PAGE_SIZE = 30;

type InsightsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function InsightsPage({
  searchParams,
}: InsightsPageProps) {
  const params = await searchParams;
  const filters = parseInsightsSearchParams(params);
  const sort = parseInsightsSortParams(params);
  const requestedPage = Number(
    Array.isArray(params.page) ? params.page[0] : (params.page ?? "1"),
  );
  const page =
    Number.isFinite(requestedPage) && requestedPage > 0
      ? Math.floor(requestedPage)
      : 1;

  const [categoryOptions, locationOptions, result] = await Promise.all([
    getInsightsCategories(),
    getInsightsLocations(),
    getInsightsPosts(page, PAGE_SIZE, {
      category: filters.category || undefined,
      location: filters.location || undefined,
      propertyType: filters.propertyType || undefined,
      keywords: filters.keywords || undefined,
      sort,
    }),
  ]);

  const start =
    result.total === 0 ? 0 : (result.page - 1) * result.pageSize + 1;
  const end = Math.min(result.page * result.pageSize, result.total);

  return (
    <main className="bg-white text-[#000759]">
      <h1 className="sr-only">Insights</h1>

      <InsightsSearchFilters
        initialQuery={filters}
        categoryOptions={categoryOptions}
        locationOptions={locationOptions}
      />
      <InsightsResultsBar
        start={start}
        end={end}
        total={result.total}
        initialSort={sort}
      />

      <section className="mx-auto max-w-[1400px] px-5 py-10 md:px-8 lg:px-10 lg:py-14">
        <InsightsListingRows posts={result.data} />
        <InsightsPagination
          page={result.page}
          totalPages={result.totalPages}
          basePath="/insights"
          className="mt-10"
        />
      </section>
    </main>
  );
}
