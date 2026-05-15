"use client";

import { type ChangeEvent, FormEvent, useId, useState } from "react";

const LISTING_OPTIONS = [
  { value: "", label: "All Listings" },
  { value: "for-lease", label: "For Lease" },
  { value: "for-sale", label: "For Sale" },
  { value: "investment", label: "Investment Properties" },
] as const;

const LOCATION_OPTIONS = [
  { value: "", label: "Location" },
  { value: "metro-manila", label: "Metro Manila" },
  { value: "cebu", label: "Cebu" },
  { value: "davao", label: "Davao" },
  { value: "clark", label: "Clark" },
  { value: "iloilo", label: "Iloilo" },
] as const;

const PROPERTY_TYPE_OPTIONS = [
  { value: "", label: "Property Type" },
  { value: "office", label: "Office" },
  { value: "retail", label: "Retail" },
  { value: "industrial", label: "Industrial" },
  { value: "multifamily", label: "Multifamily" },
  { value: "hospitality", label: "Hotels" },
] as const;

const EXPERT_OPTIONS = [
  { value: "", label: "Experts" },
  { value: "broker-1", label: "Maria Santos" },
  { value: "broker-2", label: "James Rivera" },
  { value: "broker-3", label: "Ana Dela Cruz" },
] as const;

type AreaUnit = "sqft" | "sqm";

const fieldLabelClass =
  "text-[10px] font-semibold uppercase tracking-[0.14em] text-[#000759]";

const underlineFieldClass = "relative w-full border-b border-[#000759]";

const selectInputClass =
  "w-full cursor-pointer appearance-none border-0 bg-transparent pb-2.5 pr-8 pt-1 text-base text-[#000759] outline-none";

const underlineInputClass =
  "min-w-0 flex-1 border-0 border-b border-[#000759] bg-transparent pb-2 pt-1 text-base text-[#000759] outline-none placeholder:text-[#000759]/70 focus:border-[#000759]";

const keywordInputClass =
  "w-full border-0 bg-transparent pb-2.5 pr-9 pt-1 text-base text-[#000759] outline-none placeholder:italic placeholder:text-[#000759]/90";

/** Icons sit on the underline at the right edge, not vertically centered in the field. */
const fieldIconClass =
  "pointer-events-none absolute right-0 bottom-3 translate-y-1/2 text-[#000759]";

const advancedToggleClass =
  "inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#000759] transition hover:opacity-75";

function ChevronIcon({
  direction,
  className,
}: {
  direction: "up" | "down";
  className?: string;
}) {
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
        d={direction === "down" ? "M6 9l6 6 6-6" : "M6 15l6-6 6 6"}
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

function UnderlineSelect({
  name,
  value,
  onChange,
  options,
  "aria-label": ariaLabel,
}: {
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: readonly { value: string; label: string }[];
  "aria-label": string;
}) {
  return (
    <div className={underlineFieldClass}>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={selectInputClass}
        aria-label={ariaLabel}
      >
        {options.map((option) => (
          <option key={option.value || "default"} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span className={fieldIconClass} aria-hidden>
        <ChevronIcon direction="down" className="h-5 w-5" />
      </span>
    </div>
  );
}

const INITIAL_FILTERS = {
  listing: "",
  location: "",
  propertyType: "",
  keywords: "",
  floorAreaMin: "",
  floorAreaMax: "",
  areaUnit: "sqft" as AreaUnit,
  expert: "",
};

export default function PropertiesSearchFilters() {
  const formId = useId();
  const advancedPanelId = `${formId}-advanced-panel`;
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [listing, setListing] = useState(INITIAL_FILTERS.listing);
  const [location, setLocation] = useState(INITIAL_FILTERS.location);
  const [propertyType, setPropertyType] = useState(INITIAL_FILTERS.propertyType);
  const [keywords, setKeywords] = useState(INITIAL_FILTERS.keywords);
  const [floorAreaMin, setFloorAreaMin] = useState(INITIAL_FILTERS.floorAreaMin);
  const [floorAreaMax, setFloorAreaMax] = useState(INITIAL_FILTERS.floorAreaMax);
  const [areaUnit, setAreaUnit] = useState<AreaUnit>(INITIAL_FILTERS.areaUnit);
  const [expert, setExpert] = useState(INITIAL_FILTERS.expert);

  const handleReset = () => {
    setListing(INITIAL_FILTERS.listing);
    setLocation(INITIAL_FILTERS.location);
    setPropertyType(INITIAL_FILTERS.propertyType);
    setKeywords(INITIAL_FILTERS.keywords);
    setFloorAreaMin(INITIAL_FILTERS.floorAreaMin);
    setFloorAreaMax(INITIAL_FILTERS.floorAreaMax);
    setAreaUnit(INITIAL_FILTERS.areaUnit);
    setExpert(INITIAL_FILTERS.expert);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Filter submission can be wired to query params or an API later.
  };

  return (
    <section
      aria-labelledby={`${formId}-heading`}
      className="w-full bg-white text-[#000759]"
    >
      <h1 id={`${formId}-heading`} className="sr-only">
        Property search
      </h1>

      <div className="mx-auto w-full px-6 md:px-10">
        <form role="search" aria-label="Search properties" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 xl:gap-10">
            <label className="flex min-w-0 flex-col gap-1.5">
              <span className={fieldLabelClass}>All Listings</span>
              <UnderlineSelect
                name="listing"
                value={listing}
                onChange={(event) => setListing(event.target.value)}
                options={LISTING_OPTIONS}
                aria-label="Listing type"
              />
            </label>

            <label className="flex min-w-0 flex-col gap-1.5">
              <span className={fieldLabelClass}>Location</span>
              <UnderlineSelect
                name="location"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                options={LOCATION_OPTIONS}
                aria-label="Location"
              />
            </label>

            <label className="flex min-w-0 flex-col gap-1.5">
              <span className={fieldLabelClass}>Property Type</span>
              <UnderlineSelect
                name="propertyType"
                value={propertyType}
                onChange={(event) => setPropertyType(event.target.value)}
                options={PROPERTY_TYPE_OPTIONS}
                aria-label="Property type"
              />
            </label>

            <label className="flex min-w-0 flex-col gap-1.5">
              <span className={fieldLabelClass}>Keywords</span>
              <div className={underlineFieldClass}>
                <input
                  type="search"
                  name="keywords"
                  value={keywords}
                  onChange={(event) => setKeywords(event.target.value)}
                  placeholder="Keywords"
                  className={keywordInputClass}
                  aria-label="Search keywords"
                />
                <button
                  type="submit"
                  className={`${fieldIconClass} pointer-events-auto p-0 transition hover:opacity-70`}
                  aria-label="Search properties"
                >
                  <SearchIcon className="h-6 w- -mt-1" />
                </button>
              </div>
            </label>
          </div>

          {!advancedOpen ? (
            <div className="mt-7 flex justify-end">
              <button
                type="button"
                className={advancedToggleClass}
                aria-expanded={false}
                aria-controls={advancedPanelId}
                onClick={() => setAdvancedOpen(true)}
              >
                Advanced Search
                <ChevronIcon direction="down" />
              </button>
            </div>
          ) : null}

          <div
            id={advancedPanelId}
            hidden={!advancedOpen}
            className={advancedOpen ? "mt-6 pt-6" : undefined}
          >
            {advancedOpen ? (
              <>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className={advancedToggleClass}
                    aria-expanded={true}
                    aria-controls={advancedPanelId}
                    onClick={() => setAdvancedOpen(false)}
                  >
                    Hide Advanced Search
                    <ChevronIcon direction="up" />
                  </button>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.75fr)_minmax(0,1fr)] lg:items-start lg:gap-12">
                  <fieldset className="min-w-0 border-0 p-0">
                    <legend className={fieldLabelClass}>
                      Floor Area | Building Size
                    </legend>
                    <div className="mt-3 flex items-end gap-3">
                      <label className="sr-only" htmlFor={`${formId}-floor-min`}>
                        Minimum floor area
                      </label>
                      <input
                        id={`${formId}-floor-min`}
                        type="number"
                        name="floorAreaMin"
                        min={0}
                        placeholder="Min"
                        value={floorAreaMin}
                        onChange={(event) => setFloorAreaMin(event.target.value)}
                        className={underlineInputClass}
                      />
                      <span className="shrink-0 pb-2.5 text-base text-[#000759]">to</span>
                      <label className="sr-only" htmlFor={`${formId}-floor-max`}>
                        Maximum floor area
                      </label>
                      <input
                        id={`${formId}-floor-max`}
                        type="number"
                        name="floorAreaMax"
                        min={0}
                        placeholder="Max"
                        value={floorAreaMax}
                        onChange={(event) => setFloorAreaMax(event.target.value)}
                        className={underlineInputClass}
                      />
                    </div>
                    <div className="mt-4 flex flex-wrap gap-6">
                      <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-[#000759]">
                        <input
                          type="radio"
                          name="areaUnit"
                          value="sqft"
                          checked={areaUnit === "sqft"}
                          onChange={() => setAreaUnit("sqft")}
                          className="h-4 w-4 accent-[#2563eb]"
                        />
                        Square Feet
                      </label>
                      <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-[#000759]">
                        <input
                          type="radio"
                          name="areaUnit"
                          value="sqm"
                          checked={areaUnit === "sqm"}
                          onChange={() => setAreaUnit("sqm")}
                          className="h-4 w-4 accent-[#2563eb]"
                        />
                        Meters Squared
                      </label>
                    </div>
                  </fieldset>

                  <label className="flex min-w-0 flex-col gap-1.5">
                    <span className={fieldLabelClass}>Experts</span>
                    <UnderlineSelect
                      name="expert"
                      value={expert}
                      onChange={(event) => setExpert(event.target.value)}
                      options={EXPERT_OPTIONS}
                      aria-label="Expert"
                    />
                  </label>

                  <p className="text-sm leading-relaxed text-[#4a5f9a] lg:pt-6">
                    Selecting a listing type will unlock more advanced search options.
                  </p>
                </div>

                <div className="mt-10 flex justify-end">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#000759] transition hover:opacity-75"
                  >
                    Reset
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  );
}
