import ProjectCard from "./ProjectCard";

export default function ProjectCarousel({
  projects,
  active,
  animOffset,
  goTo,
  setModal,
  inView,
  radius,
  cardWidth,
  cardHeight,
}) {
  return (
    <div
      className={
        inView
          ? "carousel-anim"
          : ""
      }
      style={{
        position: "relative",

        zIndex: 5,

        height:
          "calc(100vh - 200px)",

        display: "flex",

        alignItems: "center",
        justifyContent: "center",

        perspective: "1400px",
        perspectiveOrigin:
          "50% 42%",
      }}
    >
      {projects.map(
        (project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            active={active}
            animOffset={animOffset}
            radius={radius}
            cardWidth={cardWidth}
            cardHeight={cardHeight}
            goTo={goTo}
            setModal={setModal}
          />
        )
      )}
    </div>
  );
}