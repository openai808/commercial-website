import { tool } from "ai";
import { z } from "zod";
import { getProperties, getListingBySlugOrId } from "@/lib/properties/getProperties";
import { getDeveloperProjects } from "@/lib/properties/getDeveloperProjects";
import { getCareers } from "@/lib/careers/getCareers";
import { getFeaturedLeaders, getLeadershipTeam } from "@/lib/people/leadershipTeam";
import { getCompanyKnowledge } from "@/lib/chatbot/companyKnowledge";
import { ALLOWED_LISTING_PROPERTY_TYPES, type ListingWithAgent } from "@/lib/properties/types";
import { EMPTY_PROPERTIES_QUERY, type PropertiesQuery } from "@/lib/properties/searchParams";
import { DEFAULT_PROPERTIES_SORT } from "@/lib/properties/sortParams";

const MAX_RESULTS = 8;

function resolveTitle(l: ListingWithAgent): string {
  return l.property_title ?? l.title ?? l.name ?? "Untitled listing";
}

function resolvePrice(l: ListingWithAgent): string | null {
  if (typeof l.display_price === "string") return l.display_price;
  if (l.selling_price) return String(l.selling_price);
  if (l.monthly_rental_price) return `${l.monthly_rental_price}/month`;
  return null;
}

function listingUrl(l: ListingWithAgent): string {
  return `/properties/${l.slug ?? l.listing_code ?? l.id}`;
}

/** Trims internal-only fields (agent_id, raw status, created_at, photo URLs) — keeps slug/listing_code so the model can build real links. */
function trimListing(l: ListingWithAgent) {
  return {
    listingCode: l.listing_code ?? null,
    title: resolveTitle(l),
    listingType: l.listing_type ?? null,
    contractType: l.contract_type ?? null,
    propertyType: l.property_type ?? null,
    city: l.city ?? null,
    address: l.address ?? l.location ?? null,
    price: resolvePrice(l),
    lotArea: l.lot_area ?? null,
    floorArea: l.floor_area ?? null,
    tags: l.tags ?? [],
    url: listingUrl(l),
  };
}

export const searchProperties = tool({
  description:
    "Search property listings (for sale, for lease, or investment) by city, property type, keywords, and area range. " +
    "Only returns listings that actually exist on the website — never invent results.",
  inputSchema: z.object({
    listing: z.enum(["for-sale", "for-lease", "investment"]).optional(),
    cities: z.array(z.string()).optional().describe("Philippine cities, e.g. Makati City"),
    propertyTypes: z.array(z.enum(ALLOWED_LISTING_PROPERTY_TYPES)).optional(),
    keywords: z.string().optional(),
    areaMin: z.number().optional(),
    areaMax: z.number().optional(),
    areaUnit: z.enum(["sqft", "sqm"]).optional(),
    limit: z.number().int().min(1).max(MAX_RESULTS).optional(),
  }),
  execute: async (input) => {
    const filters: PropertiesQuery = {
      ...EMPTY_PROPERTIES_QUERY,
      listing: input.listing ?? "",
      cities: input.cities ?? [],
      propertyTypes: input.propertyTypes ?? [],
      keywords: input.keywords ?? "",
      areaMin: input.areaMin ?? null,
      areaMax: input.areaMax ?? null,
      areaUnit: input.areaUnit ?? "sqft",
    };
    const result = await getProperties(1, input.limit ?? MAX_RESULTS, filters, DEFAULT_PROPERTIES_SORT);
    return { total: result.total, listings: result.data.map(trimListing) };
  },
});

export const getPropertyDetails = tool({
  description:
    "Get full details for one property by its listing code, slug, or UUID id. " +
    "Use after searchProperties, or when the visitor names a listing code directly.",
  inputSchema: z.object({ slugOrId: z.string() }),
  execute: async ({ slugOrId }) => {
    const listing = await getListingBySlugOrId(slugOrId);
    if (!listing) return { found: false as const };
    const remarks = typeof listing.remarks === "string" ? listing.remarks : null;
    const seoDescription = typeof listing.seo_description === "string" ? listing.seo_description : null;
    return {
      found: true as const,
      ...trimListing(listing),
      description: (remarks ?? seoDescription)?.slice(0, 800) ?? null,
      // Agent name/position/phone/email are already public on the listing detail
      // page (visitors see them there today), so surfacing them here is the same
      // trust boundary.
      agent: listing.agent
        ? {
            name: [listing.agent.first_name, listing.agent.last_name].filter(Boolean).join(" ") || null,
            position: listing.agent.position ?? null,
            email: listing.agent.email ?? null,
            phone: listing.agent.mobile_number ?? null,
          }
        : null,
    };
  },
});

export const searchDeveloperProjects = tool({
  description: "Search pre-selling / new-build developer projects (separate from resale/lease listings).",
  inputSchema: z.object({ limit: z.number().int().min(1).max(MAX_RESULTS).optional() }),
  execute: async ({ limit }) => {
    const result = await getDeveloperProjects(1, limit ?? MAX_RESULTS);
    return {
      total: result.total,
      projects: result.data.map((p) => ({
        projectName: p.project_name,
        developerName: p.developer_name,
        location: p.location ?? null,
        url: `/properties/developer-projects/${p.id}`,
      })),
    };
  },
});

export const searchCareers = tool({
  description: "List current published job openings at RE/MAX Commercial 8.",
  inputSchema: z.object({ department: z.string().optional(), location: z.string().optional() }),
  execute: async ({ department, location }) => {
    const careers = await getCareers();
    const filtered = careers.filter(
      (c) =>
        (!department || (c.department ?? "").toLowerCase().includes(department.toLowerCase())) &&
        (!location || (c.location ?? "").toLowerCase().includes(location.toLowerCase())),
    );
    return {
      total: filtered.length,
      jobs: filtered.slice(0, MAX_RESULTS).map((c) => ({
        title: c.title,
        department: c.department,
        location: c.location,
        employmentType: c.employment_type,
        url: `/careers/${c.slug}`,
      })),
    };
  },
});

const AGENT_TEAM_URL = "/about-us/global-executive-leadership";

export const searchAgents = tool({
  description:
    "Get RE/MAX Commercial 8's agents, brokers, and leadership team — names, roles, and public contact info. " +
    "Use this for general questions about who the agents/brokers/team are. " +
    "For the specific agent handling one listing, use getPropertyDetails instead.",
  inputSchema: z.object({
    query: z.string().optional().describe("Filter by agent name or role keyword, e.g. 'broker' or 'Cielo'"),
  }),
  execute: async ({ query }) => {
    const featured = getFeaturedLeaders().map((l) => ({
      name: l.name,
      role: l.roleLabel,
      phone: null as string | null,
      email: null as string | null,
      bio: l.bio.join(" "),
      url: AGENT_TEAM_URL,
    }));
    const team = getLeadershipTeam().map((m) => ({
      name: m.name,
      role: m.role,
      phone: m.details?.phone ?? null,
      email: m.details?.email ?? null,
      bio: m.details?.bio?.slice(0, 300) ?? null,
      url: AGENT_TEAM_URL,
    }));
    const all = [...featured, ...team];
    const needle = query?.trim().toLowerCase();
    const filtered = needle
      ? all.filter((a) => `${a.name} ${a.role}`.toLowerCase().includes(needle))
      : all;
    return { total: filtered.length, agents: filtered };
  },
});

export const getCompanyInfo = tool({
  description:
    "Get curated company info: overview, services offered, and office locations. No account/auth data exists on this site.",
  inputSchema: z.object({ topic: z.enum(["overview", "services", "offices", "all"]).optional() }),
  execute: async ({ topic }) => getCompanyKnowledge(topic ?? "all"),
});

export const chatbotTools = {
  searchProperties,
  getPropertyDetails,
  searchDeveloperProjects,
  searchCareers,
  searchAgents,
  getCompanyInfo,
};
