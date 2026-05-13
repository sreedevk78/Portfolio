"use client";

import { motion } from "framer-motion";
import { Download, Terminal, Wifi, Battery, Activity } from "lucide-react";
import { useActiveScene } from "@/components/motion/useActiveScene";
import { scenes } from "@/lib/scenes";

export default function StatusBar() {
  const activeIndex = useActiveScene();
  const currentScene = scenes[activeIndex];

  return (
    <div className="fixed top-0 inset-x-0 z-[60] pointer-events-none">
      <div className="max-w-[1800px] mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-electric animate-pulse" />
            <span className="text-[10px] font-mono text-electric uppercase tracking-[0.3em]">System_Online</span>
          </div>
          <div className="hidden lg:flex items-center gap-4 text-[9px] font-mono text-ghost/20 uppercase tracking-widest">
            <span className="flex items-center gap-1.5"><Wifi className="w-3 h-3" /> Link_Stable</span>
            <span className="flex items-center gap-1.5"><Battery className="w-3 h-3" /> Power_Optimal</span>
          </div>
        </div>

        <div className="flex items-center gap-8 pointer-events-auto">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[8px] font-mono text-ghost/30 uppercase tracking-[0.4em]">Current_Node</span>
            <span className="text-[11px] font-black text-white uppercase tracking-tighter">{currentScene?.name}</span>
          </div>
          
          <a
            href="/resume.pdf"
            download
            className="flex items-center gap-3 px-5 py-2.5 bg-white/[0.03] border border-white/10 rounded-full hover:bg-white hover:text-obsidian transition-all group"
          >
            <Download className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
            <span className="text-[10px] font-mono uppercase tracking-widest">Download_CV</span>
          </a>
        </div>
      </div>
    </div>
  );
}
