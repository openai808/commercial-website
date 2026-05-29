"use client";

import type { DeveloperProject } from "@/lib/properties/getDeveloperProjects";
import { usePropertiesListingsNavigation } from "@/features/properties/PropertiesListingsNavigationContext";
import Image from "next/image";
import Link from "next/link";

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80";

type DeveloperProjectsGridProps = {
  projects: DeveloperProject[];
};

export default function DeveloperProjectsGrid({
  projects,
}: DeveloperProjectsGridProps) {
  const nav = usePropertiesListingsNavigation();
  const pending = nav?.isListingsPending ?? false;

  const pendingClass = pending
    ? "blur-[2px] opacity-[0.72] pointer-events-none select-none motion-reduce:blur-none motion-reduce:opacity-80"
    : "";

  if (projects.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-sm text-[#4a5f9a]">
          No developer projects available right now.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xl:gap-4 transition-all duration-200 ${pendingClass}`}
      aria-busy={pending}
    >
      {projects.map((project, index) => (
        <DeveloperProjectCard key={project.id} project={project} priority={index < 4} />
      ))}
    </div>
  );
}

function DeveloperProjectCard({ project, priority }: { project: DeveloperProject; priority?: boolean }) {
  const imageUrl = project.thumbnail_url || PLACEHOLDER_IMAGE;
  const title = project.project_name || "Untitled Project";
  const city = project.location || null;

  return (
    <Link
      href={`/properties/developer-projects/${project.id}`}
      className="group relative flex flex-col overflow-hidden border border-[#d9dce5] bg-white text-left transition-shadow duration-200 hover:shadow-md"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          priority={priority}
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center bg-[#23408e]/0 transition-colors duration-200 group-hover:bg-[#23408e]/72"
        >
          <span className="pointer-events-auto translate-y-1 rounded-full bg-white px-8 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#000759] opacity-0 shadow-md transition-all duration-200 hover:bg-[#000759] hover:text-white group-hover:translate-y-0 group-hover:opacity-100">
            More details
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4 md:p-5">
        <h2 className="text-sm font-bold leading-snug text-[#000759] group-hover:underline md:text-[15px] md:leading-6">
          {title}
        </h2>
        {city && (
          <p className="text-xs text-[#000759]/80 md:text-sm">{city}</p>
        )}
      </div>
    </Link>
  );
}
