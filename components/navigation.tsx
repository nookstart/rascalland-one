"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Home, Users, Map, Sparkles } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Calculate scroll progress
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    // Only add event listener on client side
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/#home", icon: Home },
    { name: "Rascal Gang", href: "/#rascal-gang", icon: Users },
    { name: "Roadmap", href: "/#roadmap", icon: Map },
    { name: "Mint", href: "/mint", icon: Sparkles },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "py-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm"
            : "py-4 bg-white dark:bg-gray-900"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link
              href="/"
              className={`font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent transition-all ${
                isScrolled ? "text-2xl" : "text-3xl"
              }`}
            >
              Rascal Land
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center transition-all ${
                      isScrolled ? "text-sm" : "text-base"
                    } text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium`}
                  >
                    <Icon size={isScrolled ? 18 : 20} className="mr-2" />
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon size={20} className="mr-3" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Scroll progress indicator - Only rendered on client side */}
      <div className="fixed top-0 left-0 w-full h-1 z-50">
        <div
          className="h-full bg-gradient-to-r from-purple-600 to-blue-500 transition-all duration-300"
          style={{
            width: `${scrollProgress}%`,
          }}
        />
      </div>
    </>
  );
};

export default Navigation;