"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Github, Linkedin, Code, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 18 },
    },
  };

  const glowVariants = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.5, 0.7, 0.5],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

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

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-portfolio-darkBg overflow-hidden py-24 sm:py-32"
    >
      {/* Background Grids and Glows */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 z-0 pointer-events-none" />
      
      <motion.div
        variants={glowVariants}
        animate="animate"
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none z-0"
      />
      <motion.div
        variants={glowVariants}
        animate="animate"
        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none z-0"
      />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Headline Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col space-y-6 text-left"
          >
            {/* Glassmorphic Badge */}
            <motion.div variants={itemVariants} className="self-start">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 border border-slate-800 backdrop-blur-md text-xs font-semibold text-slate-300">
                <Code className="h-3.5 w-3.5 text-portfolio-accentBlue" />
                <span>Full-Stack Developer & AI Enthusiast</span>
                <Sparkles className="h-3 w-3 text-amber-400" />
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-[1.1]"
            >
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-400 bg-clip-text text-transparent">
                Maaz Mahmood
              </span>
              <br />
              I build scalable web apps &{" "}
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                AI solutions
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-slate-400 max-w-xl font-normal leading-relaxed"
            >
              Computer Science student passionate about building impactful digital products with clean, maintainable code and modern technologies.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 pt-2"
            >
              <Button
                onClick={() => scrollToSection("projects")}
                size="lg"
                className="flex items-center gap-2"
              >
                View Projects
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => scrollToSection("contact")}
                variant="outline"
                size="lg"
                className="border-slate-800 bg-transparent text-white hover:bg-slate-900/50 hover:text-white flex items-center gap-2"
              >
                <Mail className="h-4 w-4" />
                Contact Me
              </Button>
            </motion.div>

            {/* Connect / Socials */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col space-y-3 pt-6 border-t border-slate-900"
            >
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Connect with me
              </span>
              <div className="flex gap-4">
                {[
                  { icon: <Github className="h-5 w-5" />, href: "https://github.com", label: "GitHub" },
                  { icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com", label: "LinkedIn" },
                  { icon: <Mail className="h-5 w-5" />, href: "mailto:maaz@example.com", label: "Email" },
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-slate-900/40 border border-slate-800/60 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual Illustration / Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[360px] aspect-[4/5] rounded-[2rem] bg-slate-950/80 border border-slate-800/80 p-3 shadow-[0_20px_50px_rgba(37,99,235,0.15)] glow-card">
              
              {/* Internal container with glow card styling */}
              <div className="relative w-full h-full overflow-hidden rounded-[1.75rem] bg-slate-900 flex items-center justify-center">
                
                {/* Fallback code illustration */}
                <div className="absolute inset-0 flex flex-col justify-between p-6 bg-gradient-to-b from-blue-950/20 to-purple-950/20 z-0">
                  <div className="flex justify-between items-start">
                    <div className="h-6 w-12 rounded bg-slate-800/40 flex items-center justify-center text-[10px] text-slate-500 font-mono">
                      const
                    </div>
                    <div className="h-3 w-3 rounded-full bg-blue-500/30 animate-ping" />
                  </div>

                  {/* AI Neural connections representation */}
                  <svg className="w-full h-40 text-slate-800/40 opacity-70" viewBox="0 0 100 100">
                    <circle cx="20" cy="50" r="2" fill="currentColor" />
                    <circle cx="50" cy="20" r="3" fill="#3b82f6" />
                    <circle cx="50" cy="80" r="2.5" fill="#a855f7" />
                    <circle cx="80" cy="50" r="2" fill="currentColor" />
                    <line x1="20" y1="50" x2="50" y2="20" stroke="currentColor" strokeWidth="0.5" />
                    <line x1="20" y1="50" x2="50" y2="80" stroke="currentColor" strokeWidth="0.5" />
                    <line x1="50" y1="20" x2="80" y2="50" stroke="currentColor" strokeWidth="0.5" />
                    <line x1="50" y1="80" x2="80" y2="50" stroke="currentColor" strokeWidth="0.5" />
                    <line x1="50" y1="20" x2="50" y2="80" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2" />
                  </svg>

                  <div className="font-mono text-left text-[11px] text-slate-500 space-y-1">
                    <p className="text-blue-400">developer = &#123;</p>
                    <p className="pl-4">name: <span className="text-emerald-400">"Maaz Mahmood"</span>,</p>
                    <p className="pl-4">role: <span className="text-emerald-400">"Full Stack"</span>,</p>
                    <p className="pl-4">status: <span className="text-emerald-400">"Available"</span></p>
                    <p className="text-blue-400">&#125;;</p>
                  </div>
                </div>

                {/* Profile Image - Loaded dynamically from docs/pic.png via API route */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/api/profile-image"
                  alt="Maaz Mahmood Portrait"
                  onError={(e) => {
                    // Hide if image doesn't exist to show fallback illustration
                    e.currentTarget.style.display = "none";
                  }}
                  className="absolute inset-0 w-full h-full object-cover z-10"
                />

                {/* Available for Opportunities pill */}
                <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/80 border border-slate-800/80 text-[11px] font-semibold text-emerald-400 shadow-md">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Available for work</span>
                </div>

              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
