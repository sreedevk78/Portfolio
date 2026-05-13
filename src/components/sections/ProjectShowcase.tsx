"use client";

import { motion, AnimatePresence, useTransform } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { ExternalLink, X, ArrowRight, Layers } from "lucide-react";
import { useSpatial } from "@/components/SpatialStage";
import { useSceneProgress } from "@/components/SceneContainer";
import KineticText from "@/components/motion/KineticText";
import MagneticTarget from "@/components/motion/MagneticTarget";
import ParallaxLayer from "@/components/motion/ParallaxLayer";
import SpotlightReveal from "@/components/motion/SpotlightReveal";
import TiltCard from "@/components/motion/TiltCard";
import TextDecrypt from "@/components/motion/TextDecrypt";
import ProjectSpecs from "@/components/ProjectSpecs";

const GITHUB_URL = "https://github.com/sreedevk78";

const projects = [
  {
    id: 1,
    title: "CodeXcape",
    subtitle: "AI-Powered Author OS",
    description: "An advanced creative writing platform featuring a 'Living World Bible' driven by RAG (Retrieval-Augmented Generation).",
    image: "/codexcape.png",
    color: "#3b82f6",
    details: "CodeXcape solves the problem of 'AI memory loss' by maintaining a persistent relational database of lore, characters, and plot points. It uses a high-performance Vector Service (Prisma + PostgreSQL) to manage text embeddings and perform cosine similarity searches, ensuring that every AI-generated scene is synchronized with the author's world-building history. The architecture features a dual-engine integration (Gemini/OpenAI) for maximum reliability and persona-driven generation that adapts to unique authorial voices.",
    tech: ["Prisma", "PostgreSQL", "Next.js", "Gemini AI", "Vector Embeddings", "RAG Architecture"],
    href: GITHUB_URL,
    z: 200,
  },
  {
    id: 2,
    title: "CarbonHero",
    subtitle: "Gamified Sustainability",
    description: "A mobile-first application that gamifies eco-conscious living through Boss Battles against the 'Smog Boss'.",
    image: "/carbonhero.png",
    color: "#10b981",
    details: "CarbonHero is a sustainability-focused platform that calculates and visualizes carbon footprints based on daily habits. It leverages Groq LLaMA 3 for real-time sustainability advice and features a gamification engine that translates eco-actions into 'Neural Points'. The system includes an automated boss-battle logic where users offset their emissions to defeat environmental threats, using complex state management to track progress across multiple metrics.",
    tech: ["Groq LLaMA 3", "React Native", "Tailwind CSS", "AI Gamification", "Logic Engine"],
    href: GITHUB_URL,
    z: 0,
  },
  {
    id: 3,
    title: "HomeEase",
    subtitle: "Technician Marketplace",
    description: "A real-time service marketplace with live tracking and socket-based scheduling for home repairs.",
    image: "/homeservices.png",
    color: "#8b5cf6",
    details: "This platform leverages Mapbox and Socket.io for instantaneous technician geofencing and live status updates. It features a robust event-driven architecture that synchronizes booking states across the client and provider apps in under 150ms. The UI uses advanced glassmorphic layers and motion-blur transitions to maintain a premium, high-trust feel while handling complex real-time data flows.",
    tech: ["Socket.io", "Mapbox", "Express", "Node.js", "Real-time Tracking", "Event-Driven UI"],
    href: GITHUB_URL,
    z: -200,
  }
];

type Project = typeof projects[number];

export default function ProjectShowcase() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { mouseX, mouseY } = useSpatial();
  const { progress } = useSceneProgress();

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedProject) return;
    const currentIndex = projects.findIndex(p => p.id === selectedProject.id);
    const nextIndex = (currentIndex + 1) % projects.length;
    setSelectedProject(projects[nextIndex]);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedProject) return;
    const currentIndex = projects.findIndex(p => p.id === selectedProject.id);
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    setSelectedProject(projects[prevIndex]);
  };

  const clusterRotateX = useTransform(mouseY, [-1, 1], [1, -1]);
  const clusterRotateY = useTransform(mouseX, [-1, 1], [-1, 1]);
  const titleY = useTransform(progress, [0, 0.45, 1], [0, 0, 0]);
  const clusterZ = useTransform(progress, [0, 0.45, 1], [-80, 0, 40]);
  const clusterScale = useTransform(progress, [0, 0.45, 1], [0.96, 1, 1.02]);

  return (
    <section className="relative w-full min-h-screen lg:h-screen py-24 md:py-32 px-5 md:px-8 overflow-hidden stage-3d">
      <ParallaxLayer depth={0.4} progress={progress} yRange={[15, -15]} className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[6%] top-[18%] h-40 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent rotate-12" />
        <div className="absolute right-[9%] bottom-[16%] h-24 w-56 border border-white/5" />
      </ParallaxLayer>

      <motion.div style={{ y: titleY }} className="max-w-6xl mx-auto w-full mb-5 md:mb-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3 text-electric font-mono text-[10px] uppercase tracking-[0.5em]">
            <span className="w-8 h-[1px] bg-electric/30" />
            Projects
          </div>
          <h2 className="text-4xl md:text-[7rem] font-black tracking-tighter uppercase leading-[0.85]">
            <KineticText text={"SELECTED\nLOGIC"} lineClassName={(index) => index === 1 ? "text-edge-outline" : ""} />
          </h2>
        </motion.div>
      </motion.div>

      <motion.div 
        style={{ rotateX: clusterRotateX, rotateY: clusterRotateY, z: clusterZ, scale: clusterScale }}
        className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-8 stage-3d"
      >
        {projects.map((project, i) => (
          <MagneticTarget key={project.id} strength={18}>
            <motion.div
              initial={{ opacity: 0, y: 100, z: -500 }}
              animate={{ opacity: 1, y: 0, z: project.z }}
              transition={{ delay: i * 0.15, duration: 1, ease: "circOut" }}
              whileHover={{ 
                scale: 1.035, 
                z: project.z + 150,
                transition: { duration: 0.4, ease: "easeOut" }
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setSelectedProject(project);
                }
              }}
              className="group relative h-[280px] md:h-[420px] bg-white/[0.035] border border-white/10 rounded-2xl md:rounded-[2rem] overflow-hidden hover:border-electric/45 transition-all duration-500 stage-3d cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric/70 focus-visible:ring-offset-4 focus-visible:ring-offset-obsidian"
              onClick={() => setSelectedProject(project)}
            >
              <TiltCard className="h-full w-full">
                <SpotlightReveal className="h-full w-full">
                  <div className="absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                   <Image src={project.image} alt={`${project.title} project preview`} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover opacity-32 saturate-[0.75] contrast-110" />
                   <div className="absolute inset-0 bg-gradient-to-b from-obsidian/5 via-obsidian/25 to-obsidian z-10" />
                   <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent,rgba(59,130,246,0.08),transparent)] z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="absolute inset-0 p-5 md:p-8 flex flex-col justify-end z-20 space-y-2 md:space-y-5">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-electric animate-pulse" />
                    <span className="text-electric font-mono text-[9px] uppercase tracking-[0.4em]"><TextDecrypt text={project.subtitle} /></span>
                  </motion.div>
                  
                  <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter group-hover:text-electric transition-colors leading-none">{project.title}</h3>
                  
                  <div className="space-y-4 opacity-100">
                    <p className="text-ghost/80 text-[10px] md:text-sm font-medium leading-relaxed uppercase tracking-wide">{project.description}</p>
                    <div className="hidden md:flex flex-wrap gap-2">
                      {project.tech.slice(0, 3).map((t) => (
                        <span key={t} className="px-2 py-1 bg-white/7 border border-white/10 rounded text-[8px] font-mono text-ghost/70 uppercase tracking-widest">{t}</span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 md:pt-6 border-t border-white/5 flex items-center justify-between group-hover:border-electric/30 transition-colors">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-ghost/65 group-hover:text-white">View Project</span>
                    <ArrowRight className="w-5 h-5 text-electric group-hover:translate-x-2 transition-all" />
                  </div>
                </div>

                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[radial-gradient(circle,rgba(59,130,246,0.14),transparent_62%)] opacity-0 group-hover:opacity-100 transition-opacity" />
              </SpotlightReveal>
             </TiltCard>
            </motion.div>
          </MagneticTarget>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-obsidian/95"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8, z: -1000, rotateX: 20 }}
              animate={{ opacity: 1, scale: 1, z: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.8, z: -1000, rotateX: 20 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="relative w-full max-w-7xl h-full max-h-[850px] bg-[#080808] border border-white/10 rounded-[2rem] overflow-hidden flex flex-col md:flex-row stage-3d"
            >
              <div className="absolute top-10 left-12 z-50 flex items-center gap-6">
                <div className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                  <span className="text-[10px] font-mono text-ghost/60 uppercase tracking-widest">Case_Study</span>
                </div>
              </div>

              <button
                type="button"
                aria-label="Close project details"
                onClick={() => setSelectedProject(null)}
                className="absolute top-10 right-12 z-50 w-14 h-14 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-electric hover:border-electric transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric/70 focus-visible:ring-offset-4 focus-visible:ring-offset-obsidian"
              >
                <X className="w-6 h-6 text-ghost/60 group-hover:text-white" />
              </button>

              <div className="absolute bottom-10 right-12 z-50 flex items-center gap-4">
                <button
                  type="button"
                  aria-label="Previous project"
                  onClick={handlePrev}
                  className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-electric hover:border-electric transition-all group"
                >
                  <ArrowRight className="w-5 h-5 text-ghost/60 group-hover:text-white rotate-180" />
                </button>
                <button
                  type="button"
                  aria-label="Next project"
                  onClick={handleNext}
                  className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-electric hover:border-electric transition-all group"
                >
                  <ArrowRight className="w-5 h-5 text-ghost/60 group-hover:text-white" />
                </button>
              </div>

              <div className="flex-[1.2] p-16 md:p-24 overflow-y-auto custom-scrollbar space-y-16 bg-gradient-to-br from-obsidian/60 to-transparent" data-lenis-prevent="true">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-7xl md:text-8xl font-black uppercase tracking-tighter leading-none">{selectedProject.title}</h2>
                    <p className="text-electric font-mono text-xs uppercase tracking-[0.5em]">{selectedProject.subtitle}</p>
                  </div>
                  <p className="text-ghost/60 text-xl leading-relaxed font-light">{selectedProject.details}</p>
                </div>

                <div className="pt-8">
                  <ProjectSpecs projectId={selectedProject.id} />
                </div>

                <div className="pt-12 border-t border-white/5">
                  <div className="space-y-6">
                    <h4 className="text-xs font-mono uppercase tracking-[0.4em] text-white flex items-center gap-3">
                      <Layers className="w-4 h-4 text-electric" /> Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {selectedProject.tech.map((t: string) => (
                        <span key={t} className="px-4 py-2 bg-white/[0.03] border border-white/5 rounded-xl text-[10px] font-mono text-ghost/40 uppercase tracking-widest hover:border-electric/30 transition-colors">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-12">
                   <a
                     href={selectedProject.href}
                     target="_blank"
                     rel="noreferrer"
                     className="inline-flex items-center gap-4 px-10 py-5 bg-white text-obsidian rounded-2xl font-black uppercase tracking-widest hover:bg-electric hover:text-white transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric/70 focus-visible:ring-offset-4 focus-visible:ring-offset-obsidian"
                   >
                     <span>Open GitHub</span>
                     <ExternalLink className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                   </a>
                </div>
              </div>

              <div className="flex-1 relative bg-white/[0.01] overflow-hidden hidden lg:block">
                <Image src={selectedProject.image} alt={selectedProject.title} fill className="object-cover opacity-60 mix-blend-luminosity" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent)]" />
                <div className="absolute bottom-12 left-12 right-12 text-center relative z-10">
                   <span className="text-[9px] font-mono text-white/50 uppercase tracking-[1.5em] whitespace-nowrap drop-shadow-md">PREMIUM_AI_NATIVE_EXPERIENCE</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
