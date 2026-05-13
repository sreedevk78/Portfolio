"use client";

import { Download, Wifi, Battery } from "lucide-react";

export default function StatusBar() {
  return (
    <div className="fixed top-20 left-0 right-0 z-[150] pointer-events-none md:top-24">
      <div className="max-w-[1800px] mx-auto px-6 py-2 md:px-8 md:py-2.5 flex items-center justify-between">
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

        <div className="pointer-events-auto">
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
