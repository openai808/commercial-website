import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DeveloperProjectAvailability from "@/features/properties/DeveloperProjectAvailability";
import DeveloperProjectBuildingInfo from "@/features/properties/DeveloperProjectBuildingInfo";
import DeveloperProjectDetailHero from "@/features/properties/DeveloperProjectDetailHero";
import { mapDeveloperBuildingAvailabilityRows } from "@/lib/properties/developerProjectAvailability";
import { getDeveloperBuildingAvailability } from "@/lib/properties/getDeveloperBuildingAvailability";
import { getDeveloperProjectById } from "@/lib/properties/getDeveloperProjects";

type DeveloperProjectDetailPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: DeveloperProjectDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = await getDeveloperProjectById(id);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: project.project_name || "Developer Project",
    description: project.location
      ? `${project.project_name} — ${project.location}`
      : project.project_name,
  };
}

export default async function DeveloperProjectDetailPage({
  params,
}: DeveloperProjectDetailPageProps) {
  const { id } = await params;
  const [project, availabilityRecords] = await Promise.all([
    getDeveloperProjectById(id),
    getDeveloperBuildingAvailability(id).catch(() => []),
  ]);

  if (!project) {
    notFound();
  }

  const availabilityRows = mapDeveloperBuildingAvailabilityRows(
    availabilityRecords,
  );

  return (
    <main className="bg-white text-[#000759]">
      <DeveloperProjectDetailHero project={project} />
      <DeveloperProjectBuildingInfo project={project} />
      <DeveloperProjectAvailability rows={availabilityRows} />
    </main>
  );
}
