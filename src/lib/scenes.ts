export const SCENE_DEPTH = 1100;

export const scenes = [
  {
    id: "hero",
    name: "Origin",
    shortName: "SK.",
    eyebrow: "Neural_Interface_v5.0",
    index: 0,
  },
  {
    id: "about",
    name: "Archive",
    shortName: "Archive",
    eyebrow: "Identity_Archive",
    index: 1,
  },
  {
    id: "projects",
    name: "Logic",
    shortName: "Logic",
    eyebrow: "Project_Archive_Subsystem",
    index: 2,
  },
  {
    id: "experience",
    name: "Core",
    shortName: "Core",
    eyebrow: "Intelligence_Background",
    index: 3,
  },
  {
    id: "contact",
    name: "Nexus",
    shortName: "Nexus",
    eyebrow: "Establish_Neural_Link",
    index: 4,
  },
] as const;

export type SceneId = (typeof scenes)[number]["id"];
export type Scene = (typeof scenes)[number];

export const sceneCount = scenes.length;
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
