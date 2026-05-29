import type { DeveloperProjectAvailabilityRow } from "@/lib/properties/developerProjectAvailability";

type DeveloperProjectAvailabilityProps = {
  rows?: DeveloperProjectAvailabilityRow[];
};

const COLUMNS = [
  { key: "floor", label: "Floor" },
  { key: "unit", label: "Unit" },
  { key: "floorAreaSqm", label: "Floor Area (sqm)" },
  { key: "pricePerSqm", label: "Price/sqm" },
  { key: "price", label: "Price" },
  { key: "parkingRate", label: "Parking Rate (Per slot, per month)" },
  { key: "parkingAllocation", label: "Parking Allocation" },
  { key: "handoverCondition", label: "Handover Condition" },
] as const;

export default function DeveloperProjectAvailability({
  rows = [],
}: DeveloperProjectAvailabilityProps) {
  if (rows.length === 0) return null;

  return (
    <section aria-label="Availability" className="pb-10 pt-10 md:pt-14">
      <div className="mx-auto w-full max-w-[1400px] px-5 lg:px-8 xl:px-10">
        <h2 className="text-base font-bold uppercase tracking-[0.08em] text-[#000759] md:text-lg">
          Availability
        </h2>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[1080px] border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-[#000759] text-sm font-bold text-[#1a3fb5] md:text-base">
                {COLUMNS.map(({ label }) => (
                  <th key={label} className="pb-3 pr-4 font-bold last:pr-0">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-[#e8ebf2] text-sm text-[#000759] md:text-base"
                >
                  {COLUMNS.map(({ key }) => (
                    <td key={key} className="py-4 pr-4 align-top last:pr-0">
                      {row[key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
