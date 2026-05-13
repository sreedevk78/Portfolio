"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";

export default function VelocitySkew({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  const skewY = useTransform(smoothVelocity, [-1000, 1000], [-3, 3]);

  return (
    <motion.div style={{ skewY }} className={`origin-bottom ${className}`}>
      {children}
    </motion.div>
  );
}
