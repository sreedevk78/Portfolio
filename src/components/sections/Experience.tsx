"use client";

import { motion, useTransform, AnimatePresence } from "framer-motion";
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
  { 
    name: "C++ / C", 
    level: "Expert", 
    status: "Advanced", 
    useCase: "Specialized in low-level memory management and performance-critical systems.",
    metrics: [
      { label: "Logic_Complexity", value: "96%", color: "text-electric" },
      { label: "System_Level", value: "O(1) Native", color: "text-royal" }
    ],
    examples: [
      { title: "High-Speed Trie", desc: "Engineered O(k) prefix tree for massive string lookups." },
      { title: "Memory Allocator", desc: "Custom pool allocator to minimize fragmentation." }
    ]
  },
  { 
    name: "Python", 
    level: "Expert", 
    status: "AI Focus", 
    useCase: "Specialist in AI-assisted development and LLM orchestration.",
    metrics: [
      { label: "AI_Inference", value: "85 t/s", color: "text-electric" },
      { label: "Model_Depth", value: "Fine-Tuned", color: "text-royal" }
    ],
    examples: [
      { title: "CarbonHero AI", desc: "Logic engine powered by Groq LLaMA 3." },
      { title: "Vector Pipelines", desc: "Automated embedding generation for creative lore." }
    ]
  },
  { 
    name: "TypeScript", 
    level: "Expert", 
    status: "Full-Stack", 
    useCase: "Developing type-safe, complex web architectures and RAG pipelines.",
    metrics: [
      { label: "Type_Coverage", value: "100%", color: "text-electric" },
      { label: "Architecture", value: "Modular", color: "text-royal" }
    ],
    examples: [
      { title: "CodeXcape Core", desc: "Built the persistent Author OS using Next.js." },
      { title: "RAG Service", desc: "TypeScript-based vector service for lore retrieval." }
    ]
  },
  { 
    name: "React", 
    level: "Expert", 
    status: "UI/UX", 
    useCase: "Crafting high-fidelity, interactive user interfaces with motion.",
    metrics: [
      { label: "Render_Perf", value: "60 FPS", color: "text-electric" },
      { label: "State_Logic", value: "Advanced", color: "text-royal" }
    ],
    examples: [
      { title: "Cinematic HUD", desc: "Engineered the spatial UI for this portfolio." },
      { title: "Real-time Dashboards", desc: "Interactive writing zones in CodeXcape." }
    ]
  },
  { 
    name: "Next.js", 
    level: "Expert", 
    status: "Optimized", 
    useCase: "Server-rendering optimization and cinematic motion orchestration.",
    metrics: [
      { label: "Hydration_Speed", value: "Ultra-Fast", color: "text-electric" },
      { label: "SEO_Score", value: "100/100", color: "text-royal" }
    ],
    examples: [
      { title: "Server Actions", desc: "Secured data mutations in author workflows." },
      { title: "Route Clusters", desc: "Optimized spatial scene pre-rendering." }
    ]
  },
  { 
    name: "Framer Motion", 
    level: "Expert", 
    status: "Motion", 
    useCase: "Engineering spatial transitions and complex motion choreography.",
    metrics: [
      { label: "Physics_Sync", value: "Smooth", color: "text-electric" },
      { label: "GPU_Accel", value: "Enabled", color: "text-royal" }
    ],
    examples: [
      { title: "Z-Space Engine", desc: "The spatial navigation system in this site." },
      { title: "Kinetic UI", desc: "Reactive text and spotlight reveal systems." }
    ]
  },
  { 
    name: "PostgreSQL", 
    level: "Advanced", 
    status: "Database", 
    useCase: "Managing relational databases and vector storage for AI lore.",
    metrics: [
      { label: "Query_Lat", value: "< 50ms", color: "text-electric" },
      { label: "Data_Integrity", value: "ACID", color: "text-royal" }
    ],
    examples: [
      { title: "Lore Persistence", desc: "Complex schemas for 'Living World Bible'." },
      { title: "User Profiles", desc: "Scalable storage for author preferences." }
    ]
  },
  { 
    name: "Prompt Engineering", 
    level: "Expert", 
    status: "AI Mastery", 
    useCase: "Advanced mastery of LLM orchestration and chain-of-thought prompting.",
    metrics: [
      { label: "Logic_Accuracy", value: "98%", color: "text-electric" },
      { label: "Latency_Redux", value: "Significant", color: "text-royal" }
    ],
    examples: [
      { title: "Chain-of-Thought", desc: "Optimized complex story reasoning in CodeXcape." },
      { title: "Agentic Workflows", desc: "Directed AI agents for world-building consistency." }
    ]
  },
  { 
    name: "Architectural Design", 
    level: "Expert", 
    status: "System_Architect", 
    useCase: "Designing scalable, modular software systems and RAG pipelines.",
    metrics: [
      { label: "Scalability", value: "High", color: "text-electric" },
      { label: "Modularity", value: "Clean", color: "text-royal" }
    ],
    examples: [
      { title: "CodeXcape Auth", desc: "Integrated NextAuth with secure database flows." },
      { title: "Marketplace Logic", desc: "Socket-driven event bus for HomeEase." }
    ]
  }
];

export default function Experience() {
  const { mouseX, mouseY } = useSpatial();
  const { progress } = useSceneProgress();
  const [selectedSkill, setSelectedSkill] = useState<typeof skills[0] | null>(null);
  const [selectedItem, setSelectedItem] = useState<typeof items[0] | null>(null);

  const rotateX = useTransform(mouseY, [-1, 1], [0.3, -0.3]);
  const rotateY = useTransform(mouseX, [-1, 1], [-0.3, 0.3]);
  const railOpacity = useTransform(progress, [0, 0.35, 0.9, 1], [0.05, 0.3, 0.15, 0.05]);

  return (
    <section className="relative w-full min-h-screen lg:h-screen py-16 md:py-20 px-6 md:px-8 bg-obsidian/20 overflow-hidden">
      <ParallaxLayer depth={0.4} progress={progress} yRange={[20, -20]} className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute left-[10%] top-0 h-full w-[1px] bg-white/10" />
        <div className="absolute right-[15%] top-[30%] h-64 w-64 border border-white/5 rounded-full" />
        <div className="absolute right-[12%] top-[20%] h-48 w-48 border border-white/10 rotate-45" />
      </ParallaxLayer>

      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-16 lg:gap-32">
        {/* Left Side: Experience List */}
        <div className="w-full lg:w-[42%] space-y-10 relative z-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-electric font-mono text-[10px] uppercase tracking-[0.4em]">
              <span className="w-6 h-[1px] bg-electric/40" />
              Professional_Experience
            </div>
            <h2 className="text-5xl md:text-[5.5rem] font-black leading-[0.8] uppercase tracking-tighter">
              <KineticText text={"EXPERIENCE\n& CORE"} />
            </h2>
          </div>

          <div className="space-y-8 max-h-[60vh] overflow-y-auto custom-scrollbar pr-4">
            {items.map((item) => (
              <div
                key={item.title}
                className="flex gap-6 md:gap-8 group cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                <div className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center p-3 transition-all duration-500 group-hover:border-electric/40 ${item.bgColor}`}>
                  <div className="relative w-full h-full">
                    <Image src={item.logo} alt={item.title} fill sizes="80px" className="object-contain" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter group-hover:text-electric transition-colors leading-none">{item.title}</h3>
                    <p className="text-electric font-mono text-[9px] uppercase tracking-[0.2em] mt-2">{item.subtitle}</p>
                  </div>
                  <p className="text-ghost/60 text-xs leading-relaxed max-w-sm font-medium uppercase tracking-wide">{item.description}</p>
                  <span className="inline-block text-[9px] font-mono text-electric/40 uppercase tracking-widest border-b border-electric/20 pb-0.5 opacity-0 group-hover:opacity-100 transition-opacity">Read Full Story</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Skills Grid */}
        <div className="w-full lg:w-[58%]">
          <div className="flex items-center gap-3 text-ghost/30 font-mono text-[10px] uppercase tracking-[0.4em] mb-8">
            <span className="w-6 h-[1px] bg-white/20" />
            Technical_Skill_Archive
          </div>
          
          <div
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 max-h-[75vh] overflow-y-auto custom-scrollbar pr-4 relative z-20"
          >
            {skills.map((skill, index) => (
              <button
                key={skill.name}
                type="button"
                onClick={() => setSelectedSkill(skill)}
                className="h-[250px] w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-electric rounded-2xl relative z-30"
              >
                <FlipTile
                  front={
                    <motion.article 
                      style={{ rotateX, rotateY }}
                      whileHover={{ scale: 1.02 }}
                      className="h-full rounded-2xl bg-white/[0.035] border border-white/10 hover:border-electric/45 transition-colors"
                    >
                      <SpotlightReveal className="h-full rounded-2xl pointer-events-none">
                        <div className="h-full w-full p-6 flex flex-col">
                          <div className="flex justify-between items-center mb-6 shrink-0">
                            <Activity className="w-4 h-4 text-electric/60" />
                            <span className="text-[9px] font-mono text-ghost/40 uppercase tracking-widest">{skill.status}</span>
                          </div>

                          <div className="h-16 flex flex-col justify-center shrink-0">
                            <h4 className="text-xl font-black uppercase tracking-tighter leading-tight mb-1">{skill.name}</h4>
                            <span className="text-[10px] font-mono text-electric uppercase tracking-[0.1em]">{skill.level}</span>
                          </div>
                          
                          <div className="mt-4 flex-1 overflow-hidden">
                             <p className="text-[11px] text-ghost/50 font-mono leading-relaxed line-clamp-3">
                                {skill.useCase}
                             </p>
                          </div>
                          <div className="mt-6 pt-4 border-t border-white/5 shrink-0">
                             <span className="text-[9px] font-mono text-electric/40 uppercase tracking-widest">View_Details</span>
                          </div>
                        </div>
                      </SpotlightReveal>
                    </motion.article>
                  }
                  back={
                    <div className="h-full flex flex-col overflow-hidden rounded-2xl border border-electric/30 bg-electric/[0.05] p-6 shadow-2xl">
                      <div className="mb-4 flex items-center justify-between shrink-0">
                        <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-electric/70">Technical_Pillar</span>
                      </div>
                      <div className="h-16 flex flex-col justify-center shrink-0">
                        <h4 className="text-2xl font-black uppercase tracking-tighter text-white leading-tight">{skill.name}</h4>
                      </div>
                      <div className="mt-4 flex-1">
                        <p className="text-[10px] font-mono leading-relaxed text-ghost/70">
                          {skill.useCase}
                        </p>
                      </div>
                      <div className="mt-4 h-[1px] w-full bg-electric/20 shrink-0" />
                      <span className="mt-4 block text-[9px] font-mono uppercase tracking-[0.2em] text-electric/60 shrink-0">Click for Deep Dive</span>
                    </div>
                  }
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Expanded View Modal (Skills & Experience) */}
      <AnimatePresence>
        {(selectedSkill || selectedItem) && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setSelectedSkill(null); setSelectedItem(null); }}
              className="absolute inset-0 bg-obsidian/95 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-onyx border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
              data-lenis-prevent="true"
            >
              <div className="p-8 md:p-12 space-y-8">
                <div className="flex justify-between items-start">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-electric/10 flex items-center justify-center">
                        {selectedSkill ? <Activity className="w-6 h-6 text-electric" /> : <Briefcase className="w-6 h-6 text-electric" />}
                      </div>
                      <span className="text-sm font-mono text-electric uppercase tracking-widest">
                        {selectedSkill ? selectedSkill.level : selectedItem?.subtitle}
                      </span>
                    </div>
                    <h3 className="text-5xl md:text-6xl font-black uppercase tracking-tighter">
                      {selectedSkill ? selectedSkill.name : selectedItem?.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => { setSelectedSkill(null); setSelectedItem(null); }}
                    className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-8">
                  {selectedSkill && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {selectedSkill.metrics?.map((m: any, i: number) => (
                          <div key={i} className="p-4 bg-white/[0.03] border border-white/10 rounded-2xl space-y-1">
                            <span className="text-[8px] font-mono text-ghost/40 uppercase tracking-widest">{m.label}</span>
                            <span className={`block text-lg font-black font-mono ${m.color}`}>{m.value}</span>
                          </div>
                        ))}
                        <div className="p-4 bg-white/[0.03] border border-white/10 rounded-2xl space-y-1">
                          <span className="text-[8px] font-mono text-ghost/40 uppercase tracking-widest">Global_Status</span>
                          <span className="block text-sm font-bold uppercase text-emerald-400">{selectedSkill.status}</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-xs font-mono text-ghost/40 uppercase tracking-[0.3em]">Technical Application</h4>
                        <p className="text-ghost/80 text-lg md:text-2xl font-light leading-relaxed">
                          {selectedSkill.useCase}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-white/10">
                        {selectedSkill.examples?.map((ex: any, i: number) => (
                          <div key={i} className="space-y-3">
                            <h5 className="text-[11px] font-bold uppercase tracking-widest text-white">{ex.title}</h5>
                            <p className="text-[10px] leading-relaxed text-ghost/50 uppercase tracking-wide">
                              {ex.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedItem && (
                    <div className="space-y-8">
                      <div className="space-y-3">
                        <h4 className="text-xs font-mono text-ghost/40 uppercase tracking-[0.3em]">The Experience</h4>
                        <p className="text-ghost/80 text-lg md:text-2xl font-light leading-relaxed">
                          {selectedItem.details}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
