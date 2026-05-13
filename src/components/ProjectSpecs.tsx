"use client";

import { motion } from "framer-motion";
import { Cpu, Database, Activity, GitBranch, Terminal, type LucideIcon } from "lucide-react";

interface SpecProps {
  projectId: number;
}

const projectData: Record<number, {
  logicIndex: number;
  dataFlow: string;
  metrics: { label: string; value: string; color: string }[];
  deepDive: { icon: LucideIcon; title: string; desc: string }[];
}> = {
  1: {
    logicIndex: 94,
    dataFlow: "Input -> Vector_Embed -> RAG_Inject -> LLM -> Output",
    metrics: [
      { label: "Sync_Latency", value: "< 200ms", color: "text-electric" },
      { label: "Context_Window", value: "128k Tokens", color: "text-royal" },
      { label: "Vector_Dim", value: "1536 (OpenAI)", color: "text-emerald-400" }
    ],
    deepDive: [
      { icon: Database, title: "Prisma Orchestration", desc: "Complex relational mapping for nested world lore and character relationships." },
      { icon: GitBranch, title: "Context Injection", desc: "Dynamic prompt engineering that merges real-time lore with user input." }
    ]
  },
  2: {
    logicIndex: 88,
    dataFlow: "User_Action -> Carbon_Engine -> AI_Inference -> Game_State",
    metrics: [
      { label: "Inference_Speed", value: "85 Tokens/s", color: "text-electric" },
      { label: "State_Depth", value: "Complex_O(n)", color: "text-royal" },
      { label: "Mobile_Perf", value: "60 FPS", color: "text-emerald-400" }
    ],
    deepDive: [
      { icon: Cpu, title: "Groq LLaMA 3", desc: "Ultra-low latency AI inference for real-time sustainability coaching." },
      { icon: Activity, title: "Logic Engine", desc: "Custom algorithms translating environmental impact into RPG combat stats." }
    ]
  },
  3: {
    logicIndex: 91,
    dataFlow: "Socket_Event -> Geofence_Check -> State_Broadcast -> UI",
    metrics: [
      { label: "Socket_RTT", value: "~45ms", color: "text-electric" },
      { label: "Map_Density", value: "High_Cluster", color: "text-royal" },
      { label: "Concurrency", value: "500+ Peers", color: "text-emerald-400" }
    ],
    deepDive: [
      { icon: Terminal, title: "Event-Driven", desc: "Zero-latency state synchronization using specialized Socket.io rooms." },
      { icon: Database, title: "Spatial Indexing", desc: "Mapbox GL JS implementation for real-time technician geofencing." }
    ]
  }
};

export default function ProjectSpecs({ projectId }: SpecProps) {
  const data = projectData[projectId];
  if (!data) return null;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.metrics.map((m, i) => (
          <div key={i} className="p-4 bg-white/[0.03] border border-white/10 rounded-2xl space-y-1">
            <span className="text-[8px] font-mono text-ghost/40 uppercase tracking-widest">{m.label}</span>
            <span className={`block text-lg font-black font-mono ${m.color}`}>{m.value}</span>
          </div>
        ))}
      </div>

      <div className="p-6 bg-white/[0.03] border border-white/10 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/60">Logic_Pipeline_Sequence</h4>
          <span className="text-[10px] font-mono text-electric">INDEX: {data.logicIndex}%</span>
        </div>
        <div className="relative h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${data.logicIndex}%` }}
            transition={{ duration: 1.5, ease: "circOut" }}
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-electric to-royal" 
          />
        </div>
        <p className="text-[9px] font-mono text-ghost/30 uppercase tracking-[0.2em]">{data.dataFlow}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.deepDive.map((item, i) => (
          <div key={i} className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                <item.icon className="w-4 h-4 text-electric" />
              </div>
              <h5 className="text-[11px] font-bold uppercase tracking-widest text-white">{item.title}</h5>
            </div>
            <p className="text-[10px] leading-relaxed text-ghost/50 uppercase tracking-wide">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
