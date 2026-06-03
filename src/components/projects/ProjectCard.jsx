import ProjectCodeBackground from "./ProjectCodeBackground";

export default function ProjectCard({
  project,
  index,
  active,
  animOffset,
  radius,
  cardWidth,
  cardHeight,
  goTo,
  setModal,
}) {
  const offset = index - animOffset;

  const angle = offset * 18;
  const rad = (angle * Math.PI) / 180;

  const x = Math.sin(rad) * radius;
  const z = Math.cos(rad) * radius - radius;

  const rotY = -angle;
  const absOffset = Math.abs(offset);

  const opacity = Math.max(
    0,
    1 - absOffset * 0.38
  );

  const scale = Math.max(
    0.5,
    1 - absOffset * 0.13
  );

  const isActive = index === active;

  return (
    <div
      onClick={() => goTo(index)}
      style={{
        position: "absolute",

        width: cardWidth,
        height: cardHeight,

        borderRadius: 20,
        overflow: "hidden",

        background: project.bg,

        border: isActive
          ? `1px solid ${project.accent}50`
          : "1px solid rgba(255,255,255,0.07)",

        boxShadow: isActive
          ? `0 0 0 1px ${project.accent}20,
             0 36px 90px rgba(0,0,0,0.92),
             0 0 70px ${project.accent}20`
          : "0 10px 50px rgba(0,0,0,0.75)",

        transform: `
          translateX(${x}px)
          translateZ(${z}px)
          rotateY(${rotY}deg)
          scale(${scale})
        `,

        opacity,

        transition:
          "box-shadow .4s ease, border-color .4s ease",

        cursor: isActive
          ? "default"
          : "pointer",

        zIndex: isActive
          ? 10
          : Math.max(
              1,
              6 - Math.floor(absOffset)
            ),
      }}
    >
      {isActive && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,

            height: 2,

            zIndex: 20,

            background: `linear-gradient(
              to right,
              transparent,
              ${project.accent}50,
              transparent
            )`,

            animation:
              "scan 3.2s linear infinite",
          }}
        />
      )}

      <ProjectCodeBackground
        code={project.code}
        lines={20}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,

          zIndex: 1,

          background:
            "linear-gradient(to bottom, rgba(0,0,0,.28) 0%, rgba(0,0,0,.1) 35%, rgba(0,0,0,.82) 100%)",

          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",

          top: -40,
          right: -40,

          zIndex: 1,

          width: 160,
          height: 160,

          borderRadius: "50%",

          background: `radial-gradient(circle, ${project.accent}18 0%, transparent 70%)`,

          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",

          top: 20,
          left: 22,
          right: 20,

          zIndex: 5,

          display: "flex",
          justifyContent:
            "space-between",
        }}
      >
        <span
          style={{
            fontSize: 13,
            color: project.accent,
          }}
        >
          {project.id}
        </span>

        <div
          style={{
            width: 8,
            height: 8,

            borderRadius: "50%",

            background:
              project.accent,

            animation:
              "dp 2s ease-in-out infinite",
          }}
        />
      </div>

      {isActive && (
        <div
          style={{
            position: "absolute",

            top: 56,
            left: 22,
            right: 22,

            zIndex: 5,

            display: "flex",
            flexWrap: "wrap",
            gap: 5,
          }}
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="tag"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div
        style={{
          position: "absolute",

          bottom: 0,
          left: 0,
          right: 0,

          zIndex: 5,

          padding: "0 26px 26px",

          display: "flex",
          justifyContent:
            "space-between",

          alignItems: "flex-end",

          gap: 16,
        }}
      >
        <div style={{ flex: 1 }}>
          <h3
            style={{
              fontSize:
                "clamp(24px,3vw,36px)",

              color: "#f2f2ef",

              margin: "0 0 8px",
            }}
          >
            {project.title}
          </h3>

          <p
            style={{
              fontSize: 11,

              color:
                "rgba(195,202,188,.65)",

              margin: 0,

              maxWidth: 360,
            }}
          >
            {project.subtitle}
          </p>
        </div>

        {isActive && (
          <button
            className="view-btn"
            onClick={(e) => {
              e.stopPropagation();
              setModal(project);
            }}
          >
            VIEW_PROJECT
          </button>
        )}
      </div>
    </div>
  );
}