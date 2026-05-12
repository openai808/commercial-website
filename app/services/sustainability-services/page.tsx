import type { Metadata } from "next";
import ContactUsForm from "@/components/ContactUsForm";
import SustainabilityServicesClientSuccess from "@/features/services/SustainabilityServicesClientSuccess";
import SustainabilityServicesCorporateBanner from "@/features/services/SustainabilityServicesCorporateBanner";
import SustainabilityServicesHero from "@/features/services/SustainabilityServicesHero";
import SustainabilityServicesHowWeHelp from "@/features/services/SustainabilityServicesHowWeHelp";
import SustainabilityServicesLifecycle from "@/features/services/SustainabilityServicesLifecycle";

export const metadata: Metadata = {
  title: "Sustainability Services",
  description:
    "REMAX/8 sustainability services help you accelerate your path to net zero with practical, data-led real estate guidance.",
};

export default function SustainabilityServicesPage() {
  return (
    <main className="bg-white text-[#1f2d57]">
      <SustainabilityServicesHero />
      <SustainabilityServicesLifecycle />
      <SustainabilityServicesHowWeHelp />
      <SustainabilityServicesClientSuccess />
      <SustainabilityServicesCorporateBanner />
      <ContactUsForm />
    </main>
  );
}
