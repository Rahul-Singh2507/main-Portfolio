
export default function CardPhoto() {
  return (
    <div style={{
      flexShrink: 0, display: 'flex', alignItems: 'center',
      padding: '36px 0 36px 36px', marginRight: 48,
    }}>
      <div style={{
        width: 280, height: 360, borderRadius: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.10)',
        position: 'relative',
      }}>

        {/* YOUR PHOTO */}
        <img
          src="/profile.png"
          alt="profile"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top',
            display: 'block',
          }}
        />

        {/* Green overlay tint */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, transparent 60%, rgba(8,10,13,0.8) 100%)',
          pointerEvents: 'none',
        }} />

        {/* Corner glow */}
        <div style={{
          position: 'absolute', top: -40, right: -40,
          width: 160, height: 160, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(57,255,20,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

      </div>
    </div>
  )
}