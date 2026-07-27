import { getPeople } from "@/lib/people/getPeople";
import { getPersonAvatarUrl, getPersonName } from "@/lib/people/personDisplay";

/**
 * Best-effort lookup of real Supabase avatar photos by full name, for
 * enriching static marketing content (e.g. leadership bios). Never throws —
 * falls back to an empty map so callers can render placeholder avatars
 * instead of failing the page if Supabase is unreachable.
 */
export async function getAvatarsByName(): Promise<Map<string, string>> {
  try {
    const people = await getPeople();
    const map = new Map<string, string>();
    for (const person of people) {
      const name = getPersonName(person);
      if (name) {
        map.set(name.toLowerCase(), getPersonAvatarUrl(person));
      }
    }
    return map;
  } catch (error) {
    console.error("Failed to load people directory for avatar enrichment", error);
    return new Map();
  }
}
