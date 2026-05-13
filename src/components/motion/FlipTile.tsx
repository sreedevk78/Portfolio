"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

type FlipTileProps = {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
  ariaLabel?: string;
};

export default function FlipTile({ front, back, className, ariaLabel }: FlipTileProps) {
  const reduceMotion = useReducedMotion();
  const [isFlipped, setIsFlipped] = useState(false);

  if (reduceMotion) {
    return (
      <div className={className} aria-label={ariaLabel}>
        {front}
        <div className="mt-4 border-t border-white/10 pt-4">{back}</div>
      </div>
    );
  }

  return (
    <motion.div
      tabIndex={0}
      aria-label={ariaLabel}
      className={`group/scroll relative min-h-48 cursor-pointer outline-none [perspective:1000px] ${className ?? ""}`}
      whileHover={{ y: -6 }}
      whileFocus={{ y: -6 }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
    >
      <div 
        className="absolute inset-0 rounded-2xl transition-transform duration-700 [transform-style:preserve-3d]"
        style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        <div className="absolute inset-0 [backface-visibility:hidden]">
          {front}
        </div>
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          {back}
        </div>
      </div>
    </motion.div>
  );
}
