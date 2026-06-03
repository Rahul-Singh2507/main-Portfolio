
export default function ContactStatus() {
  return (
    <div
      style={{
        marginTop: 80,
        paddingTop: 30,
        borderTop: "1px solid rgba(57,255,20,.15)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 20,
      }}
    >
      <div
        style={{
          color: "rgba(255,255,255,.45)",
          fontSize: 12,
          letterSpacing: ".12em",
        }}
      >
        © 2025 RAHUL_SINGH
      </div>

      <div
        style={{
          display: "flex",
          gap: 24,
          color: "#39FF14",
          fontSize: 12,
          letterSpacing: ".12em",
        }}
      >
        <span>STATUS : ONLINE ●</span>
        <span>LOCATION : INDIA</span>
        <span>OPEN TO WORK</span>
      </div>
    </div>
  );
}

