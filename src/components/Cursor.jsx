import { useEffect, useRef } from "react"
import gsap from "gsap"

function Cursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    const moveCursor = (e) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out",
      })
    }

    window.addEventListener("mousemove", moveCursor)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-2 h-2 bg-[#39FF14] rounded-full pointer-events-none z-9999 -translate-x-1/2 -translate-y-1/2"
    ></div>
  )
}

export default Cursor