export default function Footer() {
  return (
    <div
      data-section
      id="footer"
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        background: '#050607',
        borderTop: '1px solid #1a1a1a',
        padding: '40px 52px',
        position: 'relative',
      }}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gap: 40,
        marginBottom: 40,
      }}>

        {/* Col 1 — Logo */}
        <div>
          <p style={{ fontSize: 13, color: '#fff', letterSpacing: '0.2em', margin: '0 0 8px', fontWeight: 700 }}>
            ARCHITECT_SYS
          </p>
          <p style={{ fontSize: 9, color: '#333', letterSpacing: '0.15em', margin: '0 0 4px' }}>
            VERSION_CONTROL_1.0.0
          </p>
          <p style={{ fontSize: 9, color: '#333', letterSpacing: '0.1em', margin: 0 }}>
            MERN + GEN AI + DEVOPS
          </p>
        </div>

        {/* Col 2 — External */}
        <div>
          <p style={{ fontSize: 9, color: '#39FF14', letterSpacing: '0.28em', margin: '0 0 16px' }}>
            EXTERNAL_RESOURCES
          </p>
          {['GITHUB', 'LINKEDIN', 'INSTAGRAM', 'TWITTER'].map((item) => (
            <a
              key={item}
              href="#"
              style={{
                display: 'block',
                fontSize: 10,
                color: '#555',
                letterSpacing: '0.15em',
                textDecoration: 'none',
                marginBottom: 8,
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => e.target.style.color = '#39FF14'}
              onMouseLeave={(e) => e.target.style.color = '#555'}
            >
              {item}
            </a>
          ))}
        </div>

        {/* Col 3 — Location */}
        <div>
          <p style={{ fontSize: 9, color: '#39FF14', letterSpacing: '0.28em', margin: '0 0 16px' }}>
            LOCATION
          </p>
          <p style={{ fontSize: 10, color: '#555', letterSpacing: '0.1em', margin: '0 0 8px' }}>
            INDIA
          </p>
          <p style={{ fontSize: 9, color: '#333', letterSpacing: '0.08em', margin: '0 0 4px' }}>
            25.5941° N
          </p>
          <p style={{ fontSize: 9, color: '#333', letterSpacing: '0.08em', margin: 0 }}>
            85.1376° E
          </p>
        </div>

        {/* Col 4 — Career */}
        <div>
          <p style={{ fontSize: 9, color: '#39FF14', letterSpacing: '0.28em', margin: '0 0 16px' }}>
            CAREER / REMOTE
          </p>
          <p style={{ fontSize: 10, color: '#555', letterSpacing: '0.1em', margin: '0 0 8px' }}>
            OPEN TO WORK
          </p>
          <p style={{ fontSize: 9, color: '#333', letterSpacing: '0.08em', margin: '0 0 4px' }}>
            FULL-TIME
          </p>
          <p style={{ fontSize: 9, color: '#333', letterSpacing: '0.08em', margin: 0 }}>
            FREELANCE
          </p>
        </div>

      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: '1px solid #1a1a1a',
        paddingTop: 20,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <p style={{ fontSize: 9, color: '#2a2a2a', letterSpacing: '0.15em', margin: 0 }}>
          © 2025 ARCHITECT_SYS. ALL RIGHTS RESERVED.
        </p>
        <p style={{ fontSize: 9, color: '#2a2a2a', letterSpacing: '0.15em', margin: 0 }}>
          BUILT WITH REACT + GSAP + TAILWIND
        </p>
      </div>
    </div>
  )
}