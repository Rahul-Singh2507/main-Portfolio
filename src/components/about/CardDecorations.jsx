export default function CardDecorations() {
  const corners = [
    { top: 10, left: 10, borderWidth: '2px 0 0 2px', borderRadius: '4px 0 0 0' },
    { top: 10, right: 10, borderWidth: '2px 2px 0 0', borderRadius: '0 4px 0 0' },
    { bottom: 10, left: 10, borderWidth: '0 0 2px 2px', borderRadius: '0 0 0 4px' },
    { bottom: 10, right: 10, borderWidth: '0 2px 2px 0', borderRadius: '0 0 4px 0' },
  ]

  return (
    <>
      <style>{`
        @keyframes scanLine {
          0%   { top: -4px; opacity: 0.6; }
          100% { top: 105%; opacity: 0; }
        }
      `}</style>

      {/* Scan line */}
      <div style={{
        position: 'absolute', left: 0, right: 0, height: 2, zIndex: 20,
        background: 'linear-gradient(to right, transparent, rgba(57,255,20,0.3), transparent)',
        animation: 'scanLine 3.5s linear infinite',
      }} />

      {/* Corner brackets */}
      {corners.map((style, i) => (
        <div key={i} style={{
          position: 'absolute', width: 20, height: 20,
          borderColor: 'rgba(57,255,20,0.45)',
          borderStyle: 'solid', zIndex: 30,
          pointerEvents: 'none', ...style,
        }} />
      ))}
    </>
  )
}