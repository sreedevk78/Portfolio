"use client";

import { motion, useTransform } from "framer-motion";
import Image from "next/image";
import { Activity } from "lucide-react";
import { useSpatial } from "@/components/SpatialStage";
import { useSceneProgress } from "@/components/SceneContainer";
import KineticText from "@/components/motion/KineticText";
import MagneticTarget from "@/components/motion/MagneticTarget";
import ParallaxLayer from "@/components/motion/ParallaxLayer";
import FlipTile from "@/components/motion/FlipTile";
import SpotlightReveal from "@/components/motion/SpotlightReveal";

const items = [
  {
    logo: "/logos/vit_vellore.png",
    title: "VIT Vellore",
    subtitle: "B.Tech Computer Science Core",
    description: "2024-2028 | CGPA: 8.86/10.0. Engineering high-order intelligence systems and scalable neural architectures.",
    bgColor: "bg-white",
    metrics: ["Core Engineering", "AI Research", "System Design"],
  },
  {
    logo: "/logos/mozilla_vit.jpg",
    title: "Mozilla VIT",
    subtitle: "1st Place | CodeXcape Hackathon",
    description: "Architected a RAG-driven Author OS, defeating 30+ teams through innovative vector storage and lore retrieval logic.",
    bgColor: "bg-white",
    metrics: ["RAG Systems", "Vector DB", "LLM Integration"],
  },
  {
    logo: "/logos/club_fm.png",
    title: "Club FM Dubai",
    subtitle: "Kutty RJ | Radio Anchor",
    description: "Selected for high-stakes public engagement and rapid communication at Dubai's premium radio station.",
    bgColor: "bg-[#f37021]",
    metrics: ["Public Relations", "Rapid Comms", "Live Media"],
  },
];

const skills = [
  { name: "C++", level: "95%", status: "OPTIMIZED", useCase: "Advanced algorithm optimization and core memory management for performance-critical systems." },
  { name: "Python", level: "90%", status: "STABLE", useCase: "Building AI backend logic and automated data-processing pipelines for generative workflows." },
  { name: "TypeScript", level: "92%", status: "SYNCHRONIZED", useCase: "Developing type-safe scalable architectures and RAG-integrated creative platforms." },
  { name: "React", level: "94%", status: "STABLE", useCase: "Crafting high-fidelity component interfaces with complex state synchronization." },
  { name: "Next.js", level: "96%", status: "OPTIMIZED", useCase: "Server-rendering optimization and cinematic motion orchestration." },
  { name: "PostgreSQL", level: "85%", status: "INDEXED", useCase: "Managing relational lore databases and vector storage for AI continuity." },
  { name: "Framer Motion", level: "98%", status: "CHOREOGRAPHED", useCase: "Engineering spatial transitions and interactive motion choreography." },
];

export default function Experience() {
  const { mouseX, mouseY } = useSpatial();
  const { progress } = useSceneProgress();

  const rotateX = useTransform(mouseY, [-1, 1], [1.5, -1.5]);
  const rotateY = useTransform(mouseX, [-1, 1], [-1.5, 1.5]);
  const leftY = useTransform(progress, [0, 0.4, 1], [80, 0, -36]);
  const gridZ = useTransform(progress, [0, 0.5, 1], [-180, 60, 130]);
  const railOpacity = useTransform(progress, [0, 0.35, 0.9, 1], [0.1, 0.75, 0.4, 0.12]);

  return (
    <section className="relative w-full h-screen flex flex-col justify-center py-16 md:py-24 px-6 md:px-8 overflow-hidden stage-3d">
      <ParallaxLayer depth={0.8} progress={progress} yRange={[44, -50]} zRange={[-280, -120]} className="absolute inset-0 pointer-events-none">
        <motion.div style={{ opacity: railOpacity }} className="absolute left-[8%] top-[10%] h-[80%] w-[1px] bg-gradient-to-b from-transparent via-electric/35 to-transparent" />
        <motion.div style={{ opacity: railOpacity }} className="absolute right-[12%] top-[20%] h-48 w-48 border border-white/10 rotate-45" />
      </ParallaxLayer>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-12 xl:gap-24 items-center stage-3d">
        <motion.div style={{ y: leftY }} className="space-y-10 relative z-10">
          <div className="space-y-5">
            <div className="flex items-center gap-3 text-electric font-mono text-[10px] uppercase tracking-[0.5em]">
              <span className="w-8 h-[1px] bg-electric/30" />
              Intelligence_Background
            </div>
            <h2 className="text-5xl md:text-[8rem] font-black leading-[0.85] uppercase tracking-tighter">
              <KineticText text={"CORE\nSYSTEMS"} lineClassName={(index) => index === 1 ? "text-edge-outline" : ""} />
            </h2>
          </div>

          <div className="space-y-4 md:space-y-5">
            {items.map((item) => (
              <MagneticTarget
                key={item.title}
                className="flex gap-5 md:gap-8 group stage-3d"
                strength={8}
              >
                <div className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center p-2 transition-all duration-500 group-hover:border-electric/40 ${item.bgColor}`}>
                  <div className="relative w-full h-full">
                    <Image src={item.logo} alt={item.title} fill sizes="96px" className="object-contain" />
                  </div>
                </div>
                <div className="space-y-3 py-1">
                  <div className="space-y-1">
                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter group-hover:text-electric transition-colors">{item.title}</h3>
                    <p className="text-electric font-mono text-[10px] uppercase tracking-[0.25em]">{item.subtitle}</p>
                  </div>
                  <p className="text-ghost/65 text-xs md:text-sm leading-relaxed max-w-md font-medium uppercase tracking-wide">{item.description}</p>
                  <div className="hidden sm:flex flex-wrap gap-2">
                    {item.metrics.map((metric) => (
                      <span key={metric} className="text-[8px] font-mono text-ghost/50 uppercase tracking-widest border border-white/10 px-2 py-1 rounded">{metric}</span>
                    ))}
                  </div>
                </div>
              </MagneticTarget>
            ))}
          </div>
        </motion.div>

        <motion.div
          style={{ rotateX, rotateY, z: gridZ }}
          className="relative stage-3d hidden lg:grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
        >
          {skills.map((skill, index) => (
            <MagneticTarget
              key={skill.name}
              strength={10}
              className="min-h-48"
            >
              <FlipTile
                ariaLabel={`${skill.name} skill details`}
                className="min-h-48"
                front={
                  <motion.article
                    initial={{ opacity: 0, y: 34, z: -120 }}
                    animate={{ opacity: 1, y: 0, z: index % 2 === 0 ? 20 : -20 }}
                    transition={{ delay: index * 0.055, duration: 0.7, ease: "circOut" }}
                    className="h-full rounded-2xl bg-white/[0.035] border border-white/10 hover:border-electric/45 transition-colors stage-3d"
                  >
                    <SpotlightReveal className="h-full rounded-2xl">
                      <div className="h-full w-full p-5 flex flex-col overflow-hidden">
                        <div className="flex justify-between items-center mb-5 shrink-0">
                          <div className="w-9 h-9 rounded-xl bg-electric/10 flex items-center justify-center">
                            <Activity className="w-4 h-4 text-electric" />
                          </div>
                          <span className="text-[11px] font-mono text-electric">{skill.level}</span>
                        </div>

                        <h4 className="text-xl font-black uppercase tracking-tighter mb-1 shrink-0">{skill.name}</h4>
                        <span className="text-[8px] font-mono text-ghost/45 uppercase tracking-[0.2em] shrink-0">{skill.status}</span>
                        
                        <div className="relative flex-1 mt-4 overflow-hidden [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]">
                          <div className="absolute inset-x-0 top-0 animate-auto-scroll">
                            <p className="text-[11px] text-ghost/72 font-mono leading-relaxed">
                              {skill.useCase}
                            </p>
                          </div>
                        </div>
                      </div>
                    </SpotlightReveal>
                  </motion.article>
                }
                back={
                  <div className="h-full flex flex-col overflow-hidden rounded-2xl border border-electric/35 bg-electric/[0.07] p-5 text-left shadow-[0_0_34px_rgba(59,130,246,0.12)]">
                    <div className="mb-5 flex items-center justify-between shrink-0">
                      <span className="text-[9px] font-mono uppercase tracking-[0.35em] text-electric">Interaction_Mode</span>
                      <span className="text-[11px] font-mono text-ghost/70">{skill.level}</span>
                    </div>
                    <h4 className="text-2xl font-black uppercase tracking-tighter text-white shrink-0">{skill.name}</h4>
                    
                    <div className="relative flex-1 mt-4 overflow-hidden [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]">
                      <div className="absolute inset-x-0 top-0 animate-auto-scroll">
                        <p className="text-[11px] font-mono leading-relaxed text-ghost/70">
                          Hover, focus, and scroll states are tuned for transform-only motion while preserving readable technical context.
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-5 h-[1px] w-full shrink-0 bg-gradient-to-r from-electric/60 to-transparent" />
                    <span className="mt-4 block text-[9px] font-mono uppercase tracking-[0.3em] text-ghost/45 shrink-0">{skill.status}</span>
                  </div>
                }
              />
            </MagneticTarget>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
