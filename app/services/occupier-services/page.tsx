import type { Metadata } from "next";
import ContactUsForm from "@/components/ContactUsForm";
import OccupierServicesIntro from "@/features/services/OccupierServicesIntro";

export const metadata: Metadata = {
  title: "Occupier Services",
  description:
    "Align your real estate strategy with business goals through REMAX/8 Occupier Services expertise.",
};

export default function OccupierServicesPage() {
  return (
    <main className="bg-white text-[#1f2d57]">
      <OccupierServicesIntro />
      <ContactUsForm />
    </main>
  );
}
