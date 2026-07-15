"use client";

import React from "react";
import { Github, Linkedin, Mail, Code } from "lucide-react";

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
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

  const navLinks = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Experience", id: "experience" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Logo and Tagline */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <button
              onClick={() => scrollToSection("home")}
              className="flex items-center gap-2 font-display text-lg font-bold tracking-tight text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-portfolio-accentBlue rounded px-2"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-portfolio-accentBlue text-white">
                <Code className="h-3.5 w-3.5" />
              </div>
              <span>Maaz Mahmood</span>
            </button>
            <p className="text-xs text-slate-500 max-w-xs text-center md:text-left mt-1">
              Building scalable web architectures and intelligent AI systems.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-xs font-semibold hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-portfolio-accentBlue rounded-sm px-1.5 py-0.5"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {[
              { icon: <Github className="h-4 w-4" />, href: "https://github.com", label: "GitHub" },
              { icon: <Linkedin className="h-4 w-4" />, href: "https://linkedin.com", label: "LinkedIn" },
              { icon: <Mail className="h-4 w-4" />, href: "mailto:maaz@example.com", label: "Email" },
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>

        </div>

        {/* Divider */}
        <div className="h-px bg-slate-900 my-8" />

        {/* Bottom copyright statement */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} Maaz Mahmood. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
