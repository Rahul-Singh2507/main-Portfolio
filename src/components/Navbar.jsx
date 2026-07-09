import { useEffect, useRef } from "react"
import gsap from "gsap"
import {Link} from "react-router-dom"
const links = [
  { name: "WORK", href: "#work" },
  { name: "ABOUT", href: "#about" },
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
        clearProps: "transform", 
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
      <div className="text-[#39FF14] text-sm tracking-[0.2em]">
        RAHUL_SINGH
      </div>

      {/* LINKS */}
      <div className="flex gap-10 text-white text-xs tracking-[0.15em]">
        { links.map((item) => (
          <Link
  key={item.name}
  to="#"
   className="relative text-white
             after:content-['']
             after:absolute
             after:left-0
             after:-bottom-1
             after:w-0
             after:h-[2px]
             after:bg-[#39FF14]
             after:transition-all
             after:duration-300
             hover:after:w-full"
  onClick={() =>
    document
      .querySelector(item.href)
      ?.scrollIntoView({ behavior: "smooth" })
  }
>
  {item.name}
</Link>
        ))}
      </div>

      {/* CTA */}
     <a
  href="/Rahul_Singh_CV.pdf"
  download="Rahul_Singh_CV.pdf"
  className="text-xs text-[#39FF14] tracking-widest border border-[#39FF14] px-4 py-2 hover:bg-[#39FF14] hover:text-black transition-all duration-300"
>
  DOWNLOAD_CV
</a>
    </nav>
  )
}

export default Navbar