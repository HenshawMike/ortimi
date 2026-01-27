import { useState } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import PricingSection from "@/components/PricingSection";
import BookingDialog from "@/components/BookingDialog";
import Footer from "@/components/Footer";

const Index = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection onBookClick={() => setIsBookingOpen(true)} />
      <AboutSection />
      <HowItWorksSection />
      <section id="book">
        <PricingSection onBookClick={() => setIsBookingOpen(true)} />
      </section>
      <Footer />
      <BookingDialog open={isBookingOpen} onOpenChange={setIsBookingOpen} />
    </div>
  );
};

export default Index;
