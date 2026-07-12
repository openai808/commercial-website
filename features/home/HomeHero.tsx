"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import CheckboxFilterMultiSelect from "@/features/properties/CheckboxFilterMultiSelect";
import {
  buildPropertiesSearchParams,
  EMPTY_PROPERTIES_QUERY,
} from "@/lib/properties/searchParams";
import type {
  ListingCityCount,
  ListingPropertyTypeCount,
} from "@/lib/properties/types";

const HERO_IMAGE_SRC = "/images/section1.jpg";

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5V10.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const fieldLabelClass =
  "text-[10px] font-semibold uppercase tracking-[0.14em] text-[#000759]";

type HomeHeroProps = {
  cityOptions: ListingCityCount[];
  propertyTypeOptions: ListingPropertyTypeCount[];
};

export default function HomeHero({
  cityOptions,
  propertyTypeOptions,
}: HomeHeroProps) {
  const router = useRouter();
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [keywords, setKeywords] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = {
      ...EMPTY_PROPERTIES_QUERY,
      propertyTypes,
      cities,
      keywords: keywords.trim(),
    };
    const params = buildPropertiesSearchParams(query);
    const qs = params.toString();
    router.push(qs.length > 0 ? `/properties?${qs}` : "/properties");
  };

  return (
    <section className="relative isolate flex min-h-[560px] w-full items-center overflow-hidden bg-slate-900 sm:min-h-[620px] md:min-h-[700px]">
      <img
        src={HERO_IMAGE_SRC}
        alt="Glass office building exterior"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-slate-900/30" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-6 py-20 text-center sm:px-10 lg:px-16">
        <div className="max-w-4xl">
          <h1 className="font-gotham text-[32px] font-extrabold leading-tight text-white sm:text-[40px] lg:text-[48px] xl:text-[56px]">
            <span className="whitespace-nowrap">Integrity in every transaction.</span>
            <br />
            Excellence in every deal.
          </h1>
        </div>

        <form
          role="search"
          aria-label="Search properties"
          onSubmit={handleSubmit}
          className="mt-10 w-full max-w-3xl overflow-hidden rounded-2xl text-left shadow-xl sm:mt-12"
        >
          <div className="flex flex-col sm:flex-row">
            <button
              type="submit"
              aria-label="Search properties"
              className="flex cursor-pointer items-center justify-center gap-2 bg-[#000759] px-6 py-4 text-white transition hover:bg-[#001a8f] sm:w-24 sm:py-0"
            >
              <SearchIcon className="h-6 w-6" />
              <span className="text-sm font-bold uppercase tracking-wide sm:hidden">
                Search
              </span>
            </button>

            <div className="grid flex-1 grid-cols-1 gap-6 bg-white px-6 py-5 sm:grid-cols-3 sm:gap-8 sm:px-8 sm:py-6">
              <CheckboxFilterMultiSelect
                label="Property Type"
                placeholder="All"
                emptyMessage="No property types available"
                inputName="heroPropertyType"
                multipleLabel="property types"
                options={propertyTypeOptions.map(({ propertyType, count }) => ({
                  value: propertyType,
                  label: propertyType,
                  count,
                }))}
                selectedValues={propertyTypes}
                onChange={setPropertyTypes}
              />

              <CheckboxFilterMultiSelect
                label="Locations"
                placeholder="All"
                emptyMessage="No locations available"
                inputName="heroLocation"
                multipleLabel="locations"
                options={cityOptions.map(({ city, count }) => ({
                  value: city,
                  label: city,
                  count,
                }))}
                selectedValues={cities}
                onChange={setCities}
              />

              <label className="flex min-w-0 flex-col gap-1.5">
                <span className={fieldLabelClass}>Search</span>
                <input
                  type="search"
                  value={keywords}
                  onChange={(event) => setKeywords(event.target.value)}
                  placeholder="I'm Looking For..."
                  className="w-full border-0 border-b border-[#000759] bg-transparent pb-2.5 pt-1 text-base text-[#000759] outline-none placeholder:text-[#000759]/60 focus-visible:ring-2 focus-visible:ring-[#000759] focus-visible:ring-offset-2"
                />
              </label>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
