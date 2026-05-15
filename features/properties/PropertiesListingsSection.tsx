import PropertiesExpertsCta from "@/features/properties/PropertiesExpertsCta";
import PropertiesListingGrid from "@/features/properties/PropertiesListingGrid";
import PropertiesListingsLayout from "@/features/properties/PropertiesListingsLayout";
import PropertiesListingsListColumn from "@/features/properties/PropertiesListingsListColumn";
import { PropertiesListingsNavigationProvider } from "@/features/properties/PropertiesListingsNavigationContext";
import PropertiesPagination from "@/features/properties/PropertiesPagination";
import { buildListingMapMarkers } from "@/lib/properties/mapMarkers";
import type { ListingWithAgent } from "@/lib/properties/types";

type PropertiesListingsSectionProps = {
  listings: ListingWithAgent[];
  page: number;
  totalPages: number;
};

export default function PropertiesListingsSection({
  listings,
  page,
  totalPages,
}: PropertiesListingsSectionProps) {
  const markers = buildListingMapMarkers(listings);

  return (
    <PropertiesListingsNavigationProvider>
      <PropertiesListingsLayout
        markers={markers}
        leftColumn={
          <PropertiesListingsListColumn page={page}>
            <PropertiesExpertsCta />
            <PropertiesListingGrid listings={listings} />
          </PropertiesListingsListColumn>
        }
        belowColumns={
          totalPages > 1 ? (
            <PropertiesPagination page={page} totalPages={totalPages} className="pt-10" />
          ) : null
        }
      />
    </PropertiesListingsNavigationProvider>
  );
}
