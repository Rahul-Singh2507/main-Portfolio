import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SKILLS = {
  FRONTEND: ['REACT', 'JAVASCRIPT', 'HTML5', 'CSS3', 'TAILWIND', 'GSAP', 'REDUX'],
  BACKEND: ['NODE.JS', 'EXPRESS.JS', 'REST API', 'JWT', 'SOCKET.IO', 'MONGOOSE'],
  DATABASE: ['MONGODB', 'MONGOOSE', 'REDIS', 'PINECONE', ],
  AI: ['LANGCHAIN', 'OPENAI API', 'GEMINI', 'RAG', 'VECTOR DB', 'PROMPT ENG',],
  DEVOPS: ['DOCKER', 'AWS EC2', 'AWS S3', 'CI/CD', 'GITHUB ACTIONS', 'NGINX', 'LINUX'],
  TOOLS: ['GIT', 'GITHUB', 'FIGMA', 'POSTMAN', 'VS CODE', 'VERCEL'],
}

const BARS = [
  { label: 'React', pct: 90 },
  { label: 'Node.js', pct: 88 },
  { label: 'MongoDB', pct: 85 },
  { label: 'Docker', pct: 75 },
  { label: 'Gen AI', pct: 78 },
  { label: 'AWS', pct: 70 },
]

const TAG_COLORS = {
  FRONTEND: { border: '#39FF14', color: '#39FF14', bg: 'rgba(57,255,20,0.08)' },
  BACKEND:  { border: '#00ffcc', color: '#00ffcc', bg: 'rgba(0,255,204,0.08)' },
  DATABASE: { border: '#a78bfa', color: '#a78bfa', bg: 'rgba(167,139,250,0.08)' },
  AI:       { border: '#f97316', color: '#f97316', bg: 'rgba(249,115,22,0.08)' },
  DEVOPS:   { border: '#38bdf8', color: '#38bdf8', bg: 'rgba(56,189,248,0.08)' },
  TOOLS:    { border: '#fb7185', color: '#fb7185', bg: 'rgba(251,113,133,0.08)' },
}

function Tag({ label, color }) {
  const tagRef = useRef(null)

  const handleEnter = () => {
    gsap.to(tagRef.current, {
      background: color.bg,
      borderColor: color.border,
      color: color.color,
      scale: 1.05,
      duration: 0.2,
    })
  }

  const handleLeave = () => {
    gsap.to(tagRef.current, {
      background: 'rgba(57,255,20,0.04)',
      borderColor: 'rgba(57,255,20,0.3)',
      color: '#39FF14',
      scale: 1,
      duration: 0.2,
    })
  }

  return (
    <span
      ref={tagRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        fontSize: 10,
        letterSpacing: '0.12em',
        padding: '10px 20px',
        border: '1px solid rgba(57,255,20,0.3)',
        color: '#39FF14',
        cursor: 'default',
        borderRadius: 4,
        background: 'rgba(57,255,20,0.04)',
        display: 'inline-block',
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      {label}
    </span>
  )
}

export default function Skills() {
  const sectionRef = useRef(null)
  const barsRef = useRef([])
  const panelsRef = useRef([])
  const titleRef = useRef(null)
  const triggeredRef = useRef(false)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Title
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      )

      // Panels
      gsap.fromTo(panelsRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        }
      )

      // Bars — use IntersectionObserver to trigger reliably
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !triggeredRef.current) {
              triggeredRef.current = true
              barsRef.current.forEach((bar, i) => {
                if (!bar) return
                gsap.fromTo(bar,
                  { width: '0%' },
                  {
                    width: BARS[i].pct + '%',
                    duration: 1.4,
                    ease: 'power3.out',
                    delay: i * 0.1,
                  }
                )
              })
            }
          })
        },
        { threshold: 0.3 }
      )

      if (sectionRef.current) observer.observe(sectionRef.current)
      return () => observer.disconnect()

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const panelStyle = (extraStyle = {}) => ({
    padding: 28,
    position: 'relative',
    ...extraStyle,
  })

  return (
    <section
      ref={sectionRef}
      id="skills"
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        background: '#080a0c',
        padding: '100px 52px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Grid bg */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(57,255,20,0.018) 1px, transparent 1px),
          linear-gradient(90deg, rgba(57,255,20,0.018) 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px',
      }} />

      {/* Title */}
      <div ref={titleRef} style={{ marginBottom: 60, position: 'relative', zIndex: 1 }}>
        <p style={{ fontSize: 10, color: 'rgba(57,255,20,0.5)', letterSpacing: '0.28em', margin: '0 0 8px' }}>
          ● COMPETENCY_LOG — MERN + GEN AI + DEVOPS
        </p>
        <h2 style={{
          fontSize: 'clamp(32px, 5vw, 56px)',
          fontWeight: 700,
          color: '#e8ebe6',
          margin: 0,
          letterSpacing: '-0.02em',
          textTransform: 'uppercase',
        }}>
          SKILL_MATRIX
        </h2>
      </div>

      {/* 3x2 Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        border: '1px solid #1a1a1a',
        position: 'relative',
        zIndex: 1,
      }}>

        {/* 01 Frontend */}
        <div ref={(el) => (panelsRef.current[0] = el)}
          style={panelStyle({ borderRight: '1px solid #1a1a1a' })}>
          <span style={{ position: 'absolute', top: 10, right: 14, fontSize: 9, color: '#2a2a2a', letterSpacing: 2 }}>01</span>
          <p style={{ fontSize: 9, letterSpacing: '0.3em', color: TAG_COLORS.FRONTEND.color, margin: '0 0 18px' }}>FRONTEND</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {SKILLS.FRONTEND.map((s) => <Tag key={s} label={s} color={TAG_COLORS.FRONTEND} />)}
          </div>
        </div>

        {/* 02 Backend */}
        <div ref={(el) => (panelsRef.current[1] = el)}
          style={panelStyle({ borderRight: '1px solid #1a1a1a' })}>
          <span style={{ position: 'absolute', top: 10, right: 14, fontSize: 9, color: '#2a2a2a', letterSpacing: 2 }}>02</span>
          <p style={{ fontSize: 9, letterSpacing: '0.3em', color: TAG_COLORS.BACKEND.color, margin: '0 0 18px' }}>BACKEND</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {SKILLS.BACKEND.map((s) => <Tag key={s} label={s} color={TAG_COLORS.BACKEND} />)}
          </div>
        </div>

        {/* 03 Database */}
        <div ref={(el) => (panelsRef.current[2] = el)}
          style={panelStyle({})}>
          <span style={{ position: 'absolute', top: 10, right: 14, fontSize: 9, color: '#2a2a2a', letterSpacing: 2 }}>03</span>
          <p style={{ fontSize: 9, letterSpacing: '0.3em', color: TAG_COLORS.DATABASE.color, margin: '0 0 18px' }}>DATABASE</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {SKILLS.DATABASE.map((s) => <Tag key={s} label={s} color={TAG_COLORS.DATABASE} />)}
          </div>
        </div>

        {/* 04 Gen AI */}
        <div ref={(el) => (panelsRef.current[3] = el)}
          style={panelStyle({ borderTop: '1px solid #1a1a1a', borderRight: '1px solid #1a1a1a' })}>
          <span style={{ position: 'absolute', top: 10, right: 14, fontSize: 9, color: '#2a2a2a', letterSpacing: 2 }}>04</span>
          <p style={{ fontSize: 9, letterSpacing: '0.3em', color: TAG_COLORS.AI.color, margin: '0 0 18px' }}>GEN AI</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {SKILLS.AI.map((s) => <Tag key={s} label={s} color={TAG_COLORS.AI} />)}
          </div>
        </div>

        {/* 05 DevOps */}
        <div ref={(el) => (panelsRef.current[4] = el)}
          style={panelStyle({ borderTop: '1px solid #1a1a1a', borderRight: '1px solid #1a1a1a' })}>
          <span style={{ position: 'absolute', top: 10, right: 14, fontSize: 9, color: '#2a2a2a', letterSpacing: 2 }}>05</span>
          <p style={{ fontSize: 9, letterSpacing: '0.3em', color: TAG_COLORS.DEVOPS.color, margin: '0 0 18px' }}>DEVOPS</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {SKILLS.DEVOPS.map((s) => <Tag key={s} label={s} color={TAG_COLORS.DEVOPS} />)}
          </div>
        </div>


   <div ref={(el) => (panelsRef.current[4] = el)}
          style={panelStyle({ borderTop: '1px solid #1a1a1a', borderRight: '1px solid #1a1a1a' })}>
          <span style={{ position: 'absolute', top: 10, right: 14, fontSize: 9, color: '#2a2a2a', letterSpacing: 2 }}>05</span>
          <p style={{ fontSize: 9, letterSpacing: '0.3em', color: TAG_COLORS.TOOLS.color, margin: '0 0 18px' }}>TOOLS</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {SKILLS.TOOLS.map((s) => <Tag key={s} label={s} color={TAG_COLORS.TOOLS} />)}
          </div>
        </div>
        {/* 06 Proficiency */}
        <div ref={(el) => (panelsRef.current[5] = el)}
          style={panelStyle({ borderTop: '1px solid #1a1a1a' })}>
          <span style={{ position: 'absolute', top: 10, right: 14, fontSize: 9, color: '#2a2a2a', letterSpacing: 2 }}>06</span>
          <p style={{ fontSize: 9, letterSpacing: '0.3em', color: '#39FF14', margin: '0 0 24px' }}>PROFICIENCY</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {BARS.map((b, i) => (
              <div key={b.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 9, color: 'rgba(200,210,195,0.6)', letterSpacing: '0.08em' }}>
                    {b.label}
                  </span>
                  <span style={{ fontSize: 9, color: '#39FF14' }}>{b.pct}%</span>
                </div>
                <div style={{ width: '100%', height: 2, background: '#1a1a1a' }}>
                  <div
                    ref={(el) => (barsRef.current[i] = el)}
                    style={{
                      height: 2,
                      background: '#39FF14',
                      width: '0%',
                      boxShadow: '0 0 6px #39FF14',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}