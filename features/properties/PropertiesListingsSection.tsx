import PropertiesExpertsCta from "@/features/properties/PropertiesExpertsCta";
import PropertiesListingGrid from "@/features/properties/PropertiesListingGrid";
import PropertiesListingsLayout from "@/features/properties/PropertiesListingsLayout";
import PropertiesListingsListColumn from "@/features/properties/PropertiesListingsListColumn";
import PropertiesPagination from "@/features/properties/PropertiesPagination";
import { getListingIdentifier } from "@/lib/properties/listingDisplay";
import type { ListingCityCount, ListingWithAgent } from "@/lib/properties/types";

type PropertiesListingsSectionProps = {
  listings: ListingWithAgent[];
  cityOptions: ListingCityCount[];
  page: number;
  totalPages: number;
};

export default function PropertiesListingsSection({
  listings,
  cityOptions,
  page,
  totalPages,
}: PropertiesListingsSectionProps) {
  const listingIds = listings.flatMap((listing) => {
    const id = getListingIdentifier(listing);
    return id ? [id] : [];
  });

  return (
    <PropertiesListingsLayout
      cityOptions={cityOptions}
      listingIds={listingIds}
      leftColumn={
        <PropertiesListingsListColumn page={page}>
          <PropertiesListingGrid key="listing-grid" listings={listings} />
        </PropertiesListingsListColumn>
      }
      belowMap={<PropertiesExpertsCta />}
      belowColumns={
        totalPages > 1 ? (
          <PropertiesPagination
            page={page}
            totalPages={totalPages}
            className="pt-10 !px-0 md:!px-0"
          />
        ) : null
      }
    />
  );
}
