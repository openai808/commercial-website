"use client";

import HomeHero from "@/components/HomeHero";
import HomeNewsInsights from "@/components/HomeNewsInsights";
import HomeTicker from "@/components/HomeTicker";

export default function Home() {
  return (
    <div className="flex min-h-screen min-w-0 flex-col bg-white font-sans">
      <main className="w-full min-w-0">
        <HomeHero />
        <HomeTicker />
        <HomeNewsInsights />
      </main>
    </div>
  );
}
