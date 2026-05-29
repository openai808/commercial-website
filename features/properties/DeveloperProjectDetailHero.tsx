"use client";

import type { DeveloperProject } from "@/lib/properties/getDeveloperProjects";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80";

type DeveloperProjectDetailHeroProps = {
  project: DeveloperProject;
};

function HeroImage({
  src,
  alt,
  className,
  sizes,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes: string;
  priority?: boolean;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && (
        <div
          className="absolute inset-0 z-[1] animate-pulse bg-[#e8eaf0] motion-reduce:animate-none"
          aria-hidden
        />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`${className ?? ""} transition-opacity duration-300 motion-reduce:transition-none ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setIsLoaded(true)}
      />
    </>
  );
}

export default function DeveloperProjectDetailHero({
  project,
}: DeveloperProjectDetailHeroProps) {
  const router = useRouter();
  const imageUrl = project.thumbnail_url || PLACEHOLDER_IMAGE;
  const title = project.project_name || "Untitled Project";
  const location = project.location || null;
  const floorPlanUrl = (project.floor_plan_url as string) || null;

  const handleBack = useCallback(() => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/properties/developer-projects");
    }
  }, [router]);

  return (
    <section aria-label="Project overview">
      <div className="mx-auto w-full max-w-[1400px] px-5 lg:px-8 xl:px-10">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-1.5 py-5 text-sm font-medium text-[#1a3fb5] transition hover:text-[#000759]"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back to Developer Projects
        </button>

        <div className="grid min-h-[420px] grid-cols-1 overflow-hidden bg-white lg:min-h-[520px] lg:grid-cols-2">
          {/* Left — building photo */}
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#0a1030] sm:aspect-[4/5] lg:aspect-auto">
            <HeroImage
              src={imageUrl}
              alt={title}
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Right — info + floor plan */}
          <div className="flex flex-col justify-start px-6 py-8 md:px-10 md:py-10 lg:px-14 lg:py-12">
            {location && (
              <p className="text-sm font-medium tracking-wide text-[#1a3fb5] md:text-base">
                {location}
              </p>
            )}

            <h1 className="mt-2 text-3xl font-bold leading-tight text-[#1a3fb5] md:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              {title}
            </h1>

            {project.contacts && project.contacts.length > 0 && (
              <div className="mt-8 rounded-lg bg-[#dfe3f0]/50 px-6 py-6 md:mt-10 md:px-8 md:py-8">
                <h2 className="text-base font-bold uppercase tracking-[0.08em] text-[#000759] md:text-lg">
                  Assigned Brokers
                </h2>
                <hr className="mt-3 border-[#000759]/20" />
                <div className="mt-5 space-y-5">
                  {project.contacts.map((contact) => (
                    <div key={contact.email || contact.name}>
                      <p className="text-base font-bold text-[#000759] md:text-lg">
                        {contact.name}
                      </p>
                      {contact.number && (
                        <a
                          href={`tel:${contact.number.replace(/\s/g, "")}`}
                          className="mt-1 block text-sm text-[#4a5f9a] hover:underline"
                        >
                          {contact.number}
                        </a>
                      )}
                      {contact.email && (
                        <a
                          href={`mailto:${contact.email}`}
                          className="block text-sm text-[#1a3fb5] hover:underline"
                        >
                          {contact.email}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {floorPlanUrl && (
              <div className="mt-8 md:mt-10">
                <h2 className="text-base font-bold text-[#000759] md:text-lg">
                  Floor Plan
                </h2>
                <div className="relative mt-4 aspect-[16/10] w-full max-w-[520px] overflow-hidden border border-[#d9dce5]">
                  <HeroImage
                    src={floorPlanUrl}
                    alt={`${title} floor plan`}
                    className="object-contain"
                    sizes="(max-width: 1024px) 90vw, 520px"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
