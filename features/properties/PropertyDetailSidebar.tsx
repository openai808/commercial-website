import PropertyDetailContactPanel from "@/features/properties/PropertyDetailContactPanel";
import {
  getAgentAvatarUrl,
  getAgentDepartment,
  getAgentEmail,
  getAgentName,
  getAgentPhone,
  getAgentPosition,
  getListingIdentifier,
  getListingLocation,
  getListingPropertyType,
  getListingStatus,
  getListingTitle,
} from "@/lib/properties/listingDisplay";
import type { ListingWithAgent } from "@/lib/properties/types";

type PropertyDetailSidebarProps = {
  listing: ListingWithAgent;
};

export default function PropertyDetailSidebar({
  listing,
}: PropertyDetailSidebarProps) {
  const agentName = getAgentName(listing);
  const agentPosition = getAgentPosition(listing);
  const agentDepartment = getAgentDepartment(listing);
  const agentPhone = getAgentPhone(listing);
  const agentEmail = getAgentEmail(listing);
  const agentAvatar = getAgentAvatarUrl(listing);
  const listingCode = getListingIdentifier(listing) ?? "";
  const listingTitle = getListingTitle(listing);
  const location = getListingLocation(listing);
  const propertyType = getListingPropertyType(listing);
  const contractType = getListingStatus(listing) === "lease" ? "Lease" : "Sale";
  const city = (listing.city as string) ?? "";
  const price = String(
    listing.selling_price ?? listing.monthly_rental_price ?? listing.price ?? "",
  );

  return (
    <aside className="lg:sticky lg:top-8 lg:self-start">
      <div className="border border-[#d9dce5] bg-white p-5 md:p-6">
        <h2 className="text-2xl font-light text-[#000759] md:text-[1.75rem]">
          Get More Info
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#000759]/80 md:text-[15px]">
          Learn more about this property listing by contacting one of our
          experts.
        </p>

        <PropertyDetailContactPanel
          listingCode={listingCode}
          listingTitle={listingTitle}
          agentId={listing.agent?.id ?? null}
          price={price}
          propertyType={propertyType}
          contractType={contractType}
          city={city}
          agentName={agentName}
          agentPosition={agentPosition}
          agentDepartment={agentDepartment}
          agentLocation={location}
          agentPhone={agentPhone}
          agentEmail={agentEmail}
          agentAvatar={agentAvatar}
        />
      </div>
    </aside>
  );
}
