"use client";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { scenes } from "@/lib/scenes";
import { useSmoothScroll } from "@/components/SmoothScroll";
import { useActiveScene } from "@/components/motion/useActiveScene";
import MagneticTarget from "@/components/motion/MagneticTarget";

export default function Navbar() {
  const { scrollToScene } = useSmoothScroll();
  const activeSection = useActiveScene();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (index: number) => {
    scrollToScene(index);
    setIsMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
      className="fixed top-0 left-0 w-full z-[150] flex justify-between items-start px-5 py-5 md:px-8 md:py-8 pointer-events-none"
    >
      <MagneticTarget strength={10} className="pointer-events-auto rounded-sm">
        <button
          type="button"
          className="flex flex-col group text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric/70 focus-visible:ring-offset-4 focus-visible:ring-offset-obsidian rounded-sm"
          onClick={() => scrollToSection(0)}
          aria-label="Go to intro"
        >
          <span className="text-xl font-black tracking-tighter uppercase group-hover:text-electric transition-colors">SK.</span>
          <span className="text-[10px] font-bold text-ghost/40 tracking-[0.3em] uppercase -mt-1 group-hover:text-ghost/70 transition-colors italic">2026</span>
        </button>
      </MagneticTarget>

      <div className="flex items-start gap-5 md:gap-12 pointer-events-auto">
        <div className="hidden md:flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.3em]">
          {scenes.slice(1).map((item) => {
            const isActive = activeSection === item.index;

            return (
              <MagneticTarget key={item.name} strength={8}>
                <button
                  type="button"
                  onClick={() => scrollToSection(item.index)}
                  className={`relative rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric/70 focus-visible:ring-offset-4 focus-visible:ring-offset-obsidian ${
                    isActive ? "text-ghost" : "text-ghost/45 hover:text-ghost"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.shortName}
                  <span
                    className={`absolute -bottom-3 left-0 h-[1px] bg-electric transition-all ${
                      isActive ? "w-full opacity-100" : "w-0 opacity-0"
                    }`}
                  />
                </button>
              </MagneticTarget>
            );
          })}
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close section menu" : "Open section menu"}
            className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric/70 focus-visible:ring-offset-4 focus-visible:ring-offset-obsidian"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="absolute right-0 mt-4 w-56 border border-white/10 bg-obsidian/95 shadow-2xl shadow-black/40 p-2"
            >
              {scenes.map((item) => {
                const isActive = activeSection === item.index;

                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => scrollToSection(item.index)}
                    aria-label={item.name}
                    className={`w-full flex items-center justify-between px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.25em] transition-colors focus-visible:outline-none focus-visible:bg-white/10 ${
                      isActive ? "text-electric" : "text-ghost/60 hover:text-ghost hover:bg-white/5"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.name}
                    <span className="text-[9px] text-ghost/25">{String(item.index + 1).padStart(2, "0")}</span>
                  </button>
                );
              })}
            </motion.div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
