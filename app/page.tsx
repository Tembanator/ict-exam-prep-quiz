export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeatureGrid />
      <Footer />
    </main>
  );
}

// Import for footer

import { Navbar } from "./components/landing/Navbar";
import { HeroSection } from "./components/landing/HeroSection";
import { FeatureGrid } from "./components/landing/FeatureGrid";
import Footer from "./components/landing/Footer";
