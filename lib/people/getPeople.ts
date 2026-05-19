import type { PersonProfile } from "@/lib/people/types";
import { getPersonName } from "@/lib/people/personDisplay";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const PERSON_SELECT =
  "id, first_name, last_name, email, mobile_number, avatar_url, department, position";

export async function getPeople(): Promise<PersonProfile[]> {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from("profiles_directory")
    .select(PERSON_SELECT)
    .eq("status", "active")
    .order("last_name", { ascending: true })
    .order("first_name", { ascending: true });

  if (error) throw error;

  const people = (data ?? []) as PersonProfile[];

  return people
    .filter((person) => getPersonName(person) != null)
    .sort((a, b) => {
      const nameA = getPersonName(a) ?? "";
      const nameB = getPersonName(b) ?? "";
      return nameA.localeCompare(nameB);
    });
}
