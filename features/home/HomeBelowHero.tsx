import HomeAwards from "@/features/home/HomeAwards";
import HomeGetInTouch from "@/features/home/HomeGetInTouch";
import HomeOurClients from "@/features/home/HomeOurClients";
import HomeOurPartners from "@/features/home/HomeOurPartners";
import HomeProofInNumbers from "@/features/home/HomeProofInNumbers";
import HomeServices from "@/features/home/HomeServices";
import HomeTrustedBy from "@/features/home/HomeTrustedBy";
import HomeWhoWeAre from "@/features/home/HomeWhoWeAre";

export default function HomeBelowHero() {
  return (
    <>
      <HomeProofInNumbers />
      <HomeAwards />
      <HomeServices />
      <HomeWhoWeAre />
      <HomeTrustedBy />
      <HomeOurPartners />
      <HomeOurClients />
      <HomeGetInTouch />
    </>
  );
}
