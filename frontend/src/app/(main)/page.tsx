import HeroSection from "@/components/HeroSection";
import Marquee from "@/components/Marquee";
import AboutSection from "@/components/AboutSection";
import UpcomingMatches from "@/components/UpcomingMatches";
import GallerySection from "@/components/GallerySection";
import SponsorsSection from "@/components/SponsorsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <HeroSection />
  
      <AboutSection />
      <UpcomingMatches />
      <GallerySection />
      <SponsorsSection />
      
    </div>
  );
}
