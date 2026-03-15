import HeroSection from "@/components/home/HeroSection";
import TenantLogos from "@/components/home/TenantLogos";
import FeaturedSpaces from "@/components/home/FeaturedSpaces";
import SpaceTypesSection from "@/components/home/SpaceTypesSection";
import StatsSection from "@/components/home/StatsSection";
import WhyWorkspace from "@/components/home/WhyWorkspace";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CommunitySection from "@/components/home/CommunitySection";
import SpaceFinderCTA from "@/components/home/SpaceFinderCTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TenantLogos />
      <FeaturedSpaces />
      <SpaceTypesSection />
      <StatsSection />
      <WhyWorkspace />
      <TestimonialsSection />
      <CommunitySection />
      <SpaceFinderCTA />
    </>
  );
}
