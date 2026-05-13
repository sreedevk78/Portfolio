"use client";

import { motion, useMotionValue, useSpring, useTransform, type HTMLMotionProps } from "framer-motion";
import { useRef } from "react";

type MagneticTargetProps = HTMLMotionProps<"div"> & {
  strength?: number;
};

export default function MagneticTarget({ children, strength = 18, style, onMouseMove, onMouseLeave, ...props }: MagneticTargetProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 18, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 180, damping: 18, mass: 0.5 });
  const rotateX = useTransform(springY, [-strength, strength], [3, -3]);
  const rotateY = useTransform(springX, [-strength, strength], [-3, 3]);

  return (
    <motion.div
      ref={ref}
      data-magnetic
      onMouseMove={(event) => {
        const bounds = ref.current?.getBoundingClientRect();
        if (bounds) {
          const localX = event.clientX - bounds.left - bounds.width / 2;
          const localY = event.clientY - bounds.top - bounds.height / 2;
          x.set((localX / bounds.width) * strength * 2);
          y.set((localY / bounds.height) * strength * 2);
        }
        onMouseMove?.(event);
      }}
      onMouseLeave={(event) => {
        x.set(0);
        y.set(0);
        onMouseLeave?.(event);
      }}
      style={{
        ...style,
        x: springX,
        y: springY,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
