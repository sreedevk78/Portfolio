"use client";

import { motion, useTransform } from "framer-motion";
import { useSpatial } from "@/components/SpatialStage";
import { Mail, Code2, ExternalLink, Link as LinkIcon, SendHorizontal as SendIcon, Shield, Zap } from "lucide-react";
import { useState } from "react";
import { useSceneProgress } from "@/components/SceneContainer";
import KineticText from "@/components/motion/KineticText";
import MagneticTarget from "@/components/motion/MagneticTarget";
import ParallaxLayer from "@/components/motion/ParallaxLayer";
import SpotlightReveal from "@/components/motion/SpotlightReveal";

const contactMethods = [
  {
    label: "Direct Interface",
    value: "sreedevkrishna758@gmail.com",
    href: "mailto:sreedevkrishna758@gmail.com",
    icon: Mail,
    color: "text-electric",
    external: false,
  },
  {
    label: "Neural Network",
    value: "LinkedIn / sreedev-krishna",
    href: "https://www.linkedin.com/in/sreedev-krishna-5966523b6/",
    icon: LinkIcon,
    color: "text-royal",
    external: true,
  },
  {
    label: "Logic Archive",
    value: "GitHub / sreedevk78",
    href: "https://github.com/sreedevk78",
    icon: Code2,
    color: "text-ghost",
    external: true,
  },
];

export default function Contact() {
  const { mouseX, mouseY } = useSpatial();
  const { progress } = useSceneProgress();
  const [message, setMessage] = useState("");

  const rotateX = useTransform(mouseY, [-1, 1], [1, -1]);
  const rotateY = useTransform(mouseX, [-1, 1], [-1, 1]);
  const headerY = useTransform(progress, [0, 0.45, 1], [80, 0, -80]);
  const gridZ = useTransform(progress, [0, 0.45, 1], [-220, 40, 160]);
  const ambientOpacity = useTransform(progress, [0, 0.42, 0.9, 1], [0.08, 0.36, 0.24, 0.08]);

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center py-10 md:py-16 px-6 md:px-8 overflow-hidden stage-3d">
      <ParallaxLayer depth={0.9} progress={progress} yRange={[48, -70]} zRange={[-300, -80]} className="absolute inset-0 pointer-events-none">
        <motion.div style={{ opacity: ambientOpacity }} className="absolute left-1/2 top-1/2 h-[64vmin] w-[64vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-electric/15" />
        <motion.div style={{ opacity: ambientOpacity }} className="absolute inset-x-[12%] top-[22%] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </ParallaxLayer>
      <div className="max-w-5xl mx-auto w-full space-y-5 md:space-y-10 text-center relative z-10 -translate-y-24 md:-translate-y-32">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "circOut" }}
          style={{ y: headerY }}
          className="space-y-4 md:space-y-6"
        >
          <div className="flex items-center justify-center gap-4 text-electric font-mono text-[10px] tracking-[0.6em] uppercase">
            <span className="w-12 h-[1px] bg-electric/30" />
            Establish_Neural_Link
            <span className="w-12 h-[1px] bg-electric/30" />
          </div>
          <h2 className="text-3xl md:text-[7.5rem] font-black leading-[0.82] tracking-tighter uppercase">
            <KineticText text="SAY HELLO" />
          </h2>
        </motion.div>

        <motion.div 
          style={{ rotateX, rotateY, z: gridZ }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 stage-3d text-left"
        >
          <div className="space-y-3 md:space-y-4">
            <div className="hidden md:block space-y-2 mb-4 md:mb-8">
               <h4 className="text-ghost/20 font-mono text-[10px] uppercase tracking-[0.5em]">Network_Endpoints</h4>
               <div className="h-[1px] w-full bg-white/5" />
            </div>
            
            {contactMethods.map((method) => (
              <a
                key={method.href}
                href={method.href}
                target={method.external ? "_blank" : undefined}
                rel={method.external ? "noreferrer" : undefined}
                className="block cursor-pointer outline-none relative z-50 pointer-events-auto"
              >
                <MagneticTarget strength={12} className="rounded-2xl">
                  <SpotlightReveal className="rounded-2xl">
                    <motion.div
                      whileHover={{ x: 16, z: 100, backgroundColor: "rgba(255,255,255,0.05)" }}
                      className="relative z-20 flex items-center gap-3 md:gap-4 p-3 md:p-5 border border-white/10 rounded-2xl transition-all group bg-white/[0.035] hover:border-electric/45 stage-3d"
                    >
                      <div className="w-10 h-10 md:w-14 md:h-14 flex-shrink-0 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-center group-hover:border-electric/50 transition-all">
                        <method.icon className={`w-5 h-5 md:w-6 md:h-6 ${method.color} group-hover:scale-110 transition-transform`} />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[8px] md:text-[10px] font-mono text-ghost/25 uppercase tracking-[0.24em] md:tracking-[0.3em] block mb-1">{method.label}</span>
                        <span className="text-sm md:text-lg font-black text-ghost/80 group-hover:text-white normal-case tracking-tight break-words leading-snug">{method.value}</span>
                      </div>
                      {method.external && <ExternalLink className="ml-auto w-4 h-4 text-ghost/25 group-hover:text-electric transition-colors" />}
                    </motion.div>
                  </SpotlightReveal>
                </MagneticTarget>
              </a>
            ))}
          </div>

          <div className="relative group stage-3d hidden md:block">
            <div className="absolute -inset-1 bg-gradient-to-r from-electric/15 to-royal/15 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative p-6 md:p-8 bg-white/[0.035] border border-white/10 rounded-2xl space-y-6 h-full">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                   <Shield className="w-4 h-4 text-electric/40" />
                   <span className="text-[10px] font-mono text-electric uppercase tracking-widest">Protocol: Encrypted_Session</span>
                </div>
                <div className="flex gap-1">
                   {[...Array(3)].map((_, i) => <div key={i} className="w-1 h-1 rounded-full bg-electric animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />)}
                </div>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                   <label htmlFor="inquiry-payload" className="text-[9px] font-mono text-ghost/40 uppercase tracking-widest ml-4">Message</label>
                   <div className="relative h-40 md:h-52">
                      <textarea
                        id="inquiry-payload"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="> Type your message here..."
                        className="w-full h-full bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 font-mono text-sm text-ghost focus:border-electric/50 focus:outline-none focus:ring-1 focus:ring-electric/50 transition-colors resize-none custom-scrollbar pointer-events-auto relative z-50 placeholder:text-ghost/30 placeholder:animate-pulse"
                      />
                      <motion.div 
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="absolute bottom-8 right-8 w-3 h-3 bg-electric/50 blur-sm rounded-full pointer-events-none"
                      />
                   </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=sreedevkrishna758@gmail.com&su=Contact+Inquiry&body=${encodeURIComponent(message)}`, '_blank');
                  }}
                  className="w-full py-5 bg-ghost text-obsidian font-black uppercase tracking-[0.35em] rounded-2xl hover:bg-electric hover:text-white transition-all duration-500 flex items-center justify-center gap-4 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric/70 focus-visible:ring-offset-4 focus-visible:ring-offset-obsidian relative z-50 pointer-events-auto"
                >
                  <span className="text-xs">Send Mail</span>
                  <SendIcon className="w-5 h-5 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                </button>
              </div>

              <div className="pt-4 flex justify-center gap-8 opacity-20 group-hover:opacity-40 transition-opacity">
                 <Zap className="w-4 h-4" />
                 <span className="text-[8px] font-mono uppercase tracking-[0.5em]">Synchronizing...</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Spatial Metadata */}
      <div className="absolute bottom-16 left-16 flex flex-col gap-3 opacity-10 font-mono text-[9px] uppercase tracking-[0.5em]">
        <div className="flex items-center gap-4">
           <span className="w-8 h-[1px] bg-white" />
           <span>Lat: 10.8505 | Long: 76.2711</span>
        </div>
        <div className="flex items-center gap-4">
           <span className="w-8 h-[1px] bg-white" />
           <span>Environment: v4.0.2_Spatial_Live</span>
        </div>
      </div>
      
      <div className="absolute bottom-16 right-16 opacity-10 font-mono text-[9px] uppercase tracking-[1em]">
        [SREEDEV_KRISHNA_(c)_2026]
      </div>
    </section>
  );
}
