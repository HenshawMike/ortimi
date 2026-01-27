import { useState, useEffect } from "react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-5 flex items-center justify-between">
        <button
          onClick={() => scrollToSection("hero")}
          className="font-display text-2xl font-semibold text-foreground tracking-wide hover:text-primary transition-colors duration-300"
        >
          ORTIMI
        </button>

        <div className="flex items-center gap-8">
          <button
            onClick={() => scrollToSection("about")}
            className="nav-link text-sm font-medium uppercase tracking-wider"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("sessions")}
            className="nav-link text-sm font-medium uppercase tracking-wider"
          >
            Sessions
          </button>
          <button
            onClick={() => scrollToSection("book")}
            className="nav-link text-sm font-medium uppercase tracking-wider"
          >
            Book
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
