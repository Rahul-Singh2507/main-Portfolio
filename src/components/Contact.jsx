import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import ContactHeader from "./contact/ContactHeader";
import ContactLinks from "./contact/ContactLinks";
import ContactStatus from "./contact/ContactStatus";

import "./contact/contactStyles.css";

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const linksRef = useRef(null)
  const statusRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Header slides in from left
      gsap.fromTo(headerRef.current,
        { opacity: 0, x: -60 },
        {
          opacity: 1, x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      )

      // Links fade up
      gsap.fromTo(linksRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0,
          duration: 1,
          delay: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        }
      )

      // Status card fades up after links
      gsap.fromTo(statusRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.9,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          }
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      data-section
      ref={sectionRef}
      id="contact"
      style={{
        background: "#07090b",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        padding: "120px 60px",
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      {/* Grid Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(57,255,20,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(57,255,20,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          pointerEvents: "none",
        }}
      />

      {/* Glow */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          top: -150,
          left: -150,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(57,255,20,.12), transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <div ref={headerRef}>
        <ContactHeader />
      </div>

      {/* Contact Links */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
        }}
      >
        <div ref={linksRef}>
          <ContactLinks />
        </div>

        {/* Status Card Below Links */}
        <div
          ref={statusRef}
          style={{
            marginTop: 60,
            maxWidth: 550,
          }}
        >
          <ContactStatus />
        </div>
      </div>
    </section>
  );
}