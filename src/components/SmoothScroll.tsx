"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getSceneProgress, scenes } from "@/lib/scenes";

type SmoothScrollContextValue = {
  scrollToScene: (index: number) => void;
  scrollToProgress: (progress: number) => void;
};

const SmoothScrollContext = createContext<SmoothScrollContextValue | null>(null);

export function useSmoothScroll() {
  const context = useContext(SmoothScrollContext);

  if (!context) {
    throw new Error("useSmoothScroll must be used inside SmoothScroll");
  }

  return context;
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<((time: number) => void) | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }

    const lenis = new Lenis({
      duration: 1.65,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.86,
      touchMultiplier: 1.45,
      infinite: false,
    });

    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    rafRef.current = raf;
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();

    return () => {
      if (rafRef.current) {
        gsap.ticker.remove(rafRef.current);
      }
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (lenisRef.current) {
      const timer = setTimeout(() => {
        lenisRef.current?.scrollTo(0, { immediate: true });
        ScrollTrigger.refresh();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  const scrollToProgress = useCallback((progress: number) => {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const target = Math.max(0, Math.min(1, progress)) * scrollableHeight;
    lenisRef.current?.scrollTo(target, {
      duration: 1.35,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      lock: true,
    });
  }, []);

  const scrollToScene = useCallback(
    (index: number) => {
      const safeIndex = Math.min(scenes.length - 1, Math.max(0, index));
      scrollToProgress(getSceneProgress(safeIndex));
    },
    [scrollToProgress]
  );

  const contextValue = useMemo(
    () => ({
      scrollToScene,
      scrollToProgress,
    }),
    [scrollToProgress, scrollToScene]
  );

  return <SmoothScrollContext.Provider value={contextValue}>{children}</SmoothScrollContext.Provider>;
}
