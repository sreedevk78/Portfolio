import SceneLoader from "@/components/SceneLoader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import ProjectShowcase from "@/components/sections/ProjectShowcase";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import ScrollProgress from "@/components/ScrollProgress";
import SceneContainer from "@/components/SceneContainer";
import SpatialStage from "@/components/SpatialStage";
import CinematicCursor from "@/components/motion/CinematicCursor";
import CinematicTimeline from "@/components/motion/CinematicTimeline";
import SceneMiniMap from "@/components/motion/SceneMiniMap";
import FloatingTerminal from "@/components/motion/FloatingTerminal";
import SocialDock from "@/components/motion/SocialDock";
import StatusBar from "@/components/StatusBar";
import { scrollHeightClass } from "@/lib/scenes";

export default function Home() {
  return (
    <>
      <SceneLoader />
      <Navbar />
      <ScrollProgress />
      <CinematicCursor />
      <CinematicTimeline />
      <SocialDock />
      <SceneMiniMap />
      <FloatingTerminal />
      <StatusBar />

      <SpatialStage>
        <SceneContainer sceneId="hero">
          <Hero />
        </SceneContainer>

        <SceneContainer sceneId="about">
          <About />
        </SceneContainer>

        <SceneContainer sceneId="projects">
          <ProjectShowcase />
        </SceneContainer>

        <SceneContainer sceneId="experience">
          <Experience />
        </SceneContainer>

        <SceneContainer sceneId="contact">
          <Contact />
        </SceneContainer>
      </SpatialStage>

      <div aria-hidden="true" className={`${scrollHeightClass} pointer-events-none`} />
    </>
  );
}
