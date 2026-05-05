import type { Metadata } from "next";
import HomeContact from "@/features/Home/HomeContact";
import HomeBlogSlider from "@/features/Home/HomeBlogSlider";
import HomeHero from "@/features/Home/HomeHero";
import HomeNewsInsights from "@/features/Home/HomeNewsInsights";
import HomePillars from "@/features/Home/HomePillars";
import HomeServices from "@/features/Home/HomeServices";
import HomeTicker from "@/features/Home/HomeTicker";

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
