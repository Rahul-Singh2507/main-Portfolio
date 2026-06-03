export default function ProjectCodeBackground({
  code,
  lines = 20,
  fontSize = 12,
  color = "rgba(255,255,255,0.065)",
  padding = "18px 22px",
}) {
  return (
    <pre
      style={{
        position: "absolute",
        inset: 0,
        margin: 0,

        zIndex: 0,

        fontFamily: "'JetBrains Mono', monospace",
        fontSize,
        lineHeight: 1.75,

        color,

        padding,

        overflow: "hidden",

        pointerEvents: "none",

        letterSpacing: "0.02em",
      }}
    >
      {Array.from({ length: lines }, (_, row) =>
        `${String(row + 1).padStart(2, " ")}  ${
          code.split("\n")[row % code.split("\n").length]
        }`
      ).join("\n")}
    </pre>
  );
}