"use client";

import React from "react";
import { Briefcase, Calendar, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const experienceData = [
  {
    id: 1,
    role: "MERN & DevOps Intern",
    company: "Dafi Labs",
    duration: "2024 – Present",
    description: "Developed and maintained full-stack web applications using the MERN stack (MongoDB, Express, React, Node.js). Implemented CI/CD pipelines, automated deployment workflows, and managed cloud infrastructure to streamline operations.",
    icon: <Briefcase className="h-4 w-4 text-white" />,
    iconBg: "bg-blue-600",
  },
  {
    id: 2,
    role: "Web Development Intern",
    company: "Brandive Media Solutions",
    duration: "2023 – 2024",
    description: "Collaborated with the design and engineering teams to build responsive web applications. Translated high-fidelity UI designs into interactive frontend components, ensuring cross-browser compatibility and optimal performance.",
    icon: <Briefcase className="h-4 w-4 text-white" />,
    iconBg: "bg-emerald-600",
  },
  {
    id: 3,
    role: "AI Intern",
    company: "Optimus Activate",
    duration: "2023",
    description: "Explored foundational Artificial Intelligence concepts, including machine learning algorithms and natural language processing. Assisted in developing AI-driven solutions, analyzing datasets, and optimizing data pipelines for model training.",
    icon: <Star className="h-4 w-4 text-white" />,
    iconBg: "bg-purple-600",
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-20 sm:py-28 bg-white dark:bg-portfolio-darkBg relative"
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-portfolio-accentBlue">
            My Path
          </h2>
          <p className="mt-2 text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white">
            Work Experience
          </p>
          <div className="h-1 w-12 bg-portfolio-accentBlue mx-auto mt-4 rounded-full" />
        </div>

        {/* Experience List Layout */}
        <div className="max-w-3xl mx-auto space-y-6">
          {experienceData.map((item) => (
            <Card
              key={item.id}
              className="bg-slate-50 dark:bg-slate-950 border-slate-200/60 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6 sm:p-8 flex flex-col sm:flex-row gap-5 sm:gap-6 items-start text-left">
                {/* Icon */}
                <div className={`flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-xl shadow-sm text-white ${item.iconBg}`}>
                  {item.icon}
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3 w-full">
                  <div>
                    <h3 className="font-bold text-lg sm:text-xl text-slate-900 dark:text-white leading-tight">
                      {item.role}
                    </h3>
                    <div className="text-sm font-semibold text-portfolio-accentBlue mt-1">
                      {item.company}
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal pt-1">
                    {item.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}
