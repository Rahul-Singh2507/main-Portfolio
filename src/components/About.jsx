import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AboutBackground from './about/AboutBackground'
import AboutCard from './about/AboutCard'
import CardDecorations from './about/CardDecorations'
import CardSidebar from './about/CardSidebar'
import CardPhoto from './about/CardPhoto'
import CardInfo from './about/CardInfo'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef(null)
  const cardRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1, y: 0, duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <div
      data-section
      ref={sectionRef}
      id="about"
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        background: '#0a0a0a',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <AboutBackground />

      <div style={{ maxWidth: 1100, width: '100%', position: 'relative', zIndex: 1 }}>

        <p style={{
          fontSize: 11, color: 'rgba(57,255,20,0.6)',
          letterSpacing: '0.3em', marginBottom: 32,
        }}>
          — about me
        </p>

        <div ref={cardRef}>
          <AboutCard>
            <CardDecorations />
            <CardSidebar />
            <CardPhoto />
            <CardInfo />
          </AboutCard>
        </div>

      </div>
    </div>
  )
}