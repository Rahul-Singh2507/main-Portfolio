import { useEffect, useRef, useState } from 'react'
import TypingText from './TypingText'
import CardTags from './CardTags'

export default function CardInfo() {
  const ref = useRef(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    // start typing immediately on mount
    const t = setTimeout(() => setStarted(true), 500)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      ref={ref}
      style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        justifyContent: 'center', padding: '44px 48px 44px 0',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
        <div style={{
          width: 7, height: 7, borderRadius: '50%',
          background: '#39ff14', boxShadow: '0 0 6px #39ff14',
          flexShrink: 0,
        }} />
        <span style={{ fontSize: 11, color: '#39ff14', letterSpacing: '0.20em' }}>
          ADMIN_INFO
        </span>
      </div>

      <TypingText started={started} />
      <CardTags />
    </div>
  )
}