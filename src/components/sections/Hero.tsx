"use client";

import { motion, useTransform } from "framer-motion";
import { useSpatial } from "@/components/SpatialStage";
import NeuralNetwork from "@/components/NeuralNetwork";
import { useSmoothScroll } from "@/components/SmoothScroll";
import { useSceneProgress } from "@/components/SceneContainer";
import KineticText from "@/components/motion/KineticText";
import MagneticTarget from "@/components/motion/MagneticTarget";
import ParallaxLayer from "@/components/motion/ParallaxLayer";
import TextDecrypt from "@/components/motion/TextDecrypt";
import VelocitySkew from "@/components/motion/VelocitySkew";

export default function Hero() {
  const { mouseX, mouseY, scrollProgress } = useSpatial();
  const { progress } = useSceneProgress();
  const { scrollToScene } = useSmoothScroll();

  const rotateX = useTransform(mouseY, [-1, 1], [2.5, -2.5]);
  const rotateY = useTransform(mouseX, [-1, 1], [-2.5, 2.5]);
  const textZ = useTransform(progress, [0, 0.5, 1], [-120, 0, 360]);
  const opacity = useTransform(scrollProgress, [0, 0.18], [1, 0.08]);
  const foregroundScale = useTransform(progress, [0, 0.52, 1], [0.94, 1, 1.16]);
  const orbitOpacity = useTransform(progress, [0, 0.35, 1], [0.25, 0.7, 0.1]);
  const lightX = useTransform(mouseX, [-1, 1], [-500, 500]);
  const lightY = useTransform(mouseY, [-1, 1], [-500, 500]);
  
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden stage-3d">
      <NeuralNetwork />
      <ParallaxLayer
        depth={1.4}
        progress={progress}
        yRange={[50, -80]}
        zRange={[-240, 80]}
        className="absolute inset-0 pointer-events-none"
      >
        <motion.div
          style={{ opacity: orbitOpacity }}
          className="absolute left-1/2 top-1/2 h-[58vmin] w-[58vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-electric/15 shadow-[0_0_90px_rgba(59,130,246,0.12)]"
        />
        <div className="absolute left-[12%] top-[18%] h-24 w-24 rounded-[2rem] border border-white/10 bg-white/[0.025] rotate-12" />
        <div className="absolute right-[10%] bottom-[20%] h-32 w-20 rounded-full border border-royal/20 bg-royal/[0.035] -rotate-12" />
      </ParallaxLayer>

      <motion.div 
        style={{ rotateX, rotateY, z: textZ, opacity, scale: foregroundScale }}
        className="relative z-10 text-center space-y-8 stage-3d"
      >
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "circOut" }}
            className="flex items-center justify-center gap-4 text-electric font-mono text-[10px] tracking-[0.8em] uppercase"
          >
            <span className="w-12 h-[1px] bg-electric/30" />
            Computer Science @ VIT Vellore
            <span className="w-12 h-[1px] bg-electric/30" />
          </motion.div>
          
          <h1 className="text-[12vw] sm:text-8xl md:text-[14rem] font-black leading-[0.85] tracking-tighter uppercase text-sharp-glow">
            <VelocitySkew>
              <KineticText text={"SREEDEV\nKRISHNA"} lineClassName={(index) => index === 1 ? "text-edge-outline" : ""} />
            </VelocitySkew>
          </h1>
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-ghost/40 text-xl md:text-2xl font-light tracking-widest uppercase max-w-4xl mx-auto leading-relaxed"
        >
          <TextDecrypt text="Engineering the Future of" /> <br />
          <span className="text-white font-medium"><TextDecrypt text="AI-Native Systems & Fullstack Architecture" /></span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="pt-16 flex flex-col items-center gap-4"
        >
          <MagneticTarget strength={18}>
            <button
              type="button"
              onClick={() => scrollToScene(1)}
              className="group relative rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric/70 focus-visible:ring-offset-4 focus-visible:ring-offset-obsidian"
            >
              <div className="absolute -inset-4 bg-electric/15 opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
              <div className="relative inline-flex items-center gap-8 px-12 py-6 bg-white/[0.04] border border-white/10 rounded-full group-hover:border-electric/50 transition-all duration-500 cursor-pointer overflow-hidden">
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.28em] sm:tracking-[0.4em] text-ghost/60 group-hover:text-white">Explore Portfolio</span>
                <motion.div 
                  animate={{ x: [-20, 20], opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1 h-1 rounded-full bg-electric" 
                />
              </div>
            </button>
          </MagneticTarget>
          <span className="text-[9px] font-mono text-ghost/20 uppercase tracking-widest animate-pulse">Scroll to navigate Z-Space</span>
        </motion.div>
      </motion.div>

      <motion.div 
        style={{ 
          x: lightX,
          y: lightY
        }}
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_500px_at_center,rgba(59,130,246,0.05),transparent)] z-0"
      />
    </section>
  );
}
