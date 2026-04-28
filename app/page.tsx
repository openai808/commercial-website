"use client";

import HomeHero from "@/components/HomeHero";
import HomeTicker from "@/components/HomeTicker";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <main className="w-full">
        <HomeHero />
        <HomeTicker />
      </main>
    </div>
  );
}
