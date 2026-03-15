import HeroSection from "@/components/home/HeroSection";
import MarqueeStrip from "@/components/home/MarqueeStrip";
import TenantLogos from "@/components/home/TenantLogos";
import SpaceTypesSection from "@/components/home/SpaceTypesSection";
import FeaturedSpaces from "@/components/home/FeaturedSpaces";
import NeighbourhoodsSection from "@/components/home/NeighbourhoodsSection";
import PricingComparison from "@/components/home/PricingComparison";
import OfficeCalculator from "@/components/home/OfficeCalculator";
import StatsSection from "@/components/home/StatsSection";
import WhyWorkspace from "@/components/home/WhyWorkspace";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CommunitySection from "@/components/home/CommunitySection";
import SustainabilitySection from "@/components/home/SustainabilitySection";
import SpaceFinderCTA from "@/components/home/SpaceFinderCTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <MarqueeStrip />
      <TenantLogos />
      <SpaceTypesSection />
      <FeaturedSpaces />
      <NeighbourhoodsSection />
      <PricingComparison />
      <OfficeCalculator />
      <StatsSection />
      <WhyWorkspace />
      <TestimonialsSection />
      <CommunitySection />
      <SustainabilitySection />
      <SpaceFinderCTA />
    </>
  );
}
