"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";

type SpotlightRevealProps = {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  onClick?: () => void;
};

export default function SpotlightReveal({
  children,
  className,
  glowColor = "rgba(59,130,246,0.18)",
  onClick,
}: SpotlightRevealProps) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(50);
  const y = useMotionValue(50);
  const mask = useMotionTemplate`radial-gradient(220px circle at ${x}% ${y}%, ${glowColor}, transparent 68%)`;

  return (
    <motion.div
      className={`group relative overflow-hidden ${className ?? ""}`}
      onClick={onClick}
      onPointerMove={(event) => {
        if (reduceMotion) {
          return;
        }

        const rect = event.currentTarget.getBoundingClientRect();
        x.set(((event.clientX - rect.left) / rect.width) * 100);
        y.set(((event.clientY - rect.top) / rect.height) * 100);
      }}
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100"
        style={{ background: reduceMotion ? "transparent" : mask }}
      />
      {children}
    </motion.div>
  );
}
