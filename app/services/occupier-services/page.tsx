import type { Metadata } from "next";
import ContactUsForm from "@/components/ContactUsForm";
import OccupierServicesIntro from "@/features/services/OccupierServicesIntro";
import OccupierServicesOurServices from "@/features/services/OccupierServicesOurServices";
import OccupierServicesToolsTech from "@/features/services/OccupierServicesToolsTech";
import OccupierServicesInsights from "@/features/services/OccupierServicesInsights";
import OccupierServicesMission from "@/features/services/OccupierServicesMission";
import OccupierServicesNews from "@/features/services/OccupierServicesNews";
import OccupierServicesLeadership from "@/features/services/OccupierServicesLeadership";

export const metadata: Metadata = {
  title: "Occupier Services",
  description:
    "Align your real estate strategy with business goals through REMAX/8 Occupier Services expertise.",
};

export default function OccupierServicesPage() {
  return (
    <main className="bg-white text-[#1f2d57]">
      <OccupierServicesIntro />
      <OccupierServicesOurServices />
      <OccupierServicesToolsTech />
      <OccupierServicesInsights />
      <OccupierServicesMission />
      <OccupierServicesNews />
      <OccupierServicesLeadership />
      <ContactUsForm />
    </main>
  );
}
