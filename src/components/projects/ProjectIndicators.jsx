export default function ProjectIndicators({
  projects,
  active,
  accent,
  onSelect,
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 7,
      }}
    >
      {projects.map((project, index) => (
        <div
          key={project.id}
          className={`pip ${index === active ? "active" : ""}`}
          onClick={() => onSelect(index)}
          style={
            index === active
              ? {
                  background: accent,
                  boxShadow: `0 0 8px ${accent}`,
                }
              : {}
          }
        />
      ))}
    </div>
  );
}