import type { Metadata } from "next";
import HomeContact from "@/features/home/HomeContact";
import HomeBlogSlider from "@/features/home/HomeBlogSlider";
import HomeHero from "@/features/home/HomeHero";
import HomeNewsInsights from "@/features/home/HomeNewsInsights";
import HomePillars from "@/features/home/HomePillars";
import HomeServices from "@/features/home/HomeServices";
import HomeTicker from "@/features/home/HomeTicker";

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
        <HomeBlogSlider />
        <HomeServices />
        <HomePillars />
        <HomeContact />
      </main>
    </div>
  );
}
