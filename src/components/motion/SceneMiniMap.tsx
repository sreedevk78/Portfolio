"use client";

import { motion } from "framer-motion";
import { scenes } from "@/lib/scenes";
import { useSmoothScroll } from "@/components/SmoothScroll";
import { useActiveScene } from "@/components/motion/useActiveScene";

export default function SceneMiniMap() {
  const activeScene = useActiveScene();
  const { scrollToScene } = useSmoothScroll();

  return (
    <div className="fixed bottom-12 right-6 z-[150] hidden w-max flex-col items-end gap-4 pointer-events-auto md:flex">
      {scenes.map((scene) => {
        const isActive = activeScene === scene.index;

        return (
          <button
            key={scene.id}
            type="button"
            onClick={() => scrollToScene(scene.index)}
            aria-label={`Go to ${scene.name}`}
            aria-current={isActive ? "step" : undefined}
            className="group relative flex items-center justify-end"
          >
            <div className={`mr-4 px-3 py-1 rounded-sm border border-white/10 bg-obsidian/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 ${isActive ? "opacity-100 translate-x-0 border-electric/30" : ""}`}>
              <span className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-white whitespace-nowrap">
                {scene.name}
              </span>
            </div>
            
            <div className="relative flex items-center justify-center">
              {isActive && (
                <motion.div
                  layoutId="minimap-ring"
                  className="absolute inset-0 -m-1.5 border border-electric/40 rounded-full"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
              )}
              <span className={`h-2.5 w-2.5 rounded-full border-2 transition-all duration-500 ${
                isActive 
                  ? "border-electric bg-electric shadow-[0_0_15px_rgba(59,130,246,0.8)] scale-110" 
                  : "border-white/10 bg-white/5 group-hover:border-white/30"
              }`} />
            </div>
          </button>
        );
      })}
    </div>
  );
}
