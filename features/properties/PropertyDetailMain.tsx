import PropertyDetailMap from "@/features/properties/PropertyDetailMap";
import {
  getListingAddressDetails,
  getListingCoordinates,
  getListingDescriptionParagraphs,
  getListingGoogleMapLink,
  getListingMapQuery,
  getListingPropertyDetails,
  getListingRemarksParagraphs,
} from "@/lib/properties/listingDisplay";
import type { ListingWithAgent } from "@/lib/properties/types";

type PropertyDetailMainProps = {
  listing: ListingWithAgent;
};

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg font-semibold text-[#23408e] md:text-xl">{children}</h2>
  );
}

function DetailDivider() {
  return <hr className="border-[#e8ebf2]" />;
}

export default function PropertyDetailMain({ listing }: PropertyDetailMainProps) {
  const paragraphs = getListingDescriptionParagraphs(listing);
  const remarks = getListingRemarksParagraphs(listing);
  const addressDetails = getListingAddressDetails(listing);
  const propertyDetails = getListingPropertyDetails(listing);
  const coordinates = getListingCoordinates(listing);
  const mapQuery = getListingMapQuery(listing);
  const googleMapLink = getListingGoogleMapLink(listing);

  return (
    <div className="min-w-0 space-y-8 md:space-y-10">
      {paragraphs.length > 0 ? (
        <section aria-label="Property description" className="space-y-4">
          {paragraphs.map((paragraph, index) => (
            <p
              key={`${index}-${paragraph.slice(0, 48)}`}
              className="text-sm leading-relaxed text-[#000759]/90 md:text-[15px] md:leading-7"
            >
              {paragraph}
            </p>
          ))}
        </section>
      ) : null}

      <DetailDivider />

      {propertyDetails.length > 0 ? (
        <section aria-labelledby="property-details-heading" className="space-y-4">
          <SectionHeading>
            <span id="property-details-heading">Property Details</span>
          </SectionHeading>
          <div className="grid gap-4 sm:grid-cols-2">
            {propertyDetails.map((item) => (
              <PropertyDetailRow
                key={`${item.label}-${item.value}`}
                label={item.label}
                value={item.value}
              />
            ))}
          </div>
        </section>
      ) : null}

      {remarks.length > 0 ? (
        <>
          <DetailDivider />
          <section aria-labelledby="property-remarks-heading" className="space-y-4">
            <SectionHeading>
              <span id="property-remarks-heading">Internal remarks</span>
            </SectionHeading>
            <div className="space-y-3">
              {remarks.map((paragraph, index) => (
                <p
                  key={`${index}-${paragraph.slice(0, 48)}`}
                  className="text-sm leading-relaxed text-[#000759]/90 md:text-[15px] md:leading-7"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        </>
      ) : null}

      {addressDetails.length > 0 ? (
        <>
          <DetailDivider />
          <section aria-labelledby="property-address-heading" className="space-y-4">
            <SectionHeading>
              <span id="property-address-heading">Address</span>
            </SectionHeading>
            <div className="grid gap-4 sm:grid-cols-2">
              {addressDetails.map((item) => (
                <PropertyDetailRow
                  key={`${item.label}-${item.value}`}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </div>
          </section>
        </>
      ) : null}

      <DetailDivider />

      <section aria-labelledby="property-location-heading">
        <SectionHeading>
          <span id="property-location-heading">Location</span>
        </SectionHeading>
        <PropertyDetailMap
          coordinates={coordinates}
          mapQuery={mapQuery}
          googleMapLink={googleMapLink}
        />
      </section>
    </div>
  );
}

function PropertyDetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-sm font-semibold text-[#000759]">{label}</p>
      <p className="mt-1 text-sm text-[#000759]/85 md:text-[15px]">{value}</p>
    </div>
  );
}
