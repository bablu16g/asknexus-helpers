
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { SubjectsSection } from "@/components/SubjectsSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { PricingSection } from "@/components/PricingSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { AboutSection } from "@/components/AboutSection";
import { ChatBot } from "@/components/ChatBot";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <HeroSection />
        <SubjectsSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <PricingSection />
        <AboutSection />
        <CTASection />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;
