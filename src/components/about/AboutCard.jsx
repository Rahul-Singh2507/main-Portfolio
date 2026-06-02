import { useState, useRef } from 'react'

export default function AboutCard({ children }) {
  const cardRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    setMousePos({ x, y })
  }

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setMousePos({ x: 0, y: 0 }) }}
      onMouseMove={handleMouseMove}
      style={{
        display: 'flex',
        background: 'linear-gradient(140deg, rgba(28,31,36,0.98) 0%, rgba(14,16,19,0.99) 100%)',
        border: isHovered ? '1px solid rgba(57,255,20,0.3)' : '1px solid rgba(255,255,255,0.1)',
        borderRadius: 26,
        minHeight: 440,
        boxShadow: isHovered
          ? '0 0 80px rgba(57,255,20,0.08), 0 40px 120px rgba(0,0,0,0.95)'
          : '0 24px 90px rgba(0,0,0,0.88)',
        transform: isHovered
          ? `perspective(1200px) rotateY(${mousePos.x * 2.5}deg) rotateX(${-mousePos.y * 1.5}deg) scale(1.02)`
          : 'scale(1)',
        transition: 'transform 0.45s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease, border 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  )
}