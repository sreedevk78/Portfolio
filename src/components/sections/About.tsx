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

  const galleryRotateX = useTransform(mouseY, [-1, 1], [2, -2]);
  const galleryRotateY = useTransform(mouseX, [-1, 1], [-2, 2]);
  const copyY = useTransform(progress, [0, 0.5, 1], [80, 0, -40]);
  const copyOpacity = useTransform(progress, [0, 0.32, 0.85, 1], [0.2, 1, 1, 0.45]);
  const photo1X = useTransform(mouseX, [-1, 1], [-20, 20]);
  const photo2X = useTransform(mouseX, [-1, 1], [10, -10]);
  const photo3X = useTransform(mouseX, [-1, 1], [30, -30]);

  return (
    <section className="relative w-full h-screen flex items-center justify-center py-20 md:py-32 px-6 md:px-8 overflow-hidden stage-3d">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        <motion.div 
          style={{ rotateX: galleryRotateX, rotateY: galleryRotateY }}
          className="relative h-[600px] hidden lg:flex items-center justify-center stage-3d"
        >
          <ParallaxLayer depth={1.2} progress={progress} yRange={[60, -70]} zRange={[80, 240]} className="absolute left-0 top-0 z-30">
            <motion.button
              type="button"
              aria-label={`Open ${profilePhotos[0].label}`}
              onClick={() => setActivePhoto(0)}
              style={{ z: 200, x: photo1X }}
              className="w-64 h-80 rounded-2xl overflow-hidden border border-white/10 shadow-2xl group bg-white/[0.03] text-left"
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
                <div className="absolute bottom-6 left-6 z-20 opacity-100">
                  <span className="block text-[10px] font-mono text-electric uppercase tracking-[0.28em]">Identity_01</span>
                  <span className="mt-1 block text-xl font-black uppercase tracking-tighter text-white">{profilePhotos[0].label}</span>
                </div>
              </SpotlightReveal>
            </motion.button>
          </ParallaxLayer>

          <ParallaxLayer depth={0.8} progress={progress} yRange={[30, -40]} zRange={[-60, 90]} className="absolute right-0 top-20 z-20">
            <motion.button
              type="button"
              aria-label={`Open ${profilePhotos[1].label}`}
              onClick={() => setActivePhoto(1)}
              style={{ x: photo2X }}
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

          <ParallaxLayer depth={0.55} progress={progress} yRange={[10, -20]} zRange={[-220, -60]} className="absolute left-20 bottom-0 z-10">
            <motion.button
              type="button"
              aria-label={`Open ${profilePhotos[2].label}`}
              onClick={() => setActivePhoto(2)}
              style={{ x: photo3X }}
              className="relative w-56 h-72 rounded-2xl overflow-hidden border border-white/10 shadow-2xl opacity-80 bg-white/[0.02] text-left hover:opacity-100"
            >
              <SpotlightReveal className="h-full w-full">
                <Image
                  src={profilePhotos[2].src}
                  alt={profilePhotos[2].alt}
                  fill
                  sizes="224px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ objectPosition: profilePhotos[2].objectPosition }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/86 via-obsidian/20 to-transparent z-10" />
                <div className="absolute bottom-5 left-5 z-20">
                  <span className="block text-[9px] font-mono text-electric uppercase tracking-[0.26em]">Identity_03</span>
                  <span className="mt-1 block text-lg font-black uppercase tracking-tighter text-white">{profilePhotos[2].label}</span>
                </div>
              </SpotlightReveal>
            </motion.button>
          </ParallaxLayer>
        </motion.div>

        <motion.div style={{ y: copyY, opacity: copyOpacity }} className="space-y-12 relative z-40">
          <div className="space-y-6">
            <VelocitySkew>
              <h2 className="text-5xl md:text-8xl font-black leading-none tracking-tighter uppercase">
                <KineticText text="THE ARCHITECT" />
              </h2>
            </VelocitySkew>
            <div className="grid grid-cols-3 gap-3 lg:hidden">
              {profilePhotos.map((photo, index) => (
                <button
                  key={photo.src}
                  type="button"
                  onClick={() => setActivePhoto(index)}
                  aria-label={`Open ${photo.label}`}
                  className="relative h-24 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="33vw"
                    className="object-cover"
                    style={{ objectPosition: photo.objectPosition }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 to-transparent" />
                </button>
              ))}
            </div>
            <p className="text-ghost/60 text-base md:text-2xl font-light leading-relaxed">
              I don&apos;t just build applications; I engineer <span className="text-white font-medium">immersive digital narratives</span>. My focus lies at the intersection of <span className="text-electric font-bold">Generative AI</span> and <span className="text-royal font-bold">Spatial Interaction</span>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 border-t border-white/10 pt-8 md:pt-12">
            <MagneticTarget strength={10} className="space-y-4 cursor-crosshair">
              <h4 className="text-electric font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                <span className="w-4 h-[1px] bg-electric" /> <TextDecrypt text="Philosophy" />
              </h4>
              <p className="text-ghost/50 text-xs md:text-sm leading-relaxed font-medium">
                Code is the new cinematography. Every interaction should feel like a choreographed scene, and every AI response should have the weight of a well-researched archive.
              </p>
            </MagneticTarget>
            <MagneticTarget strength={10} className="space-y-4 cursor-crosshair">
              <h4 className="text-royal font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                <span className="w-4 h-[1px] bg-royal" /> <TextDecrypt text="Objective" />
              </h4>
              <p className="text-ghost/50 text-xs md:text-sm leading-relaxed font-medium">
                Transforming the static web into a premium, interactive product experience that feels physically responsive to the human touch.
              </p>
            </MagneticTarget>
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
