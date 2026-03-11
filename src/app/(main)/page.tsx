import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import Marquee from "@/components/Marquee";
import AboutSection from "@/components/AboutSection";
import UpcomingMatches from "@/components/UpcomingMatches";
import GallerySection from "@/components/GallerySection";
import SponsorsSection from "@/components/SponsorsSection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Home | Osun State Football Association",
  description: "Welcome to the official website of the Osun State Football Association. Discover the latest news, state leagues, youth football development, and grassroots programs in Osun State.",
  openGraph: {
    title: "Osun State Football Association | Home",
    description: "The home of football in Osun State. Follow competitions, youth developments, and official news.",
    url: "https://osunstatefa.org.ng",
  },
};

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
