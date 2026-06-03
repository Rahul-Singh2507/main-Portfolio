export default function ProjectNavigation({
  active,
  totalProjects,
  onPrevious,
  onNext,
}) {
  return (
    <div style={{ display: "flex", gap: 10 }}>
      <button
        className="nav-btn"
        onClick={onPrevious}
        disabled={active === 0}
      >
        ←
      </button>

      <button
        className="nav-btn"
        onClick={onNext}
        disabled={active === totalProjects - 1}
      >
        →
      </button>
    </div>
  );
}