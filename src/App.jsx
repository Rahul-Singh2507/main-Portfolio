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



export default function App() {

  return (
    <div>
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