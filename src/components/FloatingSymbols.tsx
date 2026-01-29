import { useEffect, useState, useMemo } from "react";

const mathSymbols = ["∑", "∫", "π", "∞", "√", "Δ", "θ", "λ", "α", "β", "γ", "σ", "Ω", "φ", "ψ", "ξ"];
const sizes = ["text-3xl", "text-4xl", "text-5xl", "text-6xl", "text-7xl", "text-8xl"];

const generateRandomSymbols = (count: number) => {
  const symbols = [];
  for (let i = 0; i < count; i++) {
    symbols.push({
      symbol: mathSymbols[Math.floor(Math.random() * mathSymbols.length)],
      size: sizes[Math.floor(Math.random() * sizes.length)],
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      speed: 0.1 + Math.random() * 0.3, // Speed between 0.1 and 0.4
      animationDelay: Math.random() * 20, // Random delay between 0-20s
      animationDuration: 15 + Math.random() * 15, // Duration between 15-30s
    });
  }
  return symbols;
};

const FloatingSymbols = () => {
  const [scrollY, setScrollY] = useState(0);

  // Generate symbols once on component mount
  const symbols = useMemo(() => generateRandomSymbols(45), []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {symbols.map((item, index) => (
        <div
          key={index}
          className="absolute pointer-events-none select-none"
          style={{
            top: item.top,
            left: item.left,
            transform: `translateY(${scrollY * item.speed}px)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <span
            className={`floating-symbol symbol-animation ${item.size} font-display`}
            style={{
              animationDelay: `${item.animationDelay}s`,
              animationDuration: `${item.animationDuration}s`,
            }}
          >
            {item.symbol}
          </span>
        </div>
      ))}
    </div>
  );
};

export default FloatingSymbols;
