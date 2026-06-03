export default function ProjectHeader({
  active,
  totalProjects,
  project,
  inView,
}) {
  return (
    <div
      className={
        inView ? "header-anim" : ""
      }
      style={{
        position: "relative",
        zIndex: 10,

        padding: "36px 52px 0",

        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div>
        <div
          style={{
            fontSize: 10,
            color:
              "rgba(57,255,20,0.5)",

            letterSpacing: "0.28em",
            textTransform: "uppercase",

            marginBottom: 8,
          }}
        >
          ● selected_works
        </div>

        <h2
          style={{
            fontSize:
              "clamp(28px,4vw,50px)",

            fontWeight: 700,

            color: "#e8ebe6",

            letterSpacing: "-0.02em",

            margin: 0,

            textTransform:
              "uppercase",
          }}
        >
          PROJECTS
        </h2>
      </div>

      <div
        style={{
          textAlign: "right",
        }}
      >
        <div
          style={{
            fontSize: 11,

            color:
              "rgba(57,255,20,0.45)",

            letterSpacing: "0.2em",

            marginBottom: 4,
          }}
        >
          {String(active + 1).padStart(
            2,
            "0"
          )}{" "}
          /{" "}
          {String(
            totalProjects
          ).padStart(2, "0")}
        </div>

        <div
          style={{
            fontSize: 10,

            color:
              "rgba(255,255,255,0.25)",

            letterSpacing: "0.14em",
          }}
        >
          {project.year} ·{" "}
          {project.role}
        </div>
      </div>
    </div>
  );
}