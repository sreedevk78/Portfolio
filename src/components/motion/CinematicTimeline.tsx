"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getSceneProgress, scenes } from "@/lib/scenes";

export default function CinematicTimeline() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const triggers = scenes.map((scene) => {
      const progress = getSceneProgress(scene.index);
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: document.documentElement,
          start: () => {
            const scrollable = document.documentElement.scrollHeight - window.innerHeight;
            return Math.max(0, scrollable * progress - window.innerHeight * 0.55);
          },
          end: () => {
            const scrollable = document.documentElement.scrollHeight - window.innerHeight;
            return Math.min(scrollable, scrollable * progress + window.innerHeight * 0.55);
          },
          scrub: 0.85,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .fromTo(
          `[data-scene='${scene.id}'] .timeline-glow`,
          { opacity: 0 },
          { opacity: 0.38, duration: 0.45, ease: "power2.out" }
        )
        .to(`[data-scene='${scene.id}'] .timeline-glow`, {
          opacity: 0.08,
          duration: 0.55,
          ease: "power2.inOut",
        });

      return timeline.scrollTrigger;
    });

    ScrollTrigger.refresh();

    return () => {
      triggers.forEach((trigger) => trigger?.kill());
    };
  }, []);

  return null;
}
