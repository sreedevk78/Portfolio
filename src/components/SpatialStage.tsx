"use client";

import { motion, MotionValue, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { createContext, useContext, useEffect } from "react";
import { SCENE_DEPTH, sceneCount } from "@/lib/scenes";

type SpatialContextValue = {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  scrollProgress: MotionValue<number>;
  cameraZ: MotionValue<number>;
};

const SpatialContext = createContext<SpatialContextValue | null>(null);

export const useSpatial = () => {
  const context = useContext(SpatialContext);

  if (!context) {
    throw new Error("useSpatial must be used inside SpatialStage");
  }

  return context;
};

export default function SpatialStage({ children, overlay }: { children: React.ReactNode; overlay?: React.ReactNode }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll();

  const cameraZRaw = useTransform(scrollYProgress, [0, 1], [0, SCENE_DEPTH * (sceneCount - 1)]);
  const cameraZ = useSpring(cameraZRaw, { stiffness: 74, damping: 28, mass: 0.9 });
  const cameraRotateX = useTransform(scrollYProgress, [0, 1], [0, 1.2]);

  useEffect(() => {
    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    
    if (isMobile) {
      let rafId = 0;
      const pan = () => {
        const time = Date.now() / 3000;
        mouseX.set(Math.sin(time) * 0.4);
        mouseY.set(Math.cos(time * 0.7) * 0.4);
        rafId = requestAnimationFrame(pan);
      };
      rafId = requestAnimationFrame(pan);
      return () => cancelAnimationFrame(rafId);
    }

    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const mouseRotateX = useTransform(springY, [-1, 1], [1.5, -1.5]);
  const mouseRotateY = useTransform(springX, [-1, 1], [-1.5, 1.5]);
  const unifiedRotateX = useTransform(
    [mouseRotateX, cameraRotateX],
    ([mouseRotation, cameraRotation]: number[]) => mouseRotation + cameraRotation
  );

  return (
    <SpatialContext.Provider value={{ mouseX: springX, mouseY: springY, scrollProgress: scrollYProgress, cameraZ }}>
      <main
        className="fixed inset-0 w-full h-screen overflow-hidden bg-[#050505] cinematic-grain pointer-events-none"
        style={{ perspective: "clamp(800px, 120vw, 1400px)" }}
      >
        <motion.div
          style={{ transformStyle: "preserve-3d" }}
          className="absolute inset-0 pointer-events-none"
        >
          <motion.div
            style={{
              rotateX: reduceMotion ? 0 : unifiedRotateX,
              rotateY: reduceMotion ? 0 : mouseRotateY,
              z: cameraZ,
              transformStyle: "preserve-3d",
            }}
            className="w-full h-full relative"
          >
            {children}
          </motion.div>
        </motion.div>

        <div className="fixed inset-0 pointer-events-none z-[100]">
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20" />
          <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.3)]" />
          {overlay}
        </div>

        <div className="fixed inset-0 z-50 pointer-events-none">
          <div className="absolute top-4 left-4 text-[8px] font-mono text-electric/30">
            SPATIAL_ENGINE_V6
          </div>
        </div>
      </main>
    </SpatialContext.Provider>
  );
}
