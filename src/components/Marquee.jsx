import { useEffect, useRef } from "react"
import gsap from "gsap"

function Marquee() {
  const marqueeRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".marquee-track", {
        xPercent: -50,
        duration: 20, // 🔥 speed (increase = slower)
        ease: "linear",
        repeat: -1,
      })
    }, marqueeRef)

    return () => ctx.revert()
  }, [])

  const items = [
    "PRECISION",
    "PERFORMANCE",
    "BRUTALISM",
    "EDITORIAL",
    "TECHNICAL",
  ]

  return (
    <div
      ref={marqueeRef}
      className="w-full overflow-hidden border-y border-neutral-800 py-4"
      style={{ fontFamily: "DM Mono, monospace" }}
    >
      <div className="marquee-track flex gap-10 whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="text-xs tracking-widest text-neutral-500"
          >
            {item}
            <span className="mx-6 text-[#39FF14]">•</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default Marquee