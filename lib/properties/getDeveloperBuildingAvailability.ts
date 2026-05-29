import { createSupabaseServerClient } from "@/lib/supabase/server";

export type DeveloperBuildingAvailabilityRecord = {
  id: string;
  developer_project_id: string;
  floor?: string | null;
  unit_number?: string | null;
  floor_area?: number | string | null;
  price_per_sqm?: number | string | null;
  monthly_rental_price?: number | string | null;
  selling_price?: number | string | null;
  turnover_condition?: string | null;
  contract_type?: string | null;
  is_hidden?: boolean | null;
  remarks?: string | null;
  created_at?: string | null;
  [key: string]: unknown;
};

export async function getDeveloperBuildingAvailability(
  projectId: string,
): Promise<DeveloperBuildingAvailabilityRecord[]> {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from("developer_building_availability_public")
    .select("*")
    .eq("developer_project_id", projectId)
    .order("created_at", { ascending: true });

  if (error) throw error;

  return (data as DeveloperBuildingAvailabilityRecord[]) ?? [];
}
