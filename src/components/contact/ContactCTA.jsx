export default function ContactCTA() {
  return (
    <div
      style={{
        marginTop: 100,
        textAlign: "center",
        position: "relative",
        zIndex: 2,
      }}
    >
      <p
        style={{
          color: "rgba(255,255,255,.45)",
          letterSpacing: ".25em",
          marginBottom: 24,
        }}
      >
        READY_TO_BUILD_SOMETHING?
      </p>

      <button
        style={{
          padding: "16px 42px",
          background: "transparent",
          border: "1px solid #39FF14",
          color: "#39FF14",
          cursor: "pointer",
          borderRadius: 8,
          fontFamily: "JetBrains Mono",
          letterSpacing: ".18em",
          fontWeight: 600,
        }}
      >
        SEND_MESSAGE ↗
      </button>
    </div>
  );
}