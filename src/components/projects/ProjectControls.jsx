export default function ProjectControls({
  active,
  projects,
  accent,
  goTo,
  inView,
}) {
  return (
    <div
      className={
        inView ? "controls-anim" : ""
      }
      style={{
        position: "relative",
        zIndex: 10,

        padding: "0 52px 36px",

        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 10,
        }}
      >
        <button
          className="nav-btn"
          onClick={() =>
            goTo(active - 1)
          }
          disabled={active === 0}
        >
          ←
        </button>

        <button
          className="nav-btn"
          onClick={() =>
            goTo(active + 1)
          }
          disabled={
            active ===
            projects.length - 1
          }
        >
          →
        </button>
      </div>

      <div
        style={{
          display: "flex",
          gap: 7,
        }}
      >
        {projects.map((_, i) => (
          <div
            key={i}
            className={`pip ${
              i === active
                ? "active"
                : ""
            }`}
            onClick={() => goTo(i)}
            style={
              i === active
                ? {
                    background:
                      accent,
                    boxShadow: `0 0 8px ${accent}`,
                  }
                : {}
            }
          />
        ))}
      </div>

      <span
        style={{
          fontSize: 10,
          color:
            "rgba(255,255,255,0.18)",
          letterSpacing: "0.18em",
        }}
      >
        SCROLL · ARROW KEYS
      </span>
    </div>
  );
}