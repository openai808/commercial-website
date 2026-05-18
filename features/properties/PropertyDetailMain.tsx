import PropertyDetailMap from "@/features/properties/PropertyDetailMap";
import {
  getListingAddressDetails,
  getListingCoordinates,
  getListingDescriptionParagraphs,
  getListingFeatures,
  getListingGoogleMapLink,
  getListingMapQuery,
  getListingPropertyType,
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

function FeatureIcon() {
  return (
    <span
      className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#23408e]/10 text-[#23408e]"
      aria-hidden
    >
      <svg
        viewBox="0 0 16 16"
        className="h-3 w-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M4 8l2.5 2.5L12 5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function DetailDivider() {
  return <hr className="border-[#e8ebf2]" />;
}

export default function PropertyDetailMain({ listing }: PropertyDetailMainProps) {
  const paragraphs = getListingDescriptionParagraphs(listing);
  const features = getListingFeatures(listing);
  const remarks = getListingRemarksParagraphs(listing);
  const addressDetails = getListingAddressDetails(listing);
  const propertyType = getListingPropertyType(listing);
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

      <section aria-labelledby="property-details-heading" className="space-y-4">
        <SectionHeading>
          <span id="property-details-heading">Property Details</span>
        </SectionHeading>
        <PropertyDetailRow label="Property Types" value={propertyType} />
      </section>

      {features.length > 0 ? (
        <>
          <DetailDivider />
          <section aria-labelledby="property-features-heading" className="space-y-4">
            <SectionHeading>
              <span id="property-features-heading">Features</span>
            </SectionHeading>
            <ul className="space-y-3">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="flex gap-3 text-sm text-[#000759]/90 md:text-[15px]"
                >
                  <FeatureIcon />
                  <span className="leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </section>
        </>
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
