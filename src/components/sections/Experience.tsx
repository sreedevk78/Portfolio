"use client";

import { motion, useTransform } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Activity, X, Briefcase, GraduationCap, Award } from "lucide-react";
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
    subtitle: "B.Tech Computer Science",
    description: "2024-2028 | CGPA: 8.86/10.0. Engineering high-order intelligence systems and scalable architectures.",
    bgColor: "bg-white",
    icon: GraduationCap,
    details: "Currently pursuing a Bachelor of Technology in Computer Science. Core coursework includes Data Structures, Algorithms, Computer Architecture, and AI Fundamentals. Maintaining a high academic standing while actively participating in technical communities.",
  },
  {
    logo: "/logos/mozilla_vit.jpg",
    title: "Mozilla VIT",
    subtitle: "Winner | CodeXcape Hackathon",
    description: "Developed a RAG-driven creative platform for authors using advanced vector storage.",
    bgColor: "bg-white",
    icon: Award,
    details: "Led the development of a 'Living World Bible' for writers. The system used Retrieval-Augmented Generation (RAG) to maintain story continuity across thousands of pages. Integrated vector databases for high-speed lore retrieval and context-aware AI generation.",
  },
  {
    logo: "/logos/club_fm.png",
    title: "Club FM Dubai",
    subtitle: "Kutty RJ | Radio Anchor",
    description: "Selected for public engagement and live communication at a leading radio station.",
    bgColor: "bg-[#f37021]",
    icon: Briefcase,
    details: "Served as a youth radio personality, managing live broadcasts and engaging with a diverse audience. Developed strong communication, public speaking, and rapid-response skills in a high-pressure media environment.",
  },
];

const skills = [
  { name: "C++ / C", level: "Expert", status: "Advanced", useCase: "Strong foundation in low-level memory management and algorithm design. Proficient in performance-critical C++ architectures." },
  { name: "Java", level: "Advanced", status: "Core", useCase: "Object-oriented software development and robust application architecture. Experienced in building scalable systems." },
  { name: "Python", level: "Expert", status: "AI Focus", useCase: "Specialist in AI-assisted development and LLM integration. Expert in leveraging Python for generative workflows." },
  { name: "Prompt Engineering", level: "Expert", status: "AI Mastery", useCase: "Advanced mastery of LLM orchestration, chain-of-thought prompting, and rapid AI-driven prototyping." },
  { name: "TypeScript", level: "Expert", status: "Full-Stack", useCase: "Developing type-safe, complex web architectures and RAG-integrated creative platforms with Next.js." },
  { name: "React", level: "Expert", status: "UI/UX", useCase: "Crafting high-fidelity, interactive user interfaces with sophisticated state management and motion." },
  { name: "PostgreSQL", level: "Advanced", status: "Database", useCase: "Managing relational databases and vector storage for persistent AI world-building lore." },
];

export default function Experience() {
  const { mouseX, mouseY } = useSpatial();
  const { progress } = useSceneProgress();
  const [selectedSkill, setSelectedSkill] = useState<typeof skills[0] | null>(null);

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
              Professional_Path
            </div>
            <h2 className="text-5xl md:text-[8rem] font-black leading-[0.85] uppercase tracking-tighter">
              <KineticText text={"EXPERIENCE\n& CORE"} lineClassName={(index) => index === 1 ? "text-edge-outline" : ""} />
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
                </div>
              </MagneticTarget>
            ))}
          </div>
        </motion.div>

        <motion.div
          style={{ rotateX, rotateY, z: gridZ }}
          className="relative stage-3d grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, z: -200 }}
              whileInView={{ opacity: 1, z: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="h-[280px]"
              onClick={() => setSelectedSkill(skill)}
            >
              <FlipTile
                front={
                  <motion.article 
                    whileHover={{ scale: 1.02 }}
                    className="h-full rounded-2xl bg-white/[0.035] border border-white/10 hover:border-electric/45 transition-colors stage-3d cursor-pointer"
                  >
                    <SpotlightReveal className="h-full rounded-2xl">
                      <div className="h-full w-full p-5 flex flex-col">
                        <div className="flex justify-between items-center mb-4 shrink-0">
                          <div className="w-9 h-9 rounded-xl bg-electric/10 flex items-center justify-center">
                            <Activity className="w-4 h-4 text-electric" />
                          </div>
                          <span className="text-[10px] font-mono text-ghost/40 uppercase tracking-widest">{skill.status}</span>
                        </div>

                        <div className="h-16 flex flex-col justify-center shrink-0">
                          <h4 className="text-xl font-black uppercase tracking-tighter leading-tight mb-1">{skill.name}</h4>
                          <span className="text-[10px] font-mono text-electric uppercase tracking-[0.1em]">{skill.level}</span>
                        </div>
                        
                        <div className="relative flex-1 mt-3 overflow-hidden [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] pointer-events-none">
                          <div className="absolute inset-x-0 top-0 animate-auto-scroll">
                            <p className="text-[11px] text-ghost/60 font-mono leading-relaxed">
                              {skill.useCase}
                            </p>
                          </div>
                        </div>
                        <div className="mt-4 pt-3 border-t border-white/5 shrink-0">
                           <span className="text-[9px] font-mono text-electric/60 uppercase tracking-widest">Click to Expand</span>
                        </div>
                      </div>
                    </SpotlightReveal>
                  </motion.article>
                }
                back={
                  <div className="h-full flex flex-col overflow-hidden rounded-2xl border border-electric/35 bg-electric/[0.07] p-5 text-left shadow-[0_0_34px_rgba(59,130,246,0.12)]">
                    <div className="mb-4 flex items-center justify-between shrink-0">
                      <span className="text-[9px] font-mono uppercase tracking-[0.35em] text-electric">Technical_Core</span>
                      <span className="text-[11px] font-mono text-ghost/70">{skill.level}</span>
                    </div>
                    <div className="h-16 flex flex-col justify-center shrink-0">
                      <h4 className="text-2xl font-black uppercase tracking-tighter text-white leading-tight">{skill.name}</h4>
                    </div>
                    
                    <div className="mt-3 flex-1 overflow-hidden">
                      <p className="text-[11px] font-mono leading-relaxed text-ghost/70">
                        {skill.useCase}
                      </p>
                    </div>
                    
                    <div className="mt-4 h-[1px] w-full shrink-0 bg-gradient-to-r from-electric/60 to-transparent" />
                    <span className="mt-3 block text-[9px] font-mono uppercase tracking-[0.3em] text-ghost/45 shrink-0">Click for details</span>
                  </div>
                }
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Expanded View Modal */}
      {selectedSkill && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedSkill(null)}
            className="absolute inset-0 bg-obsidian/90 backdrop-blur-xl"
          />
          <motion.div
            layoutId={`skill-${selectedSkill.name}`}
            className="relative w-full max-w-2xl bg-onyx border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            data-lenis-prevent="true"
          >
            <div className="p-8 md:p-12 space-y-8">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-electric/10 flex items-center justify-center">
                      <Activity className="w-6 h-6 text-electric" />
                    </div>
                    <span className="text-sm font-mono text-electric uppercase tracking-widest">{selectedSkill.level}</span>
                  </div>
                  <h3 className="text-5xl md:text-6xl font-black uppercase tracking-tighter">{selectedSkill.name}</h3>
                </div>
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <h4 className="text-xs font-mono text-ghost/40 uppercase tracking-[0.3em]">Technical Application</h4>
                  <p className="text-ghost/80 text-lg md:text-xl font-light leading-relaxed">
                    {selectedSkill.useCase}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                  <div className="space-y-2">
                    <span className="block text-[10px] font-mono text-ghost/30 uppercase tracking-widest">Status</span>
                    <span className="block text-sm font-bold uppercase text-electric">{selectedSkill.status}</span>
                  </div>
                  <div className="space-y-2">
                    <span className="block text-[10px] font-mono text-ghost/30 uppercase tracking-widest">Focus</span>
                    <span className="block text-sm font-bold uppercase text-white">Full-Stack Development</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}

