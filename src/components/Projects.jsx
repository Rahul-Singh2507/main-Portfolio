import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";

import { PROJECTS } from "./projects/ProjectData";
import useProjectInView from "./projects/useProjectInView";

import ProjectHeader from "./projects/ProjectHeader";
import ProjectCarousel from "./projects/ProjectCarousel";
import ProjectControls from "./projects/ProjectControls";
import ProjectModal from "./projects/ProjectModal";

import "./projects/projectStyles.css";

const CARD_W = 680;
const CARD_H = 420;
const RADIUS = 900;

export default function Projects() {
  const [active, setActive] = useState(2);
  const [modal, setModal] = useState(null);

  const animRef = useRef(null);

  const [animOffset, setAnimOffset] =
    useState(2);

  const targetOffset = useRef(2);
  const currentOffset = useRef(2);

  const scrollLocked = useRef(false);

  const sectionRef = useRef(null);

  const inView =
    useProjectInView(sectionRef, 0.1);

  useEffect(() => {
    const loop = () => {
      const diff =
        targetOffset.current -
        currentOffset.current;

      currentOffset.current +=
        diff * 0.075;

      setAnimOffset(
        currentOffset.current
      );

      animRef.current =
        requestAnimationFrame(loop);
    };

    animRef.current =
      requestAnimationFrame(loop);

    return () =>
      cancelAnimationFrame(
        animRef.current
      );
  }, []);

  const goTo = useCallback((index) => {
    const clamped = Math.max(
      0,
      Math.min(
        PROJECTS.length - 1,
        index
      )
    );

    setActive(clamped);

    targetOffset.current =
      clamped;
  }, []);

  const project =
    PROJECTS[active];

  return (
    <div
    id="work"
      ref={sectionRef}
      style={{
        fontFamily:
          "'JetBrains Mono', monospace",

        background: "#080a0c",

        minHeight: "100vh",

        overflowX: "hidden",

        position: "relative",
      }}
    >
      <div className="works-grid" />

      <ProjectHeader
        active={active}
        totalProjects={
          PROJECTS.length
        }
        project={project}
        inView={inView}
      />

      <ProjectCarousel
        projects={PROJECTS}
        active={active}
        animOffset={animOffset}
        goTo={goTo}
        setModal={setModal}
        inView={inView}
        radius={RADIUS}
        cardWidth={CARD_W}
        cardHeight={CARD_H}
      />

      <ProjectControls
        active={active}
        projects={PROJECTS}
        accent={project.accent}
        goTo={goTo}
        inView={inView}
      />

      <ProjectModal
        modal={modal}
        setModal={setModal}
      />
    </div>
  );
}