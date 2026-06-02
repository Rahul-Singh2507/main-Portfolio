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
        background: 'linear-gradient(160deg, rgba(45,50,60,0.65) 0%, rgba(16,18,22,0.92) 100%)',
        border: '1px solid rgba(255,255,255,0.10)',
        position: 'relative',
      }}>

        {/* Ring halo */}
        <div style={{
          position: 'absolute', width: 200, height: 200, borderRadius: '50%',
          border: '2.5px solid rgba(255,255,255,0.88)',
          boxShadow: '0 0 22px rgba(255,255,255,0.55), 0 0 60px rgba(255,255,255,0.18)',
          top: '50%', left: '50%', transform: 'translate(-50%, -54%)',
        }} />

        {/* Silhouette SVG */}
        <svg
          style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 210, height: 320 }}
          viewBox="0 0 200 310"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
        >
          <path
            d="M24 310 C24 230 10 205 22 185 C36 160 52 155 62 148 C52 138 44 122 42 106 C38 78 46 54 64 40 C75 31 87 26 100 26 C113 26 125 31 136 40 C154 54 162 78 158 106 C156 122 148 138 138 148 C148 155 164 160 178 185 C190 205 176 230 176 310 Z"
            fill="rgba(8,10,13,0.98)"
          />
          <ellipse cx="100" cy="76" rx="40" ry="48" fill="rgba(8,10,13,0.98)" />
        </svg>

      </div>
    </div>
  )
}