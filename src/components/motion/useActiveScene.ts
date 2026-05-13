"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { getSceneIndexFromProgress } from "@/lib/scenes";

export function useActiveScene() {
  const { scrollYProgress } = useScroll();
  const [activeScene, setActiveScene] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setActiveScene(getSceneIndexFromProgress(latest));
  });

  return activeScene;
}
