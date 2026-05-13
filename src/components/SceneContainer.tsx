"use client";

import { createContext, useContext } from "react";
import { motion, type MotionValue, useTransform } from "framer-motion";
import { useSpatial } from "@/components/SpatialStage";
import { getSceneById, getSceneIndexFromProgress, getSceneProgress, SCENE_DEPTH, sceneCount, type SceneId } from "@/lib/scenes";
import useIsMobile from "@/lib/useIsMobile";

type SceneContextValue = {
  sceneId: SceneId;
  sceneIndex: number;
  progress: MotionValue<number>;
};

const SceneContext = createContext<SceneContextValue | null>(null);

export function useSceneProgress() {
  const context = useContext(SceneContext);

  if (!context) {
    throw new Error("useSceneProgress must be used inside SceneContainer");
  }

  return context;
}

export default function SceneContainer({ children, sceneId }: { children: React.ReactNode; sceneId: SceneId }) {
  const { scrollProgress, cameraZ } = useSpatial();
  const scene = getSceneById(sceneId);
  const isMobile = useIsMobile();
  const z = -scene.index * SCENE_DEPTH;
  const center = getSceneProgress(scene.index);
  const segment = sceneCount > 1 ? 1 / (sceneCount - 1) : 1;
  const localProgress = useTransform(
    scrollProgress,
    [Math.max(0, center - segment), center, Math.min(1, center + segment)],
    [0, 0.5, 1]
  );
  const distance = useTransform(cameraZ, (val) => Math.abs(val + z));

  const opacity = useTransform(
    distance, 
    isMobile ? [0, 450, 800, 1000] : [0, 300, 560, 760], 
    [1, 0.98, 0.05, 0]
  );
  const scale = useTransform(
    distance, 
    isMobile ? [0, 800, 1400] : [0, 760, 1200], 
    [1, 0.98, 0.92]
  );
  const sceneContrast = useTransform(distance, [0, 720], [0, 0.4]);
  const transitionGlow = useTransform(distance, [0, 240, 520, 760], [0.1, 0.16, 0.04, 0]);
  const pointerEvents = useTransform(scrollProgress, (p) => {
    if (!Number.isFinite(p)) return "none";
    return getSceneIndexFromProgress(p) === scene.index ? "auto" : "none";
  });

  return (
    <SceneContext.Provider value={{ sceneId, sceneIndex: scene.index, progress: localProgress }}>
      <motion.div
        data-scene={sceneId}
        style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        z: z,
        opacity,
        scale,
        pointerEvents,
        transformStyle: "preserve-3d"
      }}
      className="flex items-center justify-center"
    >
      <motion.div 
        style={{ opacity: sceneContrast }}
        className="absolute inset-0 bg-obsidian/45 pointer-events-none z-10"
      />
      <motion.div
        style={{ opacity: transitionGlow }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_52%,rgba(59,130,246,0.16),transparent_46%)] pointer-events-none z-10"
      />
      <div className="timeline-glow absolute inset-x-[12%] top-1/2 h-[1px] -translate-y-1/2 bg-gradient-to-r from-transparent via-electric/60 to-transparent opacity-0 pointer-events-none z-10" />
      
      <motion.div 
        className="w-full h-full relative z-20"
        style={{ transformStyle: isMobile ? "flat" : "preserve-3d" }}
      >
        {children}
      </motion.div>
    </motion.div>
    </SceneContext.Provider>
  );
}
