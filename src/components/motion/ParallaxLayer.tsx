"use client";

import { motion, useReducedMotion, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useSpatial } from "@/components/SpatialStage";

type ParallaxLayerProps = {
  children: React.ReactNode;
  depth?: number;
  xRange?: [number, number];
  yRange?: [number, number];
  zRange?: [number, number];
  rotateRange?: [number, number];
  className?: string;
  progress?: MotionValue<number>;
};

export default function ParallaxLayer({
  children,
  depth = 1,
  xRange = [-24, 24],
  yRange = [34, -34],
  zRange = [-80, 80],
  rotateRange = [-1.5, 1.5],
  className,
  progress,
}: ParallaxLayerProps) {
  const reduceMotion = useReducedMotion();
  const { scrollProgress, mouseX, mouseY } = useSpatial();
  const source = progress ?? scrollProgress;

  const rawX = useTransform(mouseX, [-1, 1], [xRange[0] * depth, xRange[1] * depth]);
  const rawY = useTransform(source, [0, 1], [yRange[0] * depth, yRange[1] * depth]);
  const rawZ = useTransform(source, [0, 1], [zRange[0] * depth, zRange[1] * depth]);
  const rawRotate = useTransform(mouseY, [-1, 1], [rotateRange[0] * depth, rotateRange[1] * depth]);

  const x = useSpring(rawX, { stiffness: 70 / Math.max(depth, 0.6), damping: 24 + depth * 4 });
  const y = useSpring(rawY, { stiffness: 62 / Math.max(depth, 0.6), damping: 24 + depth * 6 });
  const z = useSpring(rawZ, { stiffness: 55 / Math.max(depth, 0.6), damping: 28 + depth * 6 });
  const rotateX = useSpring(rawRotate, { stiffness: 55, damping: 24 });

  return (
    <motion.div
      className={className}
      style={{
        x: reduceMotion ? 0 : x,
        y: reduceMotion ? 0 : y,
        z: reduceMotion ? 0 : z,
        rotateX: reduceMotion ? 0 : rotateX,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </motion.div>
  );
}
