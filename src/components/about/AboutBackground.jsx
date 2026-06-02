export default function AboutBackground() {
  return (
    <>
      {/* Grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(57,255,20,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(57,255,20,0.025) 1px, transparent 1px)
        `,
        backgroundSize: '44px 44px',
      }} />

      {/* Orb top right */}
      <div style={{
        position: 'absolute', top: '20%', right: '10%',
        width: 300, height: 300, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(57,255,20,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Orb bottom left */}
      <div style={{
        position: 'absolute', bottom: '15%', left: '5%',
        width: 240, height: 240, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(57,255,20,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
    </>
  )
}