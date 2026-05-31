import { useEffect, useRef } from "react"
import gsap from "gsap"

function Hero() {
  const titleRef = useRef([])
  const taglineRef = useRef(null)
  const systemRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline()

    tl.fromTo(
      systemRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )
      .fromTo(
        titleRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.08, // ⚡ fast + smooth
        },
        "-=0.2"
      )
      .fromTo(
        taglineRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.3"
      )
  }, [])

  const title = "Rahul Singh".split("")

  return (
    <section className=" data-section h-screen w-full flex flex-col items-center justify-center text-center px-6 pt-24">
      
      {/* SYSTEM TEXT */}
      <div
        ref={systemRef}
        className="text-[10px] tracking-[0.4em] text-[#39FF14] mb-6"
        style={{ fontFamily: "DM Mono, monospace" }}
      >
        PORTFOLIO_SYSTEM_v1.0
      </div>

      {/* TITLE */}
      <h1
        className="text-[11vw] leading-[0.9] text-neutral-200 flex flex-wrap justify-center"
        style={{ fontFamily: "Anton, sans-serif" }}
      >
        {title.map((char, i) => (
          <span
            key={i}
            ref={(el) => (titleRef.current[i] = el)}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>

      {/* TAGLINE */}
      <p
        ref={taglineRef}
        className="mt-4 text-sm tracking-widest text-[#39FF14]"
        style={{ fontFamily: "DM Mono, monospace" }}
      >
        FULL-STACK_DEVELOPER
      </p>

      {/* SCROLL TEXT */}
      <div
        className="absolute bottom-6 text-[10px] tracking-widest text-neutral-500"
        style={{ fontFamily: "DM Mono, monospace" }}
      >
        SCROLL_DOWN
      </div>
    </section>
  )
}

export default Hero