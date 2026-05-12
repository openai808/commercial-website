import type { Metadata } from "next";
import ContactUsForm from "@/components/ContactUsForm";
import RealEstateManagementServicesClientSuccess from "@/features/services/RealEstateManagementServicesClientSuccess";
import RealEstateManagementServicesTabs from "@/features/services/RealEstateManagementServicesTabs";

export const metadata: Metadata = {
  title: "Real Estate Management Services",
  description:
    "Property, facilities, financial, and portfolio management aligned to your investment objectives with REMAX/8.",
};

export default function RealEstateManagementServicesPage() {
  return (
    <main className="bg-white text-[#1f2d57]">
      <RealEstateManagementServicesTabs />
      <RealEstateManagementServicesClientSuccess />
    </main>
  );
}
