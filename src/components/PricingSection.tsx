import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface PricingSectionProps {
  onBookClick: () => void;
}

const features = [
  "One-on-one tutoring",
  "Exam-focused approach",
  "Any math topic",
];

const PricingSection = ({ onBookClick }: PricingSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="py-32 relative"
    >
      <div className="container mx-auto px-6">
        <div
          className={`max-w-md mx-auto transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Card className="bg-card border-border hover:border-primary/50 transition-all duration-500 overflow-hidden">
            <CardHeader className="text-center pb-6 pt-10">
              <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
                Personal Math Session
              </h3>
              <div className="flex items-baseline justify-center gap-1">
                <span className="font-display text-5xl font-bold text-foreground">
                  ₦3,000
                </span>
              </div>
            </CardHeader>

            <CardContent className="px-8 pb-10">
              <ul className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-muted-foreground"
                  >
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={onBookClick}
                className="w-full bg-transparent border border-primary text-foreground hover:bg-primary/10 hover-burgundy-glow py-6 text-base uppercase tracking-wider font-medium"
              >
                Reserve Your Slot
              </Button>

              <p className="text-muted-foreground text-sm text-center mt-6">
                Slots are limited due to exam schedule.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
