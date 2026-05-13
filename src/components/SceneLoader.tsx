"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SceneLoader() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const completeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(100, prev + (Math.random() * 8 + 2));
        if (next >= 100) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          completeTimeoutRef.current = setTimeout(() => setIsComplete(true), 800);
          return 100;
        }
        return next;
      });
    }, 100);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (completeTimeoutRef.current) clearTimeout(completeTimeoutRef.current);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {!isComplete && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: -100,
            scale: 1.04,
            transition: { duration: 0.8, ease: [0.83, 0, 0.17, 1] } 
          }}
          className="fixed inset-0 z-[100] bg-obsidian flex flex-col items-center justify-center p-8 overflow-hidden"
        >
          {/* Subtle Scanline Effect */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
          
          <div className="relative z-10 flex flex-col items-center">
            {/* Branding */}
            <motion.div 
              initial={{ opacity: 0, letterSpacing: "1em" }}
              animate={{ opacity: 1, letterSpacing: "0.5em" }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="mb-12"
            >
              <h2 className="text-sm font-bold text-ghost/40 uppercase tracking-[1em]">
                SREEDEV KRISHNA
              </h2>
            </motion.div>

            {/* Main Percentage */}
            <div className="relative flex items-center justify-center">
              <motion.span 
                className="text-[25vw] font-black leading-none tracking-tighter italic text-white select-none mix-blend-difference"
                animate={{ 
                  textShadow: progress === 100 ? "0 0 50px rgba(0,243,255,0.5)" : "0 0 0px rgba(0,0,0,0)"
                }}
              >
                {Math.floor(progress).toString().padStart(3, "0")}
              </motion.span>
              
              {/* Floating Decorative Elements */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div 
                  className="w-[120%] h-[1px] bg-white/5"
                  animate={{ rotate: progress * 3.6 }}
                />
                <motion.div 
                  className="w-[120%] h-[1px] bg-white/5"
                  animate={{ rotate: -progress * 1.8 }}
                />
              </div>
            </div>

            {/* Status Text */}
            <div className="mt-12 overflow-hidden h-6">
              <motion.p 
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                className="text-[10px] font-mono text-electric/60 uppercase tracking-[0.3em]"
              >
                {progress < 30 ? "Synchronizing Neural Latency" : 
                 progress < 60 ? "Calibrating Cinematic Vectors" : 
                 progress < 100 ? "Finalizing Aesthetic Core" : "System Ready"}
              </motion.p>
            </div>
          </div>

          {/* Ambient Lighting */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_58%)] -z-10" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
