import type { Metadata } from "next";
import ContactUsForm from "@/components/ContactUsForm";
import IndustrialServicesHero from "@/features/services/IndustrialServicesHero";
import IndustrialServicesAssetClasses from "@/features/services/IndustrialServicesAssetClasses";
import IndustrialServicesFeaturedProperties from "@/features/services/IndustrialServicesFeaturedProperties";
import IndustrialServicesIntegratedOffering from "@/features/services/IndustrialServicesIntegratedOffering";

export const metadata: Metadata = {
  title: "Industrial Services",
  description:
    "REMAX/8 industrial real estate specialists support logistics, warehousing, and industrial property strategy.",
};

export default function IndustrialServicesPage() {
  return (
    <main className="bg-white text-[#1f2d57]">
      <IndustrialServicesHero />
      <IndustrialServicesIntegratedOffering />
      <IndustrialServicesFeaturedProperties />
      <IndustrialServicesAssetClasses />
      <ContactUsForm />
    </main>
  );
}
