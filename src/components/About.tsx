"use client";

import React from "react";
import { motion } from "framer-motion";
import { Download, GraduationCap, Calendar, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  return (
    <section
      id="about"
      className="py-20 sm:py-28 bg-slate-50 dark:bg-slate-900/40 relative"
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-portfolio-accentBlue">
            About Me
          </h2>
          <p className="mt-2 text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white">
            My Journey & Background
          </p>
          <div className="h-1 w-12 bg-portfolio-accentBlue mx-auto mt-4 rounded-full" />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
        >
          {/* Left Column - Biography */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-200">
                Who am I?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base">
                I am a dedicated Computer Science student with a deep passion for software engineering and artificial intelligence. My technical interest lies in building robust full-stack web applications and creating intelligent AI systems that solve real-world problems.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base">
                I enjoy translating complex requirements into elegant, accessible, and performant code. I'm constantly learning new tools, algorithms, and architectures to improve my crafts and build better digital solutions.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-200">
                Career Goals
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base">
                My objective is to work at the intersection of full-stack engineering and machine learning. I aim to contribute to high-impact projects that leverage intelligent data architectures, clean layouts, and predictive engines to empower users worldwide.
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div variants={itemVariants} className="pt-2">
              <a href="/resume.pdf" download="resume.pdf">
                <Button className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download Resume
                </Button>
              </a>
            </motion.div>
          </div>

          {/* Right Column - Education and Stats */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-portfolio-accentBlue" />
                Education
              </h3>

              {/* Education Card */}
              <Card className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 shadow-sm">
                <CardContent className="p-6 space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/30 text-portfolio-accentBlue">
                        <GraduationCap className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="space-y-1 text-left">
                      <h4 className="font-bold text-slate-800 dark:text-slate-200">
                        BS in Computer Science
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        NUST / University of Computer Science
                      </p>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-500 pt-1 font-semibold">
                        <Calendar className="h-3 w-3" />
                        <span>2023 – Present</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Fun Fact / Stat Cards */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
              {[
                { title: "20+", subtitle: "Projects Completed", icon: <Award className="h-5 w-5 text-indigo-500" /> },
                { title: "2+", subtitle: "Years Coding", icon: <Calendar className="h-5 w-5 text-emerald-500" /> },
              ].map((stat, idx) => (
                <Card key={idx} className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 shadow-sm">
                  <CardContent className="p-5 flex flex-col items-center justify-center text-center space-y-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                      {stat.icon}
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-800 dark:text-white">
                        {stat.title}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-500 font-semibold mt-0.5">
                        {stat.subtitle}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
