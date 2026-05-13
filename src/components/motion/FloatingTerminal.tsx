"use client";

import { motion } from "framer-motion";
import { useSpatial } from "@/components/SpatialStage";
import { useEffect, useState } from "react";

export default function FloatingTerminal() {
  const { cameraZ, scrollProgress } = useSpatial();
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const messages = [
        "Initializing_Neural_Path...",
        "Querying_Logic_Archive...",
        "Synchronizing_Spatial_Stage...",
        "Relocating_Z_Coordinate...",
        "Calibrating_Identity_Node...",
      ];
      setLogs((prev) => [messages[Math.floor(Math.random() * messages.length)], ...prev].slice(0, 4));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-12 left-12 z-[60] hidden xl:flex flex-col gap-4 pointer-events-none">
      <div className="space-y-1">
        {logs.map((log, i) => (
          <motion.div
            key={`${log}-${i}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1 - i * 0.25, x: 0 }}
            className="text-[9px] font-mono text-electric/40 uppercase tracking-widest"
          >
            {`> ${log}`}
          </motion.div>
        ))}
      </div>
      <div className="pt-4 border-t border-white/5 space-y-1">
        <div className="flex justify-between gap-8">
          <span className="text-[8px] font-mono text-ghost/20 uppercase tracking-widest">Z_Space_POS</span>
          <motion.span className="text-[8px] font-mono text-white/40 uppercase tracking-widest">
            {cameraZ.get().toFixed(0)} units
          </motion.span>
        </div>
        <div className="flex justify-between gap-8">
          <span className="text-[8px] font-mono text-ghost/20 uppercase tracking-widest">Neural_Sync</span>
          <motion.span className="text-[8px] font-mono text-white/40 uppercase tracking-widest">
            {(scrollProgress.get() * 100).toFixed(1)}%
          </motion.span>
        </div>
      </div>
    </div>
  );
}
