"use client";

import type { InsightsCategoryOption } from "@/lib/blog/getInsightsCategories";
import type { InsightsLocationOption } from "@/lib/blog/getInsightsLocations";
import {
  buildInsightsSearchParams,
  type InsightsQuery,
} from "@/lib/insights/searchParams";
import { parseInsightsSortParams } from "@/lib/insights/sortParams";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
  useEffect,
  useId,
  useState,
} from "react";

const SERVICE_OPTIONS = [
  { value: "", label: "All Services" },
  { value: "for-lease", label: "For Lease" },
  { value: "for-sale", label: "For Sale" },
] as const;

const PROPERTY_TYPE_OPTIONS = [
  { value: "", label: "All Property Types" },
  { value: "Office", label: "Office" },
  { value: "Industrial and Logistics", label: "Industrial and Logistics" },
  { value: "Hotels and Hospitality", label: "Hotels and Hospitality" },
  { value: "Retail", label: "Retail" },
  { value: "Residential", label: "Residential" },
] as const;

const fieldLabelClass =
  "text-[10px] font-semibold uppercase tracking-[0.14em] text-[#000759]";

const underlineFieldClass = "relative w-full border-b border-[#000759]";

const selectInputClass =
  "w-full cursor-pointer appearance-none border-0 bg-transparent pb-2.5 pr-8 pt-1 text-base text-[#000759] outline-none focus-visible:ring-2 focus-visible:ring-[#000759] focus-visible:ring-offset-2";

const keywordInputClass =
  "w-full border-0 bg-transparent pb-2.5 pr-9 pt-1 text-base text-[#000759] outline-none placeholder:italic placeholder:text-[#000759]/90 focus-visible:ring-2 focus-visible:ring-[#000759] focus-visible:ring-offset-2";

/** Icons sit on the underline at the right edge, not vertically centered in the field. */
const fieldIconClass =
  "pointer-events-none absolute right-0 bottom-3 translate-y-1/2 text-[#000759]";

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
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

function SelectField({
  label,
  ariaLabel,
  name,
  value,
  onChange,
  children,
}: {
  label: string;
  ariaLabel: string;
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  children: ReactNode;
}) {
  return (
    <label className="flex min-w-0 flex-col gap-1.5">
      <span className={fieldLabelClass}>{label}</span>
      <div className={underlineFieldClass}>
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={selectInputClass}
          aria-label={ariaLabel}
        >
          {children}
        </select>
        <span className={fieldIconClass} aria-hidden>
          <ChevronIcon className="h-5 w-5" />
        </span>
      </div>
    </label>
  );
}

type InsightsSearchFiltersProps = {
  initialQuery: InsightsQuery;
  categoryOptions: InsightsCategoryOption[];
  locationOptions: InsightsLocationOption[];
};

export default function InsightsSearchFilters({
  initialQuery,
  categoryOptions,
  locationOptions,
}: InsightsSearchFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const formId = useId();

  const [keywords, setKeywords] = useState(initialQuery.keywords);
  const [category, setCategory] = useState(initialQuery.category);
  const [location, setLocation] = useState(initialQuery.location);
  const [propertyType, setPropertyType] = useState(initialQuery.propertyType);
  // Service has no backing field on posts yet — UI only, doesn't filter.
  const [service, setService] = useState("");

  useEffect(() => {
    setKeywords(initialQuery.keywords);
    setCategory(initialQuery.category);
    setLocation(initialQuery.location);
    setPropertyType(initialQuery.propertyType);
  }, [initialQuery]);

  const applyQuery = (next: InsightsQuery) => {
    const sort = parseInsightsSortParams(
      Object.fromEntries(searchParams.entries()),
    );
    const params = buildInsightsSearchParams(next, { sort });
    const qs = params.toString();
    const url = qs.length > 0 ? `${pathname}?${qs}` : pathname;
    router.push(url, { scroll: false });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    applyQuery({ keywords, category, location, propertyType });
  };

  const handleKeywordsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setKeywords(value);
    // Clearing a previously-searched term should fall back to the
    // default insights listing without waiting for another submit.
    if (value === "" && keywords !== "") {
      applyQuery({ keywords: "", category, location, propertyType });
    }
  };

  const handleLocationChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setLocation(value);
    applyQuery({ keywords, category, location: value, propertyType });
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setCategory(value);
    applyQuery({ keywords, category: value, location, propertyType });
  };

  const handlePropertyTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setPropertyType(value);
    applyQuery({ keywords, category, location, propertyType: value });
  };

  return (
    <section
      aria-labelledby={`${formId}-heading`}
      className="w-full bg-white text-[#000759]"
    >
      <h2 id={`${formId}-heading`} className="sr-only">
        Search insights
      </h2>

      <div className="mx-auto w-full px-6 py-10 md:px-10">
        <form
          role="search"
          aria-label="Search insights"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6 xl:gap-8">
            <label className="flex min-w-0 flex-col gap-1.5">
              <span className={fieldLabelClass}>Keywords</span>
              <div className={underlineFieldClass}>
                <input
                  type="search"
                  name="keywords"
                  value={keywords}
                  onChange={handleKeywordsChange}
                  placeholder="Keywords"
                  className={keywordInputClass}
                  aria-label="Search keywords"
                />
                <button
                  type="submit"
                  className={`${fieldIconClass} pointer-events-auto p-0 transition hover:opacity-70`}
                  aria-label="Search insights"
                >
                  <SearchIcon className="-mt-1 h-6 w-6" />
                </button>
              </div>
            </label>

            <SelectField
              label="Location"
              ariaLabel="Location"
              name="location"
              value={location}
              onChange={handleLocationChange}
            >
              <option value="">All Locations</option>
              {locationOptions.map((option) => (
                <option key={option.location} value={option.location}>
                  {option.location}
                </option>
              ))}
            </SelectField>

            <SelectField
              label="Research Type"
              ariaLabel="Research type"
              name="category"
              value={category}
              onChange={handleCategoryChange}
            >
              <option value="">All Insights</option>
              {categoryOptions.map((option) => (
                <option key={option.category} value={option.category}>
                  {option.category}
                </option>
              ))}
            </SelectField>

            <SelectField
              label="Property Type"
              ariaLabel="Property type"
              name="propertyType"
              value={propertyType}
              onChange={handlePropertyTypeChange}
            >
              {PROPERTY_TYPE_OPTIONS.map((option) => (
                <option key={option.value || "all"} value={option.value}>
                  {option.label}
                </option>
              ))}
            </SelectField>

            <SelectField
              label="Service"
              ariaLabel="Service"
              name="service"
              value={service}
              onChange={(event) => setService(event.target.value)}
            >
              {SERVICE_OPTIONS.map((option) => (
                <option key={option.value || "all"} value={option.value}>
                  {option.label}
                </option>
              ))}
            </SelectField>
          </div>
        </form>
      </div>
    </section>
  );
}
