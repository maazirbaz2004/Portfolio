"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, FileText, Globe, Image as ImageIcon, Layers } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const categories = ["All Projects", "Full Stack", "AI / ML", "Web Apps", "Tools"];

const projectsData = [
  {
    id: 1,
    title: "Resumify",
    category: "AI / ML",
    icon: <FileText className="h-5 w-5 text-white" />,
    iconBg: "bg-purple-600 dark:bg-purple-500",
    description: "A full-stack, AI-powered recruitment platform designed to bridge the gap between candidates and recruiters. It uses NLP and Machine Learning to parse resumes, analyze skill gaps, and rank candidates against job descriptions automatically.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite", "Node.js", "Express", "PostgreSQL", "Python", "FastAPI"],
    liveUrl: "#",
    githubUrl: "https://github.com/maazirbaz2004/Resumify",
    image: "/Resumify.png",
  },
  {
    id: 2,
    title: "SAGE",
    category: "AI / ML",
    icon: <FileText className="h-5 w-5 text-white" />,
    iconBg: "bg-blue-600 dark:bg-blue-500",
    description: "A Natural Language Processing (NLP) project that uses Retrieval-Augmented Generation (RAG) to provide information based on mental health fact sheets and guidelines.",
    tags: ["NLP", "RAG Pipeline", "Automated Evaluation", "Data-Driven"],
    liveUrl: "#",
    githubUrl: "https://github.com/maazirbaz2004/Chatbot-with-RAG-implementation",
    image: "/SAGE.jpg",
  },
  {
    id: 3,
    title: "RepoMind",
    category: "AI / ML",
    icon: <Globe className="h-5 w-5 text-white" />,
    iconBg: "bg-emerald-600 dark:bg-emerald-500",
    description: "An end-to-end Retrieval-Augmented Generation (RAG) and relational metadata sync engine designed to ingest, structure, embed, and query GitHub repositories with high accuracy and minimal noise.",
    tags: ["Python", "PyGithub", "FastEmbed", "Qdrant", "SQLModel", "FastAPI"],
    liveUrl: "https://repomind-psi.vercel.app/",
    githubUrl: "https://github.com/MuhammadAbdullah12-ux/RepoMind",
    image: "/RepoMind.png",
  },
  {
    id: 4,
    title: "Dental Flow",
    category: "Full Stack",
    icon: <Globe className="h-5 w-5 text-white" />,
    iconBg: "bg-blue-600 dark:bg-blue-500",
    description: "A modern, full-stack dental clinic management platform with distinct role-based dashboards for Patients, Doctors, Receptionists, and Administrators.",
    tags: ["Next.js", "Prisma", "Tailwind CSS", "Supabase", "Auth.js", "Gemini API"],
    liveUrl: "https://brandive-task-1.vercel.app/",
    githubUrl: "https://github.com/maazirbaz2004/Brandive_task_1",
    image: "/DentalFlow.png",
  },
  {
    id: 5,
    title: "FairGig",
    category: "Full Stack",
    icon: <Globe className="h-5 w-5 text-white" />,
    iconBg: "bg-emerald-600 dark:bg-emerald-500",
    description: "A transparency-driven platform designed to empower gig workers by providing tools to track, verify, and analyze earnings.",
    tags: ["React", "Redux Toolkit", "Tailwind CSS", "Node.js", "MongoDB", "FastAPI", "OpenAI API"],
    liveUrl: "https://fair-gig-five.vercel.app/",
    githubUrl: "https://github.com/MuhammadKhushamAli/FairGig",
    image: "/FairGig.png",
  }
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All Projects");

  const filteredProjects = projectsData.filter((project) => {
    if (activeCategory === "All Projects") return true;
    return project.category === activeCategory;
  });

  return (
    <section
      id="projects"
      className="py-20 sm:py-28 bg-[#f8fafc] dark:bg-slate-900/60 relative"
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-portfolio-accentBlue">
            My Work
          </h2>
          <p className="mt-2 text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white">
            Featured Projects
          </p>
          <div className="h-1 w-12 bg-portfolio-accentBlue mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-sm sm:text-base text-slate-500 dark:text-slate-400">
            Explore a curated selection of full-stack web applications, custom tools, and artificial intelligence solutions.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${isActive
                    ? "border border-portfolio-accentBlue bg-blue-50 dark:bg-blue-950/20 text-portfolio-accentBlue"
                    : "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-center"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="flex"
              >
                <Card className="w-full bg-white dark:bg-slate-950 border-slate-200/50 dark:border-slate-800/80 shadow-sm flex flex-col overflow-hidden hover:shadow-md hover:translate-y-[-4px] transition-all duration-300">

                  {/* Card Image Container */}
                  <div className="relative aspect-[16/10] bg-slate-100 dark:bg-slate-900 flex items-center justify-center border-b border-slate-100 dark:border-slate-800/50 overflow-hidden">

                    {project.image ? (
                      <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover z-0" />
                    ) : (
                      <>
                        {/* Fallback Artwork representation of screenshot */}
                        <div className="absolute inset-0 flex flex-col justify-between p-6 opacity-30 select-none">
                          <div className="flex justify-end">
                            <Layers className="h-6 w-6 text-slate-400" />
                          </div>
                          <div className="font-mono text-[10px] text-slate-400 text-left space-y-1">
                            <p>&lt;section class="project"&gt;</p>
                            <p className="pl-4">&lt;h1&gt;{project.title.split(" – ")[0]}&lt;/h1&gt;</p>
                            <p>&lt;/section&gt;</p>
                          </div>
                        </div>

                        <div className="text-sm font-semibold text-slate-400 dark:text-slate-600 relative z-0">
                          [ Screenshot Place ]
                        </div>
                      </>
                    )}

                    {/* Floating icon representing project category */}
                    <div className={`absolute top-4 left-4 p-2.5 rounded-xl shadow-md ${project.iconBg} z-10`}>
                      {project.icon}
                    </div>
                  </div>

                  {/* Card Contents */}
                  <div className="flex-1 p-6 flex flex-col justify-between space-y-4">
                    <div className="space-y-2 text-left">
                      <div className="text-[10px] font-bold tracking-wider text-portfolio-accentBlue uppercase">
                        {project.category}
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Tags */}
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.tags.map((tag, tagIdx) => (
                          <Badge key={tagIdx} variant="tech" className="text-[10px] px-2 py-0.5">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Card Footer Links */}
                      <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-900 pt-4 text-xs font-semibold">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-portfolio-accentBlue transition-colors"
                        >
                          <Github className="h-4 w-4" />
                          Code
                        </a>
                        {project.liveUrl !== "#" ? (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200 hover:text-portfolio-accentBlue transition-colors"
                          >
                            <span>Live Demo</span>
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        ) : (
                          <div className="w-[84px]"></div>
                        )}
                      </div>
                    </div>
                  </div>

                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
