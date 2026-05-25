import PropertyDetailMain from "@/features/properties/PropertyDetailMain";
import PropertyDetailSidebar from "@/features/properties/PropertyDetailSidebar";
import type { ListingWithAgent } from "@/lib/properties/types";

type PropertyDetailContentProps = {
  listing: ListingWithAgent;
};

export default function PropertyDetailContent({
  listing,
}: PropertyDetailContentProps) {
  return (
    <section
      aria-label="Property details and contact"
      className="bg-white"
    >
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-12 lg:px-8 lg:py-12 xl:gap-16 xl:px-10">
        <PropertyDetailMain listing={listing} />
        <PropertyDetailSidebar listing={listing} />
      </div>
    </section>
  );
}
