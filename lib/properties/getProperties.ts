import { applyPropertiesQuery } from "@/lib/properties/applyPropertiesQuery";
import { applyPropertiesSort } from "@/lib/properties/applyPropertiesSort";
import type { PropertiesQuery } from "@/lib/properties/searchParams";
import {
  DEFAULT_PROPERTIES_SORT,
  type PropertiesSort,
} from "@/lib/properties/sortParams";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  ALLOWED_LISTING_PROPERTY_TYPES,
  type ListingAgent,
  type ListingWithAgent,
  type PropertiesPageResult,
} from "@/lib/properties/types";

const AGENT_SELECT =
  "id, first_name, last_name, avatar_url, email, mobile_number, department, position";

export async function getProperties(
  page = 1,
  pageSize = 20,
  filters?: PropertiesQuery,
  sort: PropertiesSort = DEFAULT_PROPERTIES_SORT,
): Promise<PropertiesPageResult> {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const supabase = createSupabaseServerClient();

  // `listings_secure` is a view — PostgREST cannot embed via FK hints on views.
  const baseQuery = supabase
    .from("listings_secure")
    .select("*", { count: "exact" })
    .eq("status", "Available")
    .in("property_type", [...ALLOWED_LISTING_PROPERTY_TYPES]);

  let scopedQuery = (
    filters ? applyPropertiesQuery(baseQuery, filters) : baseQuery
  ) as typeof baseQuery;

  scopedQuery = applyPropertiesSort(scopedQuery, sort) as typeof scopedQuery;

  const { data: listings, error, count } = await scopedQuery.range(from, to);

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

const LISTING_UUID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function getListingBySlugOrId(
  slugOrId: string,
): Promise<ListingWithAgent | null> {
  const supabase = createSupabaseServerClient();
  const segment = decodeURIComponent(slugOrId);
  const isUuid = LISTING_UUID.test(segment);

  let query = supabase
    .from("listings_secure")
    .select("*")
    .eq("status", "Available")
    .in("property_type", [...ALLOWED_LISTING_PROPERTY_TYPES]);

  // `listings_secure` exposes `listing_code`; `id` and `slug` are often null.
  query = isUuid
    ? query.eq("id", segment)
    : query.eq("listing_code", segment);

  const { data: row, error } = await query.maybeSingle();

  if (error) throw error;
  if (!row) return null;

  const listing = row as ListingWithAgent;
  const agentId =
    typeof listing.agent_id === "string" && listing.agent_id.length > 0
      ? listing.agent_id
      : null;

  const agentsById = agentId
    ? await fetchAgentsById(supabase, [agentId])
    : new Map<string, ListingAgent>();

  return {
    ...listing,
    agent: agentId ? (agentsById.get(agentId) ?? null) : null,
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
