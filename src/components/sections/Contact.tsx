"use client";

import { motion, useTransform } from "framer-motion";
import { useSpatial } from "@/components/SpatialStage";
import { Mail, Code2, ExternalLink, Link as LinkIcon, SendHorizontal as SendIcon, Shield } from "lucide-react";
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
  const headerY = useTransform(progress, [0, 0.45, 1], [30, 0, -30]);
  const gridZ = useTransform(progress, [0, 0.45, 1], [-120, 0, 80]);
  const ambientOpacity = useTransform(progress, [0, 0.42, 0.9, 1], [0.08, 0.3, 0.2, 0.08]);

  return (
    <section className="relative w-full min-h-screen lg:h-screen flex flex-col items-center justify-center py-20 px-6 md:px-8 overflow-hidden stage-3d">
      <ParallaxLayer depth={0.9} progress={progress} yRange={[20, -20]} zRange={[-150, -40]} className="absolute inset-0 pointer-events-none">
        <motion.div style={{ opacity: ambientOpacity }} className="absolute left-1/2 top-1/2 h-[64vmin] w-[64vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-electric/10" />
      </ParallaxLayer>

      <div className="max-w-6xl mx-auto w-full space-y-12 md:space-y-20 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ y: headerY }}
          className="space-y-4"
        >
          <div className="flex items-center justify-center gap-4 text-electric font-mono text-[9px] tracking-[0.5em] uppercase">
            <span className="w-8 h-[1px] bg-electric/20" />
            Connect_Archive
            <span className="w-8 h-[1px] bg-electric/20" />
          </div>
          <h2 className="text-4xl md:text-[7.5rem] font-black leading-[0.82] tracking-tighter uppercase">
            <KineticText text="SAY HELLO" />
          </h2>
        </motion.div>

        <motion.div 
          style={{ rotateX, rotateY, z: gridZ }}
          className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 md:gap-16 stage-3d text-left"
        >
          <div className="space-y-4">
            {contactMethods.map((method) => (
              <a
                key={method.href}
                href={method.href}
                target={method.external ? "_blank" : undefined}
                rel={method.external ? "noreferrer" : undefined}
                className="block cursor-pointer outline-none relative z-50 pointer-events-auto"
              >
                <MagneticTarget strength={10} className="rounded-2xl">
                  <SpotlightReveal className="rounded-2xl">
                    <motion.div
                      whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.05)" }}
                      className="relative z-20 flex items-center gap-4 p-5 md:p-7 border border-white/10 rounded-2xl transition-all group bg-white/[0.025] hover:border-electric/40 stage-3d"
                    >
                      <div className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-center group-hover:border-electric/50 transition-all">
                        <method.icon className={`w-5 h-5 md:w-7 md:h-7 ${method.color} group-hover:scale-110 transition-transform`} />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[9px] font-mono text-ghost/20 uppercase tracking-[0.3em] block mb-1">{method.label}</span>
                        <span className="text-sm md:text-xl font-black text-ghost/80 group-hover:text-white normal-case tracking-tight break-words leading-none">{method.value}</span>
                      </div>
                      {method.external && <ExternalLink className="ml-auto w-4 h-4 text-ghost/20 group-hover:text-electric transition-colors" />}
                    </motion.div>
                  </SpotlightReveal>
                </MagneticTarget>
              </a>
            ))}
          </div>

          <div className="relative group stage-3d">
            <div className="relative p-8 md:p-10 bg-white/[0.025] border border-white/10 rounded-3xl space-y-6 h-full flex flex-col">
              <div className="flex justify-between items-center shrink-0">
                <div className="flex items-center gap-3">
                   <Shield className="w-4 h-4 text-electric/40" />
                   <span className="text-[10px] font-mono text-electric/60 uppercase tracking-widest">Protocol: Secure_Inquiry</span>
                </div>
                <div className="flex gap-1.5">
                   {[...Array(3)].map((_, i) => <div key={i} className="w-1 h-1 rounded-full bg-electric/40 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />)}
                </div>
              </div>

              <div className="flex-1 flex flex-col space-y-5">
                 <textarea
                   id="inquiry-payload"
                   value={message}
                   onChange={(e) => setMessage(e.target.value)}
                   placeholder="> Initialize message payload..."
                   className="w-full flex-1 bg-white/[0.02] border border-white/5 rounded-2xl p-8 font-mono text-sm text-ghost focus:border-electric/40 focus:outline-none focus:ring-0 transition-colors resize-none custom-scrollbar pointer-events-auto relative z-50 placeholder:text-ghost/20"
                 />

                <button
                  type="button"
                  onClick={() => {
                    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=sreedevkrishna758@gmail.com&su=Contact+Inquiry&body=${encodeURIComponent(message)}`, '_blank');
                  }}
                  className="w-full py-6 bg-ghost text-obsidian font-black uppercase tracking-[0.45em] rounded-2xl hover:bg-electric hover:text-white transition-all duration-500 flex items-center justify-center gap-4 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric/70 focus-visible:ring-offset-4 focus-visible:ring-offset-obsidian relative z-50 pointer-events-auto"
                >
                  <span className="text-xs">Send Mail</span>
                  <SendIcon className="w-5 h-5 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-12 left-12 hidden md:flex flex-col gap-2 opacity-10 font-mono text-[8px] uppercase tracking-[0.4em] pointer-events-none">
         <span>Lat: 10.8505 | Long: 76.2711</span>
         <span>Environment: v4.0.2_Live</span>
      </div>
      
      <div className="absolute bottom-12 right-12 hidden md:block opacity-10 font-mono text-[8px] uppercase tracking-[0.6em] pointer-events-none">
        [SREEDEV_KRISHNA_(c)_2026]
      </div>
    </section>
  );
}
