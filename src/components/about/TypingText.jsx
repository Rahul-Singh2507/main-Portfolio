import { useEffect, useState } from 'react'

const TYPING_TEXT = "I build intelligent full-stack experiences powered by Gen AI — structured, fast and visually precise."

export default function TypingText({ started }) {
  const [displayed, setDisplayed] = useState('')
  const [charIndex, setCharIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  // Cursor blink
  useEffect(() => {
    const i = setInterval(() => setShowCursor(v => !v), 530)
    return () => clearInterval(i)
  }, [])

  // Typing
  useEffect(() => {
    if (!started) return
    if (charIndex < TYPING_TEXT.length) {
      const t = setTimeout(() => {
        setDisplayed(p => p + TYPING_TEXT[charIndex])
        setCharIndex(p => p + 1)
      }, 38)
      return () => clearTimeout(t)
    }
  }, [charIndex, started])

  return (
    <p style={{
      fontSize: 28, fontWeight: 400,
      color: '#e4e8e2', lineHeight: 1.44,
      marginBottom: 32, minHeight: '9rem',
    }}>
      {displayed}
      <span style={{
        display: 'inline-block', width: 2, height: '0.9em',
        background: '#39ff14', marginLeft: 3,
        verticalAlign: 'middle',
        opacity: showCursor ? 1 : 0,
      }} />
    </p>
  )
}