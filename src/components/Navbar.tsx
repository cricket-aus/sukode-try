import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Brain, Github, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-10",
        isScrolled
          ? "bg-background/90 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="#" className="flex items-center gap-2">
          <Brain className="h-8 w-8 text-cerebras-300" />
          <span className="text-xl font-bold text-white">Sukode</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-white/70 hover:text-white transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-white/70 hover:text-white transition-colors"
          >
            How It Works
          </a>
          <a
            href="#testimonials"
            className="text-white/70 hover:text-white transition-colors"
          >
            Testimonials
          </a>
          <a
            href="#pricing"
            className="text-white/70 hover:text-white transition-colors"
          >
            Pricing
          </a>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="w-6 h-6 text-white/70 hover:text-white transition-colors" />
          </a>
          <Button className="bg-cerebras-400 hover:bg-cerebras-500 text-white"
          onClick={() => window.open('https://www.google.com/', '_blank')}>
            Install Extension
          </Button>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-white/10 py-4 px-6 flex flex-col gap-4 animate-fade-in">
          <a
            href="#features"
            className="text-white/70 hover:text-white transition-colors py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-white/70 hover:text-white transition-colors py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            How It Works
          </a>
          <a
            href="#testimonials"
            className="text-white/70 hover:text-white transition-colors py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Testimonials
          </a>
          <a
            href="#pricing"
            className="text-white/70 hover:text-white transition-colors py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Pricing
          </a>
          <Button className="bg-cerebras-400 hover:bg-cerebras-500 text-white w-full mt-2"
          onClick={() => window.open('https://www.google.com/', '_blank')}>
            Install Extension
          </Button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
