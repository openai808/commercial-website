import type { Metadata } from "next";
import PeopleAndOfficesHero from "@/features/people-and-offices/PeopleAndOfficesHero";

export const metadata: Metadata = {
  title: "People & Offices",
  description:
    "Meet the RE/MAX Commercial Philippines team and find office locations across the Philippines.",
};

export default function PeopleAndOfficesPage() {
  return (
    <main className="bg-white text-[#000759]">
      <PeopleAndOfficesHero />
    </main>
  );
}
