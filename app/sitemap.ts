import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/siteUrl";
import { getProperties } from "@/lib/properties/getProperties";
import { getDeveloperProjects } from "@/lib/properties/getDeveloperProjects";
import { getCareers } from "@/lib/careers/getCareers";
import { getBlogPosts } from "@/lib/blog/getBlogPosts";
import { DEFAULT_PROPERTIES_SORT } from "@/lib/properties/sortParams";

// Generous cap for a single sitemap — well under the sitemap protocol's
// 50,000 URL limit for this site's scale. Revisit with `generateSitemaps()`
// (see Next.js docs) if the listing count ever approaches that.
const MAX_DYNAMIC_ENTRIES = 1000;

// Static, non-redirecting, indexable pages. `/news` is excluded (marked
// `robots: { index: false }` — it just redirects to the legacy site) and
// `/blog` is excluded (redirects to `/insights`, see next.config.ts) in
// favor of the real `/insights/[slug]` URLs below.
const STATIC_PATHS = [
  "",
  "/about-us",
  "/about-us/global-executive-leadership",
  "/accessibility-statement",
  "/careers",
  "/cookie-policy",
  "/insights",
  "/insights/research-reports",
  "/offices",
  "/people",
  "/people-and-offices",
  "/privacy-policy",
  "/properties",
  "/properties/developer-projects",
  "/services",
  "/services/capital-markets-and-investment-services",
  "/services/industrial",
  "/services/landlord",
  "/services/occupier-services",
  "/services/property-vetting",
  "/services/real-estate-management-services",
  "/services/residential-services",
  "/services/sustainability-services",
  "/services/tenant",
  "/services/title-conveyancing",
  "/services/valuation-and-advisory-services",
  "/terms-of-use",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [properties, developerProjects, careers, blogPosts] = await Promise.all([
    getProperties(1, MAX_DYNAMIC_ENTRIES, undefined, DEFAULT_PROPERTIES_SORT),
    getDeveloperProjects(1, MAX_DYNAMIC_ENTRIES),
    getCareers(),
    getBlogPosts(1, MAX_DYNAMIC_ENTRIES),
  ]);

  // No real last-modified data exists for static pages, so it's omitted
  // rather than fabricated (e.g. stamping `new Date()` would be inaccurate).
  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
  }));

  const propertyEntries: MetadataRoute.Sitemap = properties.data
    .map((listing) => {
      const slugOrId = listing.slug ?? listing.listing_code ?? listing.id;
      if (!slugOrId) return null;
      const updatedAt = listing.updated_at;
      return {
        url: `${SITE_URL}/properties/${slugOrId}`,
        lastModified: typeof updatedAt === "string" ? updatedAt : listing.created_at,
      };
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

  const developerProjectEntries: MetadataRoute.Sitemap = developerProjects.data.map((project) => ({
    url: `${SITE_URL}/properties/developer-projects/${project.id}`,
    lastModified: project.created_at,
  }));

  const careerEntries: MetadataRoute.Sitemap = careers.map((career) => ({
    url: `${SITE_URL}/careers/${career.slug}`,
    lastModified: career.published_at ?? undefined,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts.data.map((post) => ({
    url: `${SITE_URL}/insights/${post.slug}`,
    lastModified: post.updated_at ?? post.published_at ?? post.created_at,
  }));

  return [...staticEntries, ...propertyEntries, ...developerProjectEntries, ...careerEntries, ...blogEntries];
}
