import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import FloatingSymbols from "./FloatingSymbols";

const cards = [
  {
    title: "Patterns Over Formulas",
    description: "Exams repeat ideas, not questions.",
  },
  {
    title: "Thinking First",
    description: "If you understand why, answers come faster.",
  },
  {
    title: "Focused Sessions",
    description: "No crowd. No distractions. Just you and the problem.",
  },
];

const AboutSection = () => {
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
      id="about"
      ref={sectionRef}
      className="py-32 relative overflow-hidden"
    >
      <FloatingSymbols />
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <Card
              key={index}
              className={`bg-card border-border hover:border-primary/50 transition-all duration-500 ${isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
                }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-8">
                <h3 className="font-display text-xl md:text-2xl font-semibold mb-4 text-foreground">
                  {card.title}
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
