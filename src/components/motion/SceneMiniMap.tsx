"use client";

import { scenes } from "@/lib/scenes";
import { useSmoothScroll } from "@/components/SmoothScroll";
import { useActiveScene } from "@/components/motion/useActiveScene";

export default function SceneMiniMap() {
  const activeScene = useActiveScene();
  const { scrollToScene } = useSmoothScroll();

  return (
    <div className="fixed bottom-6 right-6 z-[70] hidden flex-col gap-2 md:flex">
      {scenes.map((scene) => {
        const isActive = activeScene === scene.index;

        return (
          <button
            key={scene.id}
            type="button"
            onClick={() => scrollToScene(scene.index)}
            aria-label={`Go to ${scene.name}`}
            aria-current={isActive ? "step" : undefined}
            className={`group flex items-center justify-end gap-3 rounded-full px-2 py-1 text-[9px] font-bold uppercase tracking-[0.25em] transition-colors ${
              isActive ? "text-ghost" : "text-ghost/35 hover:text-ghost/75"
            }`}
          >
            <span className={`max-w-0 overflow-hidden transition-all group-hover:max-w-24 ${isActive ? "max-w-24" : ""}`}>
              {scene.name}
            </span>
            <span className={`h-2 w-2 rounded-full border transition-all ${isActive ? "scale-125 border-electric bg-electric shadow-[0_0_20px_rgba(59,130,246,0.65)]" : "border-white/20 bg-white/5"}`} />
          </button>
        );
      })}
    </div>
  );
}
