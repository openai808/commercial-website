import {
  ALLOWED_LISTING_PROPERTY_TYPES,
  type ListingAgent,
  type ListingAgentCount,
} from "@/lib/properties/types";
import { fixUtf8Mojibake } from "@/lib/text/fixUtf8Mojibake";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const PAGE_SIZE = 1000;
const AGENT_BATCH_SIZE = 100;

const AGENT_SELECT =
  "id, first_name, last_name, avatar_url, email, mobile_number, department, position";

function normalizeAgentId(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const agentId = value.trim();
  return agentId.length > 0 ? agentId : null;
}

function formatAgentName(agent: ListingAgent): string | null {
  const name = [agent.first_name, agent.last_name]
    .filter((part): part is string => typeof part === "string" && part.trim().length > 0)
    .map((part) => fixUtf8Mojibake(part.trim()))
    .join(" ")
    .trim();

  return name.length > 0 ? name : null;
}

async function fetchAgentsById(
  agentIds: string[],
): Promise<Map<string, ListingAgent>> {
  const supabase = createSupabaseServerClient();
  const agentsById = new Map<string, ListingAgent>();

  for (let index = 0; index < agentIds.length; index += AGENT_BATCH_SIZE) {
    const batch = agentIds.slice(index, index + AGENT_BATCH_SIZE);
    if (batch.length === 0) continue;

    const { data: agents, error } = await supabase
      .from("profiles_directory")
      .select(AGENT_SELECT)
      .in("id", batch);

    if (error) {
      console.error("Failed to load agent profiles:", error.message);
      continue;
    }

    for (const agent of agents ?? []) {
      agentsById.set(agent.id, agent as ListingAgent);
    }
  }

  return agentsById;
}

export async function getListingAgentCounts(): Promise<ListingAgentCount[]> {
  const supabase = createSupabaseServerClient();
  const countsByAgentId = new Map<string, number>();
  let from = 0;

  while (true) {
    const to = from + PAGE_SIZE - 1;

    const { data, error } = await supabase
      .from("listings_secure")
      .select("agent_id")
      .eq("status", "Available")
      .in("property_type", [...ALLOWED_LISTING_PROPERTY_TYPES])
      .not("agent_id", "is", null)
      .range(from, to);

    if (error) throw error;

    const rows = data ?? [];
    for (const row of rows) {
      const agentId = normalizeAgentId(row.agent_id);
      if (!agentId) continue;
      countsByAgentId.set(agentId, (countsByAgentId.get(agentId) ?? 0) + 1);
    }

    if (rows.length < PAGE_SIZE) break;
    from += PAGE_SIZE;
  }

  const agentIds = [...countsByAgentId.keys()];
  if (agentIds.length === 0) return [];

  const agentsById = await fetchAgentsById(agentIds);

  const results: ListingAgentCount[] = [];

  for (const agentId of agentIds) {
    const agent = agentsById.get(agentId);
    if (!agent) continue;

    const name = formatAgentName(agent);
    if (!name) continue;

    results.push({
      agentId,
      name,
      count: countsByAgentId.get(agentId) ?? 0,
    });
  }

  return results.sort((a, b) => a.name.localeCompare(b.name));
}
