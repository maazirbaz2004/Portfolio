"use client";

import React from "react";
import { motion as framerMotion } from "framer-motion";
import { Layout, Server, Database, Brain, Wrench } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const skillCategories = [
  {
    title: "Frontend Development",
    icon: <Layout className="h-6 w-6 text-blue-500" />,
    badgeVariant: "blueBadge" as const,
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML", "CSS"],
  },
  {
    title: "Backend Development",
    icon: <Server className="h-6 w-6 text-indigo-500" />,
    badgeVariant: "purpleBadge" as const,
    skills: ["Node.js", "Express.js", "REST APIs", "Next.js Routes"],
  },
  {
    title: "Databases",
    icon: <Database className="h-6 w-6 text-emerald-500" />,
    badgeVariant: "greenBadge" as const,
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Supabase"],
  },
  {
    title: "AI / Machine Learning",
    icon: <Brain className="h-6 w-6 text-pink-500" />,
    badgeVariant: "purpleBadge" as const,
    skills: ["Python", "NLP (Natural Language)", "RAG (Retrieval)", "HuggingFace", "LangChain"],
  },
  {
    title: "Developer Tools",
    icon: <Wrench className="h-6 w-6 text-amber-500" />,
    badgeVariant: "tech" as const,
    skills: ["Git", "GitHub", "Docker", "Prisma", "Postman", "Vercel"],
  },
];

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
  };

  return (
    <section
      id="skills"
      className="py-20 sm:py-28 bg-white dark:bg-portfolio-darkBg relative overflow-hidden"
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-portfolio-accentBlue">
            My Tech Stack
          </h2>
          <p className="mt-2 text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white">
            Skills & Expertise
          </p>
          <div className="h-1 w-12 bg-portfolio-accentBlue mx-auto mt-4 rounded-full" />
        </div>

        {/* Skills Cards Grid */}
        <framerMotion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-center"
        >
          {skillCategories.map((category, idx) => (
            <framerMotion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.2 }}
              className="flex"
            >
              <Card className="w-full bg-slate-50 dark:bg-slate-950 border-slate-200/60 dark:border-slate-800/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center gap-3 space-y-0 p-6 pb-4">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
                    {category.icon}
                  </div>
                  <CardTitle className="text-lg font-bold text-slate-850 dark:text-slate-150">
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-2">
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIdx) => (
                      <Badge
                        key={skillIdx}
                        variant={category.badgeVariant}
                        className="py-1 px-3 text-xs"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </framerMotion.div>
          ))}
        </framerMotion.div>

      </div>
    </section>
  );
}
