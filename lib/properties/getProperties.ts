import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  ALLOWED_LISTING_PROPERTY_TYPES,
  type ListingAgent,
  type ListingWithAgent,
  type PropertiesPageResult,
} from "@/lib/properties/types";

const AGENT_SELECT =
  "id, first_name, last_name, profile_picture_url, position";

export async function getProperties(
  page = 1,
  pageSize = 20,
): Promise<PropertiesPageResult> {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const supabase = createSupabaseServerClient();

  // `listings_secure` is a view — PostgREST cannot embed via FK hints on views.
  const { data: listings, error, count } = await supabase
    .from("listings_secure")
    .select("*", { count: "exact" })
    .eq("status", "Available")
    .in("property_type", [...ALLOWED_LISTING_PROPERTY_TYPES])
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw error;

  const rows = listings ?? [];
  const agentsById = await fetchAgentsById(
    supabase,
    rows
      .map((row) => row.agent_id)
      .filter((id): id is string => typeof id === "string" && id.length > 0),
  );

  const data: ListingWithAgent[] = rows.map((row) => {
    const listing = row as ListingWithAgent;
    return {
      ...listing,
      agent:
        typeof listing.agent_id === "string"
          ? (agentsById.get(listing.agent_id) ?? null)
          : null,
    };
  });

  const total = count ?? 0;

  return {
    data,
    page,
    pageSize,
    total,
    totalPages: Math.ceil(total / pageSize),
  };
}

async function fetchAgentsById(
  supabase: ReturnType<typeof createSupabaseServerClient>,
  agentIds: string[],
): Promise<Map<string, ListingAgent>> {
  const uniqueIds = [...new Set(agentIds)];
  if (uniqueIds.length === 0) return new Map();

  const { data: agents, error } = await supabase
    .from("profiles_directory")
    .select(AGENT_SELECT)
    .in("id", uniqueIds);

  if (error) {
    // Agent profiles are optional for the grid; don't fail the whole page.
    console.error("Failed to load agent profiles:", error.message);
    return new Map();
  }

  return new Map(
    (agents ?? []).map((agent) => [agent.id, agent as ListingAgent]),
  );
}
