import type { Metadata } from "next";
import DeveloperProjectsGrid from "@/features/properties/DeveloperProjectsGrid";
import { PropertiesListingsNavigationProvider } from "@/features/properties/PropertiesListingsNavigationContext";
import { getDeveloperProjects } from "@/lib/properties/getDeveloperProjects";
import PropertiesPagination from "@/features/properties/PropertiesPagination";

export const metadata: Metadata = {
  title: "Developer Projects",
  description:
    "Browse developer projects across the Philippines. Find office spaces from top developers.",
};

const PAGE_SIZE = 20;

type DeveloperProjectsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function DeveloperProjectsPage({
  searchParams,
}: DeveloperProjectsPageProps) {
  const params = await searchParams;
  const requestedPage = Number(
    Array.isArray(params.page) ? params.page[0] : params.page ?? "1",
  );
  const page =
    Number.isFinite(requestedPage) && requestedPage > 0
      ? Math.floor(requestedPage)
      : 1;

  const result = await getDeveloperProjects(page, PAGE_SIZE);
  const start =
    result.total === 0 ? 0 : (result.page - 1) * result.pageSize + 1;
  const end = Math.min(result.page * result.pageSize, result.total);

  return (
    <main className="bg-white text-[#000759]">
      <PropertiesListingsNavigationProvider>
        <div className="mx-auto w-full px-6 py-10 md:px-10">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Developer Projects
          </h1>

          {result.total > 0 && (
            <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#000759]/70">
              Results {start}-{end} of {result.total.toLocaleString("en-US")}
            </p>
          )}

          <div className="mt-8">
            <DeveloperProjectsGrid projects={result.data} />
          </div>

          {result.totalPages > 1 && (
            <PropertiesPagination
              page={result.page}
              totalPages={result.totalPages}
              className="pt-10"
            />
          )}
        </div>
      </PropertiesListingsNavigationProvider>
    </main>
  );
}
