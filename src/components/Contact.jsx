import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const LINKS = [
  { label: 'EMAIL', value: 'you@email.com', href: 'mailto:you@email.com' },
  { label: 'GITHUB', value: 'github.com/yourhandle', href: 'https://github.com/yourhandle' },
  { label: 'LINKEDIN', value: 'linkedin.com/in/yourhandle', href: 'https://linkedin.com/in/yourhandle' },
  { label: 'TWITTER', value: '@yourhandle', href: 'https://twitter.com/yourhandle' },
]

export default function Contact() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const rowsRef = useRef([])
  const lineRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      )

      gsap.fromTo(rowsRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleEnter = (i) => {
    gsap.to(lineRefs.current[i], {
      scaleX: 1,
      duration: 0.4,
      ease: 'power3.out',
      transformOrigin: 'left center',
    })
    gsap.to(rowsRef.current[i], {
      x: 8,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const handleLeave = (i) => {
    gsap.to(lineRefs.current[i], {
      scaleX: 0,
      duration: 0.3,
      ease: 'power3.in',
      transformOrigin: 'left center',
    })
    gsap.to(rowsRef.current[i], {
      x: 0,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  return (
    <div
      data-section
      ref={sectionRef}
      id="contact"
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
          ● INITIATE_CONNECTION
        </p>
        <h2 style={{
          fontSize: 'clamp(32px, 5vw, 56px)',
          fontWeight: 700,
          color: '#39FF14',
          margin: 0,
          letterSpacing: '-0.02em',
          textTransform: 'uppercase',
        }}>
          ESTABLISH_LINK
        </h2>
      </div>

      {/* Rows */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {LINKS.map((link, i) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            ref={(el) => (rowsRef.current[i] = el)}
            onMouseEnter={() => handleEnter(i)}
            onMouseLeave={() => handleLeave(i)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '28px 0',
              borderBottom: '1px solid #1a1a1a',
              textDecoration: 'none',
              position: 'relative',
              cursor: 'pointer',
            }}
          >
            {/* Animated underline */}
            <div
              ref={(el) => (lineRefs.current[i] = el)}
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 1,
                background: '#39FF14',
                transform: 'scaleX(0)',
                transformOrigin: 'left center',
              }}
            />

            <span style={{
              fontSize: 'clamp(18px, 3vw, 28px)',
              fontWeight: 700,
              color: '#e8ebe6',
              letterSpacing: '0.04em',
            }}>
              {link.label}
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <span style={{
                fontSize: 12,
                color: 'rgba(200,210,195,0.45)',
                letterSpacing: '0.08em',
              }}>
                {link.value}
              </span>
              <span style={{
                fontSize: 20,
                color: '#39FF14',
              }}>
                →
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}