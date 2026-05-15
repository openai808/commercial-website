import type { Metadata } from "next";
import PropertiesListingsSection from "@/features/properties/PropertiesListingsSection";
import PropertiesResultsBar from "@/features/properties/PropertiesResultsBar";
import PropertiesSearchFilters from "@/features/properties/PropertiesSearchFilters";
import { getProperties } from "@/lib/properties/getProperties";

export const metadata: Metadata = {
  title: "Properties",
  description:
    "Browse commercial properties for lease and sale across the Philippines. Filter by location, property type, and keywords.",
};

const PAGE_SIZE = 20;

type PropertiesPageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function PropertiesPage({
  searchParams,
}: PropertiesPageProps) {
  const params = await searchParams;
  const requestedPage = Number(params.page ?? "1");
  const page =
    Number.isFinite(requestedPage) && requestedPage > 0
      ? Math.floor(requestedPage)
      : 1;

  const result = await getProperties(page, PAGE_SIZE);
  const start = result.total === 0 ? 0 : (result.page - 1) * result.pageSize + 1;
  const end = Math.min(result.page * result.pageSize, result.total);

  return (
    <main className="bg-white text-[#000759]">
      <PropertiesSearchFilters />
      <PropertiesResultsBar start={start} end={end} total={result.total} />
      <PropertiesListingsSection
        listings={result.data}
        page={result.page}
        totalPages={result.totalPages}
      />
    </main>
  );
}
