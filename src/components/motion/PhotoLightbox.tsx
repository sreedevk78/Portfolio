"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect } from "react";

export type ProfilePhoto = {
  src: string;
  alt: string;
  label: string;
  objectPosition: string;
};

type PhotoLightboxProps = {
  photos: ProfilePhoto[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export default function PhotoLightbox({ photos, activeIndex, onClose, onNavigate }: PhotoLightboxProps) {
  const activePhoto = activeIndex === null ? null : photos[activeIndex];

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft") {
        onNavigate((activeIndex - 1 + photos.length) % photos.length);
      }

      if (event.key === "ArrowRight") {
        onNavigate((activeIndex + 1) % photos.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, onClose, onNavigate, photos.length]);

  return (
    <AnimatePresence>
      {activePhoto && activeIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-obsidian/95 p-5 md:p-10"
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.label}
        >
          <button
            type="button"
            aria-label="Close photo viewer"
            onClick={onClose}
            className="absolute right-5 top-24 z-20 grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-ghost hover:border-electric/50 hover:text-electric md:top-6"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            type="button"
            aria-label="Previous photo"
            onClick={() => onNavigate((activeIndex - 1 + photos.length) % photos.length)}
            className="absolute left-5 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-ghost hover:border-electric/50 hover:text-electric md:grid"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <motion.div
            key={activePhoto.src}
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -18 }}
            transition={{ type: "spring", stiffness: 130, damping: 22 }}
            className="relative h-[78vh] w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025]"
          >
            <Image
              src={activePhoto.src}
              alt={activePhoto.alt}
              fill
              sizes="(min-width: 1024px) 960px, 100vw"
              className="object-cover"
              style={{ objectPosition: activePhoto.objectPosition }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/75 via-transparent to-obsidian/15" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2 md:bottom-10 md:left-10">
              <span className="text-[10px] font-mono uppercase tracking-[0.45em] text-electric">Identity_Frame_{String(activeIndex + 1).padStart(2, "0")}</span>
              <span className="text-2xl font-black uppercase tracking-tighter text-white md:text-5xl">{activePhoto.label}</span>
            </div>
          </motion.div>

          <button
            type="button"
            aria-label="Next photo"
            onClick={() => onNavigate((activeIndex + 1) % photos.length)}
            className="absolute right-5 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-ghost hover:border-electric/50 hover:text-electric md:grid"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
