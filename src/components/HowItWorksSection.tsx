import { useEffect, useRef, useState } from "react";
import FloatingSymbols from "./FloatingSymbols";

const steps = [
  { number: "01", text: "Choose a session" },
  { number: "02", text: "Pay ₦3,000" },
  { number: "03", text: "Meet for a focused one-on-one lesson" },
  { number: "04", text: "Refer a friend and get 10% off!" },
];

const HowItWorksSection = () => {
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
      id="sessions"
      ref={sectionRef}
      className="py-32 relative overflow-hidden"
    >
      <FloatingSymbols />
      <div className="container mx-auto px-6">
        <h2
          className={`font-display text-3xl md:text-4xl font-semibold text-center mb-20 transition-all duration-1000 ease-in-out ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
            }`}
        >
          How It Works
        </h2>

        <div className="max-w-2xl mx-auto space-y-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-start gap-6 transition-all duration-1000 ease-in-out ${isVisible
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-12 scale-95"
                }`}
              style={{ transitionDelay: `${(index + 1) * 250}ms` }}
            >
              <span className="font-display text-primary text-2xl md:text-3xl font-semibold transition-all duration-1000 ease-in-out">
                {step.number}
              </span>
              <div className="flex-1 pt-1">
                <p className="text-foreground text-lg md:text-xl font-medium">
                  {step.text}
                </p>
                {index < steps.length - 1 && (
                  <div
                    className={`w-px h-12 bg-border ml-0 mt-6 transition-all duration-1000 ease-in-out ${isVisible ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
                      }`}
                    style={{ transitionDelay: `${(index + 1) * 250 + 200}ms` }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        <p
          className={`text-muted-foreground text-center mt-16 text-lg max-w-xl mx-auto transition-all duration-1000 ease-in-out ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
            }`}
          style={{ transitionDelay: "1000ms" }}
        >
          Physical tutoring. Exam-oriented. Personal attention.
        </p>
      </div>
    </section>
  );
};

export default HowItWorksSection;
