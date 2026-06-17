import ProjectCodeBackground from "./ProjectCodeBackground";

export default function ProjectModal({
  modal,
  setModal,
}) {
  if (!modal) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={() => setModal(null)}
    >
      <div
        className="modal-box"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: modal.bg,
          border: `1px solid ${modal.accent}40`,
        }}
      >
        <ProjectCodeBackground
          code={modal.code}
          lines={22}
          fontSize={11}
          color="rgba(255,255,255,0.055)"
          padding="16px 20px"
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 20,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.75) 100%)",
          }}
        />

        <button
          className="modal-close"
          onClick={() => setModal(null)}
        >
          ✕
        </button>

        <div
          style={{
            position: "relative",
            zIndex: 5,
            padding: "36px 36px 32px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 11,
                  color: modal.accent,
                  letterSpacing: "0.2em",
                  marginBottom: 8,
                }}
              >
                ● {modal.id} / {modal.year}
              </div>

              <h2
                style={{
                  fontSize: 30,
                  color: "#f0f0ed",
                  margin: 0,
                }}
              >
                {modal.title}
              </h2>

              <div
                style={{
                  fontSize: 11,
                  color:
                    "rgba(200,210,195,0.5)",
                  marginTop: 6,
                }}
              >
                {modal.role}
              </div>
            </div>
          </div>

          <p
            style={{
              fontSize: 13,
              color:
                "rgba(195,205,188,0.75)",
              lineHeight: 1.75,
            }}
          >
            {modal.description}
          </p>

          <div
            style={{
              height: 1,
              background:
                "rgba(255,255,255,0.07)",
              margin: "20px 0",
            }}
          />

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              marginBottom: 24,
            }}
          >
            {modal.tags.map((tag) => (
              <span
                key={tag}
                className="modal-tag"
                style={{
                  background:
                    `${modal.accent}15`,
                  border:
                    `1px solid ${modal.accent}35`,
                  color: modal.accent,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              gap: 12,
            }}
          >
      <a      
    href={modal.liveUrl}
    target="_blank"
    rel="noreferrer"
    onClick={(e) => e.stopPropagation()}
    className="view-btn"
    style={{ flex: 1, textAlign: "center", textDecoration: "none", display: "block" }}
>
    VIEW LIVE ↗
</a>

            <button
              className="view-btn"
              style={{
                flex: 1,
              }}
             onClick={() => window.open(modal.sourceUrl, "_blank")}
            >
              SOURCE CODE ↗
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}