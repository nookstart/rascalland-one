"use client";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Home, Users, Map, Sparkles } from "lucide-react";
import Image from "next/image";
import RascalLandLogo from '@/public/images/logo-transparent-4_360x.png';
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Calculate scroll progress
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

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
        role="navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "py-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm"
            : "py-3 bg-white dark:bg-gray-900"
        }`}
        style={{ width: '100vw', maxWidth: '100vw', boxSizing: 'border-box' }}
      >
        <div className="w-full px-4 sm:px-6 mx-auto" style={{ maxWidth: '100%' }}>
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link
              href="/"
              className={`font-bold bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text text-transparent transition-all ${
                isScrolled ? "text-xl" : "text-2xl"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Image 
              src={RascalLandLogo}
              alt="Rascal Land"
              width={120}
              height={30}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center transition-all ${
                      isScrolled ? "text-sm" : "text-base"
                    } text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 font-medium px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800`}
                  >
                    <Icon size={isScrolled ? 18 : 20} className="mr-1.5" />
                    {item.name}
                  </Link>
                );
              })}
              <ThemeSwitcher />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="mobile-menu-button p-2 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`mobile-menu md:hidden bg-white dark:bg-gray-900 transition-all duration-300 ease-in-out ${
            isMenuOpen 
              ? "max-h-96 opacity-100 border-t border-gray-200 dark:border-gray-700" 
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
          style={{ width: '100vw', maxWidth: '100vw', boxSizing: 'border-box' }}
        >
          <div className="px-4 py-3" style={{ maxWidth: '100%' }}>
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors font-medium py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon size={22} className="mr-4" />
                    <span className="text-lg">{item.name}</span>
                  </Link>
                );
              })}
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </nav>

      {/* Scroll progress indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50" style={{ width: '100vw' }}>
        <div
          className="h-full bg-gradient-to-r from-red-600 to-yellow-500 transition-all duration-300"
          style={{
            width: `${scrollProgress}%`,
          }}
        />
      </div>

      {/* Backdrop for mobile menu when open */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
          style={{ width: '100vw', height: '100vh' }}
        />
      )}
    </>
  );
};

export default Navigation;