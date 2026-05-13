"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { scenes } from "@/lib/scenes";
import { useActiveScene } from "@/components/motion/useActiveScene";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const activeSection = useActiveScene();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-[60] hidden sm:flex flex-col items-center gap-4 pointer-events-none">
      <span className="text-[8px] font-bold uppercase tracking-widest text-ghost/35 vertical-text">
        {scenes[activeSection]?.name ?? scenes[0].name}
      </span>
      <div className="w-[1px] h-32 bg-white/10 relative">
        <motion.div
          className="absolute top-0 left-0 w-full bg-electric origin-top"
          style={{ scaleY }}
        />
      </div>
      <span className="text-[8px] font-bold uppercase tracking-widest text-ghost/25 vertical-text">
        {String(activeSection + 1).padStart(2, "0")} / {String(scenes.length).padStart(2, "0")}
      </span>
    </div>
  );
}
