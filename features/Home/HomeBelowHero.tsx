import HomeBlogSlider from "@/features/home/HomeBlogSlider";
import HomeContact from "@/features/home/HomeContact";
import HomeNewsInsights from "@/features/home/HomeNewsInsights";
import HomePillars from "@/features/home/HomePillars";
import HomeServices from "@/features/home/HomeServices";
import HomeTicker from "@/features/home/HomeTicker";

export default function HomeBelowHero() {
  return (
    <>
      <HomeTicker />
      <HomeNewsInsights />
      <HomeBlogSlider />
      <HomeServices />
      <HomePillars />
      <HomeContact />
    </>
  );
}
