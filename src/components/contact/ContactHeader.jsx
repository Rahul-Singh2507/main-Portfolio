export default function ContactHeader() {
  return (
    <div
      style={{
        position: "relative",
        zIndex: 2,
        marginBottom: 80,
      }}
    >
      <p
        style={{
          color: "#39FF14",
          fontSize: 11,
          letterSpacing: ".25em",
          marginBottom: 12,
        }}
      >
        ● INITIATE_CONNECTION
      </p>

      <h2
        style={{
          color: "#39FF14",
          fontSize: "clamp(40px,7vw,90px)",
          margin: 0,
          fontWeight: 800,
          letterSpacing: "-0.04em",
        }}
      >
        CONNNECT WITH ME
        <span className="cursor">_</span>
      </h2>

      <p
        style={{
          marginTop: 24,
          maxWidth: 600,
          color: "rgba(220,220,220,.6)",
          lineHeight: 1.8,
          fontSize: 14,
        }}
      >
        Looking for opportunities, collaborations,
        freelance work, or interesting projects.
        Let's build something exceptional.
      </p>
    </div>
  );
}