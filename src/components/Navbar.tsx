"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Menu, X, Code } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Monitor scrolling to change navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Monitor intersection to highlight active section
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const elements = navItems.map((item) => document.getElementById(item.id));

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px", // Trigger when section occupies the middle of screen
      threshold: 0,
    };

    const observer = new IntersectionObserver(callback, observerOptions);

    elements.forEach((el) => {
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of fixed navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-slate-900/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-800/40 py-4 shadow-lg"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-2 font-display text-xl font-bold tracking-tight text-white group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-portfolio-accentBlue rounded-md px-2"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-portfolio-accentBlue text-white group-hover:scale-110 transition-transform">
              <Code className="h-4 w-4" />
            </div>
            <span className="hidden sm:inline bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Maaz Mahmood
            </span>
            <span className="sm:hidden text-white">Maaz</span>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-950/40 border border-slate-800/40 p-1.5 rounded-full">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-portfolio-accentBlue rounded-full ${
                    isActive ? "text-white font-semibold" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavDot"
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-1 w-1 bg-portfolio-accentBlue rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Let's Talk CTA */}
          <div className="hidden md:block">
            <Button
              onClick={() => scrollToSection("contact")}
              variant="default"
              className="flex items-center gap-2 group"
            >
              Let's Talk
              <Send className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white hover:bg-slate-800/50 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-portfolio-accentBlue"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[68px] z-40 bg-slate-950/95 backdrop-blur-lg border-b border-slate-800 p-6 md:hidden shadow-2xl flex flex-col gap-4"
          >
            <nav className="flex flex-col gap-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left py-2.5 px-4 rounded-xl text-base font-medium transition-colors ${
                    activeSection === item.id
                      ? "bg-portfolio-accentBlue text-white font-semibold"
                      : "text-slate-400 hover:bg-slate-900/50 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <Button
              onClick={() => scrollToSection("contact")}
              className="w-full flex items-center justify-center gap-2 mt-2"
            >
              Let's Talk
              <Send className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
