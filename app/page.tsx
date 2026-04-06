export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeatureGrid />
      <QuizCTA />
      {/* <Footer /> */}
    </main>
  );
}

// Import for footer

import { Navbar } from "./components/landing/Navbar";
import { HeroSection } from "./components/landing/HeroSection";
import { FeatureGrid } from "./components/landing/FeatureGrid";
import Footer from "./components/landing/Footer";
import { Button } from "./components/ui/Button";
import QuizCTA from "./components/landing/QuizCTA";
