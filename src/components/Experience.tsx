"use client";

import React from "react";
import { Briefcase, Calendar, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const experienceData = [
  {
    id: 1,
    role: "Software Engineering Intern",
    company: "Tech Solutions Lab",
    duration: "June 2025 – August 2025",
    description: "Assisted in building custom Next.js frontend pages, optimizing database queries with Prisma, and designing scalable API routes. Contributed to responsive, mobile-first design updates.",
    icon: <Briefcase className="h-4 w-4 text-white" />,
    iconBg: "bg-blue-600",
  },
  {
    id: 2,
    role: "Freelance Full-Stack Developer",
    company: "Upwork & Fiverr / Client Projects",
    duration: "2024 – Present",
    description: "Developed and launched custom web applications, responsive portfolios, and administrative interfaces. Worked directly with clients to identify business goals, setup Supabase hosting, and design robust database schemas.",
    icon: <Briefcase className="h-4 w-4 text-white" />,
    iconBg: "bg-emerald-600",
  },
  {
    id: 3,
    role: "Open-Source Contributor",
    company: "AI & Web Tooling Communities",
    duration: "2024 – Present",
    description: "Contributed features and bug fixes to developer tools, CLI utilities, and LangChain ecosystem integrations. Focused on improving search performance and documentation for vector databases.",
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

        {/* Timeline Layout */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical Center Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800 -translate-x-1/2" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {experienceData.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Badge/Dot */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 flex items-center justify-center h-8 w-8 rounded-full border border-white dark:border-slate-950 shadow-md bg-slate-900 z-10">
                    <div className={`h-6 w-6 rounded-full flex items-center justify-center ${item.iconBg}`}>
                      {item.icon}
                    </div>
                  </div>

                  {/* Left / Right Card Container */}
                  <div className={`w-full sm:w-[calc(50%-2rem)] pl-12 sm:pl-0 ${isEven ? "sm:pr-8" : "sm:pl-8 text-left"}`}>
                    <Card className="bg-slate-50 dark:bg-slate-950 border-slate-200/60 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-6 space-y-3 text-left">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                            {item.role}
                          </h3>
                          <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 dark:text-slate-500">
                            <Calendar className="h-3 w-3" />
                            <span>{item.duration}</span>
                          </div>
                        </div>

                        <div className="text-xs font-semibold text-portfolio-accentBlue">
                          {item.company}
                        </div>

                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
