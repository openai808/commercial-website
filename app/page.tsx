import type { Metadata } from "next";
import HomeContact from "@/components/HomeContact";
import HomeHero from "@/components/HomeHero";
import HomeNewsInsights from "@/components/HomeNewsInsights";
import HomePillars from "@/components/HomePillars";
import HomeServices from "@/components/HomeServices";
import HomeTicker from "@/components/HomeTicker";

export const metadata: Metadata = {
  title: {
    absolute: "RE/MAX Commercial Philippines | Commercial Real Estate",
  },
};

export default function Home() {
  return (
    <div className="flex min-h-screen min-w-0 flex-col bg-white font-sans">
      <main className="w-full min-w-0">
        <HomeHero />
        <HomeTicker />
        <HomeNewsInsights />
        <HomeServices />
        <HomePillars />
        <HomeContact />
      </main>
    </div>
  );
}
