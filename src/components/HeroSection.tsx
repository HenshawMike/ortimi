import { Button } from "@/components/ui/button";
import FloatingSymbols from "./FloatingSymbols";

interface HeroSectionProps {
  onBookClick: () => void;
}

const HeroSection = ({ onBookClick }: HeroSectionProps) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <FloatingSymbols />

      <div className="container mx-auto px-6 text-center relative z-10">
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-tight max-w-5xl mx-auto mb-8 opacity-0 animate-fade-in-up">
          Exams are near , and math is the your only pressure stop worrying,{" "}
          <span className="text-primary"> We can fix that.</span>
        </h1>

        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12 opacity-0 animate-fade-in-up animate-delay-200">
          One-on-one exam-focused tutoring. Limited sessions before exams.
        </p>

        <Button
          onClick={onBookClick}
          variant="outline"
          size="lg"
          className="opacity-0 animate-fade-in-up animate-delay-400 border-burgundy-glow hover-burgundy-glow bg-transparent border-primary text-foreground px-8 py-6 text-base uppercase tracking-wider font-medium"
        >
          Book a Session
        </Button>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in animate-delay-500">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-muted-foreground/50 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
