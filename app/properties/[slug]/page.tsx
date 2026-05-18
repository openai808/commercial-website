import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PropertyDetailContent from "@/features/properties/PropertyDetailContent";
import PropertyDetailHero from "@/features/properties/PropertyDetailHero";
import { getListingBySlugOrId } from "@/lib/properties/getProperties";
import {
  getListingDetailSpecs,
  getListingPhotos,
  getListingProjectName,
  getListingStatus,
  getListingTitle,
} from "@/lib/properties/listingDisplay";

type PropertyDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PropertyDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const listing = await getListingBySlugOrId(slug);

  if (!listing) {
    return { title: "Property not found" };
  }

  return {
    title: getListingTitle(listing),
    description: getListingDetailSpecs(listing),
  };
}

export default async function PropertyDetailPage({
  params,
}: PropertyDetailPageProps) {
  const { slug } = await params;
  const listing = await getListingBySlugOrId(slug);

  if (!listing) {
    notFound();
  }

  const title = getListingTitle(listing);

  return (
    <main className="bg-white text-[#000759]">
      <PropertyDetailHero
        photos={getListingPhotos(listing)}
        status={getListingStatus(listing)}
        projectName={getListingProjectName(listing)}
        title={title}
        specs={getListingDetailSpecs(listing)}
      />
      <PropertyDetailContent listing={listing} />
    </main>
  );
}
