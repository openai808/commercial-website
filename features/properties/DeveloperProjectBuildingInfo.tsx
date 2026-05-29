import type { DeveloperProject } from "@/lib/properties/getDeveloperProjects";

type SpecItem = { label: string; value: string };

const SPEC_KEYS: { key: string; label: string }[] = [
  { key: "developer_name", label: "Developer" },
  { key: "completion_date", label: "Completion Date" },
  { key: "building_type", label: "Building Type" },
  { key: "certification", label: "Certification" },
  { key: "average_floor_plate", label: "Average Floor Plate (sqm)" },
  { key: "leasable_area", label: "Leasable Area (sqm)" },
  { key: "floor_efficiency", label: "Floor Efficiency (sqm)" },
  { key: "telco_providers", label: "Telco Providers" },
  { key: "twenty_four_seven_operation", label: "24/7 Operation" },
  { key: "no_of_floors", label: "No. of Floors" },
  { key: "no_of_elevators", label: "No. of Elevators" },
  { key: "density_ratio", label: "Density Ratio" },
  { key: "cusa", label: "CUSA (per sqm)" },
  { key: "ac_system", label: "AC System" },
  { key: "ac_charges", label: "AC Charges" },
  { key: "back_up_power", label: "Back Up Power" },
  { key: "power_loading", label: "Power Loading" },
];

function extractSpecs(project: DeveloperProject): SpecItem[] {
  return SPEC_KEYS.map(({ key, label }) => {
    const raw = project[key];
    const value = raw == null || raw === "" ? "—" : String(raw);
    return { label, value };
  });
}

type DeveloperProjectBuildingInfoProps = {
  project: DeveloperProject;
};

export default function DeveloperProjectBuildingInfo({
  project,
}: DeveloperProjectBuildingInfoProps) {
  const specs = extractSpecs(project);

  return (
    <section aria-label="General information" className="pt-10 md:pt-14">
      <div className="mx-auto w-full max-w-[1400px] px-5 lg:px-8 xl:px-10">
        <h2 className="text-base font-bold uppercase tracking-[0.08em] text-[#000759] md:text-lg">
          General Information
        </h2>

        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-2 md:grid-cols-4 md:gap-x-8 md:gap-y-8">
          {specs.map(({ label, value }) => (
            <div key={label}>
              <dt className="text-xs font-medium text-[#4a5f9a] md:text-sm">
                {label}
              </dt>
              <dd className="mt-1 text-sm font-semibold text-[#000759] whitespace-pre-line md:text-base">
                {value}
              </dd>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
