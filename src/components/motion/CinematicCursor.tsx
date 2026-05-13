"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function CinematicCursor() {
  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);
  const x = useSpring(pointerX, { stiffness: 420, damping: 38, mass: 0.45 });
  const y = useSpring(pointerY, { stiffness: 420, damping: 38, mass: 0.45 });
  const [isInteractive, setIsInteractive] = useState(false);
  const isInteractiveRef = useRef(false);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      // Offset by half of base size (24px -> 12px)
      pointerX.set(event.clientX - 12);
      pointerY.set(event.clientY - 12);
      const target = event.target as HTMLElement | null;
      const nextInteractive = Boolean(target?.closest("a, button, [role='button'], [data-magnetic]"));
      if (nextInteractive !== isInteractiveRef.current) {
        isInteractiveRef.current = nextInteractive;
        setIsInteractive(nextInteractive);
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [pointerX, pointerY]);

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[9999] pointer-events-none mix-blend-difference hidden md:block"
      style={{ x, y }}
    >
      <motion.div
        animate={{
          width: isInteractive ? 64 : 24,
          height: isInteractive ? 64 : 24,
          x: isInteractive ? -20 : 0, // offset difference
          y: isInteractive ? -20 : 0, // offset difference
        }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.4)]"
      />
    </motion.div>
  );
}
