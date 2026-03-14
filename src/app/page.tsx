import HeroSection from "@/components/home/HeroSection";
import SpaceTypesSection from "@/components/home/SpaceTypesSection";
import FeaturedSpaces from "@/components/home/FeaturedSpaces";
import WhyWorkspace from "@/components/home/WhyWorkspace";
import StatsSection from "@/components/home/StatsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import TenantLogos from "@/components/home/TenantLogos";
import CommunitySection from "@/components/home/CommunitySection";
import SustainabilitySection from "@/components/home/SustainabilitySection";
import SpaceFinderCTA from "@/components/home/SpaceFinderCTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TenantLogos />
      <SpaceTypesSection />
      <FeaturedSpaces />
      <WhyWorkspace />
      <StatsSection />
      <TestimonialsSection />
      <CommunitySection />
      <SustainabilitySection />
      <SpaceFinderCTA />
    </>
  );
}
