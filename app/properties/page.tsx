import type { Metadata } from "next";
import PropertiesListingsSection from "@/features/properties/PropertiesListingsSection";
import { PropertiesListingsNavigationProvider } from "@/features/properties/PropertiesListingsNavigationContext";
import PropertiesResultsBar from "@/features/properties/PropertiesResultsBar";
import PropertiesSearchFilters from "@/features/properties/PropertiesSearchFilters";
import { getListingAgentCounts } from "@/lib/properties/getListingAgentCounts";
import { getListingCityCounts } from "@/lib/properties/getListingCityCounts";
import { getListingPropertyTypeCounts } from "@/lib/properties/getListingPropertyTypeCounts";
import { getProperties } from "@/lib/properties/getProperties";
import {
  hasActivePropertiesQuery,
  parsePropertiesSearchParams,
  parsePropertiesSortParams,
} from "@/lib/properties/searchParams";

export const metadata: Metadata = {
  title: "Properties",
  description:
    "Browse commercial properties for lease and sale across the Philippines. Filter by location, property type, and keywords.",
};

const PAGE_SIZE = 20;

type PropertiesPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function PropertiesPage({
  searchParams,
}: PropertiesPageProps) {
  const params = await searchParams;
  const filters = parsePropertiesSearchParams(params);
  const sort = parsePropertiesSortParams(params);
  const requestedPage = Number(
    Array.isArray(params.page) ? params.page[0] : params.page ?? "1",
  );
  const page =
    Number.isFinite(requestedPage) && requestedPage > 0
      ? Math.floor(requestedPage)
      : 1;

  const [result, cityOptions, propertyTypeOptions, agentOptions] =
    await Promise.all([
      getProperties(
        page,
        PAGE_SIZE,
        hasActivePropertiesQuery(filters) ? filters : undefined,
        sort,
      ),
      getListingCityCounts(),
      getListingPropertyTypeCounts(),
      getListingAgentCounts(),
    ]);
  const start = result.total === 0 ? 0 : (result.page - 1) * result.pageSize + 1;
  const end = Math.min(result.page * result.pageSize, result.total);

  return (
    <main className="bg-white text-[#000759]">
      <PropertiesListingsNavigationProvider>
        <PropertiesSearchFilters
          initialQuery={filters}
          cityOptions={cityOptions}
          propertyTypeOptions={propertyTypeOptions}
          agentOptions={agentOptions}
        />
        <PropertiesResultsBar
          start={start}
          end={end}
          total={result.total}
          initialSort={sort}
        />
        <PropertiesListingsSection
          listings={result.data}
          page={result.page}
          totalPages={result.totalPages}
        />
      </PropertiesListingsNavigationProvider>
    </main>
  );
}
