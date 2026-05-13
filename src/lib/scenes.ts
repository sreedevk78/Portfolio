export const SCENE_DEPTH = 1100;

export const scenes = [
  {
    id: "hero",
    name: "Intro",
    shortName: "SK.",
    eyebrow: "Neural_Interface_v5.0",
    index: 0,
  },
  {
    id: "about",
    name: "About",
    shortName: "About",
    eyebrow: "About_Profile",
    index: 1,
  },
  {
    id: "projects",
    name: "Projects",
    shortName: "Work",
    eyebrow: "Selected_Work",
    index: 2,
  },
  {
    id: "experience",
    name: "Experience",
    shortName: "Skills",
    eyebrow: "Experience_Skills",
    index: 3,
  },
  {
    id: "contact",
    name: "Contact",
    shortName: "Contact",
    eyebrow: "Contact_Link",
    index: 4,
  },
] as const;

export type SceneId = (typeof scenes)[number]["id"];
export type Scene = (typeof scenes)[number];

export const sceneCount = scenes.length;
/** Document scroll height; tune with scene count / perceived scene length so Lenis + scrollYProgress align with the Z-stage. */
export const scrollHeightClass = "h-[520vh]";

export function getSceneById(id: SceneId) {
  return scenes.find((scene) => scene.id === id) ?? scenes[0];
}

export function getSceneProgress(index: number) {
  if (sceneCount <= 1) {
    return 0;
  }

  return index / (sceneCount - 1);
}

export function getSceneIndexFromProgress(progress: number) {
  return Math.min(sceneCount - 1, Math.max(0, Math.round(progress * (sceneCount - 1))));
}
