import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      setIsMobileMenuOpen(false); // Close menu after navigation
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
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

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-foreground hover:text-primary transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Half Screen */}
      <div
        className={`fixed top-0 left-0 right-0 h-1/2 bg-background/95 backdrop-blur-md z-40 md:hidden transition-all duration-700 ease-in-out rounded-b-3xl shadow-2xl ${isMobileMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
          }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 pt-20">
          <button
            onClick={() => scrollToSection("about")}
            className="nav-link text-2xl font-medium uppercase tracking-wider"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("sessions")}
            className="nav-link text-2xl font-medium uppercase tracking-wider"
          >
            Sessions
          </button>
          <button
            onClick={() => scrollToSection("book")}
            className="nav-link text-2xl font-medium uppercase tracking-wider"
          >
            Book
          </button>
        </div>
      </div>
    </>
  );
};

export default Navigation;
