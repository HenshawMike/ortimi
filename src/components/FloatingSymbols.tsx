const symbols = [
  { symbol: "∑", size: "text-6xl", top: "10%", left: "5%" },
  { symbol: "∫", size: "text-8xl", top: "20%", right: "10%" },
  { symbol: "π", size: "text-5xl", top: "60%", left: "8%" },
  { symbol: "∞", size: "text-7xl", top: "70%", right: "5%" },
  { symbol: "√", size: "text-6xl", top: "40%", left: "85%" },
  { symbol: "Δ", size: "text-5xl", top: "15%", left: "45%" },
  { symbol: "θ", size: "text-4xl", top: "80%", left: "40%" },
  { symbol: "λ", size: "text-5xl", top: "30%", left: "20%" },
];

const FloatingSymbols = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {symbols.map((item, index) => (
        <span
          key={index}
          className={`floating-symbol ${item.size} font-display`}
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
            animationDelay: `${index * 2}s`,
          }}
        >
          {item.symbol}
        </span>
      ))}
    </div>
  );
};

export default FloatingSymbols;
