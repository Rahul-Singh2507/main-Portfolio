import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Cursor from './components/Cursor'


gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    setTimeout(() => {
      document.querySelectorAll('[data-section]').forEach((el) => {
        gsap.fromTo(el,
          { y: 80, opacity: 0, scale: 0.97 },
          {
            y: 0, opacity: 1, scale: 1,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            }
          }
        )
      })
    }, 300)

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <div style={{ background: '#0a0a0a', color: '#fff', overflowX: 'hidden' }}>
      <Cursor />
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Skills />
      <Projects />
     <Contact/>
     <Footer/>
    </div>
  )
}