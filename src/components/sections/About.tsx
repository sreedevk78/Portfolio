"use client";

import { motion, useTransform } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { useSpatial } from "@/components/SpatialStage";
import { useSceneProgress } from "@/components/SceneContainer";
import KineticText from "@/components/motion/KineticText";
import MagneticTarget from "@/components/motion/MagneticTarget";
import ParallaxLayer from "@/components/motion/ParallaxLayer";
import PhotoLightbox, { type ProfilePhoto } from "@/components/motion/PhotoLightbox";
import SpotlightReveal from "@/components/motion/SpotlightReveal";
import TextDecrypt from "@/components/motion/TextDecrypt";
import VelocitySkew from "@/components/motion/VelocitySkew";

const profilePhotos: ProfilePhoto[] = [
  {
    src: "/profile/photo-1.jpeg",
    alt: "Sreedev Krishna in a black shirt leaning beside a cannon among plants.",
    label: "Present Signal",
    objectPosition: "48% 34%",
  },
  {
    src: "/profile/photo-3.jpeg",
    alt: "Sreedev Krishna in a patterned shirt looking to the side.",
    label: "Composed Frame",
    objectPosition: "50% 30%",
  },
  {
    src: "/profile/photo-2.jpeg",
    alt: "Childhood photo of Sreedev Krishna in a red vest.",
    label: "Origin Memory",
    objectPosition: "50% 28%",
  },
];

export default function About() {
  const { mouseX, mouseY } = useSpatial();
  const { progress } = useSceneProgress();
  const [activePhoto, setActivePhoto] = useState<number | null>(null);

  const galleryRotateX = useTransform(mouseY, [-1, 1], [1, -1]);
  const galleryRotateY = useTransform(mouseX, [-1, 1], [-1, 1]);
  const copyY = useTransform(progress, [0, 0.45, 1], [0, 0, 0]); // Stabilize text
  
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center py-24 md:py-48 px-6 md:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
        <motion.div 
          style={{ rotateX: galleryRotateX, rotateY: galleryRotateY }}
          className="relative h-[500px] md:h-[600px] hidden lg:flex items-center justify-center stage-3d"
        >
          {/* Photos stabilized with less aggressive parallax */}
          <ParallaxLayer depth={0.6} progress={progress} yRange={[20, -20]} className="absolute left-0 top-0 z-30">
            <motion.button
              type="button"
              onClick={() => setActivePhoto(0)}
              className="w-64 h-80 rounded-2xl overflow-hidden border border-white/10 shadow-2xl group bg-white/[0.03] text-left relative"
            >
              <SpotlightReveal className="h-full w-full">
                <Image
                  src={profilePhotos[0].src}
                  alt={profilePhotos[0].alt}
                  fill
                  sizes="256px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ objectPosition: profilePhotos[0].objectPosition }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-obsidian/10 to-transparent z-10" />
                <div className="absolute bottom-6 left-6 z-20">
                  <span className="block text-[10px] font-mono text-electric uppercase tracking-[0.28em]">Identity_01</span>
                  <span className="mt-1 block text-xl font-black uppercase tracking-tighter text-white">{profilePhotos[0].label}</span>
                </div>
              </SpotlightReveal>
            </motion.button>
          </ParallaxLayer>

          <ParallaxLayer depth={0.4} progress={progress} yRange={[10, -10]} className="absolute right-0 top-20 z-20">
            <motion.button
              type="button"
              onClick={() => setActivePhoto(1)}
              className="relative w-72 h-96 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-white/[0.025] text-left"
            >
              <SpotlightReveal className="h-full w-full" glowColor="rgba(139,92,246,0.18)">
                <Image
                  src={profilePhotos[1].src}
                  alt={profilePhotos[1].alt}
                  fill
                  sizes="288px"
                  className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                  style={{ objectPosition: profilePhotos[1].objectPosition }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/82 via-obsidian/12 to-transparent z-10" />
                <div className="absolute bottom-6 left-6 z-20">
                  <span className="block text-[10px] font-mono text-royal uppercase tracking-[0.28em]">Identity_02</span>
                  <span className="mt-1 block text-xl font-black uppercase tracking-tighter text-white">{profilePhotos[1].label}</span>
                </div>
              </SpotlightReveal>
            </motion.button>
          </ParallaxLayer>
        </motion.div>

        <div className="space-y-12 relative z-40">
          <div className="space-y-6">
            <h2 className="text-5xl md:text-8xl font-black leading-none tracking-tighter uppercase">
              <KineticText text="THE ARCHITECT" />
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar lg:hidden -mx-6 px-6" data-lenis-prevent="true">
              {profilePhotos.map((photo, index) => (
                <button
                  key={photo.src}
                  type="button"
                  onClick={() => setActivePhoto(index)}
                  aria-label={`Open ${photo.label}`}
                  className="relative flex-shrink-0 w-[70vw] aspect-[3/4] overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] group"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="70vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{ objectPosition: photo.objectPosition }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-6 left-6 text-left">
                    <span className="block text-[8px] font-mono text-electric uppercase tracking-[0.2em] mb-1">Identity_0{index + 1}</span>
                    <span className="block text-lg font-black uppercase tracking-tighter text-white">{photo.label}</span>
                  </div>
                </button>
              ))}
            </div>
            <p className="text-ghost/60 text-base md:text-2xl font-light leading-relaxed">
              I am a <span className="text-white font-medium">Computer Science student at VIT Vellore</span> dedicated to engineering <span className="text-electric font-bold">AI-Native Systems</span> and <span className="text-royal font-bold">Spatial Interactions</span>. With a background in full-stack development and a proven track record in high-stakes hackathons, I bridge the gap between technical architecture and cinematic user experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 border-t border-white/10 pt-8 md:pt-12">
            <div className="space-y-4">
              <h4 className="text-electric font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                <span className="w-4 h-[1px] bg-electric" /> Leadership
              </h4>
              <p className="text-ghost/50 text-xs md:text-sm leading-relaxed font-medium">
                Organized <span className="text-white">Riviera & Thanima &apos;25</span> logistics, managing India&apos;s largest international sports and cultural festivals. Coordinated large-scale teams to ensure seamless event execution.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-royal font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                <span className="w-4 h-[1px] bg-royal" /> Communication
              </h4>
              <p className="text-ghost/50 text-xs md:text-sm leading-relaxed font-medium">
                Award-winning speaker at <span className="text-white">VIT Toastmasters</span>. Honed persuasive leadership and impromptu speaking, consistently winning the &apos;Audience Poll&apos; for technical and narrative delivery.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute -z-10 top-1/2 right-0 -translate-y-1/2 w-[520px] h-[520px] bg-[radial-gradient(circle,rgba(59,130,246,0.08),transparent_64%)] stage-3d" />
      <PhotoLightbox
        photos={profilePhotos}
        activeIndex={activePhoto}
        onClose={() => setActivePhoto(null)}
        onNavigate={setActivePhoto}
      />
    </section>
  );
}
