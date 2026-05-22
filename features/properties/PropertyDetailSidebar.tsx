import Image from "next/image";
import PropertyDetailContactForm from "@/features/properties/PropertyDetailContactForm";
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

const AGENT_PLACEHOLDER =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80";

type PropertyDetailSidebarProps = {
  listing: ListingWithAgent;
};

function PhoneIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

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

        {agentName ? (
          <AgentCard
            name={agentName}
            position={agentPosition}
            department={agentDepartment}
            location={location}
            phone={agentPhone}
            email={agentEmail}
            avatar={agentAvatar}
          />
        ) : null}

        <PropertyDetailContactForm
          listingCode={listingCode}
          listingTitle={listingTitle}
          agentId={listing.agent?.id ?? null}
          price={price}
          propertyType={propertyType}
          contractType={contractType}
          city={city}
        />
      </div>
    </aside>
  );
}

function AgentCard({
  name,
  position,
  department,
  location,
  phone,
  email,
  avatar,
}: {
  name: string;
  position: string | null;
  department: string | null;
  location: string;
  phone: string | null;
  email: string | null;
  avatar: string | null;
}) {
  return (
    <div className="mt-6 border border-[#d9dce5] bg-[#fafbfd] p-4">
      <div className="flex gap-4">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-[#d9dce5] bg-white">
          <Image
            src={avatar ?? AGENT_PLACEHOLDER}
            alt={name}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-lg font-semibold leading-tight text-[#000759]">
            {name}
          </p>
          {position ? (
            <p className="mt-1 text-sm font-medium text-[#23408e]">{position}</p>
          ) : null}
          {department ? (
            <p className="mt-0.5 text-sm text-[#000759]/85">{department}</p>
          ) : null}
          <p className="mt-0.5 text-sm text-[#000759]/85">{location}</p>

          <div className="mt-3 flex flex-wrap gap-4">
            {phone ? (
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-[#23408e] hover:text-[#1d3575]"
              >
                <PhoneIcon />
                Call Now
              </a>
            ) : null}
            {email ? (
              <a
                href={`mailto:${email}`}
                className="text-sm font-medium text-[#23408e] underline underline-offset-2 hover:text-[#1d3575]"
              >
                Email
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
