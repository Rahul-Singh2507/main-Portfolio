import { useEffect, useRef } from "react"
import gsap from "gsap"

const links = [
  { name: "WORK", href: "#work" },
  { name: "ABOUT", href: "#about" },
  { name: "LABS", href: "#labs" },
  { name: "CONTACT", href: "#contact" },
]

function Navbar() {
  const navRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        clearProps: "transform", // 🔥 fixes top gap issue
      }
    )
  }, [])

  return (
    <nav
  
      ref={navRef}
      className="fixed top-0 left-0 w-full z-9999 px-10 py-4 flex items-center justify-between bg-[#0a0a0a] shadow-[0_1px_0_rgba(255,255,255,0.05)]"
      style={{ fontFamily: "DM Mono, monospace" }}
    >
      {/* LOGO */}
      <div className="text-white text-sm tracking-[0.2em]">
        RAHUL_SINGH
      </div>

      {/* LINKS */}
      <div className="flex gap-10">
        {links.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="relative text-xs text-neutral-500 tracking-widest hover:text-[#39FF14] transition-colors duration-300 group"
          >
            {item.name}

            {/* UNDERLINE */}
            <span className="absolute left-0 -bottom-1 h-px w-0 bg-[#39FF14] transition-all duration-300 group-hover:w-full"></span>
          </a>
        ))}
      </div>

      {/* CTA */}
      <a
        href="#"
        className="text-xs text-[#39FF14] tracking-widest border border-[#39FF14] px-4 py-2 hover:bg-[#39FF14] hover:text-[#0a0a0a] transition-all duration-300"
      >
        DOWNLOAD_CV
      </a>
    </nav>
  )
}

export default Navbar